import { Popover as PopoverHUI, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";

interface PopoverProps {
  content: ReactNode;
  children: ReactNode;
}

const PopoverCustom = ({ content, children }: PopoverProps) => {
  return (
    <>
      <PopoverHUI.Button className={"focus:outline-none"}>
        {children}
      </PopoverHUI.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverHUI.Panel>{content}</PopoverHUI.Panel>
      </Transition>
    </>
  );
};

export { PopoverCustom };
