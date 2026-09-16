package main

import (
	"encoding/json"
	"log"
	"net/http"
)

func handler() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
	})

	return mux
}

func main() {
	log.Println("listening on :8080")
	log.Fatal(http.ListenAndServe(":8080", handler()))
}
