// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as RunsAPI from './runs';
import {
  FieldBasis,
  JsonSchema,
  RunCreateParams,
  RunRetrieveInputResponse,
  RunRetrieveResultParams,
  RunRetrieveResultResponse,
  Runs,
  TaskRun,
  TaskSpec,
  TextSchema,
} from './runs';

export class Tasks extends APIResource {
  runs: RunsAPI.Runs = new RunsAPI.Runs(this._client);
}

Tasks.Runs = Runs;

export declare namespace Tasks {
  export {
    Runs as Runs,
    type FieldBasis as FieldBasis,
    type JsonSchema as JsonSchema,
    type TaskRun as TaskRun,
    type TaskSpec as TaskSpec,
    type TextSchema as TextSchema,
    type RunRetrieveInputResponse as RunRetrieveInputResponse,
    type RunRetrieveResultResponse as RunRetrieveResultResponse,
    type RunCreateParams as RunCreateParams,
    type RunRetrieveResultParams as RunRetrieveResultParams,
  };
}
