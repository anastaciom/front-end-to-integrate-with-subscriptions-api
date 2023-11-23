/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";

export interface IDialogProps {
  show: boolean;
  onClose: () => any;
  message?: string;
  actions: Array<{
    title: string;
    onClick: () => any;
    className: string;
  }>;
  isContent: boolean;
  title?: string;
  icon?: ReactNode;
}
