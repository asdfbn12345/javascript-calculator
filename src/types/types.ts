export type ExpressionCharacter = DigitNumber | "." | Operator;

export const DigitNumberValues = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
] as const;
type DigitNumber = (typeof DigitNumberValues)[number];

export const OperatorValues = ["+", "-", "*", "/"] as const;
export type Operator = (typeof OperatorValues)[number];
