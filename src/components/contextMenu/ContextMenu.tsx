import "./ContextMenu.scss";
import React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ContextMenuTrigger } from "./ContextMenuTrigger";
import {
  ContextMenuContent,
  ContextMenuContentProps,
} from "./ContextMenuContent";

type ContextMenuProps = ContextMenuContentProps;

export const CONTEXT_MENU_SEPARATOR = "separator";

export const ContextMenu = React.memo((props: ContextMenuProps) => {
  return (
    <DropdownMenuPrimitive.Root>
      <ContextMenuTrigger />
      <DropdownMenuPrimitive.Portal
        forceMount
        container={document.querySelector<HTMLElement>(".excalidraw")}
      >
        <ContextMenuContent {...props} />
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
});
