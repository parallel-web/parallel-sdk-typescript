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

# [Beta](src/resources/beta/api.md)
