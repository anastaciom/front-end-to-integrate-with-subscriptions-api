export type TImages = {
  id: number;
  imageType: string;
  imageUrl: string;
  userName: string;
  userPhoto: string;
  views: number;
  height: number;
  width: number;
};

export type TDialog = {
  message?: string;
  isShow: boolean;
};
