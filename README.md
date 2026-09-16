# Calculator

## Run with Docker

Requires [Docker](https://docs.docker.com/get-docker/) only.

```bash
git clone <repo-url>
cd calculator
docker compose up --build
```

- App: http://localhost:3000
- API: http://localhost:8080

## Run locally (optional)

**Backend**

```bash
cd backend
go run ./cmd/server
```

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

App at http://localhost:5173 (proxies API to :8080).

## API

```bash
curl http://localhost:8080/health

curl -X POST http://localhost:8080/calculate \
  -H "Content-Type: application/json" \
  -d '{"operation":"add","a":2,"b":3}'
```

Returns `{"result":5}`. See `backend/internal/calc/calc.go` for supported operations.

## Notes

- The backend handles all math; the frontend just sends ops and shows the answer.
- Docker is the easiest way to run it. No need to install Go or Node unless you're developing locally.
- Ports 3000 and 8080 need to be free.

## Tests

```bash
cd backend && go test ./...
cd frontend && npm test
```
