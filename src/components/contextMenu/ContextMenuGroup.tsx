import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ContextMenuItemGroup } from "./contextMenuUtils";
import { ActionManager } from "../../actions/manager";
import { ContextMenuContent } from "./ContextMenuContent";

type ContextMenuGroupProps = {
  actionManager: ActionManager;
  group: ContextMenuItemGroup;
};

export const ContextMenuGroup = ({
  actionManager,
  group,
}: ContextMenuGroupProps) => {
  return (
    <DropdownMenuPrimitive.Sub>
      <DropdownMenuPrimitive.SubTrigger className="context-menu-item">
        {group.contextItemLabel}
      </DropdownMenuPrimitive.SubTrigger>
      <DropdownMenuPrimitive.Portal
        container={document.querySelector<HTMLElement>(".excalidraw")}
      >
        <DropdownMenuPrimitive.SubContent
          sideOffset={4}
          className="context-menu"
        >
          <ContextMenuContent
            actionManager={actionManager}
            items={group.contextMenuItems}
          />
        </DropdownMenuPrimitive.SubContent>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Sub>
  );
};
