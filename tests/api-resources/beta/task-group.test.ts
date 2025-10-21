// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Parallel from 'parallel-web';

const client = new Parallel({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource taskGroup', () => {
  test('create', async () => {
    const responsePromise = client.beta.taskGroup.create({});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve', async () => {
    const responsePromise = client.beta.taskGroup.retrieve('taskgroup_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('addRuns: only required params', async () => {
    const responsePromise = client.beta.taskGroup.addRuns('taskgroup_id', {
      inputs: [{ input: 'What was the GDP of France in 2023?', processor: 'base' }],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('addRuns: required and optional params', async () => {
    const response = await client.beta.taskGroup.addRuns('taskgroup_id', {
      inputs: [
        {
          input: 'What was the GDP of France in 2023?',
          processor: 'base',
          enable_events: true,
          mcp_servers: [
            { name: 'name', url: 'url', allowed_tools: ['string'], headers: { foo: 'string' }, type: 'url' },
          ],
          metadata: { foo: 'string' },
          source_policy: {
            exclude_domains: ['reddit.com', 'x.com'],
            include_domains: ['wikipedia.org', 'usa.gov'],
          },
          task_spec: {
            output_schema: {
              json_schema: { additionalProperties: 'bar', properties: 'bar', required: 'bar', type: 'bar' },
              type: 'json',
            },
            input_schema: 'string',
          },
          webhook: { url: 'url', event_types: ['task_run.status'] },
        },
      ],
      default_task_spec: {
        output_schema: {
          json_schema: { additionalProperties: 'bar', properties: 'bar', required: 'bar', type: 'bar' },
          type: 'json',
        },
        input_schema: 'string',
      },
      betas: ['mcp-server-2025-07-17'],
    });
  });

  // Prism doesn't support text/event-stream responses
  test.skip('events', async () => {
    const responsePromise = client.beta.taskGroup.events('taskgroup_id');
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
      client.beta.taskGroup.events(
        'taskgroup_id',
        { last_event_id: 'last_event_id', timeout: 0 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Parallel.NotFoundError);
  });

  // Prism doesn't support text/event-stream responses
  test.skip('getRuns', async () => {
    const responsePromise = client.beta.taskGroup.getRuns('taskgroup_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism doesn't support text/event-stream responses
  test.skip('getRuns: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.beta.taskGroup.getRuns(
        'taskgroup_id',
        { include_input: true, include_output: true, last_event_id: 'last_event_id', status: 'queued' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Parallel.NotFoundError);
  });
});
