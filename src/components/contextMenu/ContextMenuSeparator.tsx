import { CONTEXT_MENU_SEPARATOR, ContextMenuItem } from "./contextMenuUtils";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

type ContextMenuSeparatorProps = {
  filteredItems: ContextMenuItem[];
  idx: number;
};

export const ContextMenuSeparator = ({
  filteredItems,
  idx,
}: ContextMenuSeparatorProps) => {
  if (
    !filteredItems[idx - 1] ||
    filteredItems[idx - 1] === CONTEXT_MENU_SEPARATOR
  ) {
    return null;
  }
  return (
    <DropdownMenuPrimitive.Separator className="context-menu-item-separator" />
  );
};
