import { BrowserOperatorKey, Notation } from "./types/enums.js";
import { ExpressionManager } from "./classes/expressionManager.js";
import { ExpressionCharacters } from "./types/types.js";

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
  inputScreen.innerHTML = expressionManager.getExpressionString(Notation.Infix);
}

function onClickAllClear(event: MouseEvent): void {
  expressionManager.reset();
  inputScreen.innerHTML = "";
  outputScreen.innerHTML = "";
}

function onClickNumberButton(event: MouseEvent): void {
  const currentElement = event.currentTarget as HTMLElement;
  expressionManager.addCharacter(
    currentElement.innerHTML as ExpressionCharacters
  );
  inputScreen.innerHTML = expressionManager.getExpressionString(Notation.Infix);
}

function onClickPointButton(event: MouseEvent): void {
  const currentElement = event.currentTarget as HTMLElement;
  expressionManager.addCharacter(
    currentElement.innerHTML as ExpressionCharacters
  );
  inputScreen.innerHTML = expressionManager.getExpressionString(Notation.Infix);
}

function onClickOperatorButton(event: MouseEvent): void {
  const currentElement = event.currentTarget as HTMLElement;
  const operator = currentElement.ariaLabel;
  if (operator === null) {
    return;
  }
  expressionManager.addCharacter(operator as ExpressionCharacters);
  inputScreen.innerHTML = expressionManager.getExpressionString(Notation.Infix);
}

function onClickEquals(event: MouseEvent): void {
  // TODO: 구현
  // outputScreen.innerHTML = calculate();
}

function onKeyDownInput(event: KeyboardEvent): void {
  const isNumber = "0" <= event.key && event.key <= "9";
  const isOperator = Object.keys(BrowserOperatorKey).includes(event.key);
  const isPoint = event.key === ".";
  const isBackspace = event.key === "Backspace";
  const isEquals = event.key === "=";

  if (isNumber || isOperator || isPoint) {
    expressionManager.addCharacter(event.key as ExpressionCharacters);
  } else if (isBackspace) {
    expressionManager.deleteCharacter();
  }
  inputScreen.innerHTML = expressionManager.getExpressionString(Notation.Infix);

  if (isEquals) {
    // TODO: 구현
  }
}
