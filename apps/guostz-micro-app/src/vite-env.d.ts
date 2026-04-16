/// <reference types="vite/client" />

import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare module "react/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements {
      "micro-app": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        name: string;
        url: string;
        baseroute?: string;
        data?: string;
      };
    }
  }
}
