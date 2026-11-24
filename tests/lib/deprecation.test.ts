import Parallel from 'parallel-web';
import { _resetDeprecationWarnings } from 'parallel-web/lib/deprecation';

const DEPRECATION_HEADERS = {
  Deprecation: '@1767225600',
  Link:
    '<https://docs.parallel.ai/search/search-migration-guide>; rel="deprecation", ' +
    '<https://api.parallel.ai/v1/search>; rel="successor-version"',
};

function makeClient(body: unknown, headers: Record<string, string> = {}) {
  const logger = { error: jest.fn(), warn: jest.fn(), info: jest.fn(), debug: jest.fn() };
  const client = new Parallel({
    baseURL: 'http://localhost:5000/',
    apiKey: 'My API Key',
    logger,
    fetch: () =>
      Promise.resolve(
        new Response(JSON.stringify(body), {
          headers: { 'Content-Type': 'application/json', ...headers },
        }),
      ),
  });
  return { client, logger };
}

describe('deprecation warnings', () => {
  beforeEach(() => _resetDeprecationWarnings());
  afterEach(() => _resetDeprecationWarnings());

  test('deprecation header warns once', async () => {
    const { client, logger } = makeClient({ ok: true }, DEPRECATION_HEADERS);

    await client.post('/v1beta/search');
    await client.post('/v1beta/search');

    expect(logger.warn).toHaveBeenCalledTimes(1);
    expect(logger.warn).toHaveBeenCalledWith(
      'Parallel API: POST /v1beta/search is deprecated. Use https://api.parallel.ai/v1/search instead. ' +
        'See https://docs.parallel.ai/search/search-migration-guide',
    );
  });

  test('sunset header is shown', async () => {
    const { client, logger } = makeClient(
      {},
      { Deprecation: '@1767225600', Sunset: 'Wed, 01 Jul 2026 00:00:00 GMT' },
    );

    await client.get('/v1beta/extract');

    expect(logger.warn).toHaveBeenCalledWith(
      'Parallel API: GET /v1beta/extract is deprecated and will be removed after Wed, 01 Jul 2026 00:00:00 GMT.',
    );
  });

  test('body deprecation warning', async () => {
    const { client, logger } = makeClient({
      results: [],
      warnings: [
        { type: 'spec_validation_warning', message: 'not a deprecation' },
        {
          type: 'deprecation_warning',
          message: 'This endpoint is deprecated. Use /v1/search instead.',
          detail: {
            replacement_endpoint: '/v1/search',
            documentation: 'https://docs.parallel.ai/search/search-migration-guide',
          },
        },
      ],
    });

    await client.post('/v1beta/search');
    await client.post('/v1beta/search');

    expect(logger.warn).toHaveBeenCalledTimes(1);
    expect(logger.warn).toHaveBeenCalledWith(
      'Parallel API: This endpoint is deprecated. Use /v1/search instead. ' +
        'See https://docs.parallel.ai/search/search-migration-guide',
    );
  });

  test('header and body warn only once', async () => {
    const { client, logger } = makeClient(
      { warnings: [{ type: 'deprecation_warning', message: 'Deprecated.' }] },
      DEPRECATION_HEADERS,
    );

    await client.post('/v1beta/search');

    expect(logger.warn).toHaveBeenCalledTimes(1);
    expect(logger.warn.mock.calls[0][0]).toContain('POST /v1beta/search is deprecated');
  });

  test('no warning without a deprecation signal', async () => {
    const { client, logger } = makeClient({ warnings: [{ type: 'other', message: 'hi' }] });

    await client.post('/v1/search');

    expect(logger.warn).not.toHaveBeenCalled();
  });

  test('logLevel error hides the warning', async () => {
    const { client, logger } = makeClient({}, DEPRECATION_HEADERS);

    await client.withOptions({ logLevel: 'error' }).post('/v1beta/search');

    expect(logger.warn).not.toHaveBeenCalled();
  });
});
