import { useState } from "react";
import { OptionsUser } from "../dropdown/OptionsUser";
import { ChevronDown, ChevronUp } from "lucide-react";

export const UserPhoto = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const iconsProps = {
    onClick: toggleDropdown,
    className: "cursor-pointer",
    size: 20,
  };

  return (
    <div
      tabIndex={0}
      onBlur={() => isDropdownVisible && setDropdownVisible(false)}
      className="select-none relative flex justify-evenly items-center  py-1 rounded-full  bg-secondary w-20 hover:bg-background"
    >
      <img
        id="avatarButton"
        className="w-9 h-9 rounded-full "
        src={""} //TODO: SET USER PHOTO
        alt="User dropdown"
      />
      {isDropdownVisible ? (
        <ChevronUp {...iconsProps} />
      ) : (
        <ChevronDown {...iconsProps} />
      )}
      {isDropdownVisible && <OptionsUser />}
    </div>
  );
};
