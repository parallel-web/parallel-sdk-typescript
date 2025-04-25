// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class TaskRun extends APIResource {
  /**
   * Initiates a single task run.
   */
  create(body: TaskRunCreateParams, options?: RequestOptions): APIPromise<TaskRun> {
    return this._client.post('/v1/tasks/runs', { body, ...options });
  }

  /**
   * Retrieves a run by run_id.
   */
  retrieve(runID: string, options?: RequestOptions): APIPromise<TaskRun> {
    return this._client.get(path`/v1/tasks/runs/${runID}`, options);
  }

  /**
   * Retrieves a run by run_id, blocking until the run is completed.
   */
  result(
    runID: string,
    query: TaskRunResultParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<TaskRunResult> {
    return this._client.get(path`/v1/tasks/runs/${runID}/result`, { query, ...options });
  }
}

/**
 * Request to run a task.
 */
export interface Input {
  /**
   * Input to the task, either text or a JSON object.
   */
  input: string | unknown;

  /**
   * Processor to use for the task.
   */
  processor: string;

  /**
   * User-provided metadata stored with the run. Keys and values must be strings with
   * a maximum length of 16 and 512 characters respectively.
   */
  metadata?: Record<string, string | number | boolean> | null;

  /**
   * Specification for a task.
   *
   * For convenience we allow bare strings as input or output schemas, which is
   * equivalent to a text schema with the same description.
   */
  task_spec?: TaskSpec | null;
}

/**
 * JSON schema for a task input or output.
 */
export interface JsonSchema {
  /**
   * A JSON Schema object. Only a subset of JSON Schema is supported.
   */
  json_schema: unknown;

  /**
   * The type of schema being defined. Always `json`.
   */
  type?: 'json';
}

/**
 * Status of a task.
 */
export interface TaskRun {
  /**
   * Timestamp of the creation of the task, as an RFC 3339 string.
   */
  created_at: string | null;

  /**
   * Whether the run is currently active; i.e. status is one of {'running', 'queued',
   * 'cancelling'}.
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
   * User-provided metadata stored with the run.
   */
  metadata?: Record<string, string | number | boolean> | null;

  /**
   * Warnings for the run.
   */
  warnings?: Array<TaskRun.Warning> | null;
}

export namespace TaskRun {
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
    type: string;

    /**
     * Optional detail supporting the warning.
     */
    detail?: unknown | null;
  }
}

/**
 * Result of a task run.
 */
export interface TaskRunResult {
  /**
   * Output from the task conforming to the output schema.
   */
  output: TaskRunResult.TaskRunTextOutput | TaskRunResult.TaskRunJsonOutput;

  /**
   * Status of a task.
   */
  run: TaskRun;
}

export namespace TaskRunResult {
  /**
   * Output from a task that returns text.
   */
  export interface TaskRunTextOutput {
    /**
     * Basis for the output. The basis has a single field 'output'.
     */
    basis: Array<TaskRunTextOutput.Basis>;

    /**
     * Text output from the task.
     */
    content: string;

    /**
     * The type of output being returned, as determined by the output schema of the
     * task spec.
     */
    type: 'text';
  }

  export namespace TaskRunTextOutput {
    /**
     * Citations and reasoning supporting one field of a task output.
     */
    export interface Basis {
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
      citations?: Array<Basis.Citation>;

      /**
       * Confidence level for the output field. Only certain processors provide
       * confidence levels.
       */
      confidence?: string | null;
    }

    export namespace Basis {
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
    }
  }

  /**
   * Output from a task that returns text.
   */
  export interface TaskRunJsonOutput {
    /**
     * Basis for each top-level field in the JSON output.
     */
    basis: Array<TaskRunJsonOutput.Basis>;

    /**
     * Output from the task as a native JSON object, as determined by the output schema
     * of the task spec.
     */
    content: unknown;

    /**
     * The type of output being returned, as determined by the output schema of the
     * task spec.
     */
    type: 'json';
  }

  export namespace TaskRunJsonOutput {
    /**
     * Citations and reasoning supporting one field of a task output.
     */
    export interface Basis {
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
      citations?: Array<Basis.Citation>;

      /**
       * Confidence level for the output field. Only certain processors provide
       * confidence levels.
       */
      confidence?: string | null;
    }

    export namespace Basis {
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
    }
  }
}

/**
 * Specification for a task.
 *
 * For convenience we allow bare strings as input or output schemas, which is
 * equivalent to a text schema with the same description.
 */
export interface TaskSpec {
  /**
   * JSON schema or text fully describing the desired output from the task.
   * Descriptions of output fields will determine the form and content of the
   * response. A bare string is equivalent to a text schema with the same
   * description.
   */
  output_schema: JsonSchema | TextSchema | string;

  /**
   * Optional JSON schema or text description of expected input to the task. A bare
   * string is equivalent to a text schema with the same description.
   */
  input_schema?: JsonSchema | TextSchema | string | null;
}

/**
 * Text description for a task input or output.
 */
export interface TextSchema {
  /**
   * A text description of the desired output from the task.
   */
  description: string;

  /**
   * The type of schema being defined. Always `text`.
   */
  type?: 'text';
}

export interface TaskRunCreateParams {
  /**
   * Input to the task, either text or a JSON object.
   */
  input: string | unknown;

  /**
   * Processor to use for the task.
   */
  processor: string;

  /**
   * User-provided metadata stored with the run. Keys and values must be strings with
   * a maximum length of 16 and 512 characters respectively.
   */
  metadata?: Record<string, string | number | boolean> | null;

  /**
   * Specification for a task.
   *
   * For convenience we allow bare strings as input or output schemas, which is
   * equivalent to a text schema with the same description.
   */
  task_spec?: TaskSpec | null;
}

export interface TaskRunResultParams {
  timeout?: number;
}

export declare namespace TaskRun {
  export {
    type Input as Input,
    type JsonSchema as JsonSchema,
    type TaskRun as TaskRun,
    type TaskRunResult as TaskRunResult,
    type TaskSpec as TaskSpec,
    type TextSchema as TextSchema,
    type TaskRunCreateParams as TaskRunCreateParams,
    type TaskRunResultParams as TaskRunResultParams,
  };
}
