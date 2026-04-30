# Parallel

Types:

- <code><a href="./src/resources/top-level.ts">AdvancedExtractSettings</a></code>
- <code><a href="./src/resources/top-level.ts">AdvancedSearchSettings</a></code>
- <code><a href="./src/resources/top-level.ts">ExcerptSettings</a></code>
- <code><a href="./src/resources/top-level.ts">ExtractError</a></code>
- <code><a href="./src/resources/top-level.ts">ExtractResponse</a></code>
- <code><a href="./src/resources/top-level.ts">ExtractResult</a></code>
- <code><a href="./src/resources/top-level.ts">FetchPolicy</a></code>
- <code><a href="./src/resources/top-level.ts">SearchResult</a></code>
- <code><a href="./src/resources/top-level.ts">UsageItem</a></code>
- <code><a href="./src/resources/top-level.ts">WebSearchResult</a></code>

Methods:

- <code title="post /v1/extract">client.<a href="./src/index.ts">extract</a>({ ...params }) -> ExtractResponse</code>
- <code title="post /v1/search">client.<a href="./src/index.ts">search</a>({ ...params }) -> SearchResult</code>

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
- <code><a href="./src/resources/task-run.ts">ErrorEvent</a></code>
- <code><a href="./src/resources/task-run.ts">FieldBasis</a></code>
- <code><a href="./src/resources/task-run.ts">JsonSchema</a></code>
- <code><a href="./src/resources/task-run.ts">McpServer</a></code>
- <code><a href="./src/resources/task-run.ts">McpToolCall</a></code>
- <code><a href="./src/resources/task-run.ts">RunInput</a></code>
- <code><a href="./src/resources/task-run.ts">TaskRun</a></code>
- <code><a href="./src/resources/task-run.ts">TaskRunEvent</a></code>
- <code><a href="./src/resources/task-run.ts">TaskRunJsonOutput</a></code>
- <code><a href="./src/resources/task-run.ts">TaskRunResult</a></code>
- <code><a href="./src/resources/task-run.ts">TaskRunTextOutput</a></code>
- <code><a href="./src/resources/task-run.ts">TaskSpec</a></code>
- <code><a href="./src/resources/task-run.ts">TextSchema</a></code>
- <code><a href="./src/resources/task-run.ts">Webhook</a></code>
- <code><a href="./src/resources/task-run.ts">TaskRunEventsResponse</a></code>

Methods:

- <code title="post /v1/tasks/runs">client.taskRun.<a href="./src/resources/task-run.ts">create</a>({ ...params }) -> TaskRun</code>
- <code title="get /v1/tasks/runs/{run_id}">client.taskRun.<a href="./src/resources/task-run.ts">retrieve</a>(runID) -> TaskRun</code>
- <code title="get /v1/tasks/runs/{run_id}/events">client.taskRun.<a href="./src/resources/task-run.ts">events</a>(runID) -> TaskRunEventsResponse</code>
- <code title="get /v1/tasks/runs/{run_id}/result">client.taskRun.<a href="./src/resources/task-run.ts">result</a>(runID, { ...params }) -> TaskRunResult</code>

# TaskGroup

Types:

- <code><a href="./src/resources/task-group.ts">TaskGroup</a></code>
- <code><a href="./src/resources/task-group.ts">TaskGroupRunResponse</a></code>
- <code><a href="./src/resources/task-group.ts">TaskGroupStatus</a></code>
- <code><a href="./src/resources/task-group.ts">TaskGroupEventsResponse</a></code>
- <code><a href="./src/resources/task-group.ts">TaskGroupGetRunsResponse</a></code>

Methods:

- <code title="post /v1/tasks/groups">client.taskGroup.<a href="./src/resources/task-group.ts">create</a>({ ...params }) -> TaskGroup</code>
- <code title="get /v1/tasks/groups/{taskgroup_id}">client.taskGroup.<a href="./src/resources/task-group.ts">retrieve</a>(taskGroupID) -> TaskGroup</code>
- <code title="post /v1/tasks/groups/{taskgroup_id}/runs">client.taskGroup.<a href="./src/resources/task-group.ts">addRuns</a>(taskGroupID, { ...params }) -> TaskGroupRunResponse</code>
- <code title="get /v1/tasks/groups/{taskgroup_id}/events">client.taskGroup.<a href="./src/resources/task-group.ts">events</a>(taskGroupID, { ...params }) -> TaskGroupEventsResponse</code>
- <code title="get /v1/tasks/groups/{taskgroup_id}/runs">client.taskGroup.<a href="./src/resources/task-group.ts">getRuns</a>(taskGroupID, { ...params }) -> TaskGroupGetRunsResponse</code>

# [Beta](src/resources/beta/api.md)
