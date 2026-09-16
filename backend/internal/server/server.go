package server

import (
	"encoding/json"
	"net/http"
)

func New() http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("/health", health)
	return mux
}

func health(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}
