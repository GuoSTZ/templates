#!/bin/sh
set -eu

SCRIPT_DIR="$(CDPATH= cd -- "$(dirname "$0")" && pwd)"
ROOT_DIR="$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)"

INTERACTIVE_MODE=0
TEMPLATE_NAME=""
PROJECT_NAME=""
TARGET_PARENT="$(pwd)"

list_templates() {
  find "$ROOT_DIR/apps" -mindepth 1 -maxdepth 1 -type d -exec basename {} \; | sort
}

select_template_interactively() {
  TEMPLATE_LIST="$(list_templates)"

  if [ -z "$TEMPLATE_LIST" ]; then
    echo "No templates found under $ROOT_DIR/apps" >&2
    exit 1
  fi

  echo "Available templates:" >&2

  INDEX=1
  while IFS= read -r TEMPLATE; do
    [ -n "$TEMPLATE" ] || continue
    printf '%s. %s\n' "$INDEX" "$TEMPLATE" >&2
    INDEX=$((INDEX + 1))
  done <<EOF
$TEMPLATE_LIST
EOF

  printf 'Select template number: ' >&2
  read -r SELECTION

  TEMPLATE_NAME="$(printf '%s\n' "$TEMPLATE_LIST" | sed -n "${SELECTION}p")"

  if [ -z "$TEMPLATE_NAME" ]; then
    echo "Invalid template selection: $SELECTION" >&2
    exit 1
  fi

  printf 'Project name: ' >&2
  read -r PROJECT_NAME
}

if [ "${1:-}" = "-i" ] || [ "${1:-}" = "--interactive" ]; then
  INTERACTIVE_MODE=1
  TARGET_PARENT="${2:-$(pwd)}"
else
  TEMPLATE_NAME="${1:-}"
  PROJECT_NAME="${2:-}"
  TARGET_PARENT="${3:-$(pwd)}"
fi

if [ "$INTERACTIVE_MODE" -eq 1 ]; then
  select_template_interactively
fi

if [ -z "$TEMPLATE_NAME" ] || [ -z "$PROJECT_NAME" ]; then
  echo "Usage: sh scripts/create-project.sh <template-name> <project-name> [target-parent-dir]" >&2
  echo "   or: sh scripts/create-project.sh -i [target-parent-dir]" >&2
  echo "   or: sh scripts/create-project.sh --interactive [target-parent-dir]" >&2
  exit 1
fi

TEMPLATE_DIR="$ROOT_DIR/apps/$TEMPLATE_NAME"
TARGET_DIR="$TARGET_PARENT/$PROJECT_NAME"
IGNORE_FILE="$TEMPLATE_DIR/.templateignore"

if [ ! -d "$TEMPLATE_DIR" ]; then
  echo "Template not found: $TEMPLATE_NAME" >&2
  exit 1
fi

if [ -e "$TARGET_DIR" ]; then
  echo "Target already exists: $TARGET_DIR" >&2
  exit 1
fi

mkdir -p "$TARGET_PARENT"

if [ -f "$IGNORE_FILE" ]; then
  rsync -a --exclude-from="$IGNORE_FILE" --exclude=".templateignore" "$TEMPLATE_DIR/" "$TARGET_DIR/"
else
  rsync -a --exclude=".templateignore" "$TEMPLATE_DIR/" "$TARGET_DIR/"
fi

PACKAGE_JSON="$TARGET_DIR/package.json"
README_FILE="$TARGET_DIR/README.md"

python3 - "$TARGET_DIR" "$PROJECT_NAME" <<'PY'
import json
import pathlib
import sys

target_dir = pathlib.Path(sys.argv[1])
project_name = sys.argv[2]

for path in target_dir.rglob("*"):
    if not path.is_file() or path.name == "package.json":
        continue
    try:
        text = path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        continue
    updated = text.replace("__PROJECT_NAME__", project_name)
    if path.name == "README.md":
        lines = updated.splitlines(keepends=True)
        if lines and lines[0].startswith("# "):
            newline = "\n" if lines[0].endswith("\n") else ""
            lines[0] = f"# {project_name}{newline}"
            updated = "".join(lines)
    if updated != text:
        path.write_text(updated, encoding="utf-8")
PY

if [ -f "$PACKAGE_JSON" ]; then
  python3 - "$PACKAGE_JSON" "$PROJECT_NAME" <<'PY'
import json
import pathlib
import sys

package_json = pathlib.Path(sys.argv[1])
project_name = sys.argv[2]

data = json.loads(package_json.read_text())
data["name"] = project_name
package_json.write_text(json.dumps(data, indent=2) + "\n")
PY
fi

echo "Project created at: $TARGET_DIR"
