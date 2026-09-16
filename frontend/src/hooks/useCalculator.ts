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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetStatus = () => {
    setLoading(false);
    setError(null);
  };

  const input = (digit: string) => {
    setError(null);
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
    setError(null);
    setState(({ display, firstNumber }) => ({
      display,
      firstNumber: firstNumber ?? Number(display),
      pendingOp: op,
    }));
  };

  const clear = () => {
    setState(initialState);
    resetStatus();
  };

  const equals = async () => {
    const { pendingOp, firstNumber, display } = state;
    if (!pendingOp || firstNumber === null || loading) return;

    setLoading(true);
    setError(null);

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
      const message = err instanceof Error ? err.message : "error";
      setError(message);
      setState({
        display: message,
        firstNumber: null,
        pendingOp: null,
      });
    } finally {
      setLoading(false);
    }
  };

  const applyUnary = async (op: string) => {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const { result } = await calculate({
        operation: op,
        a: Number(state.display),
        b: 0,
      });
      setState({
        display: String(result),
        firstNumber: result,
        pendingOp: null,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "error";
      setError(message);
      setState({
        display: message,
        firstNumber: null,
        pendingOp: null,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    display: state.display,
    pendingOp: state.pendingOp,
    loading,
    error,
    input,
    setOp,
    clear,
    equals,
    applyUnary,
  };
};
