import { ExpressionOperators } from "../types/types.js";

export interface Expression {
  operands: string[];
  operators: ExpressionOperators[];
}
