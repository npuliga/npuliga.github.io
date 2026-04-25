#!/usr/bin/env bash
set -euo pipefail
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PID_FILE="${DIR}/app.pid"
[ ! -f "${PID_FILE}" ] && echo -e "${YELLOW}[!] Dev server not running${NC}" && exit 0
PID=$(cat "${PID_FILE}")
kill -SIGTERM "${PID}" 2>/dev/null || true
sleep 2
kill -0 "${PID}" 2>/dev/null && kill -SIGKILL "${PID}" || true
rm -f "${PID_FILE}"
echo -e "${GREEN}[OK] Dev server stopped${NC}"
