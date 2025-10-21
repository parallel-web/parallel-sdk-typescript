// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import * as TaskGroupAPI from './task-group';
import {
  TaskGroup,
  TaskGroupAddRunsParams,
  TaskGroupCreateParams,
  TaskGroupEventsParams,
  TaskGroupEventsResponse,
  TaskGroupGetRunsParams,
  TaskGroupGetRunsResponse,
  TaskGroupRunResponse,
  TaskGroupStatus,
} from './task-group';
import * as TaskRunAPI from './task-run';
import {
  BetaRunInput,
  BetaTaskRunResult,
  ErrorEvent,
  McpServer,
  McpToolCall,
  ParallelBeta,
  TaskRun,
  TaskRunCreateParams,
  TaskRunEvent,
  TaskRunEventsResponse,
  TaskRunResultParams,
  Webhook,
} from './task-run';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';

export class Beta extends APIResource {
  taskRun: TaskRunAPI.TaskRun = new TaskRunAPI.TaskRun(this._client);
  taskGroup: TaskGroupAPI.TaskGroup = new TaskGroupAPI.TaskGroup(this._client);

  /**
   * Extracts relevant content from specific web URLs.
   *
   * To access this endpoint, pass the `parallel-beta` header with the value
   * `search-extract-2025-10-10`.
   */
  extract(params: BetaExtractParams, options?: RequestOptions): APIPromise<ExtractResponse> {
    const { betas, ...body } = params;
    return this._client.post('/v1beta/extract', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(betas?.toString() != null ? { 'parallel-beta': betas?.toString() } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Searches the web.
   */
  search(params: BetaSearchParams, options?: RequestOptions): APIPromise<SearchResult> {
    const { betas, ...body } = params;
    return this._client.post('/v1beta/search', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(betas?.toString() != null ? { 'parallel-beta': betas?.toString() } : undefined) },
        options?.headers,
      ]),
    });
  }
}

/**
 * Optional settings for returning relevant excerpts.
 */
export interface ExcerptSettings {
  /**
   * Optional upper bound on the total number of characters to include across all
   * excerpts for each url. Excerpts may contain fewer characters than this limit to
   * maximize relevance and token efficiency.
   */
  max_chars_per_result?: number | null;
}

/**
 * Extract error details.
 */
export interface ExtractError {
  /**
   * Content returned for http client or server errors, if any.
   */
  content: string | null;

  /**
   * Error type.
   */
  error_type: string;

  /**
   * HTTP status code, if available.
   */
  http_status_code: number | null;

  url: string;
}

/**
 * Fetch result.
 */
export interface ExtractResponse {
  /**
   * Extract errors: requested URLs not in the results.
   */
  errors: Array<ExtractError>;

  /**
   * Extract request ID, e.g. `extract_cad0a6d2dec046bd95ae900527d880e7`
   */
  extract_id: string;

  /**
   * Successful extract results.
   */
  results: Array<ExtractResult>;
}

/**
 * Extract result for a single URL.
 */
export interface ExtractResult {
  /**
   * Relevant excerpted content from the URL, formatted as markdown.
   */
  excerpts: Array<string> | null;

  /**
   * Full content from the URL formatted as markdown, if requested.
   */
  full_content: string | null;

  /**
   * Publish date of the webpage, if available.
   */
  publish_date: string | null;

  /**
   * Title of the webpage, if available.
   */
  title: string | null;

  url: string;
}

/**
 * Fetch policy.
 *
 * Determines when to return content from the cache (faster) vs fetching live
 * content (fresher).
 */
export interface FetchPolicy {
  /**
   * If false, fallback to cached content older than max-age if live fetch fails or
   * times out. If true, returns an error instead.
   */
  disable_cache_fallback?: boolean;

  /**
   * Maximum age of cached content in seconds to trigger a live fetch. Minimum value
   * 600 seconds (10 minutes). If not provided, a dynamic age policy will be used
   * based on the search objective and url.
   */
  max_age_seconds?: number | null;

  /**
   * Timeout in seconds for fetching live content if unavailable in cache. If
   * unspecified a dynamic timeout will be used based on the url, generally 15
   * seconds for simple pages and up to 60 seconds for complex pages requiring
   * javascript or PDF rendering.
   */
  timeout_seconds?: number | null;
}

/**
 * Output for the Search API.
 */
export interface SearchResult {
  /**
   * A list of WebSearchResult objects, ordered by decreasing relevance.
   */
  results: Array<WebSearchResult>;

  /**
   * Search ID. Example: `search_cad0a6d2dec046bd95ae900527d880e7`
   */
  search_id: string;
}

/**
 * A single search result from the web search API.
 */
