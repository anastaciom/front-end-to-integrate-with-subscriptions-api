import { useState } from "react";
import {
  ArrowLeftToLine,
  ArrowRightToLine,
  Download,
  MoveUpRight,
  Star,
} from "lucide-react";
import { useUserData } from "../../hooks/userData";
import "./style.css";

export const Sidebar = () => {
  const [hideMenu, setHideMenu] = useState<boolean>(false);
  const userData = useUserData((state) => state.userData);

  return (
    <aside
      className={`${
        hideMenu ? "w-20 " : "w-80"
      } h-full flex-col px-4 border-r border-divider transition-all`}
    >
      <section className="h-20 flex items-center justify-between">
        <h1 className="text-2xl font-medium">{!hideMenu && "Menu"}</h1>
        <button
          onClick={() => setHideMenu(!hideMenu)}
          className="hover:bg-secondary p-2 rounded-full"
        >
          {!hideMenu ? <ArrowLeftToLine /> : <ArrowRightToLine />}
        </button>
      </section>
      <section className="h-20 m flex items-center justify-center">
        <div className="w-full h-2/4 flex items-center justify-center rounded-lg bg-gradient-to-r from-emerald-400 via-cyan-400 to-green-400 background-animate">
          <h1 className="text-1xl font-medium tracking-wide">
            {hideMenu
              ? userData?.subscription?.length && userData?.subscription[0]
              : userData?.subscription}
          </h1>
        </div>
      </section>

      <section className="border-t border-divider h-24 flex flex-col justify-center">
        <a
          href="#"
          className={`flex items-center ${
            hideMenu && "justify-center"
          } hover:bg-secondary p-2 rounded`}
        >
          {!hideMenu ? "Favoritos" : <Star />}
          {/* //TODO: PODE RENDERIZAR NO OUTLET */}
        </a>

        <a
          href="#"
          className={`flex items-center ${
            hideMenu && "justify-center"
          } hover:bg-secondary p-2 rounded`}
        >
          {!hideMenu ? "Downloads" : <Download />}
          {/* //TODO: PODE RENDERIZAR NO OUTLET */}
        </a>
      </section>
      {!hideMenu && (
        <section className="py-2 border-t border-divider h-[calc(100vh_-_22rem)]">
          <h1 className="text-2xl font-medium tracking-wide mb-6 h-[4%]">
            News
          </h1>
          <div className="px-6 overflow-y-auto h-[93%]">
            <ol className="relative border-l border-divider">
              {/* //TODO: EXAMPLE 'LI' */}
              <li className="space-x-6 space-y-2">
                <span className="absolute flex items-center justify-center w-6 h-6  rounded-full -left-3 ring-8  ring-secondary bg-bg-background">
                  <svg
                    className="w-2.5 h-2.5 text-text"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </span>
                <h3 className="flex items-center text-lg font-semibold text-text">
                  TEST
                  <span className="bg-buttonPrimary text-text text-sm font-medium  px-2.5 py-0.5 rounded ml-2">
                    Latest
                  </span>
                </h3>
                <time className="block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  Released on July 14th, 2023
                </time>
                <p className=" text-base font-normal text-gray-500 dark:text-gray-400">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Sequi cum tenetur facilis sit perspiciatis, mollitia aliquam.
                  Ut expedita aspernatur quis fugit sunt dolor, sequi animi
                  earum voluptatum minus iure adipisci?
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-text  border border-secondary rounded-lg hover:bg-buttonPrimaryHover"
                >
                  Ver mais
                  <MoveUpRight size={18} />
                </a>
              </li>
            </ol>
          </div>
        </section>
      )}
    </aside>
  );
};
