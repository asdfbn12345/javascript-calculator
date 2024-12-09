import { Expression } from "./interfaces/interfaces.js";
import { BrowserOperatorKey } from "./types/enums.js";
import { ExpressionOperators } from "./types/types.js";

export function calculate(expression: Expression): number {
  let result: number;
  const operatorStack: BrowserOperatorKey[] = [];
  const operandStack: number[] = [];
  const mergedExpression = mergeExpression(expression);

  mergedExpression.forEach((element) => {
    if (!isOperator(element)) {
      operandStack.push(parseFloat(element));
    } else {
      if (operatorStack.length === 0) {
        operatorStack.push(element as unknown as BrowserOperatorKey);
      } else {
        const operator = element as unknown as BrowserOperatorKey;
        if (operatorStack[operatorStack.length - 1] > operator) {
          operatorStack.push(operator);
        } else {
          while (
            operatorStack.length !== 0 ||
            operatorStack[operatorStack.length - 1] <= operator
          ) {
            const A = operandStack.pop();
            const B = operandStack.pop();
            const temp4 = operatorStack.pop();
            let temp5: number = 0;
            if (A !== undefined && B !== undefined) {
              switch (temp4) {
                case BrowserOperatorKey["*"]:
                  temp5 = A * B;
                  break;
                case BrowserOperatorKey["/"]:
                  temp5 = A / B;
                  break;
                case BrowserOperatorKey["+"]:
                  temp5 = A + B;
                  break;
                case BrowserOperatorKey["-"]:
                  temp5 = A - B;
                  break;
              }
            }

            operandStack.push(temp5);
          }
        }
      }
    }
  });
  const temp3 = operandStack.pop();
  if (temp3 !== undefined) {
    result = temp3;
  } else {
    result = 0;
  }
  return result;
}

function mergeExpression(expression: Expression): string[] {
  const mergedExpression: string[] = [];
  expression.operands.forEach((operand, index) => {
    mergedExpression.push(operand);
    const operator = expression.operators[index];
    if (operator !== undefined) {
      mergedExpression.push(expression.operators[index]);
    }
  });

  return mergedExpression;
}

function isOperator(character: string): boolean {
  if (character.length !== 1) {
    return false;
  }
  if (!Number.isNaN(parseInt(character))) {
    return false;
  }

  const operators = Object.keys(BrowserOperatorKey).filter((value) => {
    return Number.isNaN(parseInt(value));
  });

  return operators.includes(character);
}
