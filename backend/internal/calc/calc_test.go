package calc

import "testing"

func TestAdd(t *testing.T) {
	tests := []struct{ a, b, want int }{
		{2, 3, 5},
		{-2, 5, 3},
		{0, 0, 0},
	}
	for _, tt := range tests {
		if got := Add(tt.a, tt.b); got != tt.want {
			t.Errorf("Add(%d, %d) = %d, want %d", tt.a, tt.b, got, tt.want)
		}
	}
}

func TestSubtract(t *testing.T) {
	tests := []struct{ a, b, want int }{
		{5, 3, 2},
		{3, 5, -2},
		{0, 0, 0},
	}
	for _, tt := range tests {
		if got := Subtract(tt.a, tt.b); got != tt.want {
			t.Errorf("Subtract(%d, %d) = %d, want %d", tt.a, tt.b, got, tt.want)
		}
	}
}

func TestMultiply(t *testing.T) {
	tests := []struct{ a, b, want int }{
		{2, 3, 6},
		{-2, 3, -6},
		{0, 9, 0},
	}
	for _, tt := range tests {
		if got := Multiply(tt.a, tt.b); got != tt.want {
			t.Errorf("Multiply(%d, %d) = %d, want %d", tt.a, tt.b, got, tt.want)
		}
	}
}

func TestDivide(t *testing.T) {
	tests := []struct {
		a, b, want int
		wantErr    bool
	}{
		{6, 3, 2, false},
		{5, 2, 2, false},
		{-9, 3, -3, false},
		{1, 0, 0, true},
	}
	for _, tt := range tests {
		got, err := Divide(tt.a, tt.b)
		if (err != nil) != tt.wantErr {
			t.Errorf("Divide(%d, %d) err = %v, wantErr = %v", tt.a, tt.b, err, tt.wantErr)
			continue
		}
		if got != tt.want {
			t.Errorf("Divide(%d, %d) = %d, want %d", tt.a, tt.b, got, tt.want)
		}
	}
}

func TestMod(t *testing.T) {
	tests := []struct {
		a, b, want int
		wantErr    bool
	}{
		{7, 3, 1, false},
		{8, 2, 0, false},
		{1, 0, 0, true},
	}
	for _, tt := range tests {
		got, err := Mod(tt.a, tt.b)
		if (err != nil) != tt.wantErr {
			t.Errorf("Mod(%d, %d) err = %v, wantErr = %v", tt.a, tt.b, err, tt.wantErr)
			continue
		}
		if got != tt.want {
			t.Errorf("Mod(%d, %d) = %d, want %d", tt.a, tt.b, got, tt.want)
		}
	}
}

func TestPow(t *testing.T) {
	tests := []struct {
		a, b, want int
		wantErr    bool
	}{
		{2, 3, 8, false},
		{5, 0, 1, false},
		{2, -1, 0, true},
	}
	for _, tt := range tests {
		got, err := Pow(tt.a, tt.b)
		if (err != nil) != tt.wantErr {
			t.Errorf("Pow(%d, %d) err = %v, wantErr = %v", tt.a, tt.b, err, tt.wantErr)
			continue
		}
		if got != tt.want {
			t.Errorf("Pow(%d, %d) = %d, want %d", tt.a, tt.b, got, tt.want)
		}
	}
}

func TestAbs(t *testing.T) {
	tests := []struct{ n, want int }{
		{5, 5},
		{-5, 5},
		{0, 0},
	}
	for _, tt := range tests {
		if got := Abs(tt.n); got != tt.want {
			t.Errorf("Abs(%d) = %d, want %d", tt.n, got, tt.want)
		}
	}
}

func TestNegate(t *testing.T) {
	tests := []struct{ n, want int }{
		{5, -5},
		{-5, 5},
		{0, 0},
	}
	for _, tt := range tests {
		if got := Negate(tt.n); got != tt.want {
			t.Errorf("Negate(%d) = %d, want %d", tt.n, got, tt.want)
		}
	}
}

func TestSqr(t *testing.T) {
	tests := []struct{ n, want int }{
		{3, 9},
		{-4, 16},
		{0, 0},
	}
	for _, tt := range tests {
		if got := Sqr(tt.n); got != tt.want {
			t.Errorf("Sqr(%d) = %d, want %d", tt.n, got, tt.want)
		}
	}
}

func TestSqrt(t *testing.T) {
	tests := []struct {
		n, want int
		wantErr bool
	}{
		{9, 3, false},
		{10, 3, false},
		{0, 0, false},
		{-1, 0, true},
	}
	for _, tt := range tests {
		got, err := Sqrt(tt.n)
		if (err != nil) != tt.wantErr {
			t.Errorf("Sqrt(%d) err = %v, wantErr = %v", tt.n, err, tt.wantErr)
			continue
		}
		if got != tt.want {
			t.Errorf("Sqrt(%d) = %d, want %d", tt.n, got, tt.want)
		}
	}
}

func TestCube(t *testing.T) {
	tests := []struct{ n, want int }{
		{2, 8},
		{-3, -27},
		{0, 0},
	}
	for _, tt := range tests {
		if got := Cube(tt.n); got != tt.want {
			t.Errorf("Cube(%d) = %d, want %d", tt.n, got, tt.want)
		}
	}
}

func TestRecip(t *testing.T) {
	tests := []struct {
		n, want int
		wantErr bool
	}{
		{2, 0, false},
		{-4, 0, false},
		{1, 1, false},
		{0, 0, true},
	}
	for _, tt := range tests {
		got, err := Recip(tt.n)
		if (err != nil) != tt.wantErr {
			t.Errorf("Recip(%d) err = %v, wantErr = %v", tt.n, err, tt.wantErr)
			continue
		}
		if got != tt.want {
			t.Errorf("Recip(%d) = %d, want %d", tt.n, got, tt.want)
		}
	}
}
