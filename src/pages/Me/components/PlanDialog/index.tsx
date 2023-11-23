import { BadgeInfo } from "lucide-react";
import { TPlanDialogProps } from "./types";
import { Dialog } from "../../../../components/Dialog";

const PlanDialog = ({
  dialogData: { isShow, message },
  setDialogData,
}: TPlanDialogProps) => {
  return (
    <Dialog
      title="Faça Upgrade da Assinatura"
      icon={<BadgeInfo color="yellow" />}
      show={isShow}
      onClose={() => setDialogData({ isShow: false })}
      message={message}
      isContent={!!message}
      actions={[
        {
          title: "Fechar",
          onClick: () => setDialogData({ isShow: false }),
          className:
            "bg-buttonSecondary hover:bg-buttonSecondaryHover text-white",
        },
        {
          title: "Alterar assinatura",
          onClick: () => setDialogData({ isShow: false }),
          className: "bg-buttonPrimary  hover:bg-buttonPrimaryHover text-white",
        },
      ]}
    />
  );
};

export { PlanDialog };
