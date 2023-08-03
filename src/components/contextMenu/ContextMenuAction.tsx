import clsx from "clsx";
import { ActionManager } from "../../actions/manager";
import { Action } from "../../actions/types";
import { TranslationKeys, t } from "../../i18n";
import {
  useExcalidrawAppState,
  useExcalidrawElements,
  useExcalidrawSetAppState,
} from "../App";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import {
  ShortcutName,
  getShortcutFromShortcutName,
} from "../../actions/shortcuts";

type ContextMenuActionProps = {
  item: Action;
  actionManager: ActionManager;
};

export const ContextMenuAction = ({
  item,
  actionManager,
}: ContextMenuActionProps) => {
  const appState = useExcalidrawAppState();
  const setAppState = useExcalidrawSetAppState();
  const elements = useExcalidrawElements();

  const actionName = item.name;
  let label = "";
  if (item.contextItemLabel) {
    if (typeof item.contextItemLabel === "function") {
      label = t(
        item.contextItemLabel(
          elements,
          appState,
          actionManager.app,
        ) as unknown as TranslationKeys,
      );
    } else {
      label = t(item.contextItemLabel as unknown as TranslationKeys);
    }
  }

  return (
    <DropdownMenuPrimitive.Item
      onSelect={() => {
        // we need update state before executing the action in case
        // the action uses the appState it's being passed (that still
        // contains a defined contextMenu) to return the next state.
        setAppState({ contextMenu: null }, () => {
          actionManager.executeAction(item, "contextMenu");
        });
      }}
      className={clsx("context-menu-item", {
        dangerous: actionName === "deleteSelectedElements",
        checkmark: item.checked?.(appState),
      })}
    >
      <div className="context-menu-item__label">{label}</div>
      <kbd className="context-menu-item__shortcut">
        {actionName
          ? getShortcutFromShortcutName(actionName as ShortcutName)
          : ""}
      </kbd>
    </DropdownMenuPrimitive.Item>
  );
};
