import { useCalculator } from "./hooks/useCalculator";
import { useCalculatorKeyboard } from "./hooks/useCalculatorKeyboard";

type Key =
  | { kind: "digit"; value: string }
  | { kind: "op"; value: string; label: string }
  | { kind: "unary"; value: string; label: string }
  | { kind: "backspace" }
  | { kind: "clear" }
  | { kind: "equals" };

type KeyDef = {
  key: Key;
  span?: 2;
};

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

const rows: KeyDef[][] = [
  [
    { key: { kind: "clear" } },
    { key: { kind: "backspace" } },
    { key: { kind: "op", value: "mod", label: "%" } },
    { key: { kind: "op", value: "pow", label: "^" } },
  ],
  [
    { key: { kind: "unary", value: "sqrt", label: "√" } },
    { key: { kind: "unary", value: "sqr", label: "x²" } },
    { key: { kind: "unary", value: "cube", label: "x³" } },
    { key: { kind: "unary", value: "recip", label: "1/x" } },
  ],
  [
    { key: { kind: "unary", value: "abs", label: "|x|" }, span: 2 },
    { key: { kind: "unary", value: "negate", label: "±" }, span: 2 },
  ],
  [
    { key: { kind: "digit", value: "7" } },
    { key: { kind: "digit", value: "8" } },
    { key: { kind: "digit", value: "9" } },
    { key: { kind: "op", value: "divide", label: "÷" } },
  ],
  [
    { key: { kind: "digit", value: "4" } },
    { key: { kind: "digit", value: "5" } },
    { key: { kind: "digit", value: "6" } },
    { key: { kind: "op", value: "multiply", label: "×" } },
  ],
  [
    { key: { kind: "digit", value: "1" } },
    { key: { kind: "digit", value: "2" } },
    { key: { kind: "digit", value: "3" } },
    { key: { kind: "op", value: "subtract", label: "−" } },
  ],
  [
    { key: { kind: "digit", value: "0" }, span: 2 },
    { key: { kind: "equals" } },
    { key: { kind: "op", value: "add", label: "+" } },
  ],
];

const keyId = (key: Key) => {
  if (key.kind === "digit") return `d-${key.value}`;
  if (key.kind === "op" || key.kind === "unary") return key.value;
  return key.kind;
};

const ariaLabel = (key: Key) => {
  if (key.kind === "digit") return key.value;
  if (key.kind === "op" || key.kind === "unary") return key.value;
  if (key.kind === "backspace") return "backspace";
  if (key.kind === "clear") return "clear";
  return "equals";
};

const keyText = (key: Key) => {
  if (key.kind === "digit") return key.value;
  if (key.kind === "op" || key.kind === "unary") return key.label;
  if (key.kind === "backspace") return "⌫";
  if (key.kind === "clear") return "C";
  return "=";
};

export const Calculator = () => {
  const {
    display,
    pendingOp,
    loading,
    error,
    input,
    setOp,
    backspace,
    clear,
    equals,
    applyUnary,
  } = useCalculator();

  const activeOp = pendingOp ? opSymbols[pendingOp] : "";

  useCalculatorKeyboard({
    loading,
    input,
    setOp,
    applyUnary,
    backspace,
    clear,
    equals,
  });

  const press = (key: Key) => {
    if (loading) return;
    if (key.kind === "digit") input(key.value);
    if (key.kind === "op") setOp(key.value);
    if (key.kind === "unary") void applyUnary(key.value);
    if (key.kind === "backspace") backspace();
    if (key.kind === "clear") clear();
    if (key.kind === "equals") void equals();
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

      <div className="flex flex-col gap-2">
        {rows.map((row, i) => (
          <div key={i} className="grid grid-cols-4 gap-2">
            {row.map(({ key, span }) => (
              <button
                key={keyId(key)}
                type="button"
                aria-label={ariaLabel(key)}
                disabled={loading}
                onClick={() => press(key)}
                className={`rounded-lg py-3 text-lg disabled:cursor-not-allowed disabled:opacity-50 ${span === 2 ? "col-span-2" : ""} ${btnClass(key)}`}
              >
                {keyText(key)}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
