#!/usr/bin/env bash
set -euo pipefail
GREEN='\033[0;32m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(dirname "${DIR}")"
PID_FILE="${DIR}/app.pid"
echo -e "${CYAN}[*] npuliga.github.io — Status${NC}"
echo ""
[ -f "${PID_FILE}" ] && kill -0 "$(cat "${PID_FILE}")" 2>/dev/null \
  && echo -e "${GREEN}[OK] Dev server running (PID $(cat "${PID_FILE}")) at http://localhost:4321${NC}" \
  || echo -e "${RED}[X] Dev server not running${NC}"
command -v node &>/dev/null && echo -e "${GREEN}[OK] Node: $(node --version)${NC}" || echo -e "${RED}[X] Node.js not found${NC}"
command -v npm &>/dev/null && echo -e "${GREEN}[OK] npm: $(npm --version)${NC}" || echo -e "${RED}[X] npm not found${NC}"
[ -d "${ROOT}/node_modules" ] && echo -e "${GREEN}[OK] node_modules present${NC}" || echo -e "${RED}[X] node_modules missing — run npm install${NC}"
[ -d "${ROOT}/dist" ] && echo -e "${GREEN}[OK] dist/ (last build) present${NC}" || echo -e "${RED}[X] dist/ missing — run npm run build${NC}"
