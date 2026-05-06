// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import * as TopLevelAPI from '../top-level';
import * as FindAllAPI from './findall';
import {
  FindAll,
  FindAllCancelParams,
  FindAllCandidate,
  FindAllCandidateMatchStatusEvent,
  FindAllCandidateMetrics,
  FindAllCandidatesParams,
  FindAllCandidatesRequest,
  FindAllCandidatesResponse,
  FindAllCreateParams,
  FindAllEnrichInput,
  FindAllEnrichParams,
  FindAllEventsParams,
  FindAllEventsResponse,
  FindAllExtendInput,
  FindAllExtendParams,
  FindAllIngestParams,
  FindAllResultParams,
  FindAllRetrieveParams,
  FindAllRun,
  FindAllRunInput,
  FindAllRunResult,
  FindAllRunStatus,
  FindAllRunStatusEvent,
  FindAllSchema,
  FindAllSchemaParams,
  FindAllSchemaUpdatedEvent,
  IngestInput,
  MatchCondition,
} from './findall';
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
  TaskGroupStatusEvent,
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
  findall: FindAllAPI.FindAll = new FindAllAPI.FindAll(this._client);

  /**
   * Extracts relevant content from specific web URLs.
   *
   * @deprecated Use client.extract instead. For more info, see https://docs.parallel.ai/extract/extract-migration-guide
   */
  extract(params: BetaExtractParams, options?: RequestOptions): APIPromise<ExtractResponse> {
    const { betas, ...body } = params;
    return this._client.post('/v1beta/extract', {
      body,
      ...options,
      headers: buildHeaders([
        { 'parallel-beta': [...(betas ?? []), 'search-extract-2025-10-10'].toString() },
        options?.headers,
      ]),
    });
  }

  /**
   * Searches the web.
   *
   * @deprecated Use client.search instead. For more info, see https://docs.parallel.ai/search/search-migration-guide
   */
  search(params: BetaSearchParams, options?: RequestOptions): APIPromise<SearchResult> {
    const { betas, ...body } = params;
    return this._client.post('/v1beta/search', {
      body,
      ...options,
      headers: buildHeaders([
        { 'parallel-beta': [...(betas ?? []), 'search-extract-2025-10-10'].toString() },
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
   * Optional upper bound on the total number of characters to include per url.
   * Excerpts may contain fewer characters than this limit to maximize relevance and
   * token efficiency. Values below 1000 will be automatically set to 1000.
   */
  max_chars_per_result?: number | null;

  /**
   * Optional upper bound on the total number of characters to include across all
   * urls. Results may contain fewer characters than this limit to maximize relevance
   * and token efficiency. Values below 1000 will be automatically set to 1000. This
   * overall limit applies in addition to max_chars_per_result.
   */
  max_chars_total?: number | null;
}

/**
 * Fetch result.
 */
export interface ExtractResponse {
  /**
   * Extract errors: requested URLs not in the results.
   */
  errors: Array<TopLevelAPI.ExtractError>;

  /**
   * Extract request ID, e.g. `extract_cad0a6d2dec046bd95ae900527d880e7`
   */
  extract_id: string;

  /**
   * Successful extract results.
   */
  results: Array<ExtractResult>;

  /**
   * Usage metrics for the extract request.
   */
  usage?: Array<TopLevelAPI.UsageItem> | null;

  /**
   * Warnings for the extract request, if any.
   */
  warnings?: Array<Shared.Warning> | null;
}

/**
 * Extract result for a single URL.
 */
export interface ExtractResult {
  /**
   * URL associated with the search result.
   */
  url: string;

  /**
   * Relevant excerpted content from the URL, formatted as markdown.
   */
  excerpts?: Array<string> | null;

  /**
   * Full content from the URL formatted as markdown, if requested.
   */
  full_content?: string | null;

  /**
   * Publish date of the webpage in YYYY-MM-DD format, if available.
   */
  publish_date?: string | null;

  /**
   * Title of the webpage, if available.
   */
  title?: string | null;
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

  /**
   * Usage metrics for the search request.
   */
  usage?: Array<TopLevelAPI.UsageItem> | null;

  /**
   * Warnings for the search request, if any.
   */
  warnings?: Array<Shared.Warning> | null;
}

/**
 * A single search result from the web search API.
 */
export interface WebSearchResult {
  /**
   * URL associated with the search result.
   */
  url: string;

  /**
   * Relevant excerpted content from the URL, formatted as markdown.
   */
  excerpts?: Array<string> | null;

  /**
   * Publish date of the webpage in YYYY-MM-DD format, if available.
   */
  publish_date?: string | null;

  /**
   * Title of the webpage, if available.
   */
  title?: string | null;
}

export type ExtractError = TopLevelAPI.ExtractError;

export type FetchPolicy = TopLevelAPI.FetchPolicy;

export type FullContentSettings = TopLevelAPI.FullContentSettings;

export type UsageItem = TopLevelAPI.UsageItem;

export interface BetaExtractParams {
  /**
   * Body param
   */
  urls: Array<string>;

  /**
   * Body param: The model generating this request and consuming the results. Enables
   * optimizations and tailors default settings for the model's capabilities.
   */
  client_model?: string | null;

  /**
   * Body param: Include excerpts from each URL relevant to the search objective and
   * queries. Note that if neither objective nor search_queries is provided, excerpts
   * are redundant with full content.
   */
  excerpts?: boolean | ExcerptSettings;

  /**
   * Body param: Policy for live fetching web results.
   */
  fetch_policy?: TopLevelAPI.FetchPolicy | null;

  /**
   * Body param: Include full content from each URL. Note that if neither objective
   * nor search_queries is provided, excerpts are redundant with full content.
   */
  full_content?: boolean | TopLevelAPI.FullContentSettings;

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
   * Body param: Session identifier to track calls across separate search and extract
   * calls, to be used as part of a larger task. Specifying it may give better
   * contextual results for subsequent API calls.
   */
  session_id?: string | null;

  /**
   * Header param: Optional header to specify the beta version(s) to enable.
   */
  betas?: Array<TaskRunAPI.ParallelBeta>;
}

export interface BetaSearchParams {
  /**
   * Body param: The model generating this request and consuming the results. Enables
   * optimizations and tailors default settings for the model's capabilities.
   */
  client_model?: string | null;

  /**
   * Body param: Optional settings to configure excerpt generation.
   */
  excerpts?: ExcerptSettings;

  /**
   * Body param: Policy for live fetching web results.
   */
  fetch_policy?: TopLevelAPI.FetchPolicy | null;

  /**
   * Body param: ISO 3166-1 alpha-2 country code for geo-targeted search results.
   */
  location?: string | null;

  /**
   * @deprecated Body param: DEPRECATED: Use `excerpts.max_chars_per_result` instead.
   */
  max_chars_per_result?: number | null;

  /**
   * Body param: Upper bound on the number of results to return. Defaults to 10 if
   * not provided.
   */
  max_results?: number | null;

  /**
   * Body param: Presets default values for parameters for different use cases.
   *
   * - `one-shot` returns more comprehensive results and longer excerpts to answer
   *   questions from a single response
   * - `agentic` returns more concise, token-efficient results for use in an agentic
   *   loop
   * - `fast` trades some quality for lower latency, with best results when used with
   *   concise and high-quality objective and keyword queries
   */
  mode?: 'one-shot' | 'agentic' | 'fast' | null;

  /**
   * Body param: Natural-language description of what the web search is trying to
   * find. May include guidance about preferred sources or freshness. At least one of
   * objective or search_queries must be provided.
   */
  objective?: string | null;

  /**
   * @deprecated Body param: DEPRECATED: use `mode` instead.
   */
  processor?: 'base' | 'pro' | null;

  /**
   * Body param: Optional list of traditional keyword search queries to guide the
   * search. May contain search operators. At least one of objective or
   * search_queries must be provided.
   */
  search_queries?: Array<string> | null;

  /**
   * Body param: Session identifier to track calls across separate search and extract
   * calls, to be used as part of a larger task. Specifying it may give better
   * contextual results for subsequent API calls.
   */
  session_id?: string | null;

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
Beta.TaskGroup = TaskGroup;
Beta.FindAll = FindAll;

export declare namespace Beta {
  export {
    type ExcerptSettings as ExcerptSettings,
    type ExtractResponse as ExtractResponse,
    type ExtractResult as ExtractResult,
    type SearchResult as SearchResult,
    type WebSearchResult as WebSearchResult,
    type ExtractError as ExtractError,
    type FetchPolicy as FetchPolicy,
    type FullContentSettings as FullContentSettings,
    type UsageItem as UsageItem,
    type BetaExtractParams as BetaExtractParams,
    type BetaSearchParams as BetaSearchParams,
  };

  export {
    TaskRun as TaskRun,
    type ParallelBeta as ParallelBeta,
    type TaskRunEventsResponse as TaskRunEventsResponse,
    type BetaRunInput as BetaRunInput,
    type BetaTaskRunResult as BetaTaskRunResult,
    type Webhook as Webhook,
    type McpServer as McpServer,
    type McpToolCall as McpToolCall,
    type TaskRunEvent as TaskRunEvent,
    type ErrorEvent as ErrorEvent,
    type TaskRunCreateParams as TaskRunCreateParams,
    type TaskRunResultParams as TaskRunResultParams,
  };

  export {
    TaskGroup as TaskGroup,
    type TaskGroupEventsResponse as TaskGroupEventsResponse,
    type TaskGroupGetRunsResponse as TaskGroupGetRunsResponse,
    type TaskGroupStatus as TaskGroupStatus,
    type TaskGroupStatusEvent as TaskGroupStatusEvent,
    type TaskGroupRunResponse as TaskGroupRunResponse,
    type TaskGroupCreateParams as TaskGroupCreateParams,
    type TaskGroupAddRunsParams as TaskGroupAddRunsParams,
    type TaskGroupEventsParams as TaskGroupEventsParams,
    type TaskGroupGetRunsParams as TaskGroupGetRunsParams,
  };

  export {
    FindAll as FindAll,
    type FindAllCandidate as FindAllCandidate,
    type FindAllCandidateMatchStatusEvent as FindAllCandidateMatchStatusEvent,
    type FindAllCandidateMetrics as FindAllCandidateMetrics,
    type FindAllCandidatesRequest as FindAllCandidatesRequest,
    type FindAllCandidatesResponse as FindAllCandidatesResponse,
    type FindAllEnrichInput as FindAllEnrichInput,
    type FindAllExtendInput as FindAllExtendInput,
    type FindAllRun as FindAllRun,
    type FindAllRunInput as FindAllRunInput,
    type FindAllRunResult as FindAllRunResult,
    type FindAllRunStatus as FindAllRunStatus,
    type FindAllRunStatusEvent as FindAllRunStatusEvent,
    type FindAllSchema as FindAllSchema,
    type FindAllSchemaUpdatedEvent as FindAllSchemaUpdatedEvent,
    type IngestInput as IngestInput,
    type MatchCondition as MatchCondition,
    type FindAllEventsResponse as FindAllEventsResponse,
    type FindAllCreateParams as FindAllCreateParams,
    type FindAllRetrieveParams as FindAllRetrieveParams,
    type FindAllCancelParams as FindAllCancelParams,
    type FindAllCandidatesParams as FindAllCandidatesParams,
    type FindAllEnrichParams as FindAllEnrichParams,
    type FindAllEventsParams as FindAllEventsParams,
    type FindAllExtendParams as FindAllExtendParams,
    type FindAllIngestParams as FindAllIngestParams,
    type FindAllResultParams as FindAllResultParams,
    type FindAllSchemaParams as FindAllSchemaParams,
  };
}
