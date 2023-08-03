import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { useExcalidrawAppState } from "../App";

export const ContextMenuTrigger = () => {
  const appState = useExcalidrawAppState();

  return (
    <DropdownMenuPrimitive.Trigger
      asChild
      style={{
        height: 0,
        width: appState.width,
        position: "absolute",
      }}
    >
      <div></div>
    </DropdownMenuPrimitive.Trigger>
  );
};
