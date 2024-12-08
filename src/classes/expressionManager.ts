import { BrowserOperatorKey, Notation } from "../types/enums.js";
import { IExpressionManager } from "../interfaces/IExpressionManager.js";
import { ExpressionCharacters, ExpressionOperators } from "../types/types.js";
import { Expression } from "../interfaces/interfaces.js";

export class ExpressionManager implements IExpressionManager {
  constructor() {
    this.expression = {
      operands: [],
      operators: [],
    };
    this.operandInputPointer = 0;
    this.operatorInputPointer = 0;
    this.lastInputCharacter = undefined;
  }
  operandInputPointer: number;
  operatorInputPointer: number;
  expression: Expression;
  lastInputCharacter: ExpressionCharacters | undefined;
  addCharacter(character: ExpressionCharacters): boolean {
    if (this.isOperand(character)) {
      if (
        this.lastInputCharacter !== undefined &&
        this.isOperator(this.lastInputCharacter)
      ) {
        ++this.operandInputPointer;
      }

      const nextNumber =
        this.expression.operands[this.operandInputPointer] === undefined
          ? character
          : this.expression.operands[this.operandInputPointer] + character;

      if (!this.isValidNumber(nextNumber)) {
        return false;
      }

      this.expression.operands[this.operandInputPointer] =
        this.trimNumber(nextNumber);
      this.lastInputCharacter = character;
      return true;
    }

    if (this.isOperator(character)) {
      if (this.expression.operands[0] === undefined) {
        return false;
      }

      if (this.expression.operators[0] !== undefined) {
        if (
          this.lastInputCharacter !== undefined &&
          this.isOperand(this.lastInputCharacter)
        ) {
          ++this.operatorInputPointer;
        }
      }

      this.expression.operators[this.operatorInputPointer] =
        character as ExpressionOperators;
      this.lastInputCharacter = character;
      return true;
    }

    return false;
  }

  deleteCharacter(): boolean {
    if (this.lastInputCharacter === undefined) {
      return false;
    }

    if (this.isOperand(this.lastInputCharacter)) {
      if (this.expression.operands[this.operandInputPointer] === undefined) {
        return false;
      }

      if (this.expression.operands[this.operandInputPointer].length === 1) {
        this.expression.operands.splice(-1);

        if (0 < this.operandInputPointer) {
          --this.operandInputPointer;
        }

        this.lastInputCharacter =
          this.expression.operators[this.operatorInputPointer];

        return true;
      }

      this.expression.operands[this.operandInputPointer] =
        this.expression.operands[this.operandInputPointer].slice(0, -1);
      this.lastInputCharacter = this.expression.operands[
        this.operandInputPointer
      ].slice(-1) as ExpressionCharacters;

      return true;
    } else {
      if (this.expression.operators[this.operatorInputPointer] === undefined) {
        return false;
      }

      this.expression.operators.splice(-1);
      if (0 < this.operatorInputPointer) {
        --this.operatorInputPointer;
      }

      this.lastInputCharacter = this.expression.operands[
        this.operandInputPointer
      ].slice(-1) as ExpressionCharacters;

      return true;
    }
  }

  reset(): void {
    this.expression.operands = [];
    this.expression.operators = [];
    this.operandInputPointer = 0;
    this.operatorInputPointer = 0;
    this.lastInputCharacter = undefined;
  }

  getExpressionString(notation: Notation): string {
    let expressionString = "";

    if (
      this.expression.operands.length === 0 &&
      this.expression.operators.length === 0
    ) {
      return expressionString;
    }

    switch (notation) {
      case Notation.Infix:
        let operatorIndex = 0;

        expressionString = this.expression.operands.reduce(
          (infixExpression, operand) => {
            if (operand !== undefined) {
              infixExpression += operand;
            }
            if (this.expression.operators[operatorIndex] !== undefined) {
              infixExpression += this.expression.operators[operatorIndex++];
            }
            return infixExpression;
          },
          ""
        );
        break;
      default:
        break;
    }

    return expressionString;
  }

  isDigitNumber(character: string): boolean {
    return !Number.isNaN(parseInt(character));
  }

  isPoint(character: string): boolean {
    return character === ".";
  }

  isOperand(character: string): boolean {
    return this.isDigitNumber(character) || this.isPoint(character);
  }

  isOperator(character: string): boolean {
    if (!Number.isNaN(parseInt(character))) {
      return false;
    }

    const operators = Object.keys(BrowserOperatorKey).filter((value) => {
      return Number.isNaN(parseInt(value));
    });

    return operators.includes(character);
  }

  isValidNumber(string: string): boolean {
    let canNumber = true;

    const floatNumber = parseFloat(string);
    canNumber = !Number.isNaN(floatNumber);

    if (2 < string.split(".").length) {
      return false;
    }

    return canNumber;
  }

  trimNumber(string: string): string {
    const intNumber = parseInt(string);

    if (!string.includes(".")) {
      return intNumber.toString();
    }

    const floatNumber = parseFloat(string);

    if (intNumber === floatNumber) {
      return string;
    }

    return Number.isInteger(floatNumber)
      ? intNumber.toString()
      : floatNumber.toString();
  }
}
