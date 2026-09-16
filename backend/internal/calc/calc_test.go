package calc

import (
	"errors"
	"testing"
)

func TestAdd(t *testing.T) {
	got := Add(2, 3)
	if got != 5 {
		t.Errorf("want 5, got %v", got)
	}
}

func TestSubtract(t *testing.T) {
	got := Subtract(5, 3)
	if got != 2 {
		t.Errorf("want 2, got %v", got)
	}
}

func TestMultiply(t *testing.T) {
	got := Multiply(2, 3)
	if got != 6 {
		t.Errorf("want 6, got %v", got)
	}
}

func TestDivide(t *testing.T) {
	got, err := Divide(6, 3)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if got != 2 {
		t.Errorf("want 2, got %v", got)
	}
}

func TestDivideByZero(t *testing.T) {
	_, err := Divide(1, 0)
	if !errors.Is(err, ErrDivideByZero) {
		t.Fatalf("want ErrDivideByZero, got %v", err)
	}
}
