import { OptionsUser } from "../dropdown/OptionsUser";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useUserData } from "../../../../hooks/userData";
import { Popover } from "@headlessui/react";
import { PopoverCustom } from "../../../PopoverCustom";

export const UserPhoto = () => {
  const userData = useUserData((state) => state.userData);

  return (
    <Popover className="z-50">
      {({ open }) => (
        <PopoverCustom
          children={
            <div className="select-none flex justify-evenly items-center py-1 rounded-full hover:bg-secondary w-20 border-2 border-secondary">
              <img
                id="avatarButton"
                className="w-9 h-9 rounded-full "
                src={userData?.avatarUrl ?? ""}
                alt="avatar"
              />
              {open ? <ChevronUp /> : <ChevronDown />}
            </div>
          }
          content={
            <div className="mt-1 right-0 absolute bg-secondary rounded-lg shadow-2xl overflow-hidden">
              <OptionsUser />
            </div>
          }
        />
      )}
    </Popover>
  );
};
