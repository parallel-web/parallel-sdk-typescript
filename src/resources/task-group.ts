// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as TaskRunAPI from './task-run';
import { APIPromise } from '../core/api-promise';
import { Stream } from '../core/streaming';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * The Task API executes web research and extraction tasks. Clients submit a natural-language objective with an optional input schema; the service plans retrieval, fetches relevant URLs, and returns outputs that conform to a provided or inferred JSON schema. Supports deep research style queries and can return rich structured JSON outputs. Processors trade-off between cost, latency, and quality. Each processor supports calibrated confidences.
 * - Output metadata: citations, excerpts, reasoning, and confidence per field
 *
 * Task Groups enable batch execution of many independent Task runs with group-level monitoring and failure handling.
 * - Submit hundreds or thousands of Tasks as a single group
 * - Observe group progress and receive results as they complete
 * - Real-time updates via Server-Sent Events (SSE)
 * - Add tasks to an existing group while it is running
 * - Group-level retry and error aggregation
 */
export class TaskGroup extends APIResource {
  /**
   * Initiates a TaskGroup to group and track multiple runs.
   */
  create(body: TaskGroupCreateParams, options?: RequestOptions): APIPromise<TaskGroup> {
    return this._client.post('/v1/tasks/groups', { body, ...options });
  }

  /**
   * Retrieves aggregated status across runs in a TaskGroup.
   */
  retrieve(taskGroupID: string, options?: RequestOptions): APIPromise<TaskGroup> {
    return this._client.get(path`/v1/tasks/groups/${taskGroupID}`, options);
  }

