type TFeaturesList = {
  [key: string]: string | boolean;
  disabled: boolean;
};

export interface IStatePlansProps {
  id: string;
  themeColor: "yellow" | "blue" | "green";
  description: string;
  name: string;
  price: number;
  priceId: string;
  featuresList: TFeaturesList[];
}
