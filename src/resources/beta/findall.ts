// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as TaskRunAPI from '../task-run';
import * as BetaTaskRunAPI from './task-run';
import { APIPromise } from '../../core/api-promise';
import { Stream } from '../../core/streaming';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Findall extends APIResource {
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
  create(params: FindallCreateParams, options?: RequestOptions): APIPromise<FindallRun> {
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
    params: FindallRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FindallRetrieveResponse> {
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
    params: FindallCancelParams | null | undefined = {},
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
    params: FindallEnrichParams,
    options?: RequestOptions,
  ): APIPromise<FindallSchema> {
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
    params: FindallEventsParams | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Stream<FindallEventsResponse>> {
    const { betas, ...query } = params ?? {};
    return this._client.get(path`/v1beta/findall/runs/${findallID}/events`, {
      query,
      ...options,
      headers: buildHeaders([
        { 'parallel-beta': [...(betas ?? []), 'findall-2025-02-01'].toString(), Accept: 'text/event-stream' },
        options?.headers,
      ]),
      stream: true,
    }) as APIPromise<Stream<FindallEventsResponse>>;
  }

  /**
   * Extend a FindAll run by adding additional matches to the current match limit.
   */
  extend(
    findallID: string,
    params: FindallExtendParams,
    options?: RequestOptions,
  ): APIPromise<FindallSchema> {
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
  ingest(params: FindallIngestParams, options?: RequestOptions): APIPromise<FindallSchema> {
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
    params: FindallResultParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FindallRunResult> {
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
    params: FindallSchemaParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FindallSchema> {
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
export interface FindallCandidateMatchStatusEvent {
  /**
   * Candidate for a find all run that may end up as a match.
   *
   * Contains all the candidate's metadata and the output of the match conditions. A
   * candidate is a match if all match conditions are satisfied.
   */
  data: FindallCandidateMatchStatusEvent.Data;

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

export namespace FindallCandidateMatchStatusEvent {
  /**
   * Candidate for a find all run that may end up as a match.
   *
   * Contains all the candidate's metadata and the output of the match conditions. A
   * candidate is a match if all match conditions are satisfied.
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
export interface FindallEnrichInput {
  /**
   * JSON schema for a task input or output.
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
export interface FindallExtendInput {
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
export interface FindallRun {
  /**
   * ID of the FindAll run.
   */
  findall_id: string;

  /**
   * Generator for the FindAll run.
   */
  generator: 'base' | 'core' | 'pro' | 'preview';

  /**
   * Status object for FindAll run.
   */
  status: FindallRun.Status;

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

export namespace FindallRun {
  /**
   * Status object for FindAll run.
   */
  export interface Status {
    /**
     * Whether the FindAll run is active
     */
    is_active: boolean;

    /**
     * Metrics object for FindAll run.
     */
    metrics: Status.Metrics;

    /**
     * Status of the FindAll run.
     */
    status: 'queued' | 'action_required' | 'running' | 'completed' | 'failed' | 'cancelling' | 'cancelled';

    /**
     * Reason for termination when FindAll run is in terminal status.
     */
    termination_reason?: string | null;
  }

  export namespace Status {
    /**
     * Metrics object for FindAll run.
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
export interface FindallRunInput {
  /**
   * Type of the entity for the FindAll run.
   */
  entity_type: string;

  /**
   * Generator for the FindAll run.
   */
  generator: 'base' | 'core' | 'pro' | 'preview';

  /**
   * List of match conditions for the FindAll run.
   */
  match_conditions: Array<FindallRunInput.MatchCondition>;

  /**
   * Maximum number of matches to find for this FindAll run.
   */
  match_limit: number;

  /**
   * Natural language objective of the FindAll run.
   */
  objective: string;

  /**
   * List of entity names/IDs to exclude from results.
   */
  exclude_list?: Array<FindallRunInput.ExcludeList> | null;

  /**
   * Metadata for the FindAll run.
   */
  metadata?: { [key: string]: string | number | boolean } | null;

  /**
   * Webhooks for Task Runs.
   */
  webhook?: BetaTaskRunAPI.Webhook | null;
}

export namespace FindallRunInput {
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
export interface FindallRunResult {
  /**
   * All evaluated candidates at the time of the snapshot.
   */
  candidates: Array<FindallRunResult.Candidate>;

  /**
   * FindAll run object with status and metadata.
   */
  run: FindallRun;

  /**
   * ID of the last event of the run at the time of the request. This can be used to
   * resume streaming from the last event.
   */
  last_event_id?: string | null;
}

export namespace FindallRunResult {
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
export interface FindallRunStatusEvent {
  /**
   * FindAll run object with status and metadata.
   */
  data: FindallRun;

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
export interface FindallSchema {
  /**
   * Type of the entity for the FindAll run.
   */
  entity_type: string;

  /**
   * List of match conditions for the FindAll run.
   */
  match_conditions: Array<FindallSchema.MatchCondition>;

  /**
   * Natural language objective of the FindAll run.
   */
  objective: string;

  /**
   * List of enrichment inputs for the FindAll run.
   */
  enrichments?: Array<FindallEnrichInput> | null;

  /**
   * The generator of the FindAll run.
   */
  generator?: 'base' | 'core' | 'pro' | 'preview';

  /**
   * Max number of candidates to evaluate
   */
  match_limit?: number | null;
}

export namespace FindallSchema {
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
export interface FindallSchemaUpdatedEvent {
  /**
   * Response model for FindAll ingest.
   */
  data: FindallSchema;

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
 * FindAll run object with status and metadata.
 */
export type FindallRetrieveResponse = FindallRun | FindallRetrieveResponse.FindAllPollResponse;

export namespace FindallRetrieveResponse {
  /**
   * Response format for polling a FindAll run status.
   */
  export interface FindAllPollResponse {
    /**
     * Billing metrics for the run.
     */
    billing_metrics: FindAllPollResponse.BillingMetrics;

    /**
     * List of candidates being processed
     */
    candidates: Array<FindAllPollResponse.Candidate>;

    /**
     * List of enrichments derived from the query
     */
    enrichments: Array<FindAllPollResponse.Enrichment>;

    /**
     * List of filters derived from the query
     */
    filters: Array<FindAllPollResponse.Filter>;

    /**
     * True if the run is still processing candidates
     */
    is_active: boolean;

    /**
     * Max results processed for the run
     */
    max_results: number;

    /**
     * Query for the run
     */
    query: string;

    /**
     * List of entities which are fully processed
     */
    results: Array<FindAllPollResponse.Result>;

    /**
     * View model for the run.
     */
    spec: FindAllPollResponse.Spec;

    /**
     * Derived overall status (e.g., 'running', 'completed', 'failed')
     */
    status: string;

    /**
     * List of processing steps undertaken with their status
     */
    steps: Array<FindAllPollResponse.Step>;

    /**
     * Title of the run
     */
    title: string;

    /**
     * True if enrichments are still being processed
     */
    are_enrichments_active?: boolean;

    /**
     * Timestamp of the request
     */
    created_at?: string | null;

    /**
     * List of recommended enrichments that could be added
     */
    enrichment_recommendations?: Array<FindAllPollResponse.EnrichmentRecommendation>;

    /**
     * Timestamp of the last status update
     */
    modified_at?: string | null;

    /**
     * Number of web pages considered for this entity
     */
    pages_considered?: number | null;

    /**
     * Number of web pages read for this entity
     */
    pages_read?: number | null;
  }

  export namespace FindAllPollResponse {
    /**
     * Billing metrics for the run.
     */
    export interface BillingMetrics {
      /**
       * Number of enrichment cells processed
       */
      enrichment_cells: number;

      /**
       * Number of rows processed
       */
      rows_processed: number;

      cost_mode?: 'lite' | 'base' | 'pro' | 'preview';
    }

    /**
     * Simplified entity model for candidates.
     */
    export interface Candidate {
      /**
       * Unique entity identifier
       */
      entity_id: string;

      /**
       * Entity name
       */
      name: string;
    }

    /**
     * Column model for filters and enrichments.
     */
    export interface Enrichment {
      /**
       * Human-readable description of the column
       */
      description: string;

      /**
       * Column identifier
       */
      name: string;

      /**
       * Column type ('enrichment' or 'filter')
       */
      type: string;

      /**
       * Status of the column ('running', 'done', 'failed')
       */
      status?: string | null;
    }

    /**
     * Column model for filters and enrichments.
     */
    export interface Filter {
      /**
       * Human-readable description of the column
       */
      description: string;

      /**
       * Column identifier
       */
      name: string;

      /**
       * Column type ('enrichment' or 'filter')
       */
      type: string;

      /**
       * Status of the column ('running', 'done', 'failed')
       */
      status?: string | null;
    }

    /**
     * Entity model for results and candidates.
     */
    export interface Result {
      /**
       * Unique entity identifier
       */
      entity_id: string;

      /**
       * Entity name
       */
      name: string;

      /**
       * Entity description if available
       */
      description?: string | null;

      /**
       * List of enrichment results
       */
      enrichment_results?: Array<Result.EnrichmentResult>;

      /**
       * List of filter results
       */
      filter_results?: Array<Result.FilterResult>;

      /**
       * Confidence score (positive real number)
       */
      score?: number | null;

      /**
       * Entity URL if available
       */
      url?: string | null;
    }

    export namespace Result {
      /**
       * Result model for filter and enrichment results.
       */
      export interface EnrichmentResult {
        /**
         * Name of column
         */
        key: string;

        /**
         * Result of column
         */
        value: string;

        /**
         * Space separated list of citation urls
         */
        citations?: string | null;

        /**
         * Confidence score (e.g. 'high', 'medium', 'low')
         */
        confidence?: string | null;

        /**
         * List of enhanced citations with title and excerpts
         */
        enhanced_citations?: Array<EnrichmentResult.EnhancedCitation>;

        /**
         * Reasoning behind the value
         */
        reasoning?: string | null;
      }

      export namespace EnrichmentResult {
        /**
         * Enhanced citation model with title, excerpts, and URL for UI.
         */
        export interface EnhancedCitation {
          /**
           * Citation URL
           */
          url: string;

          /**
           * List of relevant excerpts from the cited page
           */
          excerpts?: Array<string>;

          /**
           * Title of the cited page
           */
          title?: string | null;
        }
      }

      /**
       * Result model for filter and enrichment results.
       */
      export interface FilterResult {
        /**
         * Name of column
         */
        key: string;

        /**
         * Result of column
         */
        value: string;

        /**
         * Space separated list of citation urls
         */
        citations?: string | null;

        /**
         * Confidence score (e.g. 'high', 'medium', 'low')
         */
        confidence?: string | null;

        /**
         * List of enhanced citations with title and excerpts
         */
        enhanced_citations?: Array<FilterResult.EnhancedCitation>;

        /**
         * Reasoning behind the value
         */
        reasoning?: string | null;
      }

      export namespace FilterResult {
        /**
         * Enhanced citation model with title, excerpts, and URL for UI.
         */
        export interface EnhancedCitation {
          /**
           * Citation URL
           */
          url: string;

          /**
           * List of relevant excerpts from the cited page
           */
          excerpts?: Array<string>;

          /**
           * Title of the cited page
           */
          title?: string | null;
        }
      }
    }

    /**
     * View model for the run.
     */
    export interface Spec {
      /**
       * List of columns in the view
       */
      columns: Array<Spec.Column>;

      /**
       * Name of the view
       */
      name: string;
    }

    export namespace Spec {
      /**
       * Column model for filters and enrichments.
       */
      export interface Column {
        /**
         * Human-readable description of the column
         */
        description: string;

        /**
         * Column identifier
         */
        name: string;

        /**
         * Column type ('enrichment' or 'filter')
         */
        type: string;

        /**
         * Status of the column ('running', 'done', 'failed')
         */
        status?: string | null;
      }
    }

    /**
     * Step model for tracking progress of FindAll operations.
     */
    export interface Step {
      /**
       * Human-readable description of the step
       */
      description: string;

      /**
       * Step identifier
       */
      name: string;

      /**
       * Current status of the step
       */
      status: string;
    }

    /**
     * Enrichment recommendation model.
     */
    export interface EnrichmentRecommendation {
      /**
       * Recommended column name
       */
      column_name: string;

      /**
       * Description of the recommended enrichment
       */
      description: string;

      /**
       * Run ID that generated this recommendation
       */
      recommendation_run_id: string;

      /**
       * Task ID that generated this recommendation
       */
      recommendation_task_id: string;
    }
  }
}

export type FindallCancelResponse = unknown;

/**
 * Event containing full snapshot of FindAll run state.
 */
export type FindallEventsResponse =
  | FindallSchemaUpdatedEvent
  | FindallRunStatusEvent
  | FindallCandidateMatchStatusEvent
  | BetaTaskRunAPI.ErrorEvent;

export interface FindallCreateParams {
  /**
   * Body param: Type of the entity for the FindAll run.
   */
  entity_type: string;

  /**
   * Body param: Generator for the FindAll run.
   */
  generator: 'base' | 'core' | 'pro' | 'preview';

  /**
   * Body param: List of match conditions for the FindAll run.
   */
  match_conditions: Array<FindallCreateParams.MatchCondition>;

  /**
   * Body param: Maximum number of matches to find for this FindAll run.
   */
  match_limit: number;

  /**
   * Body param: Natural language objective of the FindAll run.
   */
  objective: string;

  /**
   * Body param: List of entity names/IDs to exclude from results.
   */
  exclude_list?: Array<FindallCreateParams.ExcludeList> | null;

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

export namespace FindallCreateParams {
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

export interface FindallRetrieveParams {
  /**
   * Optional header to specify the beta version(s) to enable.
   */
  betas?: Array<BetaTaskRunAPI.ParallelBeta>;
}

export interface FindallCancelParams {
  /**
   * Optional header to specify the beta version(s) to enable.
   */
  betas?: Array<BetaTaskRunAPI.ParallelBeta>;
}

export interface FindallEnrichParams {
  /**
   * Body param: JSON schema for a task input or output.
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

export interface FindallEventsParams {
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

export interface FindallExtendParams {
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

export interface FindallIngestParams {
  /**
   * Body param: Natural language objective to create a FindAll run spec.
   */
  objective: string;

  /**
   * Header param: Optional header to specify the beta version(s) to enable.
   */
  betas?: Array<BetaTaskRunAPI.ParallelBeta>;
}

export interface FindallResultParams {
  /**
   * Optional header to specify the beta version(s) to enable.
   */
  betas?: Array<BetaTaskRunAPI.ParallelBeta>;
}

export interface FindallSchemaParams {
  /**
   * Optional header to specify the beta version(s) to enable.
   */
  betas?: Array<BetaTaskRunAPI.ParallelBeta>;
}

export declare namespace Findall {
  export {
    type FindallCandidateMatchStatusEvent as FindallCandidateMatchStatusEvent,
    type FindallEnrichInput as FindallEnrichInput,
    type FindallExtendInput as FindallExtendInput,
    type FindallRun as FindallRun,
    type FindallRunInput as FindallRunInput,
    type FindallRunResult as FindallRunResult,
    type FindallRunStatusEvent as FindallRunStatusEvent,
    type FindallSchema as FindallSchema,
    type FindallSchemaUpdatedEvent as FindallSchemaUpdatedEvent,
    type IngestInput as IngestInput,
    type FindallRetrieveResponse as FindallRetrieveResponse,
    type FindallCancelResponse as FindallCancelResponse,
    type FindallEventsResponse as FindallEventsResponse,
    type FindallCreateParams as FindallCreateParams,
    type FindallRetrieveParams as FindallRetrieveParams,
    type FindallCancelParams as FindallCancelParams,
    type FindallEnrichParams as FindallEnrichParams,
    type FindallEventsParams as FindallEventsParams,
    type FindallExtendParams as FindallExtendParams,
    type FindallIngestParams as FindallIngestParams,
    type FindallResultParams as FindallResultParams,
    type FindallSchemaParams as FindallSchemaParams,
  };
}
