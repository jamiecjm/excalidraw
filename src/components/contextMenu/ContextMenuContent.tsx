import { ActionManager } from "../../actions/manager";
import { useExcalidrawAppState, useExcalidrawElements } from "../App";
import { ContextMenuAction } from "./ContextMenuAction";
import { ContextMenuGroup } from "./ContextMenuGroup";
import { ContextMenuSeparator } from "./ContextMenuSeparator";
import {
  CONTEXT_MENU_SEPARATOR,
  ContextMenuItem,
  ContextMenuItems,
  isAction,
  isContextMenuItemGroup,
} from "./contextMenuUtils";

type ContextMenuContentProps = {
  actionManager: ActionManager;
  items: ContextMenuItems;
};

export const ContextMenuContent = ({
  actionManager,
  items,
}: ContextMenuContentProps) => {
  const appState = useExcalidrawAppState();
  const elements = useExcalidrawElements();

  const filteredItems = items.reduce((acc: ContextMenuItem[], item) => {
    if (item === CONTEXT_MENU_SEPARATOR) {
      acc.push(item);
    }

    if (isAction(item)) {
      if (
        !item.predicate ||
        item.predicate(
          elements,
          appState,
          actionManager.app.props,
          actionManager.app,
        )
      ) {
        acc.push(item);
      }
    }

    if (isContextMenuItemGroup(item)) {
      acc.push(item);
    }

    return acc;
  }, []);

  return (
    <>
      {filteredItems.map((item, idx) => {
        if (item === CONTEXT_MENU_SEPARATOR) {
          return (
            <ContextMenuSeparator filteredItems={filteredItems} idx={idx} />
          );
        }

        if (isContextMenuItemGroup(item)) {
          return (
            <ContextMenuGroup group={item} actionManager={actionManager} />
          );
        }

        return <ContextMenuAction item={item} actionManager={actionManager} />;
      })}
    </>
  );
};
