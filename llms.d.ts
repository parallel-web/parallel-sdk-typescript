/**
 * Parallel AI TypeScript SDK - Complete API Types
 * 
 * This file contains all the public types and interfaces for the Parallel AI SDK.
 * 
 * This file was AI-generated using "Let Me Prompt It For You" and "uithub". Generation can be found here:
 * https://letmeprompt.com/httpsuithubcomp-hmeo6ksihlvktq
 * 
 * Date of generation: 2025-10-16
 */

import type { ReadableStream } from 'stream/web';

// ==============================================================================
// CORE CLIENT
// ==============================================================================

export interface ClientOptions {
  /**
   * Defaults to process.env['PARALLEL_API_KEY'].
   */
  apiKey?: string | undefined;

  /**
   * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
   *
   * Defaults to process.env['PARALLEL_BASE_URL'].
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
   * much longer than this timeout before the promise succeeds or fails.
   *
   * @unit milliseconds
   */
  timeout?: number | undefined;

  /**
   * Additional `RequestInit` options to be passed to `fetch` calls.
   * Properties will be overridden by per-request `fetchOptions`.
   */
  fetchOptions?: RequestInit | undefined;

  /**
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we expect that `fetch` is defined globally.
   */
  fetch?: ((input: string | URL | Request, init?: RequestInit) => Promise<Response>) | undefined;

  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number | undefined;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `null` in request options.
   */
  defaultHeaders?: HeadersInit | undefined;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Record<string, string | undefined> | undefined;

  /**
   * Set the log level.
   *
   * Defaults to process.env['PARALLEL_LOG'] or 'warn' if it isn't set.
   */
  logLevel?: 'off' | 'error' | 'warn' | 'info' | 'debug' | undefined;

  /**
   * Set the logger.
   *
   * Defaults to globalThis.console.
   */
  logger?: {
    error: (message: string, ...rest: unknown[]) => void;
    warn: (message: string, ...rest: unknown[]) => void;
    info: (message: string, ...rest: unknown[]) => void;
    debug: (message: string, ...rest: unknown[]) => void;
  } | undefined;
}

/**
 * API Client for interfacing with the Parallel API.
 */
export declare class Parallel {
  taskRun: TaskRun;
  beta: Beta;

  /**
   * API Client for interfacing with the Parallel API.
   *
   * @param {string | undefined} [opts.apiKey=process.env['PARALLEL_API_KEY'] ?? undefined]
   * @param {string} [opts.baseURL=process.env['PARALLEL_BASE_URL'] ?? https://api.parallel.ai] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {RequestInit} [opts.fetchOptions] - Additional `RequestInit` options to be passed to `fetch` calls.
   * @param {Function} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {HeadersInit} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Record<string, string | undefined>} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor(options?: ClientOptions);

  /**
   * Create a new client instance re-using the same options given to the current client with optional overriding.
   */
  withOptions(options: Partial<ClientOptions>): this;

  static ParallelError: typeof ParallelError;
  static APIError: typeof APIError;
  static APIConnectionError: typeof APIConnectionError;
  static APIConnectionTimeoutError: typeof APIConnectionTimeoutError;
  static APIUserAbortError: typeof APIUserAbortError;
  static NotFoundError: typeof NotFoundError;
  static ConflictError: typeof ConflictError;
  static RateLimitError: typeof RateLimitError;
  static BadRequestError: typeof BadRequestError;
  static AuthenticationError: typeof AuthenticationError;
  static InternalServerError: typeof InternalServerError;
  static PermissionDeniedError: typeof PermissionDeniedError;
  static UnprocessableEntityError: typeof UnprocessableEntityError;

  /**
   * Helper for creating a {@link File} to pass to an SDK upload method from a variety of different data formats
   */
  static toFile: typeof toFile;
}

// ==============================================================================
// PROMISES AND STREAMING
// ==============================================================================

/**
 * A subclass of `Promise` providing additional helper methods
 * for interacting with the SDK.
 */
