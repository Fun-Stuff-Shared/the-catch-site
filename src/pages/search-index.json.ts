import { storyCatalog } from '../lib/discovery.mjs';
export function GET() {
  return new Response(JSON.stringify(storyCatalog()), { headers: { 'Content-Type': 'application/json' } });
}
