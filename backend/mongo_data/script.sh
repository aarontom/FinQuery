#!/usr/bin/env bash
set -euo pipefail

# ─── Prepend Homebrew and leave existing PATH intact ─────────────────────────
BREW_INTEL="/usr/local/bin"
BREW_ARM="/opt/homebrew/bin"
# Correct assignment—do NOT put the PATH string on its own line!
export PATH="$BREW_ARM:$BREW_INTEL:$PATH"

# 1) Your MongoDB connection string (no auth, local)
MONGO_URI="mongodb://localhost:27017/stocks"

# 2) Loop over every .json in nasdaq_json/ and nyse_json/, skipping resource‑forks
find nasdaq_json nyse_json -type f -name '*.json' ! -name '._*.json' | while read -r f; do
  # only proceed if file exists and is non‑empty
  [[ -s "$f" ]] || continue

  ticker=$(basename "$f" .json)
  echo "Importing $ticker → stocks.weekly_prices …"

  # 3) Use jq to extract .chart.result[0] and emit Mongo extended‑JSON dates (milliseconds)
  #    then pipe directly into mongoimport.
  jq -c '
    .chart.result[0] as $r
    | [ range(0; $r.timestamp | length)
        | {
            symbol:    "'$ticker'",
            timestamp: { "$date": ($r.timestamp[.] * 1000) },
            open:      $r.indicators.quote[0].open[.],
            high:      $r.indicators.quote[0].high[.],
            low:       $r.indicators.quote[0].low[.],
            close:     $r.indicators.quote[0].close[.],
            volume:    $r.indicators.quote[0].volume[.]
          }
      ]
  ' "$f" \
  | mongoimport \
      --uri="$MONGO_URI" \
      --collection=weekly_prices \
      --jsonArray \
      --mode=upsert \
      --upsertFields=symbol,timestamp
done

