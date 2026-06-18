#!/bin/bash
cd "$(dirname "$0")"
PORT=8000
URL="http://localhost:$PORT/index.html"
python3 -m http.server $PORT >/dev/null 2>&1 &
SRV=$!
sleep 1
open -a "Google Chrome" "$URL" 2>/dev/null || open "$URL"
echo ""
echo "  Sivu on auki: $URL"
echo "  Sulje palvelin sulkemalla tämä ikkuna tai paina Ctrl+C."
echo ""
wait $SRV
