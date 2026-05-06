// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Parallel from 'parallel-web';

const client = new Parallel({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource monitor', () => {
  test('create: only required params', async () => {
    const responsePromise = client.monitor.create({
      frequency: '1h',
      settings: { query: 'Extract recent news about AI' },
      type: 'event_stream',
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
    const response = await client.monitor.create({
      frequency: '1h',
      settings: {
        query: 'Extract recent news about AI',
        advanced_settings: {
          location: 'us',
          source_policy: {
            after_date: '2024-01-01',
            exclude_domains: ['reddit.com', 'x.com', '.ai'],
            include_domains: ['wikipedia.org', 'usa.gov', '.edu'],
          },
        },
        include_backfill: true,
        output_schema: {
          json_schema: {
            additionalProperties: 'bar',
            properties: 'bar',
            required: 'bar',
            type: 'bar',
          },
          type: 'json',
        },
      },
      type: 'event_stream',
      metadata: { slack_thread_id: '1234567890.123456', user_id: 'U123ABC' },
      processor: 'lite',
      webhook: { url: 'https://example.com/webhook', event_types: ['monitor.event.detected'] },
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.monitor.retrieve('monitor_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update', async () => {
    const responsePromise = client.monitor.update('monitor_id', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list', async () => {
    const responsePromise = client.monitor.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.monitor.list(
        {
          cursor: 'cursor',
          limit: 1,
          status: ['active'],
          type: ['event_stream'],
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Parallel.NotFoundError);
  });

  test('cancel', async () => {
    const responsePromise = client.monitor.cancel('monitor_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('events', async () => {
    const responsePromise = client.monitor.events('monitor_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('events: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.monitor.events(
        'monitor_id',
        {
          cursor: 'cursor',
          event_group_id: 'event_group_id',
          include_completions: true,
          limit: 1,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Parallel.NotFoundError);
  });

  test('trigger', async () => {
    const responsePromise = client.monitor.trigger('monitor_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
