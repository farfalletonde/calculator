import { useState } from "react";
import { calculate as defaultCalculate } from "../api/calculate";

type State = {
  display: string;
  firstNumber: number | null;
  pendingOp: string | null;
};

const initialState: State = {
  display: "0",
  firstNumber: null,
  pendingOp: null,
};

export const useCalculator = (calculate = defaultCalculate) => {
  const [state, setState] = useState(initialState);

  const input = (digit: string) => {
    setState(({ display, firstNumber, pendingOp }) => {
      const startingSecondNumber =
        pendingOp !== null && display === String(firstNumber);
      const replace =
        startingSecondNumber ||
        display === "0" ||
        Number.isNaN(Number(display));

      return {
        firstNumber,
        pendingOp,
        display: replace ? digit : display + digit,
      };
    });
  };

  const setOp = (op: string) => {
    setState(({ display, firstNumber }) => ({
      display,
      firstNumber: firstNumber ?? Number(display),
      pendingOp: op,
    }));
  };

  const clear = () => setState(initialState);

  const equals = async () => {
    const { pendingOp, firstNumber, display } = state;
    if (!pendingOp || firstNumber === null) return;

    try {
      const { result } = await calculate({
        operation: pendingOp,
        a: firstNumber,
        b: Number(display),
      });
      setState({
        display: String(result),
        firstNumber: result,
        pendingOp: null,
      });
    } catch (err) {
      setState({
        display: err instanceof Error ? err.message : "error",
        firstNumber: null,
        pendingOp: null,
      });
    }
  };

  return {
    display: state.display,
    input,
    setOp,
    clear,
    equals,
  };
};
