#!/bin/zsh
# Voice lint on built pages; the TypeSafe SDK lives in the skill-router environment.
exec /Volumes/4/GitHub/skill-router/.venv/bin/python "$(dirname "$0")/voice_lint.py" "$@"
