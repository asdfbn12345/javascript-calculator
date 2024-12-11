import { Notation } from "./types/enums.js";
import { ExpressionManager } from "./classes/expressionManager.js";
import { ExpressionCharacter } from "./types/types.js";
import {
  isBackspace,
  isDigitNumber,
  isEquals,
  isOperator,
  isPoint,
} from "./utilities.js";
import { calculate } from "./calculator.js";

const inputScreen = document.getElementsByClassName("input_screen")[0];
const outputScreen = document.getElementsByClassName("output_screen")[0];
const expressionManager = new ExpressionManager();
initInputEventListener();

function initInputEventListener(): void {
  initMouseEventListener();
  initKeyboardEventListener();
}

function initMouseEventListener(): void {
  document
    .getElementById("backspace")
    ?.addEventListener("click", onClickBackspace);
  document
    .getElementById("all-clear")
    ?.addEventListener("click", onClickAllClear);
  document
    .getElementById("point")
    ?.addEventListener("click", onClickPointButton);
  document.getElementById("equals")?.addEventListener("click", onClickEquals);
  const operatorButtons = document.getElementsByClassName("operator");
  for (let i = 0; i < operatorButtons.length; ++i) {
    (operatorButtons.item(i) as HTMLElement)?.addEventListener(
      "click",
      onClickOperatorButton
    );
  }
  const numberButtons = document.getElementsByClassName("number");
  for (let i = 0; i < numberButtons.length; ++i) {
    (numberButtons.item(i) as HTMLElement)?.addEventListener(
      "click",
      onClickNumberButton
    );
  }
}

function initKeyboardEventListener(): void {
  window.addEventListener("keydown", onKeyDownInput);
}

function onClickBackspace(event: MouseEvent): void {
  expressionManager.deleteCharacter();
  inputScreen.innerHTML = expressionManager.getExpression(Notation.Infix);
}

function onClickAllClear(event: MouseEvent): void {
  expressionManager.reset();
  inputScreen.innerHTML = "";
  outputScreen.innerHTML = "";
}

function onClickNumberButton(event: MouseEvent): void {
  const currentElement = event.currentTarget as HTMLElement;
  expressionManager.addCharacter(
    currentElement.innerHTML as ExpressionCharacter
  );
  inputScreen.innerHTML = expressionManager.getExpression(Notation.Infix);
}

function onClickPointButton(event: MouseEvent): void {
  const currentElement = event.currentTarget as HTMLElement;
  expressionManager.addCharacter(
    currentElement.innerHTML as ExpressionCharacter
  );
  inputScreen.innerHTML = expressionManager.getExpression(Notation.Infix);
}

function onClickOperatorButton(event: MouseEvent): void {
  const currentElement = event.currentTarget as HTMLElement;
  const operator = currentElement.ariaLabel;
  if (operator === null) {
    return;
  }
  expressionManager.addCharacter(operator as ExpressionCharacter);
  inputScreen.innerHTML = expressionManager.getExpression(Notation.Infix);
}

function onClickEquals(event: MouseEvent): void {
  calculateExpression();
}

function onKeyDownInput(event: KeyboardEvent): void {
  if (isDigitNumber(event.key) || isOperator(event.key) || isPoint(event.key)) {
    expressionManager.addCharacter(event.key as ExpressionCharacter);
  } else if (isBackspace(event.key)) {
    expressionManager.deleteCharacter();
  } else if (isEquals(event.key)) {
    calculateExpression();
    return;
  }

  inputScreen.innerHTML = expressionManager.getExpression(Notation.Infix);
}

function calculateExpression() {
  const result = calculate(expressionManager.expression);
  if (result === undefined) {
    outputScreen.innerHTML = "";
    return;
  }
  outputScreen.innerHTML = Number.isInteger(result)
    ? result.toString()
    : result.toFixed(2);
}
