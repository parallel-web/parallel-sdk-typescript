// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as TaskGroupAPI from './task-group';
import { TaskGroup } from './task-group';
import * as TaskRunAPI from './task-run';
import { TaskRun } from './task-run';

export class Beta extends APIResource {
  taskRun: TaskRunAPI.TaskRun = new TaskRunAPI.TaskRun(this._client);
  taskGroup: TaskGroupAPI.TaskGroup = new TaskGroupAPI.TaskGroup(this._client);
}

Beta.TaskRun = TaskRun;
Beta.TaskGroup = TaskGroup;

export declare namespace Beta {
  export { TaskRun as TaskRun };

  export { TaskGroup as TaskGroup };
}
