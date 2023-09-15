import { Bell } from "lucide-react";
import { UserPhoto } from "./userPhoto";

export const Header = () => {
  return (
    <header className="border-b border-divider px-4 h-20 flex justify-between items-center">
      <strong className="text-2xl font-bold tracking-wide w-[80%] ">
        SubscriptionsApp.
      </strong>
      <div className="flex items-center justify-end h-full w-[20%] gap-8">
        <button className="rounded-full bg-secondary hover:bg-background h-3/6 w-10 flex justify-center items-center">
          <Bell />
        </button>
        <UserPhoto />
      </div>
    </header>
  );
};
