import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { AVATARS } from "../../../../constants/avatars";
import { Popover } from "@headlessui/react";
import { PopoverCustom } from "../../../../components/PopoverCustom";

const SelectAvatar = ({
  setAvatar,
  avatarUrl,
  fieldNameValue,
}: {
  fieldNameValue: string;
  avatarUrl: string;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [avatars, setAvatars] = useState<Array<string>>(AVATARS);

  const getInitialOfUser = () => {
    return fieldNameValue?.length ? fieldNameValue[0] : "";
  };

  useEffect(() => {
    const avatarWithInitials = "initials/svg?seed=";

    setAvatars(
      avatars.map((e) =>
        e.includes(avatarWithInitials)
          ? `https://api.dicebear.com/7.x/initials/svg?seed=${getInitialOfUser()}`
          : e
      )
    );

    if (avatarUrl.includes(avatarWithInitials)) {
      setAvatar(
        `https://api.dicebear.com/7.x/initials/svg?seed=${getInitialOfUser()}`
      );
    }
  }, [getInitialOfUser(), avatarUrl]);

  return (
    <div className="relative">
      <img
        className="w-20 h-20 rounded-full bg-bgInput border-borderFocus border-2 select-none"
        src={avatarUrl}
        alt="Avatar Selecionado"
      />
      <Popover className="-top-1 -right-1 absolute z-50">
        {({ close }) => (
          <PopoverCustom
            children={
              <span
                aria-controls="editar avatar"
                className="z-10 cursor-pointer w-8 h-8 bg-buttonPrimary border-borderFocus border-2 rounded-full flex items-center justify-center"
              >
                <Pencil size={18} />
              </span>
            }
            content={
              <div className="p-1 -mt-1 ml-6 grid grid-cols-4 gap-1 absolute w-64 bg-secondary border-2  border-borderFocus rounded-lg shadow-2xl shadow-zinc-900">
                {avatars
                  .filter((avatar) => avatar !== avatarUrl)
                  .map((url, index) => (
                    <img
                      key={url}
                      src={url}
                      alt={`Avatar ${index}`}
                      className="w-14 h-14 cursor-pointer select-none rounded-full border-borderFocus border-2 bg-bgInput"
                      onClick={() => {
                        setAvatar(url);
                        close();
                      }}
                    />
                  ))}
              </div>
            }
          />
        )}
      </Popover>
    </div>
  );
};

export { SelectAvatar };
