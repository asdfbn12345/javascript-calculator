import { Notation } from "../types/enums.js";
import { ExpressionCharacters } from "../types/types.js";
import { Expression } from "./interfaces.js";

export interface IExpressionManager {
  expression: Expression;
  operandInputPointer: number;
  operatorInputPointer: number;
  lastInputCharacter: ExpressionCharacters | undefined;
  addCharacter(character: ExpressionCharacters): boolean;
  deleteCharacter(): boolean;
  reset(): void;
  getExpressionString(notation: Notation): string;
}
