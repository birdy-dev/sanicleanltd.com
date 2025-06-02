import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import menuIcon from "../icons/menu.svg";
import { type PropsWithChildren } from "react";

export function MobileNav(props: PropsWithChildren) {
  return (
    <div>
      <Popover className="relative">
        <PopoverButton className="flex items-center gap-1.5 bg-white text-foreground/80 px-4 py-2">
          <img className="size-5" src={menuIcon.src} /> Menu
        </PopoverButton>

        <PopoverBackdrop className="fixed inset-0 z-50" />

        <PopoverPanel
          className="transition duration-200 ease-in-out data-closed:-translate-y-1 data-closed:opacity-0 z-999"
          transition
          anchor="bottom start"
        >
          {props.children}
        </PopoverPanel>
      </Popover>
    </div>
  );
}
