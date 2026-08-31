// Story component library — barrel export.
//
// Usage in an event page:
//   import KpiStrip from "../../components/story/KpiStrip.astro";
//   import { ... } from "../../components/story";  // TypeScript re-exports below
//
// Astro components must be imported directly from their .astro files.
// This file exists for documentation and IDE discoverability.

// Components available:
//   KpiStrip        — row of key figures (value + unit + label)
//   ThreeThings     — summary box with three numbered items
//   StoryToc        — table of contents with scrollspy
//   SectionKicker   — mono-caps label above a section heading
//   StepChart       — SVG step-function chart (rate history)
//   BarChart        — SVG vertical bar chart (payroll changes, etc.)
//   DataTable       — compact responsive data table
//   OutletCheck     — cross-source verification card
//   CheckedBlock    — claim-checked-against-record block
//   Chip            — inline sourcing attribution label
//   RailedParagraph — left-bordered paragraph by source type
//   Receipt         — expandable computation/source details toggle
//   LiveCounter     — client-side guarded counter (updates KPI)
//   DecisionTimeline— dated decision table for subject pages
//   RecordsList     — grouped source links (bottom of story)
//
// Shared CSS:
//   import "../../styles/story.css";  // replaces per-page inline <style> blocks
