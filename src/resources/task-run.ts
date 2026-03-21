// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import * as BetaTaskRunAPI from './beta/task-run';
import { APIPromise } from '../core/api-promise';
import { Stream } from '../core/streaming';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * The Task API executes web research and extraction tasks. Clients submit a natural-language objective with an optional input schema; the service plans retrieval, fetches relevant URLs, and returns outputs that conform to a provided or inferred JSON schema. Supports deep research style queries and can return rich structured JSON outputs. Processors trade-off between cost, latency, and quality. Each processor supports calibrated confidences.
 * - Output metadata: citations, excerpts, reasoning, and confidence per field
 */
export class TaskRun extends APIResource {
  /**
   * Initiates a task run.
   *
   * Returns immediately with a run object in status 'queued'.
   *
   * Beta features can be enabled by setting the 'parallel-beta' header.
   */
  create(params: TaskRunCreateParams, options?: RequestOptions): APIPromise<TaskRun> {
    const { betas, ...body } = params;
    return this._client.post('/v1/tasks/runs', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(betas?.toString() != null ? { 'parallel-beta': betas?.toString() } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Retrieves run status by run_id.
   *
   * The run result is available from the `/result` endpoint.
   */
  retrieve(runID: string, options?: RequestOptions): APIPromise<TaskRun> {
    return this._client.get(path`/v1/tasks/runs/${runID}`, options);
  }

  /**
   * Streams events for a task run.
   *
   * Returns a stream of events showing progress updates and state changes for the
   * task run.
   *
   * For task runs that did not have enable_events set to true during creation, the
   * frequency of events will be reduced.
   */
  events(runID: string, options?: RequestOptions): APIPromise<Stream<TaskRunEventsResponse>> {
    return this._client.get(path`/v1/tasks/runs/${runID}/events`, {
      ...options,
      headers: buildHeaders([{ Accept: 'text/event-stream' }, options?.headers]),
      stream: true,
    }) as APIPromise<Stream<TaskRunEventsResponse>>;
  }

  /**
   * Retrieves a run result by run_id, blocking until the run is completed.
   */
  result(
    runID: string,
    params: TaskRunResultParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<TaskRunResult> {
    const { betas, ...query } = params ?? {};
    return this._client.get(path`/v1/tasks/runs/${runID}/result`, {
      query,
      ...options,
      headers: buildHeaders([
        { ...(betas?.toString() != null ? { 'parallel-beta': betas?.toString() } : undefined) },
        options?.headers,
      ]),
    });
  }
}

/**
 * Auto schema for a task input or output.
 */
export interface AutoSchema {
  /**
   * The type of schema being defined. Always `auto`.
   */
  type?: 'auto';
}

/**
 * A citation for a task output.
 */
export interface Citation {
  /**
   * URL of the citation.
   */
  url: string;

  /**
   * Excerpts from the citation supporting the output. Only certain processors
   * provide excerpts.
   */
  excerpts?: Array<string> | null;

  /**
   * Title of the citation.
   */
  title?: string | null;
}

/**
 * Event indicating an error.
 */
export interface ErrorEvent {
  /**
   * Error.
   */
  error: Shared.ErrorObject;

  /**
   * Event type; always 'error'.
   */
  type: 'error';
}

/**
 * Citations and reasoning supporting one field of a task output.
 */
export interface FieldBasis {
  /**
   * Name of the output field.
   */
  field: string;

  /**
   * Reasoning for the output field.
   */
  reasoning: string;

  /**
   * List of citations supporting the output field.
   */
  citations?: Array<Citation>;

  /**
   * Confidence level for the output field. Only certain processors provide
   * confidence levels.
   */
  confidence?: string | null;
}

/**
 * JSON schema for a task input or output.
 */
export interface JsonSchema {
  /**
   * A JSON Schema object. Only a subset of JSON Schema is supported.
   */
  json_schema: { [key: string]: unknown };

  /**
   * The type of schema being defined. Always `json`.
   */
  type?: 'json';
}

/**
 * MCP server configuration.
 */
export interface McpServer {
  /**
   * Name of the MCP server.
   */
  name: string;

  /**
   * URL of the MCP server.
   */
  url: string;

  /**
   * List of allowed tools for the MCP server.
   */
  allowed_tools?: Array<string> | null;

  /**
   * Headers for the MCP server.
   */
  headers?: { [key: string]: string } | null;

  /**
   * Type of MCP server being configured. Always `url`.
   */
  type?: 'url';
}

/**
 * Result of an MCP tool call.
 */
export interface McpToolCall {
  /**
   * Arguments used to call the MCP tool.
   */
  arguments: string;

  /**
   * Name of the MCP server.
   */
  server_name: string;

  /**
   * Identifier for the tool call.
   */
  tool_call_id: string;

  /**
   * Name of the tool being called.
   */
  tool_name: string;

  /**
   * Output received from the tool call, if successful.
   */
  content?: string | null;

  /**
   * Error message if the tool call failed.
   */
  error?: string | null;
}

/**
 * Request to run a task.
 */
export interface RunInput {
  /**
   * Input to the task, either text or a JSON object.
   */
  input: string | { [key: string]: unknown };

  /**
   * Processor to use for the task.
   */
  processor: string;

  /**
   * Controls tracking of task run execution progress. When set to true, progress
   * events are recorded and can be accessed via the
   * [Task Run events](https://platform.parallel.ai/api-reference) endpoint. When
   * false, no progress events are tracked. Note that progress tracking cannot be
   * enabled after a run has been created. The flag is set to true by default for
   * premium processors (pro and above).
   */
  enable_events?: boolean | null;

  /**
   * Optional list of MCP servers to use for the run.
   */
  mcp_servers?: Array<McpServer> | null;

  /**
   * User-provided metadata stored with the run. Keys and values must be strings with
   * a maximum length of 16 and 512 characters respectively.
   */
  metadata?: { [key: string]: string | number | boolean } | null;

  /**
   * Interaction ID to use as context for this request.
   */
  previous_interaction_id?: string | null;

  /**
   * Source policy for web search results.
   *
   * This policy governs which sources are allowed/disallowed in results.
   */
  source_policy?: Shared.SourcePolicy | null;

  /**
   * Specification for a task.
   *
   * Auto output schemas can be specified by setting `output_schema={"type":"auto"}`.
   * Not specifying a TaskSpec is the same as setting an auto output schema.
   *
   * For convenience bare strings are also accepted as input or output schemas.
   */
  task_spec?: TaskSpec | null;

  /**
   * Webhooks for Task Runs.
   */
  webhook?: Webhook | null;
}

/**
 * Status of a task run.
 */
export interface TaskRun {
  /**
   * Timestamp of the creation of the task, as an RFC 3339 string.
   */
  created_at: string | null;

  /**
   * Identifier for this interaction. Pass this value as `previous_interaction_id` to
   * reuse context for a future request.
   */
  interaction_id: string;

  /**
   * Whether the run is currently active, i.e. status is one of {'cancelling',
   * 'queued', 'running'}.
   */
  is_active: boolean;

  /**
   * Timestamp of the last modification to the task, as an RFC 3339 string.
   */
  modified_at: string | null;

  /**
   * Processor used for the run.
   */
  processor: string;

  /**
   * ID of the task run.
   */
  run_id: string;

  /**
   * Status of the run.
   */
  status: 'queued' | 'action_required' | 'running' | 'completed' | 'failed' | 'cancelling' | 'cancelled';

  /**
   * An error message.
   */
  error?: Shared.ErrorObject | null;

  /**
   * User-provided metadata stored with the run.
   */
  metadata?: { [key: string]: string | number | boolean } | null;

  /**
   * ID of the taskgroup to which the run belongs.
   */
  taskgroup_id?: string | null;

  /**
   * Warnings for the run, if any.
   */
  warnings?: Array<Shared.Warning> | null;
}

/**
 * Event when a task run transitions to a non-active status.
 *
 * May indicate completion, cancellation, or failure.
 */
export interface TaskRunEvent {
  /**
   * Cursor to resume the event stream. Always empty for non Task Group runs.
   */
  event_id: string | null;

  /**
   * Task run object.
   */
  run: TaskRun;

  /**
   * Event type; always 'task_run.state'.
   */
  type: 'task_run.state';

  /**
   * Request to run a task.
   */
  input?: RunInput | null;

  /**
   * Output from the run; included only if requested and if status == `completed`.
   */
  output?: TaskRunTextOutput | TaskRunJsonOutput | null;
}

/**
 * Output from a task that returns JSON.
 */
export interface TaskRunJsonOutput {
  /**
   * Basis for each top-level field in the JSON output. Per-list-element basis
   * entries are available only when the `parallel-beta: field-basis-2025-11-25`
   * header is supplied.
   */
  basis: Array<FieldBasis>;

  /**
   * Output from the task as a native JSON object, as determined by the output schema
   * of the task spec.
   */
  content: { [key: string]: unknown };

  /**
   * The type of output being returned, as determined by the output schema of the
   * task spec.
   */
  type: 'json';

  /**
   * @deprecated Deprecated. mcp-server-2025-07-17 is now included directly in the
   * output (e.g. mcp_tool_calls).
   */
  beta_fields?: { [key: string]: unknown } | null;

  /**
   * MCP tool calls made by the task.
   */
  mcp_tool_calls?: Array<McpToolCall> | null;

  /**
   * Output schema for the Task Run. Populated only if the task was executed with an
   * auto schema.
   */
  output_schema?: { [key: string]: unknown } | null;
}

/**
 * Result of a task run.
 */
export interface TaskRunResult {
  /**
   * Output from the task conforming to the output schema.
   */
  output: TaskRunTextOutput | TaskRunJsonOutput;

  /**
   * Task run object with status 'completed'.
   */
  run: TaskRun;
}

/**
 * Output from a task that returns text.
 */
export interface TaskRunTextOutput {
  /**
   * Basis for the output. The basis has a single field 'output'.
   */
  basis: Array<FieldBasis>;

  /**
   * Text output from the task.
   */
  content: string;

  /**
   * The type of output being returned, as determined by the output schema of the
   * task spec.
   */
  type: 'text';

  /**
   * @deprecated Deprecated. mcp-server-2025-07-17 is now included directly in the
   * output (e.g. mcp_tool_calls).
   */
  beta_fields?: { [key: string]: unknown } | null;

  /**
   * MCP tool calls made by the task.
   */
  mcp_tool_calls?: Array<McpToolCall> | null;
}

/**
 * Specification for a task.
 *
 * Auto output schemas can be specified by setting `output_schema={"type":"auto"}`.
 * Not specifying a TaskSpec is the same as setting an auto output schema.
 *
 * For convenience bare strings are also accepted as input or output schemas.
 */
export interface TaskSpec {
  /**
   * JSON schema or text fully describing the desired output from the task.
   * Descriptions of output fields will determine the form and content of the
   * response. A bare string is equivalent to a text schema with the same
   * description.
   */
  output_schema: JsonSchema | TextSchema | AutoSchema | string;

  /**
   * Optional JSON schema or text description of expected input to the task. A bare
   * string is equivalent to a text schema with the same description.
   */
  input_schema?: string | JsonSchema | TextSchema | null;
}

/**
 * Text description for a task input or output.
 */
export interface TextSchema {
  /**
   * A text description of the desired output from the task.
   */
  description?: string | null;

  /**
   * The type of schema being defined. Always `text`.
   */
  type?: 'text';
}

/**
 * Webhooks for Task Runs.
 */
export interface Webhook {
  /**
   * URL for the webhook.
   */
  url: string;

  /**
   * Event types to send the webhook notifications for.
   */
  event_types?: Array<'task_run.status'>;
}

/**
 * A progress update for a task run.
 */
export type TaskRunEventsResponse =
  | TaskRunEventsResponse.TaskRunProgressStatsEvent
  | TaskRunEventsResponse.TaskRunProgressMessageEvent
  | TaskRunEvent
  | ErrorEvent;

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
  mcp_servers?: Array<McpServer> | null;

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
  task_spec?: TaskSpec | null;

  /**
   * Body param: Webhooks for Task Runs.
   */
  webhook?: Webhook | null;

  /**
   * Header param: Optional header to specify the beta version(s) to enable.
   */
  betas?: Array<BetaTaskRunAPI.ParallelBeta>;
}

export interface TaskRunResultParams {
  /**
   * Query param
   */
  timeout?: number;

  /**
   * Header param: Optional header to specify the beta version(s) to enable.
   */
  betas?: Array<BetaTaskRunAPI.ParallelBeta>;
}

export declare namespace TaskRun {
  export {
    type AutoSchema as AutoSchema,
    type Citation as Citation,
    type ErrorEvent as ErrorEvent,
    type FieldBasis as FieldBasis,
    type JsonSchema as JsonSchema,
    type McpServer as McpServer,
    type McpToolCall as McpToolCall,
    type RunInput as RunInput,
    type TaskRun as TaskRun,
    type TaskRunEvent as TaskRunEvent,
    type TaskRunJsonOutput as TaskRunJsonOutput,
    type TaskRunResult as TaskRunResult,
    type TaskRunTextOutput as TaskRunTextOutput,
    type TaskSpec as TaskSpec,
    type TextSchema as TextSchema,
    type Webhook as Webhook,
    type TaskRunEventsResponse as TaskRunEventsResponse,
    type TaskRunCreateParams as TaskRunCreateParams,
    type TaskRunResultParams as TaskRunResultParams,
  };
}
