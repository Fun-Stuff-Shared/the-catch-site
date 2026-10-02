import re
import sys
from pathlib import Path

USAGE = """Usage: added_sentences.py <page text from page_text.py> [<the earlier page text from page_text.py>]
Prints, numbered, the story-view sentences the earlier page text does not hold (every sentence
when no earlier text is given). Both texts are the built page as the story view reads it, so a
sentence moved out of a proof block or a detail block is new and is listed, and a sentence that
renders a data-module value is compared by the value. A sentence both texts hold is listed too
when a sentence that stood above it in the earlier text now stands below it."""
ABBR = re.compile(r"\b(Rep|Sen|U\.S|U\.N|Sept|Aug|Oct|Nov|Dec|Jan|Feb|Mr|Ms|Mrs|Dr|Gen|Lt|Col|No|v|Inc|Co|St|[A-Z])\.\s")


def fold(text):
    return re.sub(r"\s+", " ", text.replace("“", '"').replace("”", '"').replace("’", "'").replace("‘", "'")).strip().lower()


def sentences(page_text):
    for line in page_text.splitlines():
        line = ABBR.sub(lambda m: m.group(0).replace(". ", ".⁣"), line)
        for part in re.split(r"(?:(?<=[.!?])|(?<=[.!?][\"”)]))\s+(?=[A-Z\"“])", line):
            sentence = part.replace("⁣", " ").strip()
            if re.search(r"[A-Za-z]", sentence) and re.search(r"[.!?][\"”)]?$", sentence):
                yield sentence


def main(argv):
    if len(argv) < 2:
        print(USAGE)
        return 2
    now = list(sentences(Path(argv[1]).read_text(encoding="utf-8")))
    earlier = {}
    if len(argv) > 2:
        for at, sentence in enumerate(sentences(Path(argv[2]).read_text(encoding="utf-8"))):
            earlier.setdefault(fold(sentence), []).append(at)
    # A sentence said twice now and once before is new once: each earlier sentence answers for one.
    was_at = [earlier[key].pop(0) if earlier.get(key := fold(sentence)) else -1 for sentence in now]
    # A sentence both texts hold is still read again when a sentence that stood above it now
    # stands below it: the words are old and what the reader has met by then is not.
    moved = [False] * len(now)
    below = float("inf")
    for i in range(len(now) - 1, -1, -1):
        if was_at[i] < 0:
            continue
        moved[i] = was_at[i] > below
        below = min(below, was_at[i])
    number = 0
    for sentence, at, lost_context in zip(now, was_at, moved):
        if at >= 0 and not lost_context:
            continue
        number += 1
        print(f"{number}. {sentence}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
