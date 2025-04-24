# Tasks

## Runs

Types:

- <code><a href="./src/resources/tasks/runs.ts">FieldBasis</a></code>
- <code><a href="./src/resources/tasks/runs.ts">JsonSchema</a></code>
- <code><a href="./src/resources/tasks/runs.ts">TaskRun</a></code>
- <code><a href="./src/resources/tasks/runs.ts">TaskSpec</a></code>
- <code><a href="./src/resources/tasks/runs.ts">TextSchema</a></code>
- <code><a href="./src/resources/tasks/runs.ts">RunRetrieveInputResponse</a></code>
- <code><a href="./src/resources/tasks/runs.ts">RunRetrieveResultResponse</a></code>

Methods:

- <code title="post /v1/tasks/runs">client.tasks.runs.<a href="./src/resources/tasks/runs.ts">create</a>({ ...params }) -> TaskRun</code>
- <code title="get /v1/tasks/runs/{run_id}">client.tasks.runs.<a href="./src/resources/tasks/runs.ts">retrieve</a>(runID) -> TaskRun</code>
- <code title="get /v1/tasks/runs/{run_id}/input">client.tasks.runs.<a href="./src/resources/tasks/runs.ts">retrieveInput</a>(runID) -> RunRetrieveInputResponse</code>
- <code title="get /v1/tasks/runs/{run_id}/result">client.tasks.runs.<a href="./src/resources/tasks/runs.ts">retrieveResult</a>(runID, { ...params }) -> RunRetrieveResultResponse</code>
