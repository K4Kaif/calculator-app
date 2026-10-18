import { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("0");
  const [firstNumber, setFirstNumber] = useState(null);
  const [operator, setOperator] = useState(null);
  const [startNew, setStartNew] = useState(false);

  function calculate(a, b, op) {
    let result;
    if (op === "+") result = a + b;
    if (op === "-") result = a - b;
    if (op === "×") result = a * b;
    if (op === "÷") {
      if (b === 0) return "Error";
      result = a / b;
    }
    return parseFloat(result.toFixed(10));
  }

  function pressNumber(digit) {
    if (display === "0" || display === "Error" || startNew) {
      setDisplay(digit);
      setStartNew(false);
    } else {
      setDisplay(display + digit);
    }
  }

  function pressDot() {
    if (startNew || display === "Error") {
      setDisplay("0.");
      setStartNew(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  }

  function pressOperator(op) {
    if (display === "Error") return;
    if (operator && !startNew) {
      const result = calculate(firstNumber, Number(display), operator);
      setDisplay(String(result));
      setFirstNumber(result === "Error" ? null : result);
    } else {
      setFirstNumber(Number(display));
    }
    setOperator(op);
    setStartNew(true);
  }

  function pressEquals() {
    if (!operator) return;
    const result = calculate(firstNumber, Number(display), operator);
    setDisplay(String(result));
    setFirstNumber(null);
    setOperator(null);
    setStartNew(true);
  }

  function pressClear() {
    setDisplay("0");
    setFirstNumber(null);
    setOperator(null);
    setStartNew(false);
  }

  const buttons = [
    { label: "7", action: () => pressNumber("7") },
    { label: "8", action: () => pressNumber("8") },
    { label: "9", action: () => pressNumber("9") },
    { label: "÷", action: () => pressOperator("÷"), type: "op" },
    { label: "4", action: () => pressNumber("4") },
    { label: "5", action: () => pressNumber("5") },
    { label: "6", action: () => pressNumber("6") },
    { label: "×", action: () => pressOperator("×"), type: "op" },
    { label: "1", action: () => pressNumber("1") },
    { label: "2", action: () => pressNumber("2") },
    { label: "3", action: () => pressNumber("3") },
    { label: "-", action: () => pressOperator("-"), type: "op" },
    { label: "0", action: () => pressNumber("0") },
    { label: ".", action: pressDot },
    { label: "=", action: pressEquals, type: "equals" },
    { label: "+", action: () => pressOperator("+"), type: "op" },
  ];

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <button className="clear" onClick={pressClear}>
        C
      </button>
      <div className="buttons">
        {buttons.map((b) => (
          <button key={b.label} className={b.type} onClick={b.action}>
            {b.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
