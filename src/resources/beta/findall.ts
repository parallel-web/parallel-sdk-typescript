// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as TaskRunAPI from '../task-run';
import { APIPromise } from '../../core/api-promise';
import { Stream } from '../../core/streaming';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * The FindAll API discovers and evaluates entities that match complex criteria from natural language objectives. Submit a high-level goal and the service automatically generates structured match conditions, discovers relevant candidates, and evaluates each against the criteria. Returns comprehensive results with detailed reasoning, citations, and confidence scores for each match decision. Streaming events and webhooks are supported.
 */
export class FindAll extends APIResource {
  /**
   * Starts a FindAll run.
   *
   * This endpoint immediately returns a FindAll run object with status set to
   * 'queued'. You can get the run result snapshot using the GET
   * /v1beta/findall/runs/{findall_id}/result endpoint. You can track the progress of
   * the run by:
   *
   * - Polling the status using the GET /v1beta/findall/runs/{findall_id} endpoint,
   * - Subscribing to real-time updates via the
   *   /v1beta/findall/runs/{findall_id}/events endpoint,
   * - Or specifying a webhook with relevant event types during run creation to
   *   receive notifications.
   *
   * @example
   * ```ts
   * const findallRun = await client.beta.findall.create({
   *   entity_type: 'entity_type',
   *   generator: 'base',
   *   match_conditions: [
   *     {
   *       description:
   *         "Company must have SOC2 Type II certification (not Type I). Look for evidence in: trust centers, security/compliance pages, audit reports, or press releases specifically mentioning 'SOC2 Type II'. If no explicit SOC2 Type II mention is found, consider requirement not satisfied.",
   *       name: 'name',
   *     },
   *   ],
   *   match_limit: 0,
   *   objective: 'objective',
   * });
   * ```
   */
  create(params: FindAllCreateParams, options?: RequestOptions): APIPromise<FindAllRun> {
    const { betas, ...body } = params;
    return this._client.post('/v1beta/findall/runs', {
      body,
      ...options,
      headers: buildHeaders([
        { 'parallel-beta': [...(betas ?? []), 'findall-2025-09-15'].toString() },
        options?.headers,
      ]),
    });
  }

