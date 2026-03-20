// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import * as TaskRunAPI from '../task-run';
import { APIPromise } from '../../core/api-promise';
import { Stream } from '../../core/streaming';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * The Task API executes web research and extraction tasks. Clients submit a natural-language objective with an optional input schema; the service plans retrieval, fetches relevant URLs, and returns outputs that conform to a provided or inferred JSON schema. Supports deep research style queries and can return rich structured JSON outputs. Processors trade-off between cost, latency, and quality. Each processor supports calibrated confidences.
 * - Output metadata: citations, excerpts, reasoning, and confidence per field
 *
 * @deprecated Use GA Task Run instead
 */
export class TaskRun extends APIResource {
  /**
   * Initiates a task run.
   *
   * Returns immediately with a run object in status 'queued'.
   *
   * Beta features can be enabled by setting the 'parallel-beta' header.
   *
   * @deprecated Use GA Task Run instead
   */
  create(params: TaskRunCreateParams, options?: RequestOptions): APIPromise<TaskRunAPI.TaskRun> {
    const { betas, ...body } = params;
    return this._client.post('/v1/tasks/runs', {
      body,
      ...options,
      headers: buildHeaders([
        { 'parallel-beta': [...(betas ?? []), 'search-extract-2025-10-10'].toString() },
        options?.headers,
      ]),
    });
  }

  /**
   * Streams events for a task run.
   *
   * Returns a stream of events showing progress updates and state changes for the
   * task run.
   *
   * For task runs that did not have enable_events set to true during creation, the
   * frequency of events will be reduced.
   *
   * @deprecated Use GA Task Run instead
   */
  events(runID: string, options?: RequestOptions): APIPromise<Stream<TaskRunEventsResponse>> {
    return this._client.get(path`/v1beta/tasks/runs/${runID}/events`, {
      ...options,
      headers: buildHeaders([
        { 'parallel-beta': 'search-extract-2025-10-10', Accept: 'text/event-stream' },
        options?.headers,
      ]),
      stream: true,
    }) as APIPromise<Stream<TaskRunEventsResponse>>;
  }

