// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import * as TaskRunAPI from './task-run';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * The Monitor API watches the web for material changes on a fixed frequency. Each monitor runs once on creation and then on its configured schedule, emitting events when meaningful changes are detected.
 * - `event_stream` monitors track a search query and emit an event for each new material change.
 * - `snapshot` monitors track a specific task run's output and emit an event when the output changes.
 *
 * Results can be polled via the events endpoint or delivered via webhooks.
 */
export class MonitorResource extends APIResource {
  /**
   * Create a monitor.
   *
   * Monitors run on a fixed frequency to detect material changes in web content. Set
   * `type=event_stream` to monitor a search query, or `type=snapshot` to monitor a
   * specific task run's output. The monitor runs once immediately at creation, then
   * continues on the configured schedule.
   *
   * @example
   * ```ts
   * const monitor = await client.monitor.create({
   *   frequency: '1h',
   *   settings: { query: 'Extract recent news about AI' },
   *   type: 'event_stream',
   * });
   * ```
   */
  create(body: MonitorCreateParams, options?: RequestOptions): APIPromise<Monitor> {
    return this._client.post('/v1/monitors', { body, ...options });
  }

  /**
   * Retrieve a monitor.
   *
   * Retrieves a specific monitor by `monitor_id`. Returns the monitor configuration
   * including status, frequency, query, and webhook settings.
   *
   * @example
   * ```ts
   * const monitor = await client.monitor.retrieve('monitor_id');
   * ```
   */
  retrieve(monitorID: string, options?: RequestOptions): APIPromise<Monitor> {
    return this._client.get(path`/v1/monitors/${monitorID}`, options);
  }

  /**
   * Update a monitor.
   *
   * Only fields explicitly included in the request body are changed. Pass `null` for
   * `webhook` or `metadata` to clear those fields. Pass `type` and `settings` to
   * update type-specific settings on an `event_stream` monitor. At least one field
   * must be provided. Cancelled monitors cannot be updated.
   *
   * @example
   * ```ts
   * const monitor = await client.monitor.update('monitor_id');
   * ```
   */
  update(monitorID: string, body: MonitorUpdateParams, options?: RequestOptions): APIPromise<Monitor> {
    return this._client.post(path`/v1/monitors/${monitorID}/update`, { body, ...options });
  }

