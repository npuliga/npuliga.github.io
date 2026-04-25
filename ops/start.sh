#!/usr/bin/env bash
set -euo pipefail
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(dirname "${DIR}")"
PID_FILE="${DIR}/app.pid"
LOG_FILE="${DIR}/app.log"
PORT=4321

[ -f "${PID_FILE}" ] && kill -0 "$(cat "${PID_FILE}")" 2>/dev/null \
  && echo -e "${YELLOW}[!] Dev server already running (PID $(cat "${PID_FILE}"))${NC}" && exit 0

if ! command -v node &>/dev/null; then
  echo -e "${RED}[X] Node.js not found — install from https://nodejs.org${NC}"
  exit 1
fi
echo -e "${GREEN}[OK] Node: $(node --version)${NC}"

if ! command -v npm &>/dev/null; then
  echo -e "${RED}[X] npm not found${NC}"; exit 1
fi

if [ ! -d "${ROOT}/node_modules" ]; then
  echo -e "${YELLOW}[!] node_modules missing — running npm install...${NC}"
  cd "${ROOT}" && npm install
fi

echo -e "${CYAN}[*] Starting Astro dev server on http://localhost:${PORT}...${NC}"
cd "${ROOT}"
npx astro dev --port "${PORT}" >> "${LOG_FILE}" 2>&1 &
echo $! > "${PID_FILE}"
sleep 3
kill -0 "$(cat "${PID_FILE}")" 2>/dev/null \
  && echo -e "${GREEN}[OK] Dev server started at http://localhost:${PORT} (PID $(cat "${PID_FILE}"))${NC}" \
  || { echo -e "${RED}[X] Failed — check ${LOG_FILE}${NC}"; rm -f "${PID_FILE}"; exit 1; }
