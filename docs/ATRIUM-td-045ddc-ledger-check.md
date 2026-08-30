# td-045ddc — episode source-ledger consistency

`source_ledger` is an episode array of `{record_id}` entries. When present, each record id must be named by that episode's `sub_events` entry in `checks/manifests/officials--marco-rubio.json`.

The deliberate immigration ledger entry `rubio-cr-2016-05-17` failed because it belongs to the Zika sub-event: `source ledger record rubio-cr-2016-05-17 is not cited by its manifest sub-event`. The empty ledger arrays provide the data shape for Keystone's source-backed authoring; this check does not add page prose or sources.
