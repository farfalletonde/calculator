package server

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestHealth(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/health", nil)
	rr := httptest.NewRecorder()

	New().ServeHTTP(rr, req)

	if rr.Code != http.StatusOK {
		t.Fatalf("got status %d, want 200", rr.Code)
	}

	var body map[string]string
	if err := json.NewDecoder(rr.Body).Decode(&body); err != nil {
		t.Fatalf("decode body: %v", err)
	}
	if body["status"] != "ok" {
		t.Fatalf("got body %v, want {\"status\":\"ok\"}", body)
	}
}

func TestCalculateAdd(t *testing.T) {
	body := bytes.NewBufferString(`{"operation":"add","a":2,"b":3}`)
	req := httptest.NewRequest(http.MethodPost, "/calculate", body)
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()

	New().ServeHTTP(rr, req)

	if rr.Code != http.StatusOK {
		t.Fatalf("got status %d, want 200", rr.Code)
	}

	var resp struct {
		Result int `json:"result"`
	}
	if err := json.NewDecoder(rr.Body).Decode(&resp); err != nil {
		t.Fatalf("decode body: %v", err)
	}
	if resp.Result != 5 {
		t.Fatalf("got result %d, want 5", resp.Result)
	}
}

func TestCalculateBadJSON(t *testing.T) {
	req := httptest.NewRequest(http.MethodPost, "/calculate", bytes.NewBufferString(`{nope`))
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()

	New().ServeHTTP(rr, req)

	if rr.Code != http.StatusBadRequest {
		t.Fatalf("got status %d, want 400", rr.Code)
	}
}

func TestCalculateUnknownOperation(t *testing.T) {
	req := httptest.NewRequest(http.MethodPost, "/calculate", bytes.NewBufferString(`{"operation":"foobar","a":1,"b":2}`))
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()

	New().ServeHTTP(rr, req)

	if rr.Code != http.StatusBadRequest {
		t.Fatalf("got status %d, want 400", rr.Code)
	}
	if !strings.Contains(rr.Body.String(), "unknown operation") {
		t.Fatalf("got body %q, want message about unknown operation", rr.Body.String())
	}
}

func TestCalculateDivideByZero(t *testing.T) {
	req := httptest.NewRequest(http.MethodPost, "/calculate", bytes.NewBufferString(`{"operation":"divide","a":1,"b":0}`))
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()

	New().ServeHTTP(rr, req)

	if rr.Code != http.StatusUnprocessableEntity {
		t.Fatalf("got status %d, want 422", rr.Code)
	}
}

func TestCalculateNegativeSqrt(t *testing.T) {
	req := httptest.NewRequest(http.MethodPost, "/calculate", bytes.NewBufferString(`{"operation":"sqrt","a":-1,"b":0}`))
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()

	New().ServeHTTP(rr, req)

	if rr.Code != http.StatusUnprocessableEntity {
		t.Fatalf("got status %d, want 422", rr.Code)
	}
	if !strings.Contains(rr.Body.String(), "negative square root") {
		t.Fatalf("got body %q, want negative square root error", rr.Body.String())
	}
}

func TestCalculateNaNResult(t *testing.T) {
	req := httptest.NewRequest(http.MethodPost, "/calculate", bytes.NewBufferString(`{"operation":"floatdiv","a":0,"b":0}`))
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()

	New().ServeHTTP(rr, req)

	if rr.Code != http.StatusUnprocessableEntity {
		t.Fatalf("got status %d, want 422", rr.Code)
	}
	if !strings.Contains(rr.Body.String(), "invalid result") {
		t.Fatalf("got body %q, want invalid result error", rr.Body.String())
	}
}
