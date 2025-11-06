// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Parallel from 'parallel-web';

const client = new Parallel({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource taskRun', () => {
  test('create: only required params', async () => {
    const responsePromise = client.taskRun.create({
      input: 'What was the GDP of France in 2023?',
      processor: 'base',
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
    const response = await client.taskRun.create({
      input: 'What was the GDP of France in 2023?',
      processor: 'base',
      metadata: { foo: 'string' },
      source_policy: {
        exclude_domains: ['reddit.com', 'x.com', '.ai'],
        include_domains: ['wikipedia.org', 'usa.gov', '.edu'],
      },
      task_spec: {
        output_schema: {
          json_schema: { additionalProperties: 'bar', properties: 'bar', required: 'bar', type: 'bar' },
          type: 'json',
        },
        input_schema: 'string',
      },
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.taskRun.retrieve('run_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('result', async () => {
    const responsePromise = client.taskRun.result('run_id');
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
      client.taskRun.result('run_id', { timeout: 0 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Parallel.NotFoundError);
  });
});
