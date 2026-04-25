#!/usr/bin/env bash
set -euo pipefail
GREEN='\033[0;32m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'
PORT=4321
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(dirname "${DIR}")"
PID_FILE="${DIR}/app.pid"
echo -e "${CYAN}[*] npuliga.github.io — Health Check${NC}"
echo ""
PASS=0; FAIL=0
check() { eval "$2" &>/dev/null && echo -e "${GREEN}[OK] $1${NC}" && ((PASS++)) || echo -e "${RED}[X] $1${NC}" && ((FAIL++)); }
check "Node.js installed" "command -v node"
check "npm installed" "command -v npm"
check "node_modules present" "[ -d '${ROOT}/node_modules' ]"
check "astro.config.mjs present" "[ -f '${ROOT}/astro.config.mjs' ]"
check "resume.json present" "[ -f '${ROOT}/src/data/resume.json' ]"
check "Dev server process" "[ -f '${PID_FILE}' ] && kill -0 \$(cat '${PID_FILE}')"
check "HTTP localhost:${PORT} responds" "curl -sf http://localhost:${PORT}/"
echo ""
echo "Results: ${PASS} passed, ${FAIL} failed"
[ "${FAIL}" -eq 0 ] && exit 0 || exit 1
