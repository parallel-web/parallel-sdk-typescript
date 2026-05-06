// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as TaskGroupAPI from '../task-group';
import * as TaskRunAPI from '../task-run';
import * as BetaTaskRunAPI from './task-run';
import { APIPromise } from '../../core/api-promise';
import { Stream } from '../../core/streaming';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Tasks (Beta)
 */
export class TaskGroup extends APIResource {
  /**
   * Initiates a TaskGroup to group and track multiple runs.
   *
   * @example
   * ```ts
   * const taskGroup = await client.beta.taskGroup.create();
   * ```
   */
  create(body: TaskGroupCreateParams, options?: RequestOptions): APIPromise<TaskGroupAPI.TaskGroup> {
    return this._client.post('/v1beta/tasks/groups', {
      body,
      ...options,
      headers: buildHeaders([{ 'parallel-beta': 'search-extract-2025-10-10' }, options?.headers]),
    });
  }

  /**
   * Retrieves aggregated status across runs in a TaskGroup.
   *
   * @example
   * ```ts
   * const taskGroup = await client.beta.taskGroup.retrieve(
   *   'taskgroup_id',
   * );
   * ```
   */
  retrieve(taskGroupID: string, options?: RequestOptions): APIPromise<TaskGroupAPI.TaskGroup> {
    return this._client.get(path`/v1beta/tasks/groups/${taskGroupID}`, {
      ...options,
      headers: buildHeaders([{ 'parallel-beta': 'search-extract-2025-10-10' }, options?.headers]),
    });
  }

  /**
   * Initiates multiple task runs within a TaskGroup.
   *
   * @example
   * ```ts
   * const taskGroupRunResponse =
   *   await client.beta.taskGroup.addRuns('taskgroup_id', {
   *     inputs: [
   *       {
   *         input: 'What was the GDP of France in 2023?',
   *         processor: 'base',
   *       },
   *     ],
   *   });
   * ```
   */
  addRuns(
    taskGroupID: string,
    params: TaskGroupAddRunsParams,
    options?: RequestOptions,
  ): APIPromise<TaskGroupAPI.TaskGroupRunResponse> {
    const { refresh_status, betas, ...body } = params;
    return this._client.post(path`/v1beta/tasks/groups/${taskGroupID}/runs`, {
      query: { refresh_status },
      body,
      ...options,
      headers: buildHeaders([
        { 'parallel-beta': [...(betas ?? []), 'search-extract-2025-10-10'].toString() },
        options?.headers,
      ]),
    });
  }

  /**
   * Streams events from a TaskGroup: status updates and run completions.
   *
   * The connection will remain open for up to an hour as long as at least one run in
   * the group is still active.
   *
   * @example
   * ```ts
   * const response = await client.beta.taskGroup.events(
   *   'taskgroup_id',
   * );
   * ```
   */
  events(
    taskGroupID: string,
    query: TaskGroupEventsParams | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Stream<TaskGroupEventsResponse>> {
    return this._client.get(path`/v1beta/tasks/groups/${taskGroupID}/events`, {
      query,
      ...options,
      headers: buildHeaders([
        { 'parallel-beta': 'search-extract-2025-10-10', Accept: 'text/event-stream' },
        options?.headers,
      ]),
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
   *
   * @example
   * ```ts
   * const response = await client.beta.taskGroup.getRuns(
   *   'taskgroup_id',
   * );
   * ```
   */
  getRuns(
    taskGroupID: string,
    query: TaskGroupGetRunsParams | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Stream<TaskGroupGetRunsResponse>> {
    return this._client.get(path`/v1beta/tasks/groups/${taskGroupID}/runs`, {
      query,
      ...options,
      headers: buildHeaders([
        { 'parallel-beta': 'search-extract-2025-10-10', Accept: 'text/event-stream' },
        options?.headers,
      ]),
      stream: true,
    }) as APIPromise<Stream<TaskGroupGetRunsResponse>>;
  }
}

/**
 * Event indicating an update to group status.
 */
export type TaskGroupEventsResponse =
  | TaskGroupAPI.TaskGroupStatusEvent
  | TaskRunAPI.TaskRunEvent
  | TaskRunAPI.ErrorEvent;

/**
 * Event when a task run transitions to a non-active status.
 *
 * May indicate completion, cancellation, or failure.
 */
export type TaskGroupGetRunsResponse = TaskRunAPI.TaskRunEvent | TaskRunAPI.ErrorEvent;

export type TaskGroupStatus = TaskGroupAPI.TaskGroupStatus;

export type TaskGroupStatusEvent = TaskGroupAPI.TaskGroupStatusEvent;

export type TaskGroupRunResponse = TaskGroupAPI.TaskGroupRunResponse;

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
  betas?: Array<BetaTaskRunAPI.ParallelBeta>;
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

export declare namespace TaskGroup {
  export {
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
}