export declare class APIPromise<T> extends Promise<T> {
  /**
   * Gets the raw `Response` instance instead of parsing the response
   * data.
   *
   * If you want to parse the response body but still get the `Response`
   * instance, you can use {@link withResponse()}.
   *
   * 👋 Getting the wrong TypeScript type for `Response`?
   * Try setting `"moduleResolution": "NodeNext"` or add `"lib": ["DOM"]`
   * to your `tsconfig.json`.
   */
  asResponse(): Promise<Response>;

  /**
   * Gets the parsed response data and the raw `Response` instance.
   *
   * If you just want to get the raw `Response` instance without parsing it,
   * you can use {@link asResponse()}.
   *
   * 👋 Getting the wrong TypeScript type for `Response`?
   * Try setting `"moduleResolution": "NodeNext"` or add `"lib": ["DOM"]`
   * to your `tsconfig.json`.
   */
  withResponse(): Promise<{ data: T; response: Response }>;
}

export declare class Stream<Item> implements AsyncIterable<Item> {
  controller: AbortController;

  /**
   * Splits the stream into two streams which can be
   * independently read from at different speeds.
   */
  tee(): [Stream<Item>, Stream<Item>];

  /**
   * Converts this stream to a newline-separated ReadableStream of
   * JSON stringified values in the stream
   * which can be turned back into a Stream with `Stream.fromReadableStream()`.
   */
  toReadableStream(): ReadableStream;

  [Symbol.asyncIterator](): AsyncIterator<Item>;
}

// ==============================================================================
// ERROR CLASSES
// ==============================================================================

export declare class ParallelError extends Error {}

export declare class APIError<
  TStatus extends number | undefined = number | undefined,
  THeaders extends Headers | undefined = Headers | undefined,
  TError extends Object | undefined = Object | undefined,
> extends ParallelError {
  /** HTTP status for the response that caused the error */
  readonly status: TStatus;
  /** HTTP headers for the response that caused the error */
  readonly headers: THeaders;
  /** JSON body of the response that caused the error */
  readonly error: TError;
}

export declare class APIUserAbortError extends APIError<undefined, undefined, undefined> {}
export declare class APIConnectionError extends APIError<undefined, undefined, undefined> {}
export declare class APIConnectionTimeoutError extends APIConnectionError {}
export declare class BadRequestError extends APIError<400, Headers> {}
export declare class AuthenticationError extends APIError<401, Headers> {}
export declare class PermissionDeniedError extends APIError<403, Headers> {}
export declare class NotFoundError extends APIError<404, Headers> {}
export declare class ConflictError extends APIError<409, Headers> {}
export declare class UnprocessableEntityError extends APIError<422, Headers> {}
export declare class RateLimitError extends APIError<429, Headers> {}
export declare class InternalServerError extends APIError<number, Headers> {}

// ==============================================================================
// SHARED TYPES
// ==============================================================================

/**
 * An error message.
 */
export interface ErrorObject {
  /**
   * Human-readable message.
   */
  message: string;

  /**
   * Reference ID for the error.
   */
  ref_id: string;

  /**
   * Optional detail supporting the error.
   */
  detail?: { [key: string]: unknown } | null;
}

/**
 * Response object used for non-200 status codes.
 */
export interface ErrorResponse {
  /**
   * An error message.
   */
  error: ErrorObject;

  /**
   * Always 'error'.
   */
  type: 'error';
}

/**
 * Source policy for web search results.
 *
 * This policy governs which sources are allowed/disallowed in results.
 */
export interface SourcePolicy {
  /**
   * List of domains to exclude from results. If specified, sources from these
   * domains will be excluded.
   */
  exclude_domains?: Array<string>;

  /**
   * List of domains to restrict the results to. If specified, only sources from
   * these domains will be included.
   */
  include_domains?: Array<string>;
}

/**
 * Human-readable message for a task.
 */
export interface Warning {
  /**
   * Human-readable message.
   */
  message: string;

  /**
   * Type of warning. Note that adding new warning types is considered a
   * backward-compatible change.
   */
  type: 'spec_validation_warning' | 'input_validation_warning' | 'warning';

  /**
   * Optional detail supporting the warning.
   */
  detail?: { [key: string]: unknown } | null;
}

// ==============================================================================
// TASK RUN TYPES
// ==============================================================================

