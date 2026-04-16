#!/bin/sh
set -eu

ROOT_DIR="$(CDPATH= cd -- "$(dirname "$0")/../.." && pwd)"
TMP_DIR="$(mktemp -d)"
TARGET_PARENT="$TMP_DIR/workspace"
PROJECT_NAME="demo-export-app"

cleanup() {
  rm -rf "$TMP_DIR"
}

trap cleanup EXIT

mkdir -p "$TARGET_PARENT"

sh "$ROOT_DIR/scripts/create-project.sh" guostz-react-web "$PROJECT_NAME" "$TARGET_PARENT"

PROJECT_DIR="$TARGET_PARENT/$PROJECT_NAME"

[ -d "$PROJECT_DIR" ]
[ -f "$PROJECT_DIR/package.json" ]
[ -f "$PROJECT_DIR/README.md" ]
[ ! -d "$PROJECT_DIR/docs/superpowers" ]
grep -q "\"name\": \"$PROJECT_NAME\"" "$PROJECT_DIR/package.json"
grep -q "^# $PROJECT_NAME$" "$PROJECT_DIR/README.md"

INTERACTIVE_TARGET_PARENT="$TMP_DIR/interactive-workspace"
INTERACTIVE_PROJECT_NAME="interactive-export-app"

mkdir -p "$INTERACTIVE_TARGET_PARENT"

printf '1\n%s\n' "$INTERACTIVE_PROJECT_NAME" | \
  sh "$ROOT_DIR/scripts/create-project.sh" -i "$INTERACTIVE_TARGET_PARENT"

INTERACTIVE_PROJECT_DIR="$INTERACTIVE_TARGET_PARENT/$INTERACTIVE_PROJECT_NAME"

[ -d "$INTERACTIVE_PROJECT_DIR" ]
[ -f "$INTERACTIVE_PROJECT_DIR/package.json" ]
[ -f "$INTERACTIVE_PROJECT_DIR/README.md" ]
grep -q "\"name\": \"$INTERACTIVE_PROJECT_NAME\"" "$INTERACTIVE_PROJECT_DIR/package.json"
grep -q "^# $INTERACTIVE_PROJECT_NAME$" "$INTERACTIVE_PROJECT_DIR/README.md"
