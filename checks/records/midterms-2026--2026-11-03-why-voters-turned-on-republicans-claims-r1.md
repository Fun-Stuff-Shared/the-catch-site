<!-- em-dash-disable-file -->
**Two claims do not hold against their cited records.**

### C101 — Reuters/Ipsos poll completion date

**Claim:** “In a Reuters/Ipsos poll completed Nov. 10, 71% of Americans wanted Congress to pass legislation ending the war with Iran and 62% supported repealing Trump's tariffs.”

**Record:** `reuters-ipsos-2026-11-10`

**Exact words:**
> WASHINGTON, Nov 10 (Reuters) - Majorities of Americans want the newly elected Democratic-majority US Congress to act to end the war with Iran and to repeal tariffs put in place by President Donald Trump, signaling demand for quick action to address the high cost of living, a new Reuters/Ipsos poll found.

> The four-day poll, completed on Monday, showed 71% of Americans -- including 93% of Democrats and 51% of Republicans -- want US Congress to pass legislation ending the conflict with Iran that Trump launched alongside US ally Israel in February. records

**Finding:** November 10, 2026, was Tuesday. The record says the poll was completed Monday, November 9. November 10 was the publication date.

**What a reader would wrongly believe:** That polling continued through November 10, rather than ending November 9. The percentages themselves are supported.

### C106 — Rhode Island omitted from the largest Senate swings

**Claim:** “Summing the Post's county returns by state, Senate races moved furthest toward Democrats from the 2024 presidential vote in Texas (about 26 points), North Carolina, Mississippi and South Carolina (about 22 to 23), and least in Minnesota, South Dakota and Michigan (about 6 to 8); Colorado, Maine, Massachusetts, New Hampshire and Oregon had too few counties reported to include.”

**Record:** `wapo-voting-groups-data`

**Exact words:**

The record defines its calculation:

> Margins are Republican minus Democratic share, in percentage points; positive means Republicans led. 'shift' is the 2026 margin minus the 2024 presidential margin in the same places.

> Live election data is from the Associated Press as of 8:30 a.m. Nov. 4.

Its county table contains five Rhode Island rows:

```text
county | RI | 44001 | Major suburbs | 17458 | 10048 | 28335 | 14506 | 4997 | 20335
county | RI | 44003 | Major suburbs | 46269 | 44526 | 93148 | 39245 | 22859 | 64495
county | RI | 44005 | Major suburbs | 27332 | 16027 | 44618 | 22474 | 8657 | 32210
county | RI | 44007 | Urban core counties | 150102 | 112443 | 269679 | 123053 | 50572 | 181146
county | RI | 44009 | Major suburbs | 42589 | 31247 | 76036 | 36401 | 17551 | 56195
```

records records

**Finding:** Summing those Rhode Island rows gives:

| Measure | 2024 presidential | 2026 Senate |
|---|---:|---:|
| Democratic votes | 283,750 | 235,679 |
| Republican votes | 214,291 | 104,636 |
| Total votes | 511,816 | 354,381 |
| Republican margin | −13.57 points | −36.98 points |

**Rhode Island shifted approximately 23.4 percentage points toward Democrats.**

That exceeds the shifts in North Carolina (22.9), Mississippi (22.9) and South Carolina (22.3).

Rhode Island's five counties are represented in the dataset, so it does not belong among the states excluded for insufficient county reporting.

**What a reader would wrongly believe:** That Texas, North Carolina, Mississippi and South Carolina were the four states with the largest Democratic Senate shifts in the available county data. Rhode Island actually ranks second, behind Texas.

CHECKED: 107 claims  
CLAIMS DO NOT HOLD
