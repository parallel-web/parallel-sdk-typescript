// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Parallel from 'parallel-web';

const client = new Parallel({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource responses', () => {
  test('create: only required params', async () => {
    const responsePromise = client.responses.create({
      input: 'What are the latest developments in fusion energy?',
      model: 'parallel',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.responses.create({
      input: 'What are the latest developments in fusion energy?',
      model: 'parallel',
      background: true,
      data_sources: {
        excluded: ['string'],
        free: ['string'],
        pay_per_use: ['string'],
      },
      instructions: 'instructions',
      metadata: { foo: 'string' },
      previous_response_id: 'previous_response_id',
      reasoning: { effort: 'high' },
      stream: false,
      text: {
        format: { type: 'text' },
        verbosity: 'low',
      },
      tools: [
        {
          type: 'web_search',
          filters: { allowed_domains: ['string'], blocked_domains: ['string'] },
          search_context_size: 'low',
          user_location: {
            city: 'city',
            country: 'country',
            region: 'region',
            timezone: 'timezone',
            type: 'approximate',
          },
        },
      ],
    });
  });
});
