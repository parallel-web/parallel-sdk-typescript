# Shared

Types:

- <code><a href="./src/resources/shared.ts">ErrorObject</a></code>
- <code><a href="./src/resources/shared.ts">ErrorResponse</a></code>
- <code><a href="./src/resources/shared.ts">SourcePolicy</a></code>
- <code><a href="./src/resources/shared.ts">Warning</a></code>

# TaskRun

Types:

- <code><a href="./src/resources/task-run.ts">AutoSchema</a></code>
- <code><a href="./src/resources/task-run.ts">Citation</a></code>
- <code><a href="./src/resources/task-run.ts">FieldBasis</a></code>
- <code><a href="./src/resources/task-run.ts">JsonSchema</a></code>
- <code><a href="./src/resources/task-run.ts">RunInput</a></code>
- <code><a href="./src/resources/task-run.ts">TaskRun</a></code>
- <code><a href="./src/resources/task-run.ts">TaskRunJsonOutput</a></code>
- <code><a href="./src/resources/task-run.ts">TaskRunResult</a></code>
- <code><a href="./src/resources/task-run.ts">TaskRunTextOutput</a></code>
- <code><a href="./src/resources/task-run.ts">TaskSpec</a></code>
- <code><a href="./src/resources/task-run.ts">TextSchema</a></code>

Methods:

- <code title="post /v1/tasks/runs">client.taskRun.<a href="./src/resources/task-run.ts">create</a>({ ...params }) -> TaskRun</code>
- <code title="get /v1/tasks/runs/{run_id}">client.taskRun.<a href="./src/resources/task-run.ts">retrieve</a>(runID) -> TaskRun</code>
- <code title="get /v1/tasks/runs/{run_id}/result">client.taskRun.<a href="./src/resources/task-run.ts">result</a>(runID, { ...params }) -> TaskRunResult</code>

# Beta

Types:

- <code><a href="./src/resources/beta/beta.ts">SearchResult</a></code>
- <code><a href="./src/resources/beta/beta.ts">WebSearchResult</a></code>

Methods:

- <code title="post /v1beta/search">client.beta.<a href="./src/resources/beta/beta.ts">search</a>({ ...params }) -> SearchResult</code>

## TaskRun

Types:

- <code><a href="./src/resources/beta/task-run.ts">BetaRunInput</a></code>
- <code><a href="./src/resources/beta/task-run.ts">BetaTaskRunResult</a></code>
- <code><a href="./src/resources/beta/task-run.ts">ErrorEvent</a></code>
- <code><a href="./src/resources/beta/task-run.ts">McpServer</a></code>
- <code><a href="./src/resources/beta/task-run.ts">McpToolCall</a></code>
- <code><a href="./src/resources/beta/task-run.ts">ParallelBeta</a></code>
- <code><a href="./src/resources/beta/task-run.ts">TaskRunEvent</a></code>
- <code><a href="./src/resources/beta/task-run.ts">Webhook</a></code>
- <code><a href="./src/resources/beta/task-run.ts">TaskRunEventsResponse</a></code>

Methods:

- <code title="post /v1/tasks/runs?beta=true">client.beta.taskRun.<a href="./src/resources/beta/task-run.ts">create</a>({ ...params }) -> TaskRun</code>
- <code title="get /v1beta/tasks/runs/{run_id}/events">client.beta.taskRun.<a href="./src/resources/beta/task-run.ts">events</a>(runID) -> TaskRunEventsResponse</code>
- <code title="get /v1/tasks/runs/{run_id}/result?beta=true">client.beta.taskRun.<a href="./src/resources/beta/task-run.ts">result</a>(runID, { ...params }) -> BetaTaskRunResult</code>

## TaskGroup

Types:

- <code><a href="./src/resources/beta/task-group.ts">TaskGroup</a></code>
- <code><a href="./src/resources/beta/task-group.ts">TaskGroupRunResponse</a></code>
- <code><a href="./src/resources/beta/task-group.ts">TaskGroupStatus</a></code>
- <code><a href="./src/resources/beta/task-group.ts">TaskGroupEventsResponse</a></code>
- <code><a href="./src/resources/beta/task-group.ts">TaskGroupGetRunsResponse</a></code>

Methods:

- <code title="post /v1beta/tasks/groups">client.beta.taskGroup.<a href="./src/resources/beta/task-group.ts">create</a>({ ...params }) -> TaskGroup</code>
- <code title="get /v1beta/tasks/groups/{taskgroup_id}">client.beta.taskGroup.<a href="./src/resources/beta/task-group.ts">retrieve</a>(taskGroupID) -> TaskGroup</code>
- <code title="post /v1beta/tasks/groups/{taskgroup_id}/runs">client.beta.taskGroup.<a href="./src/resources/beta/task-group.ts">addRuns</a>(taskGroupID, { ...params }) -> TaskGroupRunResponse</code>
- <code title="get /v1beta/tasks/groups/{taskgroup_id}/events">client.beta.taskGroup.<a href="./src/resources/beta/task-group.ts">events</a>(taskGroupID, { ...params }) -> TaskGroupEventsResponse</code>
- <code title="get /v1beta/tasks/groups/{taskgroup_id}/runs">client.beta.taskGroup.<a href="./src/resources/beta/task-group.ts">getRuns</a>(taskGroupID, { ...params }) -> TaskGroupGetRunsResponse</code>