export declare class TaskRun {
  /**
   * Initiates a task run.
   *
   * Returns immediately with a run object in status 'queued'.
   *
   * Beta features can be enabled by setting the 'parallel-beta' header.
   */
  create(body: TaskRunCreateParams, options?: RequestOptions): APIPromise<TaskRunObject>;

  /**
   * Retrieves run status by run_id.
   *
   * The run result is available from the `/result` endpoint.
   */
  retrieve(runID: string, options?: RequestOptions): APIPromise<TaskRunObject>;

  /**
   * Retrieves a run result by run_id, blocking until the run is completed.
   */
  result(
    runID: string,
    query?: TaskRunResultParams,
    options?: RequestOptions,
  ): APIPromise<TaskRunResult>;
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
   * User-provided metadata stored with the run. Keys and values must be strings with
   * a maximum length of 16 and 512 characters respectively.
   */
  metadata?: { [key: string]: string | number | boolean } | null;

  /**
   * Source policy for web search results.
   *
   * This policy governs which sources are allowed/disallowed in results.
   */
  source_policy?: SourcePolicy | null;

  /**
   * Specification for a task.
   *
   * Auto output schemas can be specified by setting `output_schema={"type":"auto"}`.
   * Not specifying a TaskSpec is the same as setting an auto output schema.
   *
   * For convenience bare strings are also accepted as input or output schemas.
   */
  task_spec?: TaskSpec | null;
}

/**
 * Status of a task run.
 */
export interface TaskRunObject {
  /**
   * Timestamp of the creation of the task, as an RFC 3339 string.
   */
  created_at: string | null;

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
  error?: ErrorObject | null;

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
  warnings?: Array<Warning> | null;
}

/**
 * Output from a task that returns JSON.
 */
export interface TaskRunJsonOutput {
  /**
   * Basis for each top-level field in the JSON output.
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
   * Additional fields from beta features used in this task run. When beta features
   * are specified during both task run creation and result retrieval, this field
   * will be empty and instead the relevant beta attributes will be directly included
   * in the `BetaTaskRunJsonOutput` or corresponding output type. However, if beta
   * features were specified during task run creation but not during result
   * retrieval, this field will contain the dump of fields from those beta features.
   * Each key represents the beta feature version (one amongst parallel-beta headers)
   * and the values correspond to the beta feature attributes, if any. For now, only
   * MCP server beta features have attributes. For example,
   * `{mcp-server-2025-07-17: [{'server_name':'mcp_server', 'tool_call_id': 'tc_123', ...}]}}`
   */
  beta_fields?: { [key: string]: unknown } | null;

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
   * Status of a task run.
   */
  run: TaskRunObject;
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
   * Additional fields from beta features used in this task run. When beta features
   * are specified during both task run creation and result retrieval, this field
   * will be empty and instead the relevant beta attributes will be directly included
   * in the `BetaTaskRunJsonOutput` or corresponding output type. However, if beta
   * features were specified during task run creation but not during result
   * retrieval, this field will contain the dump of fields from those beta features.
   * Each key represents the beta feature version (one amongst parallel-beta headers)
   * and the values correspond to the beta feature attributes, if any. For now, only
   * MCP server beta features have attributes. For example,
   * `{mcp-server-2025-07-17: [{'server_name':'mcp_server', 'tool_call_id': 'tc_123', ...}]}}`
   */
  beta_fields?: { [key: string]: unknown } | null;
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

export interface TaskRunCreateParams {
  /**
   * Input to the task, either text or a JSON object.
   */
  input: string | { [key: string]: unknown };

  /**
   * Processor to use for the task.
   */
  processor: string;

  /**
   * User-provided metadata stored with the run. Keys and values must be strings with
   * a maximum length of 16 and 512 characters respectively.
   */
  metadata?: { [key: string]: string | number | boolean } | null;

  /**
   * Source policy for web search results.
   *
   * This policy governs which sources are allowed/disallowed in results.
   */
  source_policy?: SourcePolicy | null;

