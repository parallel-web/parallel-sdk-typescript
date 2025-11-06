// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Parallel from 'parallel-web';

const client = new Parallel({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource beta', () => {
  test('extract: only required params', async () => {
    const responsePromise = client.beta.extract({ urls: ['string'] });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('extract: required and optional params', async () => {
    const response = await client.beta.extract({
      urls: ['string'],
      excerpts: true,
      fetch_policy: { disable_cache_fallback: true, max_age_seconds: 86400, timeout_seconds: 60 },
      full_content: true,
      objective: 'objective',
      search_queries: ['string'],
      betas: ['mcp-server-2025-07-17'],
    });
  });

  test('search', async () => {
    const responsePromise = client.beta.search({});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
