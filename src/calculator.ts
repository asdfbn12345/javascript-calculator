import { Expression } from "./interfaces/interfaces.js";
import { Operator } from "./types/types.js";
import { OperatorPrecedence } from "./types/constants.js";

export function calculate(expression: Expression): number | undefined {
  if (expression.operands.length === 0) {
    return undefined;
  }

  const operandStack: number[] = [];
  const operatorStack: Operator[] = [];
  const infixExpression: (number | Operator)[] =
    createInfixExpression(expression);

  infixExpression.forEach((element) => {
    if (typeof element === "number") {
      operandStack.push(element);
      return;
    }

    const currentOperator = element;

    while (true) {
      if (operatorStack.length === 0) {
        operatorStack.push(currentOperator);
        break;
      }

      const topOperatorPrecedence = getTopOperatorPrecedence(operatorStack);
      const currentOperatorPrecedence = OperatorPrecedence[currentOperator];

      if (currentOperatorPrecedence < topOperatorPrecedence) {
        operatorStack.push(currentOperator);
        break;
      }

      const b = operandStack.pop();
      const a = operandStack.pop();
      const result = tryCalculateByOperator(a, b, operatorStack.pop());

      if (result === undefined) {
        break;
      }

      operandStack.push(result);
    }
  });

  while (operandStack.length !== 1) {
    const b = operandStack.pop();
    const a = operandStack.pop();
    const result = tryCalculateByOperator(a, b, operatorStack.pop());

    if (result === undefined) {
      break;
    }

    operandStack.push(result);
  }

  return operandStack[0];
}

function createInfixExpression(expression: Expression): (number | Operator)[] {
  const mergedExpression: (number | Operator)[] = [];

  expression.operands.forEach((operand, index) => {
    mergedExpression.push(parseFloat(operand));
    const operator = expression.operators[index];
    if (operator !== undefined) {
      mergedExpression.push(expression.operators[index]);
    }
  });

  return mergedExpression;
}

function tryCalculateByOperator(
  a?: number,
  b?: number,
  operator?: Operator
): number | undefined {
  if (a === undefined || b === undefined || operator === undefined) {
    return undefined;
  }

  switch (operator) {
    case "*":
      return a * b;
    case "/":
      return a / b;
    case "+":
      return a + b;
    case "-":
      return a - b;
  }
}

function getTopOperatorPrecedence(operatorStack: Operator[]): number {
  if (operatorStack.length === 0) {
    return Infinity;
  }

  const lastOperatorIndex = operatorStack.length - 1;
  const topOperatorPrecedence =
    OperatorPrecedence[operatorStack[lastOperatorIndex]];

  return topOperatorPrecedence;
}
