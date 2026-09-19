// Story component library: barrel export.
//
// Usage in an event page:
//   import KpiStrip from "../../components/story/KpiStrip.astro";
//   import { ... } from "../../components/story";  // TypeScript re-exports below
//
// Astro components must be imported directly from their .astro files.
// This file exists for documentation and IDE discoverability.
//
// Components a story page binds:
//   KpiStrip        : row of key figures (value + unit + label)
//   ThreeThings     : summary box with three numbered items
//   StoryToc        : table of contents with scrollspy
//   SectionKicker   : mono-caps label above a section heading
//   StepChart       : SVG step-function chart (rate history)
//   BarChart        : SVG vertical bar chart (payroll changes, etc.)
//   DataTable       : compact responsive data table
//   DateLine        : dated points on a line with the day counts between them
//   OutletCheck     : cross-source verification card
//   OutletCheckFold : fold that wraps the OutletCheck cards (count, method; cards in the slot)
//   CheckedBlock    : claim-checked-against-record block
//   QuoteCard       : one contiguous span of a record as a person's or an ad's words
//   Chip            : inline sourcing attribution label
//   RailedParagraph : left-bordered paragraph by source type
//   Receipt         : expandable computation/source details toggle
//   LiveCounter     : client-side guarded counter (updates KPI)
//   DecisionTimeline: dated decision table for subject pages
//   RecordsList     : grouped source links (bottom of story)
//
// Site internals in this directory, never bound by a story page:
//   RevisionTimeline and QuotedText render inside StoryState.
//
// Shared CSS:
//   import "../../styles/story.css";  // replaces per-page inline <style> blocks
