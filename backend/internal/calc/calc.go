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
