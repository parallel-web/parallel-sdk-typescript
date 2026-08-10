// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';

/**
 * The Memory API retrieves and manages memories created by Tasks, Monitors, and FindAll runs. Memories can be personal or isolated with a `memory_scope_key`.
 */
export class Memory extends APIResource {
  /**
   * Retrieves relevant or recent runs from the selected memory. Provide a query to
   * rank results by relevance; leave it empty to return the most recent runs.
   *
   * @example
   * ```ts
   * const memoryRetrieveResponse =
   *   await client.beta.memory.retrieve();
   * ```
   */
  retrieve(body: MemoryRetrieveParams, options?: RequestOptions): APIPromise<MemoryRetrieveResponse> {
    return this._client.post('/v1beta/memory/retrieve', {
      body,
      ...options,
      headers: buildHeaders([{ 'parallel-beta': 'search-extract-2025-10-10' }, options?.headers]),
    });
  }

  /**
   * Clears all entries from the selected memory without deleting the underlying
   * tasks, monitors, or FindAll runs.
   *
   * @example
   * ```ts
   * await client.beta.memory.clear();
   * ```
   */
  clear(body: MemoryClearParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post('/v1beta/memory/clear', {
      body,
      ...options,
      headers: buildHeaders([
        { 'parallel-beta': 'search-extract-2025-10-10', Accept: '*/*' },
        options?.headers,
      ]),
    });
  }

  /**
   * Removes a task run, monitor, or FindAll run from the selected memory without
   * deleting the original resource.
   *
   * @example
   * ```ts
   * await client.beta.memory.evict({ id: 'id', kind: 'task' });
   * ```
   */
  evict(body: MemoryEvictParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post('/v1beta/memory/evict', {
      body,
      ...options,
      headers: buildHeaders([
        { 'parallel-beta': 'search-extract-2025-10-10', Accept: '*/*' },
        options?.headers,
      ]),
    });
  }
}

export interface FindAllMemoryResult {
  /**
   * ID of the FindAll run.
   */
  id: string;

  /**
   * Preview of the run's objective. May be truncated.
   */
  input_excerpt: string;

  /**
   * Current number of matched entities.
   */
  matched_count: number;

  /**
   * When the FindAll result was last updated, as an RFC 3339 timestamp.
   */
  updated_at: string;

  kind?: 'findall';
}

export interface MemoryClearRequest {
  /**
   * User-provided key identifying the memory scope to use. Omit to use personal
   * memory, if available.
   */
  memory_scope_key?: string | null;
}

export interface MemoryEvictRequest {
  /**
   * ID of the task run, monitor, or FindAll run to evict.
   */
  id: string;

  /**
   * Kind of source to evict: `task`, `monitor`, or `findall`.
   */
  kind: 'task' | 'monitor' | 'findall';

  /**
   * User-provided key identifying the memory scope to use. Omit to use personal
   * memory, if available.
   */
  memory_scope_key?: string | null;
}

export interface MemoryRetrieveRequest {
  /**
   * Filter memories by kind: `task`, `monitor`, or `findall`.
   */
  kind?: 'task' | 'monitor' | 'findall' | null;

  /**
   * Maximum number of memories to return.
   */
  limit?: number;

  /**
   * User-provided key identifying the memory scope to use. Omit to use personal
   * memory, if available.
   */
  memory_scope_key?: string | null;

  /**
   * Concise query describing the memories to retrieve. Empty queries return the most
   * recent memories.
   */
  query?: string | null;

  /**
   * Only return memories sourced from task, monitor, or FindAll runs completed at or
   * after this RFC 3339 timestamp.
   */
  since?: string | null;
}

export interface MemoryRetrieveResponse {
  results: Array<TaskMemoryResult | MonitorMemoryResult | FindAllMemoryResult>;
}

export interface MonitorMemoryEvent {
  /**
   * When the event was detected, as an RFC 3339 timestamp.
   */
  detected_at: string;

  /**
   * ID of the execution that produced this event.
   */
  event_group_id: string;

  /**
   * ID of the monitor event.
   */
  event_id: string;

  /**
   * Excerpt of the monitor event. May be truncated.
   */
  excerpt: string;
}

export interface MonitorMemoryResult {
  /**
   * ID of the monitor.
   */
  id: string;

  /**
   * Preview of the monitor's query. May be truncated.
   */
  input_excerpt: string;

  /**
   * Current status of the monitor.
   */
  status: 'active' | 'cancelled';

  /**
   * When the monitor last ran, as an RFC 3339 timestamp.
   */
  updated_at: string;

  kind?: 'monitor';

  /**
   * Detected events matching the retrieval query, ordered by relevance with more
   * recent events favored. For an empty query, events are ordered by recency.
   */
  matched_events?: Array<MonitorMemoryEvent>;
}

export interface TaskMemoryResult {
  /**
   * ID of the task run.
   */
  id: string;

  /**
   * Preview of the run's input. May be truncated.
   */
  input_excerpt: string;

  /**
   * Preview of the run's output. May be truncated.
   */
  output_excerpt: string;

  /**
   * When the run completed, as an RFC 3339 timestamp.
   */
  updated_at: string;

  kind?: 'task';
}

export interface MemoryRetrieveParams {
  /**
   * Filter memories by kind: `task`, `monitor`, or `findall`.
   */
  kind?: 'task' | 'monitor' | 'findall' | null;

  /**
   * Maximum number of memories to return.
   */
  limit?: number;

  /**
   * User-provided key identifying the memory scope to use. Omit to use personal
   * memory, if available.
   */
  memory_scope_key?: string | null;

  /**
   * Concise query describing the memories to retrieve. Empty queries return the most
   * recent memories.
   */
  query?: string | null;

  /**
   * Only return memories sourced from task, monitor, or FindAll runs completed at or
   * after this RFC 3339 timestamp.
   */
  since?: string | null;
}

export interface MemoryClearParams {
  /**
   * User-provided key identifying the memory scope to use. Omit to use personal
   * memory, if available.
   */
  memory_scope_key?: string | null;
}

export interface MemoryEvictParams {
  /**
   * ID of the task run, monitor, or FindAll run to evict.
   */
  id: string;

  /**
   * Kind of source to evict: `task`, `monitor`, or `findall`.
   */
  kind: 'task' | 'monitor' | 'findall';

  /**
   * User-provided key identifying the memory scope to use. Omit to use personal
   * memory, if available.
   */
  memory_scope_key?: string | null;
}

export declare namespace Memory {
  export {
    type FindAllMemoryResult as FindAllMemoryResult,
    type MemoryClearRequest as MemoryClearRequest,
    type MemoryEvictRequest as MemoryEvictRequest,
    type MemoryRetrieveRequest as MemoryRetrieveRequest,
    type MemoryRetrieveResponse as MemoryRetrieveResponse,
    type MonitorMemoryEvent as MonitorMemoryEvent,
    type MonitorMemoryResult as MonitorMemoryResult,
    type TaskMemoryResult as TaskMemoryResult,
    type MemoryRetrieveParams as MemoryRetrieveParams,
    type MemoryClearParams as MemoryClearParams,
    type MemoryEvictParams as MemoryEvictParams,
  };
}
