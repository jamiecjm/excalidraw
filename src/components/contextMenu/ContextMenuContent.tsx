import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { useExcalidrawAppState, useExcalidrawElements } from "../App";
import { ActionManager } from "../../actions/manager";
import { Action } from "../../actions/types";
import { ContextMenuAction } from "./ContextMenuAction";

export type ContextMenuItem = typeof CONTEXT_MENU_SEPARATOR | Action;

export type ContextMenuItems = (ContextMenuItem | false | null | undefined)[];

export type ContextMenuContentProps = {
  actionManager: ActionManager;
  items: ContextMenuItems;
  top: number;
  left: number;
};

export const CONTEXT_MENU_SEPARATOR = "separator";

export const ContextMenuContent = ({
  actionManager,
  items,
  top,
  left,
}: ContextMenuContentProps) => {
  const appState = useExcalidrawAppState();
  const elements = useExcalidrawElements();

  const filteredItems = items.reduce((acc: ContextMenuItem[], item) => {
    if (
      item &&
      (item === CONTEXT_MENU_SEPARATOR ||
        !item.predicate ||
        item.predicate(
          elements,
          appState,
          actionManager.app.props,
          actionManager.app,
        ))
    ) {
      acc.push(item);
    }
    return acc;
  }, []);

  return (
    <DropdownMenuPrimitive.Content
      side="bottom"
      sideOffset={top + 5}
      align="start"
      alignOffset={left + 5}
      style={{ zIndex: 9999999999999999 }}
      className="context-menu"
    >
      {filteredItems.map((item, idx) => {
        if (item === CONTEXT_MENU_SEPARATOR) {
          if (
            !filteredItems[idx - 1] ||
            filteredItems[idx - 1] === CONTEXT_MENU_SEPARATOR
          ) {
            return null;
          }
          return (
            <DropdownMenuPrimitive.Separator className="context-menu-item-separator" />
          );
        }

        return <ContextMenuAction item={item} actionManager={actionManager} />;
      })}
    </DropdownMenuPrimitive.Content>
  );
};
