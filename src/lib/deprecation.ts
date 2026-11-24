import { type Parallel } from '../client';
import { loggerFor } from '../internal/utils/log';

/**
 * Prints a console warning, once per process, when the Parallel API marks a call as deprecated:
 * the `Deprecation` response header (RFC 9745) with optional `Sunset` and `Link`
 * (`rel="deprecation"` / `rel="successor-version"`), or a `deprecation_warning` item in the
 * JSON body's `warnings` list. Set `logLevel: 'error'` (or `PARALLEL_LOG=error`) to hide it.
 */

const DEPRECATION_WARNING_TYPE = 'deprecation_warning';

const seen = new Set<string>();

export function warnOnDeprecationHeaders(
  client: Parallel,
  method: string,
  url: string,
  response: Response,
): void {
  if (!response.headers.has('deprecation')) {
    return;
  }

  const endpoint = `${method.toUpperCase()} ${pathOf(url)}`;
  let message = `Parallel API: ${endpoint} is deprecated`;
  const sunset = response.headers.get('sunset');
  if (sunset) {
    message += ` and will be removed after ${sunset}`;
  }
  message += '.';

  const links = parseLinks(response.headers.get('link'));
  if (links['successor-version']) {
    message += ` Use ${links['successor-version']} instead.`;
  }
  if (links['deprecation']) {
    message += ` See ${links['deprecation']}`;
  }

  emit(client, endpoint, message);
}

export function warnOnDeprecationBody(client: Parallel, response: Response, body: unknown): void {
  // The header notice already covers this response.
  if (response.headers.has('deprecation') || !isObject(body) || !Array.isArray(body['warnings'])) {
    return;
  }

  for (const item of body['warnings']) {
    if (!isObject(item) || item['type'] !== DEPRECATION_WARNING_TYPE) {
      continue;
    }
    const text =
      typeof item['message'] === 'string' && item['message'] ? item['message'] : 'This call is deprecated.';
    let message = `Parallel API: ${text}`;
    const docs = isObject(item['detail']) ? item['detail']['documentation'] : undefined;
    if (typeof docs === 'string' && docs && !text.includes(docs)) {
      message += ` See ${docs}`;
    }
    emit(client, text, message);
  }
}

function emit(client: Parallel, key: string, message: string): void {
  if (seen.has(key)) {
    return;
  }
  seen.add(key);
  loggerFor(client).warn(message);
}

function parseLinks(header: string | null): Record<string, string> {
  const links: Record<string, string> = {};
  if (!header) {
    return links;
  }
  for (const match of header.matchAll(/<([^>]*)>([^,<]*)/g)) {
    const rel = /rel\s*=\s*"?([^";]+)"?/i.exec(match[2] ?? '')?.[1];
    for (const name of rel?.toLowerCase().split(/\s+/) ?? []) {
      if (name && !(name in links)) {
        links[name] = match[1]!;
      }
    }
  }
  return links;
}

function pathOf(url: string): string {
  try {
    return new URL(url).pathname;
  } catch {
    return url;
  }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** @internal */
export function _resetDeprecationWarnings(): void {
  seen.clear();
}
