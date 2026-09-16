import { useCalculator } from './hooks/useCalculator'

type Key =
  | { kind: 'digit'; value: string }
  | { kind: 'op'; value: string; label: string }
  | { kind: 'clear' }
  | { kind: 'equals' }

const keys: Key[] = [
  { kind: 'digit', value: '7' },
  { kind: 'digit', value: '8' },
  { kind: 'digit', value: '9' },
  { kind: 'op', value: 'divide', label: '÷' },
  { kind: 'digit', value: '4' },
  { kind: 'digit', value: '5' },
  { kind: 'digit', value: '6' },
  { kind: 'op', value: 'multiply', label: '×' },
  { kind: 'digit', value: '1' },
  { kind: 'digit', value: '2' },
  { kind: 'digit', value: '3' },
  { kind: 'op', value: 'subtract', label: '−' },
  { kind: 'clear' },
  { kind: 'digit', value: '0' },
  { kind: 'equals' },
  { kind: 'op', value: 'add', label: '+' },
]

export const Calculator = () => {
  const { display, input, setOp, clear, equals } = useCalculator()

  const onKey = (key: Key) => {
    if (key.kind === 'digit') input(key.value)
    if (key.kind === 'op') setOp(key.value)
    if (key.kind === 'clear') clear()
    if (key.kind === 'equals') void equals()
  }

  const label = (key: Key) => {
    if (key.kind === 'digit') return key.value
    if (key.kind === 'op') return key.value
    if (key.kind === 'clear') return 'clear'
    return 'equals'
  }

  const text = (key: Key) => {
    if (key.kind === 'digit') return key.value
    if (key.kind === 'op') return key.label
    if (key.kind === 'clear') return 'C'
    return '='
  }

  return (
    <div className="w-72 rounded-2xl bg-zinc-900 p-4 shadow-lg">
      <div
        aria-label="display"
        className="mb-4 overflow-hidden rounded-lg bg-zinc-950 px-4 py-6 text-right font-mono text-4xl text-zinc-100"
      >
        {display}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {keys.map((key) => (
          <button
            key={label(key)}
            type="button"
            aria-label={label(key)}
            onClick={() => onKey(key)}
            className={
              key.kind === 'op' || key.kind === 'equals'
                ? 'rounded-lg bg-amber-600 py-3 text-lg text-white hover:bg-amber-500'
                : 'rounded-lg bg-zinc-800 py-3 text-lg text-zinc-100 hover:bg-zinc-700'
            }
          >
            {text(key)}
          </button>
        ))}
      </div>
    </div>
  )
}
