import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { AVATARS } from "../../../../constants/avatars";

const SelectAvatar = ({ fieldNameValue }: { fieldNameValue: string }) => {
  const [avatars, setAvatars] = useState<Array<string>>(AVATARS);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [avatarUrl, setAvatarUrl] = useState<string>(
    "https://api.dicebear.com/7.x/initials/svg?seed="
  );

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
      setAvatarUrl(
        `https://api.dicebear.com/7.x/initials/svg?seed=${getInitialOfUser()}`
      );
    }
  }, [getInitialOfUser(), avatarUrl]);

  return (
    <div
      className="relative"
      tabIndex={1}
      onBlur={() => showDialog && setShowDialog(false)}
    >
      <img
        className="w-20 h-20 rounded-full bg-bgInput border-borderFocus border-2 select-none"
        src={avatarUrl}
        alt="Avatar Selecionado"
      />
      <span
        aria-controls="editar avatar"
        onClick={() => setShowDialog(!showDialog)}
        className="-top-1 -right-1 absolute cursor-pointer w-8 h-8 bg-buttonPrimary border-borderFocus border-2 rounded-full flex items-center justify-center"
      >
        <Pencil size={18} />
      </span>
      {showDialog && (
        <div className="p-1 grid grid-cols-4 gap-1 absolute z-10 mt-2 w-64 bg-secondary border-2  border-borderFocus rounded-lg shadow-2xl shadow-zinc-900">
          {avatars
            .filter((avatar) => avatar !== avatarUrl)
            .map((url, index) => (
              <img
                key={url}
                src={url}
                alt={`Avatar ${index}`}
                className="w-14 h-14 cursor-pointer select-none rounded-full border-borderFocus border-2 bg-bgInput"
                onClick={() => {
                  setAvatarUrl(url);
                  setShowDialog(false);
                }}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export { SelectAvatar };
