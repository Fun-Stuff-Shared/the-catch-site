// Preview-only adapter: reuse the authored Iowa words and claim ledger verbatim.
// No second copy of reporting or final component choice lives in the gallery.
import { claim, storyId } from './claims.mjs';
import { citeNumber } from './record-manifests.mjs';
import { mergeCites } from '../../scripts/merge-cites.mjs';
const event = 'iowa-army-detonation/2026-11-20-army-detonates-lead-azide-in-iowa';
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

export function iowaTreatments(source, warnings) {
  const cite = id => claim(storyId(event), id).evidence.map(evidence => {
    const { n } = citeNumber(evidence.record, event);
    return `<sup class="src-ref"><a href="#src-${n}" data-record-href="/records/${escape(evidence.record)}/" data-passage="${escape(evidence.passage)}" data-claim="${escape(id)}" aria-label="Source ${n}: read the evidence">${n}</a></sup>`;
  }).join('');
  const quote = (_, attributes, words) => {
    const get = name => escape(attributes.match(new RegExp(`${name}="([^"]+)"`))?.[1] ?? '');
    return `<figure class="quote-card"><figcaption class="qc-head">${get('speaker')} · ${get('when')} · ${get('where')}</figcaption><blockquote class="qc-words">${words}</blockquote></figure>`;
  };
  const timeline = `<div class="decision-timeline"><div class="dt-head"><span class="dt-date">Date</span><span class="dt-body">What the Army said and did</span></div>${warnings.map(row => `<div class="dt-row${row.current ? ' dt-current' : ''}"><span class="dt-date">${escape(row.date)}</span><span class="dt-body">${escape(row.title)}${row.cites.map(c => cite(c.c)).join('')}${row.sub ? `<span class="dt-sub">${escape(row.sub)}</span>` : ''}</span></div>`).join('')}</div>`;
  const render = markup => mergeCites(markup
    .replace(/<QuoteCard\b([^>]*)>([\s\S]*?)<\/QuoteCard>/g, quote)
    .replace(/<DecisionTimeline\b[^>]*\/>/g, timeline)
    .replace(/<Cite c="([^"]+)"\s*\/>/g, (_, id) => cite(id)));
  const catchMarkup = source.match(/<aside class="the-catch"[^>]*>([\s\S]*?)<\/aside>/)?.[1];
  const sarah = source.match(/<QuoteCard speaker="Sarah Green[^>]*>[\s\S]*?<\/QuoteCard>/)?.[0];
  const telle = source.match(/<QuoteCard speaker="Adam Telle[^>]*>[\s\S]*?<\/QuoteCard>/)?.[0];
  if (!catchMarkup || !sarah || !telle) throw new Error('Iowa comparison source changed: check its Catch, Sarah Green and Adam Telle excerpts');
  return { catchHTML: render(catchMarkup), quotesHTML: render(sarah + telle) };
}
