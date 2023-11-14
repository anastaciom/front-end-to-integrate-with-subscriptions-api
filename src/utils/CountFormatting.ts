const handleCountFormatting = (num: number) =>
  new Intl.NumberFormat("pt-BR", {
    notation: "compact",
    compactDisplay: "short",
  }).format(num);

export { handleCountFormatting };
