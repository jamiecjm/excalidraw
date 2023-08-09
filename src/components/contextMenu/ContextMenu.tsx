import "./ContextMenu.scss";
import React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ContextMenuTrigger } from "./ContextMenuTrigger";
import { ContextMenuContent } from "./ContextMenuContent";
import { ActionManager } from "../../actions/manager";
import { ContextMenuItems } from "./contextMenuUtils";

type ContextMenuProps = {
  actionManager: ActionManager;
  items: ContextMenuItems;
  top: number;
  left: number;
  onInteractOutside: () => void;
};

export const ContextMenu = React.memo((props: ContextMenuProps) => {
  const { top, left, onInteractOutside } = props;

  return (
    <DropdownMenuPrimitive.Root>
      <ContextMenuTrigger />
      <DropdownMenuPrimitive.Portal
        forceMount
        container={document.querySelector<HTMLElement>(".excalidraw")}
      >
        <DropdownMenuPrimitive.Content
          side="bottom"
          sideOffset={top + 5}
          align="start"
          alignOffset={left + 5}
          className="context-menu"
          onInteractOutside={onInteractOutside}
        >
          <ContextMenuContent {...props} />
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
});
