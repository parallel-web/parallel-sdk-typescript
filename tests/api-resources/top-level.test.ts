// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Parallel from 'parallel-web';

const client = new Parallel({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('top level methods', () => {
  test('extract: only required params', async () => {
    const responsePromise = client.extract({ urls: ['string'] });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('extract: required and optional params', async () => {
    const response = await client.extract({
      urls: ['string'],
      advanced_settings: {
        excerpt_settings: { max_chars_per_result: 0 },
        fetch_policy: {
          disable_cache_fallback: true,
          max_age_seconds: 86400,
          timeout_seconds: 60,
        },
        full_content: { max_chars_per_result: 0 },
      },
      client_model: 'claude-opus-4-7',
      max_chars_total: 0,
      objective: 'objective',
      search_queries: ['string'],
      session_id: 'session_id',
    });
  });

  test('search: only required params', async () => {
    const responsePromise = client.search({ search_queries: ['string'] });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('search: required and optional params', async () => {
    const response = await client.search({
      search_queries: ['string'],
      advanced_settings: {
        excerpt_settings: { max_chars_per_result: 0 },
        fetch_policy: {
          disable_cache_fallback: true,
          max_age_seconds: 86400,
          timeout_seconds: 60,
        },
        location: 'us',
        max_results: 0,
        source_policy: {
          after_date: '2024-01-01',
          exclude_domains: ['reddit.com', 'x.com', '.ai'],
          include_domains: ['wikipedia.org', 'usa.gov', '.edu'],
        },
      },
      client_model: 'claude-opus-4-7',
      max_chars_total: 0,
      mode: 'basic',
      objective: 'objective',
      session_id: 'session_id',
    });
  });
});