  /**
   * Specification for a task.
   *
   * Auto output schemas can be specified by setting `output_schema={"type":"auto"}`.
   * Not specifying a TaskSpec is the same as setting an auto output schema.
   *
   * For convenience bare strings are also accepted as input or output schemas.
   */
  task_spec?: TaskSpec | null;
}

export interface TaskRunResultParams {
  timeout?: number;
}

// ==============================================================================
// BETA API TYPES
// ==============================================================================

export declare class Beta {
  taskRun: BetaTaskRun;
  taskGroup: TaskGroup;

  /**
   * Searches the web.
   */
  search(body: BetaSearchParams, options?: RequestOptions): APIPromise<SearchResult>;
}

export declare class BetaTaskRun {
  /**
   * Initiates a task run.
   *
   * Returns immediately with a run object in status 'queued'.
   *
   * Beta features can be enabled by setting the 'parallel-beta' header.
   */
  create(params: BetaTaskRunCreateParams, options?: RequestOptions): APIPromise<TaskRunObject>;

  /**
   * Streams events for a task run.
   *
   * Returns a stream of events showing progress updates and state changes for the
   * task run.
   *
   * For task runs that did not have enable_events set to true during creation, the
   * frequency of events will be reduced.
   */
  events(runID: string, options?: RequestOptions): APIPromise<Stream<TaskRunEventsResponse>>;

  /**
   * Retrieves a run result by run_id, blocking until the run is completed.
   */
  result(
    runID: string,
    params?: BetaTaskRunResultParams,
    options?: RequestOptions,
  ): APIPromise<BetaTaskRunResult>;
}

export declare class TaskGroup {
  /**
   * Initiates a TaskGroup to group and track multiple runs.
   */
  create(body: TaskGroupCreateParams, options?: RequestOptions): APIPromise<TaskGroupObject>;

  /**
   * Retrieves aggregated status across runs in a TaskGroup.
   */
  retrieve(taskGroupID: string, options?: RequestOptions): APIPromise<TaskGroupObject>;

  /**
   * Initiates multiple task runs within a TaskGroup.
   */
  addRuns(
    taskGroupID: string,
    params: TaskGroupAddRunsParams,
    options?: RequestOptions,
  ): APIPromise<TaskGroupRunResponse>;

  /**
   * Streams events from a TaskGroup: status updates and run completions.
   *
   * The connection will remain open for up to 10 minutes as long as at least one run
   * in the TaskGroup is active.
   */
  events(
    taskGroupID: string,
    query?: TaskGroupEventsParams,
    options?: RequestOptions,
  ): APIPromise<Stream<TaskGroupEventsResponse>>;

  /**
   * Retrieves task runs in a TaskGroup and optionally their inputs and outputs.
   */
  getRuns(
    taskGroupID: string,
    query?: TaskGroupGetRunsParams,
    options?: RequestOptions,
  ): APIPromise<Stream<TaskGroupGetRunsResponse>>;
}

/**
 * Task run input with additional beta fields.
 */
export interface BetaRunInput {
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
   * premium processors (pro and above). This feature is not available via the Python
   * SDK. To enable this feature in your API requests, specify the `parallel-beta`
   * header with `events-sse-2025-07-24` value.
   */
  enable_events?: boolean | null;

  /**
   * Optional list of MCP servers to use for the run. This feature is not available
   * via the Python SDK. To enable this feature in your API requests, specify the
   * `parallel-beta` header with `mcp-server-2025-07-17` value.
   */
  mcp_servers?: Array<McpServer> | null;

  /**
   * User-provided metadata stored with the run. Keys and values must be strings with
   * a maximum length of 16 and 512 characters respectively.
   */
  metadata?: { [key: string]: string | number | boolean } | null;

  /**
   * Source policy for web search results.
   *
   * This policy governs which sources are allowed/disallowed in results.
   */
  source_policy?: SourcePolicy | null;

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
 * Result of a beta task run. Available only if beta headers are specified.
 */
export interface BetaTaskRunResult {
  /**
   * Output from the task conforming to the output schema.
   */
  output: BetaTaskRunTextOutput | BetaTaskRunJsonOutput;

