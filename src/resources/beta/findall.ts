// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as TaskRunAPI from '../task-run';
import * as BetaTaskRunAPI from './task-run';
import { APIPromise } from '../../core/api-promise';
import { Stream } from '../../core/streaming';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

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
   */
  create(params: FindAllCreateParams, options?: RequestOptions): APIPromise<FindAllRun> {
    const { betas, ...body } = params;
    return this._client.post('/v1beta/findall/runs', {
      body,
      ...options,
      headers: buildHeaders([
        { 'parallel-beta': [...(betas ?? []), 'findall-2025-02-01'].toString() },
        options?.headers,
      ]),
    });
  }

  /**
   * Retrieve a FindAll run.
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
        { 'parallel-beta': [...(betas ?? []), 'findall-2025-02-01'].toString() },
        options?.headers,
      ]),
    });
  }

  /**
   * Cancel a FindAll run.
   */
  cancel(
    findallID: string,
    params: FindAllCancelParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<unknown> {
    const { betas } = params ?? {};
    return this._client.post(path`/v1beta/findall/runs/${findallID}/cancel`, {
      ...options,
      headers: buildHeaders([
        { 'parallel-beta': [...(betas ?? []), 'findall-2025-02-01'].toString() },
        options?.headers,
      ]),
    });
  }

  /**
   * Add an enrichment to a FindAll run.
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
        { 'parallel-beta': [...(betas ?? []), 'findall-2025-02-01'].toString() },
        options?.headers,
      ]),
    });
  }

  /**
   * Stream events from a FindAll run.
   *
   * Args: request: The Shapi request findall_id: The FindAll run ID last_event_id:
   * Optional event ID to resume from. timeout: Optional timeout in seconds. If None,
   * keep connection alive as long as the run is going. If set, stop after specified
   * duration.
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
        { 'parallel-beta': [...(betas ?? []), 'findall-2025-02-01'].toString(), Accept: 'text/event-stream' },
        options?.headers,
      ]),
      stream: true,
    }) as APIPromise<Stream<FindAllEventsResponse>>;
  }

  /**
   * Extend a FindAll run by adding additional matches to the current match limit.
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
        { 'parallel-beta': [...(betas ?? []), 'findall-2025-02-01'].toString() },
        options?.headers,
      ]),
    });
  }

  /**
   * Transforms a natural language search objective into a structured FindAll spec.
   *
   * Note: Access to this endpoint requires the parallel-beta header.
   *
   * The generated specification serves as a suggested starting point and can be
   * further customized by the user.
   */
  ingest(params: FindAllIngestParams, options?: RequestOptions): APIPromise<FindAllSchema> {
    const { betas, ...body } = params;
    return this._client.post('/v1beta/findall/ingest', {
      body,
      ...options,
      headers: buildHeaders([
        { 'parallel-beta': [...(betas ?? []), 'findall-2025-02-01'].toString() },
        options?.headers,
      ]),
    });
  }

  /**
   * Retrieve the FindAll run result at the time of the request.
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
        { 'parallel-beta': [...(betas ?? []), 'findall-2025-02-01'].toString() },
        options?.headers,
      ]),
    });
  }

  /**
   * Get FindAll Run Schema
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
        { 'parallel-beta': [...(betas ?? []), 'findall-2025-02-01'].toString() },
        options?.headers,
      ]),
    });
  }
}

/**
 * Event containing a candidate whose match status has changed.
 */
export interface FindAllCandidateMatchStatusEvent {
  /**
   * The candidate whose match status has been updated.
   */
  data: FindAllCandidateMatchStatusEvent.Data;

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

export namespace FindAllCandidateMatchStatusEvent {
  /**
   * The candidate whose match status has been updated.
   */
  export interface Data {
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
  mcp_servers?: Array<BetaTaskRunAPI.McpServer> | null;

  /**
   * Processor to use for the task.
   */
  processor?: string;
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
  status: FindAllRun.Status;

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

export namespace FindAllRun {
  /**
   * Status object for the FindAll run.
   */
  export interface Status {
    /**
     * Whether the FindAll run is active
     */
    is_active: boolean;

    /**
     * Candidate metrics for the FindAll run.
     */
    metrics: Status.Metrics;

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
      | null;
  }

  export namespace Status {
    /**
     * Candidate metrics for the FindAll run.
     */
    export interface Metrics {
      /**
       * Number of candidates that were selected.
       */
      generated_candidates_count?: number;

      /**
       * Number of candidates that evaluated to matched.
       */
      matched_candidates_count?: number;
    }
  }
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
  match_conditions: Array<FindAllRunInput.MatchCondition>;

  /**
   * Maximum number of matches to find for this FindAll run. Must be between 5 and
   * 1000 (inclusive).
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
  webhook?: BetaTaskRunAPI.Webhook | null;
}

export namespace FindAllRunInput {
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
  candidates: Array<FindAllRunResult.Candidate>;

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

export namespace FindAllRunResult {
  /**
   * Candidate for a find all run that may end up as a match.
   *
   * Contains all the candidate's metadata and the output of the match conditions. A
   * candidate is a match if all match conditions are satisfied.
   */
  export interface Candidate {
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
  match_conditions: Array<FindAllSchema.MatchCondition>;

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

export namespace FindAllSchema {
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

export type FindAllCancelResponse = unknown;

/**
 * Event containing full snapshot of FindAll run state.
 */
export type FindAllEventsResponse =
  | FindAllSchemaUpdatedEvent
  | FindAllRunStatusEvent
  | FindAllCandidateMatchStatusEvent
  | BetaTaskRunAPI.ErrorEvent;

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
  match_conditions: Array<FindAllCreateParams.MatchCondition>;

  /**
   * Body param: Maximum number of matches to find for this FindAll run. Must be
   * between 5 and 1000 (inclusive).
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
  webhook?: BetaTaskRunAPI.Webhook | null;

  /**
   * Header param: Optional header to specify the beta version(s) to enable.
   */
  betas?: Array<BetaTaskRunAPI.ParallelBeta>;
}

export namespace FindAllCreateParams {
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
  betas?: Array<BetaTaskRunAPI.ParallelBeta>;
}

export interface FindAllCancelParams {
  /**
   * Optional header to specify the beta version(s) to enable.
   */
  betas?: Array<BetaTaskRunAPI.ParallelBeta>;
}

export interface FindAllEnrichParams {
  /**
   * Body param: JSON schema for the enrichment output schema for the FindAll run.
   */
  output_schema: TaskRunAPI.JsonSchema;

  /**
   * Body param: List of MCP servers to use for the task.
   */
  mcp_servers?: Array<BetaTaskRunAPI.McpServer> | null;

  /**
   * Body param: Processor to use for the task.
   */
  processor?: string;

  /**
   * Header param: Optional header to specify the beta version(s) to enable.
   */
  betas?: Array<BetaTaskRunAPI.ParallelBeta>;
}

export interface FindAllEventsParams {
  /**
   * Query param:
   */
  last_event_id?: string | null;

  /**
   * Query param:
   */
  timeout?: number | null;

  /**
   * Header param: Optional header to specify the beta version(s) to enable.
   */
  betas?: Array<BetaTaskRunAPI.ParallelBeta>;
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
  betas?: Array<BetaTaskRunAPI.ParallelBeta>;
}

export interface FindAllIngestParams {
  /**
   * Body param: Natural language objective to create a FindAll run spec.
   */
  objective: string;

  /**
   * Header param: Optional header to specify the beta version(s) to enable.
   */
  betas?: Array<BetaTaskRunAPI.ParallelBeta>;
}

export interface FindAllResultParams {
  /**
   * Optional header to specify the beta version(s) to enable.
   */
  betas?: Array<BetaTaskRunAPI.ParallelBeta>;
}

export interface FindAllSchemaParams {
  /**
   * Optional header to specify the beta version(s) to enable.
   */
  betas?: Array<BetaTaskRunAPI.ParallelBeta>;
}

export declare namespace FindAll {
  export {
    type FindAllCandidateMatchStatusEvent as FindAllCandidateMatchStatusEvent,
    type FindAllEnrichInput as FindAllEnrichInput,
    type FindAllExtendInput as FindAllExtendInput,
    type FindAllRun as FindAllRun,
    type FindAllRunInput as FindAllRunInput,
    type FindAllRunResult as FindAllRunResult,
    type FindAllRunStatusEvent as FindAllRunStatusEvent,
    type FindAllSchema as FindAllSchema,
    type FindAllSchemaUpdatedEvent as FindAllSchemaUpdatedEvent,
    type IngestInput as IngestInput,
    type FindAllCancelResponse as FindAllCancelResponse,
    type FindAllEventsResponse as FindAllEventsResponse,
    type FindAllCreateParams as FindAllCreateParams,
    type FindAllRetrieveParams as FindAllRetrieveParams,
    type FindAllCancelParams as FindAllCancelParams,
    type FindAllEnrichParams as FindAllEnrichParams,
    type FindAllEventsParams as FindAllEventsParams,
    type FindAllExtendParams as FindAllExtendParams,
    type FindAllIngestParams as FindAllIngestParams,
    type FindAllResultParams as FindAllResultParams,
    type FindAllSchemaParams as FindAllSchemaParams,
  };
}
