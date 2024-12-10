import { Expression } from "./interfaces/interfaces.js";
import { BrowserOperatorKey } from "./types/enums.js";
import { ExpressionOperators } from "./types/types.js";

export function calculate(expression: Expression): number {
  let result: number;
  const operatorStack: BrowserOperatorKey[] = [];
  const operandStack: number[] = [];
  const mergedExpression = mergeExpression(expression);

  mergedExpression.forEach((element) => {
    if (isNumber(element)) {
      operandStack.push(parseFloat(element));
      return;
    }

    if (operatorStack.length === 0) {
      operatorStack.push(element as unknown as BrowserOperatorKey);
      return;
    }

    const currentOperator = element as unknown as BrowserOperatorKey;
    if (isBbiggerthen(operatorStack[operatorStack.length - 1].toString(),currentOperator.toString())) {
      operatorStack.push(currentOperator);
      return;
    }

    while (
      operandStack.length > 1 ||
      operatorStack.length > 0 ||
      !isBbiggerthen(operatorStack[operatorStack.length - 1].toString(),currentOperator.toString())
    ) {
      const a = operandStack.pop() as number;
      const b = operandStack.pop() as number;
      const storedOpearator = operatorStack.pop() as BrowserOperatorKey;
      let result = calculateByOperator(a, b, storedOpearator);
      if (result === undefined) {
        continue;
      }
      operandStack.push(result);
    }

    if (isBbiggerthen(operatorStack[operatorStack.length - 1].toString(),currentOperator.toString())) {
      operatorStack.push(currentOperator);
      return;
    }
  });

  while (
    operandStack.length !== 1 ||
    operatorStack.length !== 0
  ) {
    const a = operandStack.pop() as number;
    const b = operandStack.pop() as number;
    const storedOpearator = operatorStack.pop() as BrowserOperatorKey;
    let result = calculateByOperator(a, b, storedOpearator);
    if (result === undefined) {
      continue;
    }
    operandStack.push(result);
  }

  result = operandStack.pop() as number;
  if (result === undefined) {
    return 0;
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

function isNumber(character: string): boolean {
  const floatNumber = parseFloat(character);
  return !Number.isNaN(floatNumber);
}
function calculateByOperator(
  a: number,
  b: number,
  operator: BrowserOperatorKey
): number | undefined {
  let result: number;
  if (a === undefined && b === undefined) {
    return undefined;
  }

  if (operator.toString() === "*") {
    result = a * b;
  }
  else if(operator.toString() === "/"){
    result = a / b;
  }else if (operator.toString() === "+") {
    result = a + b;
  }else if(operator.toString() === "-"){
    result = a - b;
  }
else{
  result =0;
}
/*
  switch (operator) {
    case BrowserOperatorKey["*"]:
    case BrowserOperatorKey["/"]:
      if (operator.toString() === "*") {
        result = a * b;
        break;
      }
      result = a / b;
      break;
    case BrowserOperatorKey["+"]:
    case BrowserOperatorKey["-"]:
      if (operator.toString() === "+") {
        result = a + b;
        break;
      }
      result = a - b;
      break;
    default:
      result = 0;
      break;
  }
*/
  return result;
}

function isBbiggerthen (storedOperator : string, currentOperator:string):boolean{

  let result : boolean = false;
  let temp1 :number =2;
  let temp2 : number = 2;
  if(storedOperator ==="*" || currentOperator==="/")
  {
    temp1 = 0;
  }
  else if(storedOperator==="+" || storedOperator ==="-"){
    temp1 = 1;
  }

  if(currentOperator ==="*" || currentOperator==="/")
    {
      temp2 = 0;
    }
    else if(currentOperator==="+" || currentOperator ==="-"){
      temp2 = 1;
    }

    if(temp1>temp2){
      return true;
    }
    else{
      return false;
    }
  
}