  /**
   * Status of a task run.
   */
  run: TaskRunObject;
}

/**
 * Output from a task that returns text.
 */
export interface BetaTaskRunTextOutput {
  /**
   * Basis for the output.
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
   * Always None.
   */
  beta_fields?: { [key: string]: unknown } | null;

  /**
   * MCP tool calls made by the task.
   */
  mcp_tool_calls?: Array<McpToolCall> | null;
}

/**
 * Output from a task that returns JSON.
 */
export interface BetaTaskRunJsonOutput {
  /**
   * Basis for the output.
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
   * Always None.
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
 * Event indicating an error.
 */
export interface ErrorEvent {
  /**
   * An error message.
   */
  error: ErrorObject;

  /**
   * Event type; always 'error'.
   */
  type: 'error';
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
 * Model for the parallel-beta header.
 */
export type ParallelBeta =
  | 'mcp-server-2025-07-17'
  | 'events-sse-2025-07-24'
  | 'webhook-2025-08-12'
  | (string & {});

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
   * Status of a task run.
   */
  run: TaskRunObject;

  /**
   * Event type; always 'task_run.state'.
   */
  type: 'task_run.state';

  /**
   * Task run input with additional beta fields.
   */
  input?: BetaRunInput | null;

  /**
   * Output from the run; included only if requested and if status == `completed`.
   */
  output?: TaskRunTextOutput | TaskRunJsonOutput | null;
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
  | TaskRunProgressStatsEvent
  | TaskRunProgressMessageEvent
  | TaskRunEvent
  | ErrorEvent;

/**
 * A progress update for a task run.
 */
export interface TaskRunProgressStatsEvent {
  /**
   * Source stats for a task run.
   */
  source_stats: {
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
  };

  /**
   * Event type; always 'task_run.progress_stats'.
   */
  type: 'task_run.progress_stats';
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

/**
 * Response object for a task group, including its status and metadata.
 */
export interface TaskGroupObject {
  /**
   * Timestamp of the creation of the group, as an RFC 3339 string.
   */
  created_at: string | null;

  /**
   * Status of a task group.
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
   * Status of a task group.
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
export type TaskGroupEventsResponse =
  | TaskGroupStatusEvent
  | TaskRunEvent
  | ErrorEvent;

/**
 * Event indicating an update to group status.
 */
export interface TaskGroupStatusEvent {
  /**
   * Cursor to resume the event stream.
   */
  event_id: string;

  /**
   * Status of a task group.
   */
  status: TaskGroupStatus;

  /**
   * Event type; always 'task_group_status'.
   */
  type: 'task_group_status';
}

/**
 * Event when a task run transitions to a non-active status.
 *
 * May indicate completion, cancellation, or failure.
 */
export type TaskGroupGetRunsResponse = TaskRunEvent | ErrorEvent;

/**
 * Output for the Search API.
 */
export interface SearchResult {
  /**
   * A list of WebSearchResult objects, ordered by decreasing relevance.
   */
  results: Array<WebSearchResult>;

  /**
   * Search ID. Example: `search_cad0a6d2-dec0-46bd-95ae-900527d880e7`
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

// ==============================================================================
// REQUEST PARAMETER TYPES
// ==============================================================================

export interface RequestOptions {
  /**
   * The HTTP method for the request (e.g., 'get', 'post', 'put', 'delete').
   */
  method?: 'get' | 'post' | 'put' | 'patch' | 'delete';

  /**
   * The URL path for the request.
   *
   * @example "/v1/foo"
   */
  path?: string;

  /**
   * Query parameters to include in the request URL.
   */
  query?: object | undefined | null;

  /**
   * The request body. Can be a string, JSON object, FormData, or other supported types.
   */
  body?: unknown;

  /**
   * HTTP headers to include with the request. Can be a Headers object, plain object, or array of tuples.
   */
  headers?: HeadersInit;

  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number;

  stream?: boolean | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * @unit milliseconds
   */
  timeout?: number;

  /**
   * Additional `RequestInit` options to be passed to the underlying `fetch` call.
   * These options will be merged with the client's default fetch options.
   */
  fetchOptions?: RequestInit;

  /**
   * An AbortSignal that can be used to cancel the request.
   */
  signal?: AbortSignal | undefined | null;

