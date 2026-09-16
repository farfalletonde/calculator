import { useEffect } from "react";

type Handlers = {
  loading: boolean;
  input: (digit: string) => void;
  setOp: (op: string) => void;
  applyUnary: (op: string) => Promise<void>;
  backspace: () => void;
  clear: () => void;
  equals: () => Promise<void>;
};

const binaryOps: Record<string, string> = {
  "+": "add",
  "-": "subtract",
  "*": "multiply",
  "/": "divide",
  "%": "mod",
  "^": "pow",
};

const unaryOps: Record<string, string> = {
  r: "sqrt",
  q: "sqr",
  b: "cube",
  i: "recip",
  "|": "abs",
  n: "negate",
};

export const useCalculatorKeyboard = ({
  loading,
  input,
  setOp,
  applyUnary,
  backspace,
  clear,
  equals,
}: Handlers) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (loading) return;

      if (e.key >= "0" && e.key <= "9") {
        input(e.key);
        return;
      }

      if (binaryOps[e.key]) {
        e.preventDefault();
        setOp(binaryOps[e.key]);
        return;
      }

      if (unaryOps[e.key]) {
        e.preventDefault();
        void applyUnary(unaryOps[e.key]);
        return;
      }

      if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        void equals();
        return;
      }

      if (e.key === "Backspace") {
        e.preventDefault();
        backspace();
        return;
      }

      if (e.key === "Escape" || e.key === "c" || e.key === "C") {
        clear();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [loading, input, setOp, applyUnary, backspace, clear, equals]);
};
