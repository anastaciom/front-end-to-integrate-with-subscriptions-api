import { Sidebar } from "../../Sidebar";
import { Outlet } from "react-router-dom";

export const Content = () => {
  return (
    <div className="h-[calc(100vh_-_5rem)] max-h-[calc(100vh_-_5rem)] flex justify-between">
      <Sidebar />
      <div className="w-full h-full flex-1">
        <Outlet />
      </div>
    </div>
  );
};
