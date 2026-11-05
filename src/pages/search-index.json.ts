import { storyCatalog } from '../lib/discovery.mjs';
import { readV2 } from '../lib/v2.mjs';
import { developmentEntry, selectedDevelopments } from '../lib/v2-brief.mjs';
export function GET() {
  const developments = selectedDevelopments(readV2()).map((view) => ({ ...developmentEntry(view), topic: 'Developments' }));
  return new Response(JSON.stringify([...storyCatalog(), ...developments]), { headers: { 'Content-Type': 'application/json' } });
}
