#!/usr/bin/env bash
set -euo pipefail
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_FILE="${DIR}/app.log"
FOLLOW=false; LINES=50
while getopts 'fn:' opt; do case $opt in f) FOLLOW=true ;; n) LINES="$OPTARG" ;; esac; done
[ ! -f "${LOG_FILE}" ] && echo "[!] No log file: ${LOG_FILE}" && exit 1
${FOLLOW} && tail -n "${LINES}" -f "${LOG_FILE}" || tail -n "${LINES}" "${LOG_FILE}"