  /**
   * Initiates multiple task runs within a TaskGroup.
   */
  addRuns(
    taskGroupID: string,
    params: TaskGroupAddRunsParams,
    options?: RequestOptions,
  ): APIPromise<TaskGroupRunResponse> {
    const { refresh_status, betas, ...body } = params;
    return this._client.post(path`/v1/tasks/groups/${taskGroupID}/runs`, {
      query: { refresh_status },
      body,
      ...options,
      headers: buildHeaders([
        { ...(betas?.toString() != null ? { 'parallel-beta': betas?.toString() } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Streams events from a TaskGroup: status updates and run completions.
   *
   * The connection will remain open for up to an hour as long as at least one run in
   * the group is still active.
   */
  events(
    taskGroupID: string,
    query: TaskGroupEventsParams | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Stream<TaskGroupEventsResponse>> {
    return this._client.get(path`/v1/tasks/groups/${taskGroupID}/events`, {
      query,
      ...options,
      headers: buildHeaders([{ Accept: 'text/event-stream' }, options?.headers]),
      stream: true,
    }) as APIPromise<Stream<TaskGroupEventsResponse>>;
  }

  /**
   * Retrieves task runs in a TaskGroup and optionally their inputs and outputs.
   *
   * All runs within a TaskGroup are returned as a stream. To get the inputs and/or
   * outputs back in the stream, set the corresponding `include_input` and
   * `include_output` parameters to `true`.
   *
   * The stream is resumable using the `event_id` as the cursor. To resume a stream,
   * specify the `last_event_id` parameter with the `event_id` of the last event in
   * the stream. The stream will resume from the next event after the
   * `last_event_id`.
   */
  getRuns(
    taskGroupID: string,
    query: TaskGroupGetRunsParams | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Stream<TaskGroupGetRunsResponse>> {
    return this._client.get(path`/v1/tasks/groups/${taskGroupID}/runs`, {
      query,
      ...options,
      headers: buildHeaders([{ Accept: 'text/event-stream' }, options?.headers]),
      stream: true,
    }) as APIPromise<Stream<TaskGroupGetRunsResponse>>;
  }

  /**
   * Retrieves run status by run_id.
   *
   * This endpoint is equivalent to fetching run status directly using the
   * `retrieve()` method or the `tasks/runs` GET endpoint.
   *
   * The run result is available from the `/result` endpoint.
   */
  retrieveRun(
    runID: string,
    params: TaskGroupRetrieveRunParams,
    options?: RequestOptions,
  ): APIPromise<TaskRunAPI.TaskRun> {
    const { taskgroup_id } = params;
    return this._client.get(path`/v1/tasks/groups/${taskgroup_id}/runs/${runID}`, options);
  }
}

/**
 * Response object for a task group, including its status and metadata.
 */
export interface TaskGroup {
  /**
   * Timestamp of the creation of the group, as an RFC 3339 string.
   */
  created_at: string | null;

  /**
   * Status of the group.
   */
  status: TaskGroupStatus;

  /**
   * ID of the group.
   */
  taskgroup_id: string;

  /**
   * User-provided metadata stored with the group.
   */
  metadata?: { [key: string]: string | number | boolean } | null;
}

/**
 * Response from adding new task runs to a task group.
 */
export interface TaskGroupRunResponse {
  /**
   * Cursor for these runs in the event stream at
   * taskgroup/events?last_event_id=<event_cursor>. Empty for the first runs in the
   * group.
   */
  event_cursor: string | null;

  /**
   * Cursor for these runs in the run stream at
   * taskgroup/runs?last_event_id=<run_cursor>. Empty for the first runs in the
   * group.
   */
  run_cursor: string | null;

  /**
   * IDs of the newly created runs.
   */
  run_ids: Array<string>;

  /**
   * Status of the group.
   */
  status: TaskGroupStatus;
}

/**
 * Status of a task group.
 */
export interface TaskGroupStatus {
  /**
   * True if at least one run in the group is currently active, i.e. status is one of
   * {'cancelling', 'queued', 'running'}.
   */
  is_active: boolean;

  /**
   * Timestamp of the last status update to the group, as an RFC 3339 string.
   */
  modified_at: string | null;

  /**
   * Number of task runs in the group.
   */
  num_task_runs: number;

  /**
   * Human-readable status message for the group.
   */
  status_message: string | null;

  /**
   * Number of task runs with each status.
   */
  task_run_status_counts: { [key: string]: number };
}

/**
 * Event indicating an update to group status.
 */
export interface TaskGroupStatusEvent {
  /**
   * Cursor to resume the event stream.
   */
  event_id: string;

  /**
   * Task group status object.
   */
  status: TaskGroupStatus;

  /**
   * Event type; always 'task_group_status'.
   */
  type: 'task_group_status';
}

/**
 * Event indicating an update to group status.
 */
export type TaskGroupEventsResponse = TaskGroupStatusEvent | TaskRunAPI.TaskRunEvent | TaskRunAPI.ErrorEvent;

/**
 * Event when a task run transitions to a non-active status.
 *
 * May indicate completion, cancellation, or failure.
 */
export type TaskGroupGetRunsResponse = TaskRunAPI.TaskRunEvent | TaskRunAPI.ErrorEvent;

export interface TaskGroupCreateParams {
  /**
   * User-provided metadata stored with the task group.
   */
  metadata?: { [key: string]: string | number | boolean } | null;
}

export interface TaskGroupAddRunsParams {
  /**
   * Body param: List of task runs to execute. Up to 1,000 runs can be specified per
   * request. If you'd like to add more runs, split them across multiple TaskGroup
   * POST requests.
   */
  inputs: Array<TaskRunAPI.RunInput>;

  /**
   * Query param
   */
  refresh_status?: boolean;

  /**
   * Body param: Specification for a task.
   *
   * Auto output schemas can be specified by setting `output_schema={"type":"auto"}`.
   * Not specifying a TaskSpec is the same as setting an auto output schema.
   *
   * For convenience bare strings are also accepted as input or output schemas.
   */
  default_task_spec?: TaskRunAPI.TaskSpec | null;

  /**
   * Header param: Optional header to specify the beta version(s) to enable.
   */
  betas?: Array<
    | 'mcp-server-2025-07-17'
    | 'events-sse-2025-07-24'
    | 'webhook-2025-08-12'
    | 'findall-2025-09-15'
    | 'search-extract-2025-10-10'
    | 'field-basis-2025-11-25'
    | (string & {})
  >;
}

export interface TaskGroupEventsParams {
  last_event_id?: string | null;

  timeout?: number | null;
}

export interface TaskGroupGetRunsParams {
  include_input?: boolean;

  include_output?: boolean;

  last_event_id?: string | null;

  status?:
    | 'queued'
    | 'action_required'
    | 'running'
    | 'completed'
    | 'failed'
    | 'cancelling'
    | 'cancelled'
    | null;
}

export interface TaskGroupRetrieveRunParams {
  taskgroup_id: string;
}

export declare namespace TaskGroup {
  export {
    type TaskGroup as TaskGroup,
    type TaskGroupRunResponse as TaskGroupRunResponse,
    type TaskGroupStatus as TaskGroupStatus,
    type TaskGroupStatusEvent as TaskGroupStatusEvent,
    type TaskGroupEventsResponse as TaskGroupEventsResponse,
    type TaskGroupGetRunsResponse as TaskGroupGetRunsResponse,
    type TaskGroupCreateParams as TaskGroupCreateParams,
    type TaskGroupAddRunsParams as TaskGroupAddRunsParams,
    type TaskGroupEventsParams as TaskGroupEventsParams,
    type TaskGroupGetRunsParams as TaskGroupGetRunsParams,
    type TaskGroupRetrieveRunParams as TaskGroupRetrieveRunParams,
  };
}
