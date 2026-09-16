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

## Tests

```bash
cd backend && go test ./...
cd frontend && npm test
```
