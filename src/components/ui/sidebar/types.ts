import { type VariantProps } from "class-variance-authority";
import { type sidebarMenuButtonVariants } from "./menu-button";

export type SidebarContext = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

export type SidebarMenuButtonProps = React.ComponentProps<"button"> & {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?:
    | string
    | React.ComponentProps<
        typeof import("@/components/ui/tooltip").TooltipContent
      >;
} & VariantProps<typeof sidebarMenuButtonVariants>;