export interface WebSearchResult {
  /**
   * Text excerpts from the search result which are relevant to the request.
   */
  excerpts: Array<string>;

  /**
   * Title of the search result.
   */
  title: string;

  /**
   * URL associated with the search result.
   */
  url: string;
}

export interface BetaExtractParams {
  /**
   * Body param:
   */
  urls: Array<string>;

  /**
   * Body param: Include excerpts from each URL relevant to the search objective and
   * queries. Note that if neither objective nor search_queries is provided, excerpts
   * are redundant with full content.
   */
  excerpts?: boolean | ExcerptSettings;

  /**
   * Body param: Fetch policy.
   *
   * Determines when to return content from the cache (faster) vs fetching live
   * content (fresher).
   */
  fetch_policy?: FetchPolicy | null;

  /**
   * Body param: Include full content from each URL. Note that if neither objective
   * nor search_queries is provided, excerpts are redundant with full content.
   */
  full_content?: boolean | BetaExtractParams.FullContentSettings;

  /**
   * Body param: If provided, focuses extracted content on the specified search
   * objective.
   */
  objective?: string | null;

  /**
   * Body param: If provided, focuses extracted content on the specified keyword
   * search queries.
   */
  search_queries?: Array<string> | null;

  /**
   * Header param: Optional header to specify the beta version(s) to enable.
   */
  betas?: Array<TaskRunAPI.ParallelBeta>;
}

export namespace BetaExtractParams {
  /**
   * Optional settings for returning full content.
   */
  export interface FullContentSettings {
    /**
     * Optional limit on the number of characters to include in the full content for
     * each url. Full content always starts at the beginning of the page and is
     * truncated at the limit if necessary.
     */
    max_chars_per_result?: number | null;
  }
}

export interface BetaSearchParams {
  /**
   * Body param: Upper bound on the number of characters to include in excerpts for
   * each search result.
   */
  max_chars_per_result?: number | null;

  /**
   * Body param: Upper bound on the number of results to return. May be limited by
   * the processor. Defaults to 10 if not provided.
   */
  max_results?: number | null;

  /**
   * Body param: Natural-language description of what the web search is trying to
   * find. May include guidance about preferred sources or freshness. At least one of
   * objective or search_queries must be provided.
   */
  objective?: string | null;

  /**
   * Body param: Search processor.
   */
  processor?: 'base' | 'pro' | null;

  /**
   * Body param: Optional list of traditional keyword search queries to guide the
   * search. May contain search operators. At least one of objective or
   * search_queries must be provided.
   */
  search_queries?: Array<string> | null;

  /**
   * Body param: Source policy for web search results.
   *
   * This policy governs which sources are allowed/disallowed in results.
   */
  source_policy?: Shared.SourcePolicy | null;

  /**
   * Header param: Optional header to specify the beta version(s) to enable.
   */
  betas?: Array<TaskRunAPI.ParallelBeta>;
}

Beta.TaskRun = TaskRun;

export declare namespace Beta {
  export {
    type ExcerptSettings as ExcerptSettings,
    type ExtractError as ExtractError,
    type ExtractResponse as ExtractResponse,
    type ExtractResult as ExtractResult,
    type FetchPolicy as FetchPolicy,
    type SearchResult as SearchResult,
    type WebSearchResult as WebSearchResult,
    type BetaExtractParams as BetaExtractParams,
    type BetaSearchParams as BetaSearchParams,
  };

  export {
    TaskRun as TaskRun,
    type BetaRunInput as BetaRunInput,
    type BetaTaskRunResult as BetaTaskRunResult,
    type ErrorEvent as ErrorEvent,
    type McpServer as McpServer,
    type McpToolCall as McpToolCall,
    type ParallelBeta as ParallelBeta,
    type TaskRunEvent as TaskRunEvent,
    type Webhook as Webhook,
    type TaskRunEventsResponse as TaskRunEventsResponse,
    type TaskRunCreateParams as TaskRunCreateParams,
    type TaskRunResultParams as TaskRunResultParams,
  };

  export {
    type TaskGroup as TaskGroup,
    type TaskGroupRunResponse as TaskGroupRunResponse,
    type TaskGroupStatus as TaskGroupStatus,
    type TaskGroupEventsResponse as TaskGroupEventsResponse,
    type TaskGroupGetRunsResponse as TaskGroupGetRunsResponse,
    type TaskGroupCreateParams as TaskGroupCreateParams,
    type TaskGroupAddRunsParams as TaskGroupAddRunsParams,
    type TaskGroupEventsParams as TaskGroupEventsParams,
    type TaskGroupGetRunsParams as TaskGroupGetRunsParams,
  };
}
