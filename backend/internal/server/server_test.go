package server

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
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
