# TaskRun

Types:

- <code><a href="./src/resources/task-run.ts">Input</a></code>
- <code><a href="./src/resources/task-run.ts">JsonSchema</a></code>
- <code><a href="./src/resources/task-run.ts">TaskRun</a></code>
- <code><a href="./src/resources/task-run.ts">TaskRunResult</a></code>
- <code><a href="./src/resources/task-run.ts">TaskSpec</a></code>
- <code><a href="./src/resources/task-run.ts">TextSchema</a></code>

Methods:

- <code title="post /v1/tasks/runs">client.taskRun.<a href="./src/resources/task-run.ts">create</a>({ ...params }) -> TaskRun</code>
- <code title="get /v1/tasks/runs/{run_id}">client.taskRun.<a href="./src/resources/task-run.ts">retrieve</a>(runID) -> TaskRun</code>
- <code title="get /v1/tasks/runs/{run_id}/result">client.taskRun.<a href="./src/resources/task-run.ts">result</a>(runID, { ...params }) -> TaskRunResult</code>
