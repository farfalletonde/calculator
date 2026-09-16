import { useCalculator } from "./hooks/useCalculator";

type Key =
  | { kind: "digit"; value: string }
  | { kind: "op"; value: string; label: string }
  | { kind: "unary"; value: string; label: string }
  | { kind: "clear" }
  | { kind: "equals" };

export const opSymbols: Record<string, string> = {
  add: "+",
  subtract: "−",
  multiply: "×",
  divide: "÷",
  mod: "%",
  pow: "^",
  sqrt: "√",
  sqr: "x²",
  cube: "x³",
  recip: "1/x",
  abs: "|x|",
  negate: "±",
};

const extraOps: Key[] = [
  { kind: "op", value: "mod", label: "%" },
  { kind: "op", value: "pow", label: "^" },
  { kind: "unary", value: "sqrt", label: "√" },
  { kind: "unary", value: "sqr", label: "x²" },
  { kind: "unary", value: "cube", label: "x³" },
  { kind: "unary", value: "recip", label: "1/x" },
  { kind: "unary", value: "abs", label: "|x|" },
  { kind: "unary", value: "negate", label: "±" },
];

const keys: Key[] = [
  { kind: "digit", value: "7" },
  { kind: "digit", value: "8" },
  { kind: "digit", value: "9" },
  { kind: "op", value: "divide", label: "÷" },
  { kind: "digit", value: "4" },
  { kind: "digit", value: "5" },
  { kind: "digit", value: "6" },
  { kind: "op", value: "multiply", label: "×" },
  { kind: "digit", value: "1" },
  { kind: "digit", value: "2" },
  { kind: "digit", value: "3" },
  { kind: "op", value: "subtract", label: "−" },
  { kind: "clear" },
  { kind: "digit", value: "0" },
  { kind: "equals" },
  { kind: "op", value: "add", label: "+" },
];

export const Calculator = () => {
  const {
    display,
    pendingOp,
    loading,
    error,
    input,
    setOp,
    clear,
    equals,
    applyUnary,
  } = useCalculator();

  const activeOp = pendingOp ? opSymbols[pendingOp] : "";

  const onKey = (key: Key) => {
    if (loading) return;
    if (key.kind === "digit") input(key.value);
    if (key.kind === "op") setOp(key.value);
    if (key.kind === "unary") void applyUnary(key.value);
    if (key.kind === "clear") clear();
    if (key.kind === "equals") void equals();
  };

  const label = (key: Key) => {
    if (key.kind === "digit") return key.value;
    if (key.kind === "op" || key.kind === "unary") return key.value;
    if (key.kind === "clear") return "clear";
    return "equals";
  };

  const text = (key: Key) => {
    if (key.kind === "digit") return key.value;
    if (key.kind === "op" || key.kind === "unary") return key.label;
    if (key.kind === "clear") return "C";
    return "=";
  };

  const btnClass = (key: Key) => {
    if (key.kind === "op" || key.kind === "equals") {
      if (key.kind === "op" && key.value === pendingOp) {
        return "bg-amber-400 text-zinc-950 ring-2 ring-amber-200";
      }
      return "bg-amber-600 text-white hover:bg-amber-500";
    }
    if (key.kind === "unary") {
      return "bg-zinc-700 text-zinc-100 hover:bg-zinc-600 text-sm";
    }
    return "bg-zinc-800 text-zinc-100 hover:bg-zinc-700";
  };

  return (
    <div className="w-72 rounded-2xl bg-zinc-900 p-4 shadow-lg">
      <div className="mb-4 rounded-lg bg-zinc-950 px-4 py-4">
        <div
          aria-label="expression"
          className="min-h-6 text-right font-mono text-sm text-zinc-500"
        >
          {activeOp}
        </div>
        <div
          aria-label="display"
          aria-busy={loading}
          className={`text-right font-mono ${
            error ? "text-base text-red-400" : "text-4xl text-zinc-100"
          }`}
        >
          {loading ? "..." : display}
        </div>
      </div>

      <div className="mb-2 grid grid-cols-4 gap-2">
        {extraOps.map((key) => (
          <button
            key={label(key)}
            type="button"
            aria-label={label(key)}
            disabled={loading}
            onClick={() => onKey(key)}
            className={`rounded-lg py-2 disabled:cursor-not-allowed disabled:opacity-50 ${btnClass(key)}`}
          >
            {text(key)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {keys.map((key) => (
          <button
            key={label(key)}
            type="button"
            aria-label={label(key)}
            disabled={loading}
            onClick={() => onKey(key)}
            className={`rounded-lg py-3 text-lg disabled:cursor-not-allowed disabled:opacity-50 ${btnClass(key)}`}
          >
            {text(key)}
          </button>
        ))}
      </div>
    </div>
  );
};
