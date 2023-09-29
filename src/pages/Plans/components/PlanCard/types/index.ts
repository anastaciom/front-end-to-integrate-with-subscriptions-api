type TFeaturesList = {
  [key: string]: string | boolean;
  disabled: boolean;
};

export interface IPlanCard {
  priceId: string;
  name: string;
  description: string;
  colorName: "yellow" | "blue" | "green";
  price: number;
  featuresList: TFeaturesList[];
}