  /**
   * List monitors ordered by creation time, newest first.
   *
   * Monitors are sorted by `created_at` descending. `limit` defaults to 100. Use
   * `next_cursor` from the response and pass it as `cursor` to fetch the next page.
   * Pagination ends when `next_cursor` is absent.
   *
   * By default only `active` monitors are returned. Pass `status=cancelled` or both
   * values to include cancelled monitors.
   *
   * The legacy Monitor API (`/v1alpha/monitors` endpoints) is documented under the
   * `Monitor (Alpha)` tag.
   *
   * @example
   * ```ts
   * const paginatedMonitorResponse =
   *   await client.monitor.list();
   * ```
   */
  list(
    query: MonitorListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PaginatedMonitorResponse> {
    return this._client.get('/v1/monitors', { query, ...options });
  }

  /**
   * Cancel a monitor.
   *
   * Permanently stops the monitor from running. Cancellation is irreversible —
   * create a new monitor to resume monitoring. Cancelling an already-cancelled
   * monitor is a no-op.
   *
   * @example
   * ```ts
   * const monitor = await client.monitor.cancel('monitor_id');
   * ```
   */
  cancel(monitorID: string, options?: RequestOptions): APIPromise<Monitor> {
    return this._client.post(path`/v1/monitors/${monitorID}/cancel`, options);
  }

  /**
   * List events for a monitor, newest first.
   *
   * Pass `event_group_id` to narrow results to a single execution. Otherwise returns
   * all executions newest-first; use `next_cursor` to paginate. Set
   * `include_completions=true` to also include no-change executions.
   *
   * @example
   * ```ts
   * const paginatedMonitorEvents = await client.monitor.events(
   *   'monitor_id',
   * );
   * ```
   */
  events(
    monitorID: string,
    query: MonitorEventsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PaginatedMonitorEvents> {
    return this._client.get(path`/v1/monitors/${monitorID}/events`, { query, ...options });
  }

  /**
   * Trigger an immediate monitor run.
   *
   * Enqueues a one-off execution of the monitor outside its normal schedule. The
   * monitor's regular schedule is not affected. An event is only emitted if the
   * execution detects a material change. Cancelled monitors cannot be triggered.
   *
   * @example
   * ```ts
   * await client.monitor.trigger('monitor_id');
   * ```
   */
  trigger(monitorID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.post(path`/v1/monitors/${monitorID}/trigger`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * Advanced monitor configuration.
 */
export interface AdvancedMonitorSettings {
  /**
   * ISO 3166-1 alpha-2 country code for geo-targeted monitor results.
   */
  location?: string | null;

  /**
   * Source policy for web search results.
   *
   * This policy governs which sources are allowed/disallowed in results.
   */
  source_policy?: Shared.SourcePolicy | null;
}

/**
 * Request body to create a monitor.
 *
 * The `type` field at the root determines the expected shape of `settings`:
 * `event_stream` requires `MonitorEventStreamSettings`, and `snapshot` requires
 * `MonitorSnapshotSettings`.
 */
export interface CreateMonitorRequest {
  /**
   * Frequency of the monitor. Format: '<number><unit>' where unit is 'h' (hours),
   * 'd' (days), or 'w' (weeks). Must be between 1h and 30d (inclusive).
   */
  frequency: string;

  /**
   * Type-specific settings for the monitor. The expected shape is determined by the
   * root `type` field: pass `MonitorEventStreamSettings` when `type` is
   * `event_stream`, and `MonitorSnapshotSettings` when `type` is `snapshot`.
   */
  settings: MonitorEventStreamSettings | MonitorSnapshotSettings;

  /**
   * Type of monitor to create. `event_stream` monitors a search query for material
   * changes; `snapshot` monitors a specific task run's output. Determines the
   * expected shape of `settings`.
   */
  type: 'event_stream' | 'snapshot';

  /**
   * User-provided metadata stored with the monitor and echoed back in webhook
   * notifications and GET responses, so you can map events to objects in your
   * application. Keys: max 16 chars; values: max 512 chars.
   */
  metadata?: { [key: string]: string } | null;

  /**
   * Processor to use for the monitor. `lite` is faster and cheaper; `base` performs
   * more thorough analysis at higher cost and latency. Defaults to `lite`.
   */
  processor?: 'lite' | 'base';

  /**
   * Webhook configuration for a monitor.
   */
  webhook?: MonitorWebhook | null;
}

/**
 * Response object for a monitor.
 *
 * The `type` field at the root determines the concrete shape of `settings`:
 * `event_stream` uses `MonitorEventStreamResponseSettings`, and `snapshot` uses
 * `MonitorSnapshotResponseSettings`. Snapshot monitors also carry an `output`
 * field (`MonitorSnapshotOutput`) with the latest computed state.
 */
export interface Monitor {
  /**
   * Timestamp of the creation of the monitor, as an RFC 3339 string.
   */
  created_at: string;

  /**
   * Frequency of the monitor. Format: '<number><unit>' where unit is 'h' (hours),
   * 'd' (days), or 'w' (weeks). Must be between 1h and 30d (inclusive).
   */
  frequency: string;

  /**
   * ID of the monitor.
   */
  monitor_id: string;

  /**
   * Processor to use for the monitor. `lite` is faster and cheaper; `base` performs
   * more thorough analysis at higher cost and latency. Defaults to `lite`.
   */
  processor: 'lite' | 'base';

  /**
   * Type-specific configuration. Shape is determined by `type`:
   * `MonitorEventStreamResponseSettings` for `event_stream`,
   * `MonitorSnapshotResponseSettings` for `snapshot`.
   */
  settings: MonitorEventStreamResponseSettings | MonitorSnapshotResponseSettings;

  /**
   * Status of the monitor.
   */
  status: 'active' | 'cancelled';

  /**
   * The type of monitor.
   */
  type: 'event_stream' | 'snapshot';

  /**
   * Timestamp of the last run for the monitor, as an RFC 3339 string.
   */
  last_run_at?: string | null;

  /**
   * User-provided metadata stored with the monitor and echoed back in webhook
   * notifications and GET responses, so you can map events to objects in your
   * application. Keys: max 16 chars; values: max 512 chars.
   */
  metadata?: { [key: string]: string } | null;

  /**
   * Runtime output state for a `snapshot` monitor.
   */
  output?: MonitorSnapshotOutput | null;

  /**
   * Webhook configuration for a monitor.
   */
  webhook?: MonitorWebhook | null;
}

/**
 * Emitted when a monitor execution ran but detected no material changes.
 *
 * Only returned when `include_completions=true` is passed to the list events
 * endpoint. Useful for auditing execution history alongside content events.
 */
export interface MonitorCompletionEvent {
  /**
   * Timestamp of when the monitor execution completed, as an RFC 3339 string.
   */
  timestamp: string;

  /**
   * Discriminant for the completion event variant.
   */
  event_type?: 'completion';
}

/**
 * Emitted when a monitor execution failed (e.g. payment or quota error).
 *
 * Always included in the events list regardless of `include_completions`.
 */
export interface MonitorErrorEvent {
  /**
   * Human-readable description of the failure.
   */
  error_message: string;

  /**
   * Timestamp of when the monitor execution failed, as an RFC 3339 string.
   */
  timestamp: string;

  /**
   * Discriminant for the error event variant.
   */
  event_type?: 'error';
}

/**
 * Append-only event from an event_stream monitor.
 *
 * Each event represents a distinct material change detected since the previous
 * execution. Events are net-new relative to the cursor; clients should treat them
 * as an append-only log.
 */
export interface MonitorEventStreamEvent {
  /**
   * Date when this event was produced. ISO 8601 date (YYYY-MM-DD) or partial
   * (YYYY-MM or YYYY).
   */
  event_date: string | null;

  /**
   * ID of the event group that owns this event.
   */
  event_group_id: string;

  /**
   * Stable identifier for this event. Safe to use for client-side deduplication
   * across pagination and retries.
   */
  event_id: string;

  /**
   * Text or JSON output describing the detected change.
   */
  output: TaskRunAPI.TaskRunTextOutput | TaskRunAPI.TaskRunJsonOutput;

  /**
   * Discriminant for the event_stream event variant.
   */
  event_type?: 'event_stream';
}

/**
 * Type-specific response fields for an `event_stream` monitor.
 */
export interface MonitorEventStreamResponseSettings {
  /**
   * The search query being monitored.
   */
  query: string;

  /**
   * Advanced monitor configuration.
   */
  advanced_settings?: AdvancedMonitorSettings | null;

  /**
   * If true, the first execution returns a sample of recent historical events
   * matching the query (preview only — not exhaustive). If false or omitted, only
   * events from the monitor's creation date onward are returned. Subsequent
   * executions are always incremental.
   */
  include_backfill?: boolean | null;

  /**
   * JSON schema for a task input or output.
   */
  output_schema?: TaskRunAPI.JsonSchema | null;
}

/**
 * Type-specific settings for an `event_stream` monitor.
 */
export interface MonitorEventStreamSettings {
  /**
   * Search query to monitor for material changes.
   */
  query: string;

  /**
   * Advanced monitor configuration.
   */
  advanced_settings?: AdvancedMonitorSettings | null;

  /**
   * If true, the first execution returns a sample of recent historical events
   * matching the query (preview only — not exhaustive). If false or omitted, only
   * events from the monitor's creation date onward are returned. Subsequent
   * executions are always incremental.
   */
  include_backfill?: boolean | null;

  /**
   * JSON schema for a task input or output.
   */
  output_schema?: TaskRunAPI.JsonSchema | null;
}

/**
 * Snapshot diff event emitted when a monitored task run's output changes.
 *
 * `changed_output` contains only the fields that changed since the previous
 * execution, along with their `basis` (reasoning + citations). `previous_output`
 * holds the complete output from the prior run for comparison.
 */
export interface MonitorSnapshotEvent {
  /**
   * Partial output containing only the fields that changed since the previous
   * execution, each with its `basis` (reasoning and citations).
   */
  changed_output: TaskRunAPI.TaskRunTextOutput | TaskRunAPI.TaskRunJsonOutput;

  /**
   * Date when this event was produced. ISO 8601 date (YYYY-MM-DD) or partial
   * (YYYY-MM or YYYY).
   */
  event_date: string | null;

  /**
   * ID of the event group that owns this event.
   */
  event_group_id: string;

  /**
   * Stable identifier for this event. Safe to use for client-side deduplication
   * across pagination and retries.
   */
  event_id: string;

  /**
   * The full output from the prior run, including all fields and basis.
   */
  previous_output: TaskRunAPI.TaskRunTextOutput | TaskRunAPI.TaskRunJsonOutput;

  /**
   * Discriminant for the snapshot event variant.
   */
  event_type?: 'snapshot';
}

/**
 * Runtime output state for a `snapshot` monitor.
 */
export interface MonitorSnapshotOutput {
  /**
   * Task run output from the most recent completed execution of this snapshot
   * monitor — same structure as the output of the original task run the monitor was
   * created from. `null` until the first run completes.
   */
  latest_snapshot?: TaskRunAPI.TaskRunTextOutput | TaskRunAPI.TaskRunJsonOutput | null;
}

/**
 * Configuration settings for a `snapshot` monitor.
 */
export interface MonitorSnapshotResponseSettings {
  /**
   * The original task input from the baseline task run that this monitor tracks.
   */
  query: string;

  /**
   * ID of the task run used as the monitoring baseline.
   */
  task_run_id: string;

  /**
   * JSON schema for a task input or output.
   */
  output_schema?: TaskRunAPI.JsonSchema | null;
}

/**
 * Type-specific settings for a `snapshot` monitor.
 */
export interface MonitorSnapshotSettings {
  /**
   * Task run ID whose output becomes the data and schema for the monitor.
   */
  task_run_id: string;
}

/**
 * Webhook configuration for a monitor.
 */
export interface MonitorWebhook {
  /**
   * URL for the webhook.
   */
  url: string;

  /**
   * Event types to send the webhook notifications for.
   */
  event_types?: Array<'monitor.event.detected' | 'monitor.execution.completed' | 'monitor.execution.failed'>;
}

/**
 * Paginated list of monitor events, newest first.
 */
export interface PaginatedMonitorEvents {
  /**
   * Monitor events returned by this request, ordered newest first.
   */
  events: Array<MonitorEventStreamEvent | MonitorSnapshotEvent | MonitorCompletionEvent | MonitorErrorEvent>;

  /**
   * Pass as `cursor` to retrieve more events. Absent when there are no more events.
   */
  next_cursor?: string | null;

  /**
   * Execution caveats for this page of events, e.g. compute limits.
   */
  warnings?: Array<Shared.Warning> | null;
}

/**
 * Paginated list of monitors.
 */
export interface PaginatedMonitorResponse {
  /**
   * List of monitors for the current page.
   */
  monitors: Array<Monitor>;

  /**
   * Opaque pagination token. Pass as `cursor` to retrieve the next page. Absent when
   * there are no more pages.
   */
  next_cursor?: string | null;
}

/**
 * Type-specific update settings for an `event_stream` monitor.
 */
export interface UpdateMonitorEventStreamSettings {
  /**
   * Advanced monitor configuration.
   */
  advanced_settings?: AdvancedMonitorSettings | null;

  /**
   * Updated search query for the monitor. Use this for minor updates to prompts and
   * instructions only. Major changes to the query may lead to unexpected results in
   * change detection, as the monitor compares new results with what was previously
   * seen.
   */
  query?: string | null;
}

/**
 * Request body to update a monitor.
 *
 * Only fields that are explicitly included in the request body are updated. Pass
 * `null` for `webhook` or `metadata` to clear those fields. To update
 * type-specific settings on an `event_stream` monitor, include `type` and
 * `settings`; pass `settings.query` to update the prompt, or `null` for
 * `settings.advanced_settings` to clear it. If `settings` is provided, `type` is
 * required to identify the settings shape. The request must still include at least
 * one field to update; empty updates fail validation.
 */
export interface UpdateMonitorRequest {
  /**
   * Frequency of the monitor. Format: '<number><unit>' where unit is 'h' (hours),
   * 'd' (days), or 'w' (weeks). Must be between 1h and 30d (inclusive).
   */
  frequency?: string | null;

  /**
   * User-provided metadata stored with the monitor and echoed back in webhook
   * notifications and GET responses, so you can map events to objects in your
   * application. Keys: max 16 chars; values: max 512 chars.
   */
  metadata?: { [key: string]: string } | null;

  /**
   * Type-specific update settings for an `event_stream` monitor.
   */
  settings?: UpdateMonitorEventStreamSettings | null;

  /**
   * Type of the monitor being updated. Required when `settings` is provided; must be
   * `event_stream` (snapshot monitors have no updatable type-specific settings).
   */
  type?: 'event_stream' | 'snapshot' | null;

  /**
   * Webhook configuration for a monitor.
   */
  webhook?: MonitorWebhook | null;
}

export interface MonitorCreateParams {
  /**
   * Frequency of the monitor. Format: '<number><unit>' where unit is 'h' (hours),
   * 'd' (days), or 'w' (weeks). Must be between 1h and 30d (inclusive).
   */
  frequency: string;

  /**
   * Type-specific settings for the monitor. The expected shape is determined by the
   * root `type` field: pass `MonitorEventStreamSettings` when `type` is
   * `event_stream`, and `MonitorSnapshotSettings` when `type` is `snapshot`.
   */
  settings: MonitorEventStreamSettings | MonitorSnapshotSettings;

  /**
   * Type of monitor to create. `event_stream` monitors a search query for material
   * changes; `snapshot` monitors a specific task run's output. Determines the
   * expected shape of `settings`.
   */
  type: 'event_stream' | 'snapshot';

  /**
   * User-provided metadata stored with the monitor and echoed back in webhook
   * notifications and GET responses, so you can map events to objects in your
   * application. Keys: max 16 chars; values: max 512 chars.
   */
  metadata?: { [key: string]: string } | null;

  /**
   * Processor to use for the monitor. `lite` is faster and cheaper; `base` performs
   * more thorough analysis at higher cost and latency. Defaults to `lite`.
   */
  processor?: 'lite' | 'base';

  /**
   * Webhook configuration for a monitor.
   */
  webhook?: MonitorWebhook | null;
}

export interface MonitorUpdateParams {
  /**
   * Frequency of the monitor. Format: '<number><unit>' where unit is 'h' (hours),
   * 'd' (days), or 'w' (weeks). Must be between 1h and 30d (inclusive).
   */
  frequency?: string | null;

  /**
   * User-provided metadata stored with the monitor and echoed back in webhook
   * notifications and GET responses, so you can map events to objects in your
   * application. Keys: max 16 chars; values: max 512 chars.
   */
  metadata?: { [key: string]: string } | null;

  /**
   * Type-specific update settings for an `event_stream` monitor.
   */
  settings?: UpdateMonitorEventStreamSettings | null;

  /**
   * Type of the monitor being updated. Required when `settings` is provided; must be
   * `event_stream` (snapshot monitors have no updatable type-specific settings).
   */
  type?: 'event_stream' | 'snapshot' | null;

  /**
   * Webhook configuration for a monitor.
   */
  webhook?: MonitorWebhook | null;
}

export interface MonitorListParams {
  /**
   * Pagination token from `next_cursor` in a previous response. Omit to start from
   * the most recently created monitor.
   */
  cursor?: string | null;

  /**
   * Maximum number of monitors to return. Defaults to 100. Between 1 and 10000.
   */
  limit?: number | null;

  /**
   * Filter by monitor status. Pass multiple times to filter by multiple values.
   * Defaults to `active` only.
   */
  status?: Array<'active' | 'cancelled'> | null;

  /**
   * Filter by monitor type. Pass multiple times to filter by multiple values. Omit
   * to return all types.
   */
  type?: Array<'event_stream' | 'snapshot'> | null;
}

export interface MonitorEventsParams {
  /**
   * Pass `next_cursor` from a previous response to retrieve more events.
   */
  cursor?: string | null;

  /**
   * Filter to a single execution. Values come from `event_group_id` in webhook
   * events and listed events. Pagination params are ignored when set.
   */
  event_group_id?: string | null;

  /**
   * When true, include completion events for executions that ran but detected no
   * material changes. Useful for auditing execution history.
   */
  include_completions?: boolean;

  /**
   * Maximum number of events to return. Defaults to 20. Between 1 and 100.
   */
  limit?: number | null;
}

export declare namespace MonitorResource {
  export {
    type AdvancedMonitorSettings as AdvancedMonitorSettings,
    type CreateMonitorRequest as CreateMonitorRequest,
    type Monitor as Monitor,
    type MonitorCompletionEvent as MonitorCompletionEvent,
    type MonitorErrorEvent as MonitorErrorEvent,
    type MonitorEventStreamEvent as MonitorEventStreamEvent,
    type MonitorEventStreamResponseSettings as MonitorEventStreamResponseSettings,
    type MonitorEventStreamSettings as MonitorEventStreamSettings,
    type MonitorSnapshotEvent as MonitorSnapshotEvent,
    type MonitorSnapshotOutput as MonitorSnapshotOutput,
    type MonitorSnapshotResponseSettings as MonitorSnapshotResponseSettings,
    type MonitorSnapshotSettings as MonitorSnapshotSettings,
    type MonitorWebhook as MonitorWebhook,
    type PaginatedMonitorEvents as PaginatedMonitorEvents,
    type PaginatedMonitorResponse as PaginatedMonitorResponse,
    type UpdateMonitorEventStreamSettings as UpdateMonitorEventStreamSettings,
    type UpdateMonitorRequest as UpdateMonitorRequest,
    type MonitorCreateParams as MonitorCreateParams,
    type MonitorUpdateParams as MonitorUpdateParams,
    type MonitorListParams as MonitorListParams,
    type MonitorEventsParams as MonitorEventsParams,
  };
}
