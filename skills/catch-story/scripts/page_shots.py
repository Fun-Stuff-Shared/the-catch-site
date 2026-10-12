#!/usr/bin/env python3
# usage: page_shots.py <page url> <out dir>
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

MODES = ("story", "facts", "work")
# A headless window size alone does not give a phone viewport; the phone has to be emulated.
SIZES = {
    "desktop": {"viewport": {"width": 1280, "height": 900}},
    "phone": {"viewport": {"width": 390, "height": 844}, "is_mobile": True, "has_touch": True, "device_scale_factor": 2},
}

url, out = sys.argv[1].split("?")[0], Path(sys.argv[2])
out.mkdir(parents=True, exist_ok=True)
overflow = False
with sync_playwright() as p:
    browser = p.chromium.launch(channel="chrome")
    for size, options in SIZES.items():
        context = browser.new_context(**options)
        page = context.new_page()
        for mode in MODES:
            page.goto(f"{url}?mode={mode}", wait_until="networkidle", timeout=60000)
            wide, inner, height = page.evaluate("[document.documentElement.scrollWidth, innerWidth, document.documentElement.scrollHeight]")
            shot = out / f"{mode}-{size}.png"
            page.screenshot(path=str(shot), full_page=True)
            fits = wide <= inner
            overflow |= not fits
            print(f"{shot}  height {height}px  {'fits' if fits else f'RUNS WIDER THAN THE SCREEN ({wide} > {inner})'}")
        context.close()
    browser.close()
sys.exit(1 if overflow else 0)