  /**
   * A unique key for this request to enable idempotency.
   */
  idempotencyKey?: string;

  /**
   * Override the default base URL for this specific request.
   */
  defaultBaseURL?: string | undefined;
}

export interface BetaSearchParams {
  /**
   * Upper bound on the number of characters to include in excerpts for each search
   * result.
   */
  max_chars_per_result?: number | null;

  /**
   * Upper bound on the number of results to return. May be limited by the processor.
   * Defaults to 10 if not provided.
   */
  max_results?: number | null;

  /**
   * Natural-language description of what the web search is trying to find. May
   * include guidance about preferred sources or freshness. At least one of objective
   * or search_queries must be provided.
   */
  objective?: string | null;

  /**
   * Search processor.
   */
  processor?: 'base' | 'pro';

  /**
   * Optional list of traditional keyword search queries to guide the search. May
   * contain search operators. At least one of objective or search_queries must be
   * provided.
   */
  search_queries?: Array<string> | null;

  /**
   * Source policy for web search results.
   *
   * This policy governs which sources are allowed/disallowed in results.
   */
  source_policy?: SourcePolicy | null;
}

export interface BetaTaskRunCreateParams {
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
   * premium processors (pro and above). This feature is not available via the Python
   * SDK. To enable this feature in your API requests, specify the `parallel-beta`
   * header with `events-sse-2025-07-24` value.
   */
  enable_events?: boolean | null;

  /**
   * Body param: Optional list of MCP servers to use for the run. This feature is not
   * available via the Python SDK. To enable this feature in your API requests,
   * specify the `parallel-beta` header with `mcp-server-2025-07-17` value.
   */
  mcp_servers?: Array<McpServer> | null;

  /**
   * Body param: User-provided metadata stored with the run. Keys and values must be
   * strings with a maximum length of 16 and 512 characters respectively.
   */
  metadata?: { [key: string]: string | number | boolean } | null;

  /**
   * Body param: Source policy for web search results.
   *
   * This policy governs which sources are allowed/disallowed in results.
   */
  source_policy?: SourcePolicy | null;

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
  betas?: Array<ParallelBeta>;
}

export interface BetaTaskRunResultParams {
  /**
   * Query param:
   */
  timeout?: number;

  /**
   * Header param: Optional header to specify the beta version(s) to enable.
   */
  betas?: Array<ParallelBeta>;
}

export interface TaskGroupCreateParams {
  /**
   * User-provided metadata stored with the task group.
   */
  metadata?: { [key: string]: string | number | boolean } | null;
}

export interface TaskGroupAddRunsParams {
  /**
   * Body param: List of task runs to execute.
   */
  inputs: Array<BetaRunInput>;

  /**
   * Body param: Specification for a task.
   *
   * Auto output schemas can be specified by setting `output_schema={"type":"auto"}`.
   * Not specifying a TaskSpec is the same as setting an auto output schema.
   *
   * For convenience bare strings are also accepted as input or output schemas.
   */
  default_task_spec?: TaskSpec | null;

  /**
   * Header param: Optional header to specify the beta version(s) to enable.
   */
  betas?: Array<ParallelBeta>;
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

// ==============================================================================
// FILE UPLOAD UTILITIES
// ==============================================================================

export type Uploadable = File | Response | (AsyncIterable<Uint8Array> & { path: string | { toString(): string } });

/**
 * Helper for creating a {@link File} to pass to an SDK upload method from a variety of different data formats
 * @param value the raw content of the file.  Can be an {@link Uploadable}, {@link BlobLikePart}, or {@link AsyncIterable} of {@link BlobLikePart}s
 * @param {string=} name the name of the file. If omitted, toFile will try to determine a file name from bits if possible
 * @param {Object=} options additional properties
 * @param {string=} options.type the MIME type of the content
 * @param {number=} options.lastModified the last modified timestamp
 * @returns a {@link File} with the given properties
 */
export declare function toFile(
  value: any,
  name?: string | null | undefined,
  options?: { type?: string; lastModified?: number } | undefined,
): Promise<File>;

// ==============================================================================
// DEFAULT EXPORT
// ==============================================================================

export default Parallel;