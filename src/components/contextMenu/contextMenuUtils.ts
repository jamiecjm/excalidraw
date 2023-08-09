import {
  actionAddToLibrary,
  actionBringForward,
  actionBringToFront,
  actionCopy,
  actionCopyAsPng,
  actionCopyAsSvg,
  copyText,
  actionCopyStyles,
  actionCut,
  actionDeleteSelected,
  actionDuplicateSelection,
  actionFlipHorizontal,
  actionFlipVertical,
  actionGroup,
  actionPasteStyles,
  actionSelectAll,
  actionSendBackward,
  actionSendToBack,
  actionToggleGridMode,
  actionToggleStats,
  actionToggleZenMode,
  actionUnbindText,
  actionBindText,
  actionUngroup,
  actionLink,
  actionToggleElementLock,
  actionToggleLinearEditor,
} from "../../actions";
import { actionPaste } from "../../actions/actionClipboard";
import {
  actionRemoveAllElementsFromFrame,
  actionSelectAllElementsInFrame,
} from "../../actions/actionFrame";
import { actionWrapTextInContainer } from "../../actions/actionBoundText";
import { actionToggleViewMode } from "../../actions/actionToggleViewMode";
import { actionUnlockAllElements } from "../../actions/actionElementLock";
import { Action } from "../../actions/types";

export type ContextMenuItemGroupName = "copyPasteAs" | "layer";
export type ContextMenuItemGroup = {
  name: ContextMenuItemGroupName;
  contextItemLabel: string;
  contextMenuItems: ContextMenuItem[];
};

export const CONTEXT_MENU_SEPARATOR = "separator";
export type ContextMenuItem =
  | typeof CONTEXT_MENU_SEPARATOR
  | Action
  | ContextMenuItemGroup;

export type ContextMenuItems = (ContextMenuItem | false | null | undefined)[];

export const isContextMenuItemGroup = (
  item: any,
): item is ContextMenuItemGroup => {
  return Array.isArray(item.contextMenuItems);
};

export const isAction = (item: any): item is Action => {
  return item.perform !== undefined;
};

const getCopyPasteAsActionGroup = (
  contextMenuItems: ContextMenuItem[],
): ContextMenuItemGroup => {
  return {
    name: "copyPasteAs",
    contextItemLabel: "Copy/Paste as",
    contextMenuItems,
  };
};

const getLayerActionGroup = (
  contextMenuItems: ContextMenuItem[],
): ContextMenuItemGroup => {
  return {
    name: "layer",
    contextItemLabel: "Layer",
    contextMenuItems,
  };
};

const getContextMenuItemsForElementInViewMode = (): ContextMenuItems => {
  return [actionCopy, actionCopyAsPng, actionCopyAsSvg, copyText];
};

const getContextMenuItemsForElement = (): ContextMenuItems => {
  const groupedActionCopyPasteAs = getCopyPasteAsActionGroup([
    actionCopy,
    actionPaste,
    CONTEXT_MENU_SEPARATOR,
    actionCopyAsPng,
    actionCopyAsSvg,
    CONTEXT_MENU_SEPARATOR,
    copyText,
    CONTEXT_MENU_SEPARATOR,
    actionCopyStyles,
    actionPasteStyles,
  ]);

  const groupedActionLayer = getLayerActionGroup([
    actionSendBackward,
    actionBringForward,
    actionSendToBack,
    actionBringToFront,
  ]);

  return [
    actionCut,
    CONTEXT_MENU_SEPARATOR,
    groupedActionCopyPasteAs,
    CONTEXT_MENU_SEPARATOR,
    actionSelectAllElementsInFrame,
    actionRemoveAllElementsFromFrame,
    CONTEXT_MENU_SEPARATOR,
    actionGroup,
    actionUnbindText,
    actionBindText,
    actionWrapTextInContainer,
    actionUngroup,
    CONTEXT_MENU_SEPARATOR,
    actionAddToLibrary,
    CONTEXT_MENU_SEPARATOR,
    groupedActionLayer,
    CONTEXT_MENU_SEPARATOR,
    actionFlipHorizontal,
    actionFlipVertical,
    CONTEXT_MENU_SEPARATOR,
    actionToggleLinearEditor,
    actionLink,
    actionDuplicateSelection,
    actionToggleElementLock,
    CONTEXT_MENU_SEPARATOR,
    actionDeleteSelected,
  ];
};

const getContextMenuItemsForCanvasInViewMode = (): ContextMenuItems => {
  return [
    actionCopyAsPng,
    actionCopyAsSvg,
    actionToggleGridMode,
    actionToggleZenMode,
    actionToggleViewMode,
    actionToggleStats,
  ];
};

const getContextMenuItemsForCanvas = (): ContextMenuItems => {
  const groupedActionCopyPasteAs = getCopyPasteAsActionGroup([
    actionPaste,
    CONTEXT_MENU_SEPARATOR,
    actionCopyAsPng,
    actionCopyAsSvg,
    copyText,
  ]);

  return [
    groupedActionCopyPasteAs,
    CONTEXT_MENU_SEPARATOR,
    actionSelectAll,
    actionUnlockAllElements,
    CONTEXT_MENU_SEPARATOR,
    actionToggleGridMode,
    actionToggleZenMode,
    actionToggleViewMode,
    actionToggleStats,
  ];
};

export const getContextMenuItems = (
  type: "canvas" | "element",
  viewModeEnabled: boolean,
): ContextMenuItems => {
  // canvas contextMenu
  // -------------------------------------------------------------------------
  if (type === "canvas") {
    if (viewModeEnabled) {
      return getContextMenuItemsForCanvasInViewMode();
    }

    return getContextMenuItemsForCanvas();
  }

  // element contextMenu
  // -------------------------------------------------------------------------
  if (viewModeEnabled) {
    return getContextMenuItemsForElementInViewMode();
  }

  return getContextMenuItemsForElement();
};
