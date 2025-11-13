// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Parallel from 'parallel-web';

const client = new Parallel({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource findall', () => {
  test('create: only required params', async () => {
    const responsePromise = client.beta.findall.create({
      entity_type: 'entity_type',
      generator: 'base',
      match_conditions: [
        {
          description:
            "Company must have SOC2 Type II certification (not Type I). Look for evidence in: trust centers, security/compliance pages, audit reports, or press releases specifically mentioning 'SOC2 Type II'. If no explicit SOC2 Type II mention is found, consider requirement not satisfied.",
          name: 'name',
        },
      ],
      match_limit: 0,
      objective: 'objective',
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
    const response = await client.beta.findall.create({
      entity_type: 'entity_type',
      generator: 'base',
      match_conditions: [
        {
          description:
            "Company must have SOC2 Type II certification (not Type I). Look for evidence in: trust centers, security/compliance pages, audit reports, or press releases specifically mentioning 'SOC2 Type II'. If no explicit SOC2 Type II mention is found, consider requirement not satisfied.",
          name: 'name',
        },
      ],
      match_limit: 0,
      objective: 'objective',
      exclude_list: [{ name: 'name', url: 'url' }],
      metadata: { foo: 'string' },
      webhook: { url: 'url', event_types: ['task_run.status'] },
      betas: ['mcp-server-2025-07-17'],
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.beta.findall.retrieve('findall_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.beta.findall.retrieve(
        'findall_id',
        { betas: ['mcp-server-2025-07-17'] },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Parallel.NotFoundError);
  });

  test('cancel', async () => {
    const responsePromise = client.beta.findall.cancel('findall_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('cancel: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.beta.findall.cancel(
        'findall_id',
        { betas: ['mcp-server-2025-07-17'] },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Parallel.NotFoundError);
  });

  test('enrich: only required params', async () => {
    const responsePromise = client.beta.findall.enrich('findall_id', {
      output_schema: {
        json_schema: { additionalProperties: 'bar', properties: 'bar', required: 'bar', type: 'bar' },
      },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('enrich: required and optional params', async () => {
    const response = await client.beta.findall.enrich('findall_id', {
      output_schema: {
        json_schema: { additionalProperties: 'bar', properties: 'bar', required: 'bar', type: 'bar' },
        type: 'json',
      },
      mcp_servers: [
        { name: 'name', url: 'url', allowed_tools: ['string'], headers: { foo: 'string' }, type: 'url' },
      ],
      processor: 'processor',
      betas: ['mcp-server-2025-07-17'],
    });
  });

  // Prism doesn't support text/event-stream responses
  test.skip('events', async () => {
    const responsePromise = client.beta.findall.events('findall_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism doesn't support text/event-stream responses
  test.skip('events: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.beta.findall.events(
        'findall_id',
        { last_event_id: 'last_event_id', timeout: 0, betas: ['mcp-server-2025-07-17'] },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Parallel.NotFoundError);
  });

  test('extend: only required params', async () => {
    const responsePromise = client.beta.findall.extend('findall_id', { additional_match_limit: 0 });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('extend: required and optional params', async () => {
    const response = await client.beta.findall.extend('findall_id', {
      additional_match_limit: 0,
      betas: ['mcp-server-2025-07-17'],
    });
  });

  test('ingest: only required params', async () => {
    const responsePromise = client.beta.findall.ingest({
      objective: 'Find all AI companies that raised Series A funding in 2024',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('ingest: required and optional params', async () => {
    const response = await client.beta.findall.ingest({
      objective: 'Find all AI companies that raised Series A funding in 2024',
      betas: ['mcp-server-2025-07-17'],
    });
  });

  test('result', async () => {
    const responsePromise = client.beta.findall.result('findall_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('result: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.beta.findall.result(
        'findall_id',
        { betas: ['mcp-server-2025-07-17'] },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Parallel.NotFoundError);
  });

  test('schema', async () => {
    const responsePromise = client.beta.findall.schema('findall_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('schema: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.beta.findall.schema(
        'findall_id',
        { betas: ['mcp-server-2025-07-17'] },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Parallel.NotFoundError);
  });
});