  /**
   * Retrieve a FindAll run.
   *
   * @example
   * ```ts
   * const findallRun = await client.beta.findall.retrieve(
   *   'findall_id',
   * );
   * ```
   */
  retrieve(
    findallID: string,
    params: FindAllRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FindAllRun> {
    const { betas } = params ?? {};
    return this._client.get(path`/v1beta/findall/runs/${findallID}`, {
      ...options,
      headers: buildHeaders([
        { 'parallel-beta': [...(betas ?? []), 'findall-2025-09-15'].toString() },
        options?.headers,
      ]),
    });
  }

  /**
   * Cancel a FindAll run.
   *
   * @example
   * ```ts
   * await client.beta.findall.cancel('findall_id');
   * ```
   */
  cancel(
    findallID: string,
    params: FindAllCancelParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { betas } = params ?? {};
    return this._client.post(path`/v1beta/findall/runs/${findallID}/cancel`, {
      ...options,
      headers: buildHeaders([
        { 'parallel-beta': [...(betas ?? []), 'findall-2025-09-15'].toString(), Accept: '*/*' },
        options?.headers,
      ]),
    });
  }

  /**
   * Add an enrichment to a FindAll run.
   *
   * @example
   * ```ts
   * const findallSchema = await client.beta.findall.enrich(
   *   'findall_id',
   *   {
   *     output_schema: {
   *       json_schema: {
   *         additionalProperties: 'bar',
   *         properties: 'bar',
   *         required: 'bar',
   *         type: 'bar',
   *       },
   *     },
   *   },
   * );
   * ```
   */
  enrich(
    findallID: string,
    params: FindAllEnrichParams,
    options?: RequestOptions,
  ): APIPromise<FindAllSchema> {
    const { betas, ...body } = params;
    return this._client.post(path`/v1beta/findall/runs/${findallID}/enrich`, {
      body,
      ...options,
      headers: buildHeaders([
        { 'parallel-beta': [...(betas ?? []), 'findall-2025-09-15'].toString() },
        options?.headers,
      ]),
    });
  }

  /**
   * Return ranked entities matching a natural language objective.
   *
   * This endpoint performs a best-effort search optimized for low latency. To keep
   * responses fast, it returns a fixed set of attributes and supports queries of
   * limited complexity.
   *
   * For comprehensive match evaluation and enrichment, use the
   * [FindAll API](https://docs.parallel.ai/findall-api/findall-quickstart).
   *
   * @example
   * ```ts
   * const findallEntitySearchResponse =
   *   await client.beta.findall.entitySearch({
   *     entity_type: 'people',
   *     objective: 'objective',
   *   });
   * ```
   */
  entitySearch(
    body: FindAllEntitySearchParams,
    options?: RequestOptions,
  ): APIPromise<FindAllEntitySearchResponse> {
    return this._client.post('/v1beta/findall/entity-search', {
      body,
      ...options,
      headers: buildHeaders([{ 'parallel-beta': 'findall-2025-09-15' }, options?.headers]),
    });
  }

  /**
   * Stream events from a FindAll run.
   *
   * Args: request: The Shapi request findall_id: The FindAll run ID last_event_id:
   * Optional event ID to resume from. timeout: Optional timeout in seconds. If None,
   * keep connection alive as long as the run is going. If set, stop after specified
   * duration.
   *
   * @example
   * ```ts
   * const response = await client.beta.findall.events(
   *   'findall_id',
   * );
   * ```
   */
  events(
    findallID: string,
    params: FindAllEventsParams | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Stream<FindAllEventsResponse>> {
    const { betas, ...query } = params ?? {};
    return this._client.get(path`/v1beta/findall/runs/${findallID}/events`, {
      query,
      ...options,
      headers: buildHeaders([
        { 'parallel-beta': [...(betas ?? []), 'findall-2025-09-15'].toString(), Accept: 'text/event-stream' },
        options?.headers,
      ]),
      stream: true,
    }) as APIPromise<Stream<FindAllEventsResponse>>;
  }

  /**
   * Extend a FindAll run by adding additional matches to the current match limit.
   *
   * @example
   * ```ts
   * const findallSchema = await client.beta.findall.extend(
   *   'findall_id',
   *   { additional_match_limit: 0 },
   * );
   * ```
   */
  extend(
    findallID: string,
    params: FindAllExtendParams,
    options?: RequestOptions,
  ): APIPromise<FindAllSchema> {
    const { betas, ...body } = params;
    return this._client.post(path`/v1beta/findall/runs/${findallID}/extend`, {
      body,
      ...options,
      headers: buildHeaders([
        { 'parallel-beta': [...(betas ?? []), 'findall-2025-09-15'].toString() },
        options?.headers,
      ]),
    });
  }

  /**
   * Transforms a natural language search objective into a structured FindAll spec.
   *
   * The generated specification serves as a suggested starting point and can be
   * further customized by the user.
   *
   * @example
   * ```ts
   * const findallSchema = await client.beta.findall.ingest({
   *   objective:
   *     'Find all AI companies that raised Series A funding in 2024',
   * });
   * ```
   */
  ingest(params: FindAllIngestParams, options?: RequestOptions): APIPromise<FindAllSchema> {
    const { betas, ...body } = params;
    return this._client.post('/v1beta/findall/ingest', {
      body,
      ...options,
      headers: buildHeaders([
        { 'parallel-beta': [...(betas ?? []), 'findall-2025-09-15'].toString() },
        options?.headers,
      ]),
    });
  }

  /**
   * Retrieve the FindAll run result at the time of the request.
   *
   * @example
   * ```ts
   * const findallRunResult = await client.beta.findall.result(
   *   'findall_id',
   * );
   * ```
   */
  result(
    findallID: string,
    params: FindAllResultParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FindAllRunResult> {
    const { betas } = params ?? {};
    return this._client.get(path`/v1beta/findall/runs/${findallID}/result`, {
      ...options,
      headers: buildHeaders([
        { 'parallel-beta': [...(betas ?? []), 'findall-2025-09-15'].toString() },
        options?.headers,
      ]),
    });
  }

  /**
   * Get FindAll Run Schema
   *
   * @example
   * ```ts
   * const findallSchema = await client.beta.findall.schema(
   *   'findall_id',
   * );
   * ```
   */
  schema(
    findallID: string,
    params: FindAllSchemaParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FindAllSchema> {
    const { betas } = params ?? {};
    return this._client.get(path`/v1beta/findall/runs/${findallID}/schema`, {
      ...options,
      headers: buildHeaders([
        { 'parallel-beta': [...(betas ?? []), 'findall-2025-09-15'].toString() },
        options?.headers,
      ]),
    });
  }
}

/**
 * Candidate for a find all run that may end up as a match.
 *
 * Contains all the candidate's metadata and the output of the match conditions. A
 * candidate is a match if all match conditions are satisfied.
 */
export interface FindAllCandidate {
  /**
   * ID of the candidate.
   */
  candidate_id: string;

  /**
   * Status of the candidate. One of generated, matched, unmatched, discarded.
   */
  match_status: 'generated' | 'matched' | 'unmatched' | 'discarded';

  /**
   * Name of the candidate.
   */
  name: string;

  /**
   * URL that provides context or details of the entity for disambiguation.
   */
  url: string;

  /**
   * List of FieldBasis objects supporting the output.
   */
  basis?: Array<TaskRunAPI.FieldBasis> | null;

  /**
   * Brief description of the entity that can help answer whether entity satisfies
   * the query.
   */
  description?: string | null;

  /**
   * Results of the match condition evaluations for this candidate. This object
   * contains the structured output that determines whether the candidate matches the
   * overall FindAll objective.
   */
  output?: { [key: string]: unknown } | null;
}

/**
 * Event containing a candidate whose match status has changed.
 */
export interface FindAllCandidateMatchStatusEvent {
  /**
   * The candidate whose match status has been updated.
   */
  data: FindAllCandidate;

  /**
   * Unique event identifier for the event.
   */
  event_id: string;

  /**
   * Timestamp of the event.
   */
  timestamp: string;

  /**
   * Event type; one of findall.candidate.generated, findall.candidate.matched,
   * findall.candidate.unmatched, findall.candidate.discarded,
   * findall.candidate.enriched.
   */
  type:
    | 'findall.candidate.generated'
    | 'findall.candidate.matched'
    | 'findall.candidate.unmatched'
    | 'findall.candidate.discarded'
    | 'findall.candidate.enriched';
}

/**
 * Metrics object for FindAll run.
 */
export interface FindAllCandidateMetrics {
  /**
   * Number of candidates that were selected.
   */
  generated_candidates_count?: number;

  /**
   * Number of candidates that evaluated to matched.
   */
  matched_candidates_count?: number;
}

/**
 * Input model for FindAll enrich.
 */
export interface FindAllEnrichInput {
  /**
   * JSON schema for the enrichment output schema for the FindAll run.
   */
  output_schema: TaskRunAPI.JsonSchema;

  /**
   * List of MCP servers to use for the task.
   */
  mcp_servers?: Array<TaskRunAPI.McpServer> | null;

  /**
   * Processor to use for the task.
   */
  processor?: string;
}

export interface FindAllEntitySearchRequest {
  /**
   * Type of entity to search for.
   */
  entity_type: 'people' | 'companies';

  /**
   * Natural language description of target entities.
   */
  objective: string;

  /**
   * Maximum number of entities to return. Must be between 5 and 1000 (inclusive).
   * May return fewer results. Defaults to 100.
   */
  match_limit?: number;
}

export interface FindAllEntitySearchResponse {
  /**
   * Ranked list of entities.
   */
  entities: Array<FindAllEntitySearchResponse.Entity>;

  /**
   * Entity set request ID. Example: `entity_set_cad0a6d2dec046bd95ae900527d880e7`
   */
  entity_set_id: string;
}

export namespace FindAllEntitySearchResponse {
  export interface Entity {
    /**
     * Descriptive text about the entity.
     */
    description: string;

    /**
     * Entity name.
     */
    name: string;

    /**
     * Canonical URL for the entity.
     */
    url: string;
  }
}

/**
 * Input model for FindAll extend.
 */
export interface FindAllExtendInput {
  /**
   * Additional number of matches to find for this FindAll run. This value will be
   * added to the current match limit to determine the new total match limit. Must be
   * greater than 0.
   */
  additional_match_limit: number;
}

/**
 * FindAll run object with status and metadata.
 */
export interface FindAllRun {
  /**
   * ID of the FindAll run.
   */
  findall_id: string;

  /**
   * Generator for the FindAll run.
   */
  generator: 'base' | 'core' | 'pro' | 'preview';

  /**
   * Status object for the FindAll run.
   */
  status: FindAllRunStatus;

  /**
   * Timestamp of the creation of the run, in RFC 3339 format.
   */
  created_at?: string | null;

  /**
   * Metadata for the FindAll run.
   */
  metadata?: { [key: string]: string | number | boolean } | null;

  /**
   * Timestamp of the latest modification to the FindAll run result, in RFC 3339
   * format.
   */
  modified_at?: string | null;
}

/**
 * Input model for FindAll run.
 */
export interface FindAllRunInput {
  /**
   * Type of the entity for the FindAll run.
   */
  entity_type: string;

  /**
   * Generator for the FindAll run. One of base, core, pro, preview.
   */
  generator: 'base' | 'core' | 'pro' | 'preview';

  /**
   * List of match conditions for the FindAll run.
   */
  match_conditions: Array<MatchCondition>;

  /**
   * Maximum number of matches to find for this FindAll run. Must be between 5 and
   * 1000 (inclusive). May return fewer results.
   */
  match_limit: number;

  /**
   * Natural language objective of the FindAll run.
   */
  objective: string;

  /**
   * List of entity names/IDs to exclude from results.
   */
  exclude_list?: Array<FindAllRunInput.ExcludeList> | null;

  /**
   * Metadata for the FindAll run.
   */
  metadata?: { [key: string]: string | number | boolean } | null;

  /**
   * Webhooks for Task Runs.
   */
  webhook?: TaskRunAPI.Webhook | null;
}

export namespace FindAllRunInput {
  /**
   * Exclude candidate input model for FindAll run.
   */
  export interface ExcludeList {
    /**
     * Name of the entity to exclude from results.
     */
    name: string;

    /**
     * URL of the entity to exclude from results.
     */
    url: string;
  }
}

/**
 * Complete FindAll search results.
 *
 * Represents a snapshot of a FindAll run, including run metadata and a list of
 * candidate entities with their match status and details at the time the snapshot
 * was taken.
 */
export interface FindAllRunResult {
  /**
   * All evaluated candidates at the time of the snapshot.
   */
  candidates: Array<FindAllCandidate>;

  /**
   * FindAll run object.
   */
  run: FindAllRun;

  /**
   * ID of the last event of the run at the time of the request. This can be used to
   * resume streaming from the last event.
   */
  last_event_id?: string | null;
}

/**
 * Status object for FindAll run.
 */
export interface FindAllRunStatus {
  /**
   * Whether the FindAll run is active
   */
  is_active: boolean;

  /**
   * Candidate metrics for the FindAll run.
   */
  metrics: FindAllCandidateMetrics;

  /**
   * Status of the FindAll run.
   */
  status: 'queued' | 'action_required' | 'running' | 'completed' | 'failed' | 'cancelling' | 'cancelled';

  /**
   * Reason for termination when FindAll run is in terminal status.
   */
  termination_reason?:
    | 'low_match_rate'
    | 'match_limit_met'
    | 'candidates_exhausted'
    | 'user_cancelled'
    | 'error_occurred'
    | 'timeout'
    | 'insufficient_funds'
    | null;
}

/**
 * Event containing status update for FindAll run.
 */
export interface FindAllRunStatusEvent {
  /**
   * Updated FindAll run information.
   */
  data: FindAllRun;

  /**
   * Unique event identifier for the event.
   */
  event_id: string;

  /**
   * Timestamp of the event.
   */
  timestamp: string;

  /**
   * Event type; always 'findall.status'.
   */
  type: 'findall.status';
}

/**
 * Response model for FindAll ingest.
 */
export interface FindAllSchema {
  /**
   * Type of the entity for the FindAll run.
   */
  entity_type: string;

  /**
   * List of match conditions for the FindAll run.
   */
  match_conditions: Array<MatchCondition>;

  /**
   * Natural language objective of the FindAll run.
   */
  objective: string;

  /**
   * List of enrichment inputs for the FindAll run.
   */
  enrichments?: Array<FindAllEnrichInput> | null;

  /**
   * The generator of the FindAll run.
   */
  generator?: 'base' | 'core' | 'pro' | 'preview';

  /**
   * Max number of candidates to evaluate
   */
  match_limit?: number | null;
}

/**
 * Event containing full snapshot of FindAll run state.
 */
export interface FindAllSchemaUpdatedEvent {
  /**
   * Updated FindAll schema.
   */
  data: FindAllSchema;

  /**
   * Unique event identifier for the event.
   */
  event_id: string;

  /**
   * Timestamp of the event.
   */
  timestamp: string;

  /**
   * Event type; always 'findall.schema.updated'.
   */
  type: 'findall.schema.updated';
}

/**
 * Input model for FindAll ingest.
 */
export interface IngestInput {
  /**
   * Natural language objective to create a FindAll run spec.
   */
  objective: string;
}

/**
 * Match condition model for FindAll ingest.
 */
export interface MatchCondition {
  /**
   * Detailed description of the match condition. Include as much specific
   * information as possible to help improve the quality and accuracy of Find All run
   * results.
   */
  description: string;

  /**
   * Name of the match condition.
   */
  name: string;
}

/**
 * Model for the parallel-beta header.
 */
export type ParallelBeta =
  | 'mcp-server-2025-07-17'
  | 'events-sse-2025-07-24'
  | 'webhook-2025-08-12'
  | 'findall-2025-09-15'
  | 'search-extract-2025-10-10'
  | 'field-basis-2025-11-25'
  | (string & {});

/**
 * Event containing full snapshot of FindAll run state.
 */
export type FindAllEventsResponse =
  | FindAllSchemaUpdatedEvent
  | FindAllRunStatusEvent
  | FindAllCandidateMatchStatusEvent
  | TaskRunAPI.ErrorEvent;

export interface FindAllCreateParams {
  /**
   * Body param: Type of the entity for the FindAll run.
   */
  entity_type: string;

  /**
   * Body param: Generator for the FindAll run. One of base, core, pro, preview.
   */
  generator: 'base' | 'core' | 'pro' | 'preview';

  /**
   * Body param: List of match conditions for the FindAll run.
   */
  match_conditions: Array<MatchCondition>;

  /**
   * Body param: Maximum number of matches to find for this FindAll run. Must be
   * between 5 and 1000 (inclusive). May return fewer results.
   */
  match_limit: number;

  /**
   * Body param: Natural language objective of the FindAll run.
   */
  objective: string;

  /**
   * Body param: List of entity names/IDs to exclude from results.
   */
  exclude_list?: Array<FindAllCreateParams.ExcludeList> | null;

  /**
   * Body param: Metadata for the FindAll run.
   */
  metadata?: { [key: string]: string | number | boolean } | null;

  /**
   * Body param: Webhooks for Task Runs.
   */
  webhook?: TaskRunAPI.Webhook | null;

  /**
   * Header param: Optional header to specify the beta version(s) to enable.
   */
  betas?: Array<ParallelBeta>;
}

export namespace FindAllCreateParams {
  /**
   * Exclude candidate input model for FindAll run.
   */
  export interface ExcludeList {
    /**
     * Name of the entity to exclude from results.
     */
    name: string;

    /**
     * URL of the entity to exclude from results.
     */
    url: string;
  }
}

export interface FindAllRetrieveParams {
  /**
   * Optional header to specify the beta version(s) to enable.
   */
  betas?: Array<ParallelBeta>;
}

export interface FindAllCancelParams {
  /**
   * Optional header to specify the beta version(s) to enable.
   */
  betas?: Array<ParallelBeta>;
}

export interface FindAllEnrichParams {
  /**
   * Body param: JSON schema for the enrichment output schema for the FindAll run.
   */
  output_schema: TaskRunAPI.JsonSchema;

  /**
   * Body param: List of MCP servers to use for the task.
   */
  mcp_servers?: Array<TaskRunAPI.McpServer> | null;

  /**
   * Body param: Processor to use for the task.
   */
  processor?: string;

  /**
   * Header param: Optional header to specify the beta version(s) to enable.
   */
  betas?: Array<ParallelBeta>;
}

export interface FindAllEntitySearchParams {
  /**
   * Type of entity to search for.
   */
  entity_type: 'people' | 'companies';

  /**
   * Natural language description of target entities.
   */
  objective: string;

  /**
   * Maximum number of entities to return. Must be between 5 and 1000 (inclusive).
   * May return fewer results. Defaults to 100.
   */
  match_limit?: number;
}

export interface FindAllEventsParams {
  /**
   * Query param
   */
  last_event_id?: string | null;

  /**
   * Query param
   */
  timeout?: number | null;

  /**
   * Header param: Optional header to specify the beta version(s) to enable.
   */
  betas?: Array<ParallelBeta>;
}

export interface FindAllExtendParams {
  /**
   * Body param: Additional number of matches to find for this FindAll run. This
   * value will be added to the current match limit to determine the new total match
   * limit. Must be greater than 0.
   */
  additional_match_limit: number;

  /**
   * Header param: Optional header to specify the beta version(s) to enable.
   */
  betas?: Array<ParallelBeta>;
}

export interface FindAllIngestParams {
  /**
   * Body param: Natural language objective to create a FindAll run spec.
   */
  objective: string;

  /**
   * Header param: Optional header to specify the beta version(s) to enable.
   */
  betas?: Array<ParallelBeta>;
}

export interface FindAllResultParams {
  /**
   * Optional header to specify the beta version(s) to enable.
   */
  betas?: Array<ParallelBeta>;
}

export interface FindAllSchemaParams {
  /**
   * Optional header to specify the beta version(s) to enable.
   */
  betas?: Array<ParallelBeta>;
}

export declare namespace FindAll {
  export {
    type FindAllCandidate as FindAllCandidate,
    type FindAllCandidateMatchStatusEvent as FindAllCandidateMatchStatusEvent,
    type FindAllCandidateMetrics as FindAllCandidateMetrics,
    type FindAllEnrichInput as FindAllEnrichInput,
    type FindAllEntitySearchRequest as FindAllEntitySearchRequest,
    type FindAllEntitySearchResponse as FindAllEntitySearchResponse,
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
    type ParallelBeta as ParallelBeta,
    type FindAllEventsResponse as FindAllEventsResponse,
    type FindAllCreateParams as FindAllCreateParams,
    type FindAllRetrieveParams as FindAllRetrieveParams,
    type FindAllCancelParams as FindAllCancelParams,
    type FindAllEnrichParams as FindAllEnrichParams,
    type FindAllEntitySearchParams as FindAllEntitySearchParams,
    type FindAllEventsParams as FindAllEventsParams,
    type FindAllExtendParams as FindAllExtendParams,
    type FindAllIngestParams as FindAllIngestParams,
    type FindAllResultParams as FindAllResultParams,
    type FindAllSchemaParams as FindAllSchemaParams,
  };
}
