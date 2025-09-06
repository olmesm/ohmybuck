---
title: Project Bootstrapping Script
description: Quick add files
date: 2025-09-06 11:10
tags: [add]
---

Accepts either a snippet with filepath comment, or filepath and snippet to create a file.

```bash
cat <<'EOF' | add
# ./src/hello.py
#!/usr/bin/env python3
print("hi")
EOF


# or

cat <<'EOF' | add ./ignores-location-comment/hello.py
# ./src/hello.py
#!/usr/bin/env python3
print("hi")
EOF
```

```bash
# ~/bin/add

#!/usr/bin/env bash
set -euo pipefail

if [[ $# -gt 1 ]]; then
  echo "Usage:"
  echo "  $0              # read path from first line of stdin"
  echo "  $0 <path>       # use given path instead of first line"
  exit 1
fi

if [[ $# -eq 1 ]]; then
  path="$1"
  mkdir -p "$(dirname "$path")"
  cat > "$path"
else
  # read first line separately
  IFS= read -r first_line
  path=$(echo "$first_line" | sed -E 's/^[^[:space:]]+[[:space:]]+//')
  mkdir -p "$(dirname "$path")"
  # write the rest of stdin to file
  cat > "$path"
fi

if head -n1 "$path" | grep -q '^#!'; then
  echo "chmod +x \"$path\""
fi

echo "Created: $path"
```
