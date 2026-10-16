export type SecretId = "clue" | "code" | "clock" | "paw" | "logo";

export type PawPrintPosition = {
  id: number;
  kind: "gift" | "paw" | "pumpkin" | "snowflake";
  rotation: number;
  x: number;
  y: number;
};