  /**
   * Retrieves a run result by run_id, blocking until the run is completed.
   *
   * @deprecated Use GA Task Run instead
   */
  result(
    runID: string,
    params: TaskRunResultParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<TaskRunAPI.TaskRunResult> {
    const { betas, ...query } = params ?? {};
    return this._client.get(path`/v1/tasks/runs/${runID}/result`, {
      query,
      ...options,
      headers: buildHeaders([
        { 'parallel-beta': [...(betas ?? []), 'search-extract-2025-10-10'].toString() },
        options?.headers,
      ]),
    });
  }
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
 * A progress update for a task run.
 */
export type TaskRunEventsResponse =
  | TaskRunEventsResponse.TaskRunProgressStatsEvent
  | TaskRunEventsResponse.TaskRunProgressMessageEvent
  | TaskRunAPI.TaskRunEvent
  | TaskRunAPI.ErrorEvent;

export namespace TaskRunEventsResponse {
  /**
   * A progress update for a task run.
   */
  export interface TaskRunProgressStatsEvent {
    /**
     * Completion percentage of the task run. Ranges from 0 to 100 where 0 indicates no
     * progress and 100 indicates completion.
     */
    progress_meter: number;

    /**
     * Source stats describing progress so far.
     */
    source_stats: TaskRunProgressStatsEvent.SourceStats;

    /**
     * Event type; always 'task_run.progress_stats'.
     */
    type: 'task_run.progress_stats';
  }

  export namespace TaskRunProgressStatsEvent {
    /**
     * Source stats describing progress so far.
     */
    export interface SourceStats {
      /**
       * Number of sources considered in processing the task.
       */
      num_sources_considered: number | null;

      /**
       * Number of sources read in processing the task.
       */
      num_sources_read: number | null;

      /**
       * A sample of URLs of sources read in processing the task.
       */
      sources_read_sample: Array<string> | null;
    }
  }

  /**
   * A message for a task run progress update.
   */
  export interface TaskRunProgressMessageEvent {
    /**
     * Progress update message.
     */
    message: string;

    /**
     * Timestamp of the message.
     */
    timestamp: string | null;

    /**
     * Event type; always starts with 'task_run.progress_msg'.
     */
    type:
      | 'task_run.progress_msg.plan'
      | 'task_run.progress_msg.search'
      | 'task_run.progress_msg.result'
      | 'task_run.progress_msg.tool_call'
      | 'task_run.progress_msg.exec_status';
  }
}

/**
 * @deprecated Use parallel.types.task_run.TaskRunInput instead
 */
export type BetaRunInput = TaskRunAPI.RunInput;

/**
 * @deprecated Use parallel.types.task_run.TaskRunResult instead
 */
export type BetaTaskRunResult = TaskRunAPI.TaskRunResult;

/**
 * @deprecated Use parallel.types.task_run.Webhook instead
 */
export type Webhook = TaskRunAPI.Webhook;

/**
 * @deprecated Use parallel.types.task_run.McpServer instead
 */
export type McpServer = TaskRunAPI.McpServer;

/**
 * @deprecated Use parallel.types.task_run.McpToolCall instead
 */
export type McpToolCall = TaskRunAPI.McpToolCall;

/**
 * @deprecated Use parallel.types.task_run.TaskRunEvent instead
 */
export type TaskRunEvent = TaskRunAPI.TaskRunEvent;

/**
 * @deprecated Use parallel.types.task_run.ErrorEvent instead
 */
export type ErrorEvent = TaskRunAPI.ErrorEvent;

export interface TaskRunCreateParams {
  /**
   * Body param: Input to the task, either text or a JSON object.
   */
  input: string | { [key: string]: unknown };

  /**
   * Body param: Processor to use for the task.
   */
  processor: string;

  /**
   * Body param: Controls tracking of task run execution progress. When set to true,
   * progress events are recorded and can be accessed via the
   * [Task Run events](https://platform.parallel.ai/api-reference) endpoint. When
   * false, no progress events are tracked. Note that progress tracking cannot be
   * enabled after a run has been created. The flag is set to true by default for
   * premium processors (pro and above).
   */
  enable_events?: boolean | null;

  /**
   * Body param: Optional list of MCP servers to use for the run.
   */
  mcp_servers?: Array<TaskRunAPI.McpServer> | null;

  /**
   * Body param: User-provided metadata stored with the run. Keys and values must be
   * strings with a maximum length of 16 and 512 characters respectively.
   */
  metadata?: { [key: string]: string | number | boolean } | null;

  /**
   * Body param: Interaction ID to use as context for this request.
   */
  previous_interaction_id?: string | null;

  /**
   * Body param: Source policy for web search results.
   *
   * This policy governs which sources are allowed/disallowed in results.
   */
  source_policy?: Shared.SourcePolicy | null;

  /**
   * Body param: Specification for a task.
   *
   * Auto output schemas can be specified by setting `output_schema={"type":"auto"}`.
   * Not specifying a TaskSpec is the same as setting an auto output schema.
   *
   * For convenience bare strings are also accepted as input or output schemas.
   */
  task_spec?: TaskRunAPI.TaskSpec | null;

  /**
   * Body param: Webhooks for Task Runs.
   */
  webhook?: TaskRunAPI.Webhook | null;

  /**
   * Header param: Optional header to specify the beta version(s) to enable.
   */
  betas?: Array<ParallelBeta>;
}

export interface TaskRunResultParams {
  /**
   * Query param
   */
  timeout?: number;

  /**
   * Header param: Optional header to specify the beta version(s) to enable.
   */
  betas?: Array<ParallelBeta>;
}

export declare namespace TaskRun {
  export {
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
}
