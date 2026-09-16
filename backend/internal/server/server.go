package server

import (
	"encoding/json"
	"math"
	"net/http"

	"calculator/internal/calc"
)

func New() http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("/health", health)
	mux.HandleFunc("/calculate", calculate)
	return mux
}

func health(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}

func calculate(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req struct {
		Operation string `json:"operation"`
		A         int    `json:"a"`
		B         int    `json:"b"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "bad request", http.StatusBadRequest)
		return
	}

	result, err := calc.Run(req.Operation, req.A, req.B)
	if err != nil {
		status := http.StatusUnprocessableEntity
		if err.Error() == "unknown operation" {
			status = http.StatusBadRequest
		}
		http.Error(w, err.Error(), status)
		return
	}

	if math.IsNaN(result) || math.IsInf(result, 0) {
		http.Error(w, "invalid result", http.StatusUnprocessableEntity)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]float64{"result": result})
}
