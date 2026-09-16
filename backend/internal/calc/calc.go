package calc

import "errors"

func Add(a, b int) int {
	return a + b
}

func Subtract(a, b int) int {
	return a - b
}

func Multiply(a, b int) int {
	return a * b
}

func Divide(a, b int) (int, error) {
	if b == 0 {
		return 0, errors.New("divide by zero")
	}
	return a / b, nil
}

func Mod(a, b int) (int, error) {
	if b == 0 {
		return 0, errors.New("mod by zero")
	}
	return a % b, nil
}

func Pow(a, b int) (int, error) {
	if b < 0 {
		return 0, errors.New("negative exponent")
	}
	n := 1
	for i := 0; i < b; i++ {
		n *= a
	}
	return n, nil
}

func Abs(n int) int {
	if n < 0 {
		return -n
	}
	return n
}

func Negate(n int) int {
	return -n
}

func Sqr(n int) int {
	return n * n
}

func Sqrt(n int) (int, error) {
	if n < 0 {
		return 0, errors.New("negative square root")
	}
	r := 0
	for (r+1)*(r+1) <= n {
		r++
	}
	return r, nil
}

func Cube(n int) int {
	return n * n * n
}

func Recip(n int) (int, error) {
	if n == 0 {
		return 0, errors.New("divide by zero")
	}
	return 1 / n, nil
}

func Run(op string, a, b int) (float64, error) {
	switch op {
	case "add":
		return float64(Add(a, b)), nil
	case "subtract":
		return float64(Subtract(a, b)), nil
	case "multiply":
		return float64(Multiply(a, b)), nil
	case "divide":
		n, err := Divide(a, b)
		return float64(n), err
	case "mod":
		n, err := Mod(a, b)
		return float64(n), err
	case "pow":
		n, err := Pow(a, b)
		return float64(n), err
	case "abs":
		return float64(Abs(a)), nil
	case "negate":
		return float64(Negate(a)), nil
	case "sqr":
		return float64(Sqr(a)), nil
	case "sqrt":
		n, err := Sqrt(a)
		return float64(n), err
	case "cube":
		return float64(Cube(a)), nil
	case "recip":
		n, err := Recip(a)
		return float64(n), err
	case "floatdiv":
		return float64(a) / float64(b), nil
	default:
		return 0, errors.New("unknown operation")
	}
}
