# A ledger and the page that cites it

From the fuel story's record. The ledger, `checks/claims/fuel-reserves--2026-10-02-g7-releases-100-million-barrels.json`:

```json
{
  "story": "fuel-reserves--2026-10-02-g7-releases-100-million-barrels",
  "claims": [
    {
      "id": "g7-release",
      "says": "The G7's leaders agreed on October 2 to release 100 million barrels from emergency stocks over four months, with a large diesel release in the first 20 days.",
      "status": "fact",
      "load": ["spine"],
      "evidence": [{"record": "govuk-g7-statement-2026-10-02", "passage": "coordinated release through the IEA of 100 million barrels (MB) to begin immediately over 4 months, including a frontloaded substantial diesel release within the first 20 days"}]
    },
    {
      "id": "germany-none-added",
      "says": "Germany says it is adding no barrels beyond March, as of now.",
      "status": "said",
      "by": "Germany's economy ministry",
      "scope": "as of October 7",
      "load": ["catch"],
      "evidence": [{"record": "politico-eu-france-germany-2026-10-07", "passage": "as of now, no additional quantities"}]
    },
    {
      "id": "france-2m-diesel",
      "says": "France signalled it could release 2 million more barrels of diesel, without committing to them.",
      "short": "France: could add 2 million barrels",
      "status": "may",
      "scope": "as of October 7",
      "load": ["catch"],
      "evidence": [
        {"record": "politico-eu-france-germany-2026-10-07", "passage": "France on Wednesday signaled it could release 2 million barrels of diesel on top of the quantities agreed in March"},
        {"record": "politico-eu-france-germany-2026-10-07", "passage": "stopped short of offering a clear commitment"}
      ]
    },
    {
      "id": "board-meeting",
      "says": "The energy agency's board is expected to settle who releases what on October 14 and 15.",
      "status": "expected",
      "load": [],
      "evidence": [{"record": "reuters-iea-board-2026-10-06", "passage": "is expected to decide the details of the stocks release at an October 14-15 board meeting"}]
    }
  ]
}
```

The page states the claims in its own voice, keeping each one's status and scope, and cites them:

```astro
<p data-layer="narrative">Germany says it is adding nothing beyond March for now,<Cite c="germany-none-added" />
and the only barrels anyone has put forward on top are France's: it signalled it could
release 2 million more barrels of diesel, without committing to them.<Cite c="france-2m-diesel" /></p>
```

A table cell or timeline label uses the claim's short form and cites it:

```astro
---
import { claim } from "../../../lib/claims.mjs";
const story = "fuel-reserves--2026-10-02-g7-releases-100-million-barrels";
---
<td>{claim(story, "france-2m-diesel").short}<Cite c="france-2m-diesel" /></td>
```

```js
// in the data module, a timeline entry
{ date: "October 7", title: "France signals it could add 2 million barrels.", cites: [{ c: "france-2m-diesel" }] }
```

Just the facts lists, under that paragraph, "Germany says it is adding no barrels beyond March, as of now." and "France signalled it could release 2 million more barrels of diesel, without committing to them.", each with its citation.
