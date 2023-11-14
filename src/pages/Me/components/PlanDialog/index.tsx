import { Dialog, Transition } from "@headlessui/react";
import { BadgeInfo } from "lucide-react";
import { useRef } from "react";
import { TPlanDialogProps } from "./types";

const PlanDialog = ({ dialogData, setDialogData }: TPlanDialogProps) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={dialogData.isShow} as={"div"}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => setDialogData({ isShow: false })}
      >
        <Transition.Child
          as={"div"}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-background bg-opacity-80 transition-opacity" />
        </Transition.Child>

        {dialogData.message && (
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={"div"}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-secondary text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-secondary px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-background sm:mx-0 sm:h-10 sm:w-10">
                        <BadgeInfo color="yellow" />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6"
                        >
                          Faça Upgrade da Assinatura
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-400">
                            {dialogData.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-buttonPrimary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-buttonSecondary sm:ml-3 sm:w-auto"
                      onClick={() => setDialogData({ isShow: false })} //TODO: REDIRECT TO SUBSCRIPTION CHANGE PAGE
                    >
                      Alterar assinatura
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setDialogData({ isShow: false })}
                      ref={cancelButtonRef}
                    >
                      Cancelar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        )}
      </Dialog>
    </Transition.Root>
  );
};

export { PlanDialog };
