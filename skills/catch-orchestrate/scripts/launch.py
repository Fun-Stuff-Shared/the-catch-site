#!/usr/bin/env python3
"""Start a command in its own session so it outlives the shell that launched it.
Usage: launch.py <log file> <command> [args...]   Prints the process id."""
import subprocess
import sys

log, command = sys.argv[1], sys.argv[2:]
with open(log, "a") as sink:
    child = subprocess.Popen(command, stdout=sink, stderr=subprocess.STDOUT,
                             stdin=subprocess.DEVNULL, start_new_session=True)
print(child.pid)
