# Beta

## FindAll

Types:

- <code><a href="./src/resources/beta/findall.ts">FindAllCandidate</a></code>
- <code><a href="./src/resources/beta/findall.ts">FindAllCandidateMatchStatusEvent</a></code>
- <code><a href="./src/resources/beta/findall.ts">FindAllCandidateMetrics</a></code>
- <code><a href="./src/resources/beta/findall.ts">FindAllEnrichInput</a></code>
- <code><a href="./src/resources/beta/findall.ts">FindAllEntitySearchRequest</a></code>
- <code><a href="./src/resources/beta/findall.ts">FindAllEntitySearchResponse</a></code>
- <code><a href="./src/resources/beta/findall.ts">FindAllExtendInput</a></code>
- <code><a href="./src/resources/beta/findall.ts">FindAllRun</a></code>
- <code><a href="./src/resources/beta/findall.ts">FindAllRunInput</a></code>
- <code><a href="./src/resources/beta/findall.ts">FindAllRunResult</a></code>
- <code><a href="./src/resources/beta/findall.ts">FindAllRunStatus</a></code>
- <code><a href="./src/resources/beta/findall.ts">FindAllRunStatusEvent</a></code>
- <code><a href="./src/resources/beta/findall.ts">FindAllSchema</a></code>
- <code><a href="./src/resources/beta/findall.ts">FindAllSchemaUpdatedEvent</a></code>
- <code><a href="./src/resources/beta/findall.ts">IngestInput</a></code>
- <code><a href="./src/resources/beta/findall.ts">MatchCondition</a></code>
- <code><a href="./src/resources/beta/findall.ts">ParallelBeta</a></code>
- <code><a href="./src/resources/beta/findall.ts">FindAllEventsResponse</a></code>

Methods:

- <code title="post /v1beta/findall/runs">client.beta.findall.<a href="./src/resources/beta/findall.ts">create</a>({ ...params }) -> FindAllRun</code>
- <code title="get /v1beta/findall/runs/{findall_id}">client.beta.findall.<a href="./src/resources/beta/findall.ts">retrieve</a>(findallID, { ...params }) -> FindAllRun</code>
- <code title="post /v1beta/findall/runs/{findall_id}/cancel">client.beta.findall.<a href="./src/resources/beta/findall.ts">cancel</a>(findallID, { ...params }) -> void</code>
- <code title="post /v1beta/findall/runs/{findall_id}/enrich">client.beta.findall.<a href="./src/resources/beta/findall.ts">enrich</a>(findallID, { ...params }) -> FindAllSchema</code>
- <code title="post /v1beta/findall/entity-search">client.beta.findall.<a href="./src/resources/beta/findall.ts">entitySearch</a>({ ...params }) -> FindAllEntitySearchResponse</code>
- <code title="get /v1beta/findall/runs/{findall_id}/events">client.beta.findall.<a href="./src/resources/beta/findall.ts">events</a>(findallID, { ...params }) -> FindAllEventsResponse</code>
- <code title="post /v1beta/findall/runs/{findall_id}/extend">client.beta.findall.<a href="./src/resources/beta/findall.ts">extend</a>(findallID, { ...params }) -> FindAllSchema</code>
- <code title="post /v1beta/findall/ingest">client.beta.findall.<a href="./src/resources/beta/findall.ts">ingest</a>({ ...params }) -> FindAllSchema</code>
- <code title="get /v1beta/findall/runs/{findall_id}/result">client.beta.findall.<a href="./src/resources/beta/findall.ts">result</a>(findallID, { ...params }) -> FindAllRunResult</code>
- <code title="get /v1beta/findall/runs/{findall_id}/schema">client.beta.findall.<a href="./src/resources/beta/findall.ts">schema</a>(findallID, { ...params }) -> FindAllSchema</code>

## Memory

Types:

- <code><a href="./src/resources/beta/memory.ts">FindAllMemoryResult</a></code>
- <code><a href="./src/resources/beta/memory.ts">MemoryClearRequest</a></code>
- <code><a href="./src/resources/beta/memory.ts">MemoryEvictRequest</a></code>
- <code><a href="./src/resources/beta/memory.ts">MemoryRetrieveRequest</a></code>
- <code><a href="./src/resources/beta/memory.ts">MemoryRetrieveResponse</a></code>
- <code><a href="./src/resources/beta/memory.ts">MonitorMemoryEvent</a></code>
- <code><a href="./src/resources/beta/memory.ts">MonitorMemoryResult</a></code>
- <code><a href="./src/resources/beta/memory.ts">TaskMemoryResult</a></code>

Methods:

- <code title="post /v1beta/memory/retrieve">client.beta.memory.<a href="./src/resources/beta/memory.ts">retrieve</a>({ ...params }) -> MemoryRetrieveResponse</code>
- <code title="post /v1beta/memory/clear">client.beta.memory.<a href="./src/resources/beta/memory.ts">clear</a>({ ...params }) -> void</code>
- <code title="post /v1beta/memory/evict">client.beta.memory.<a href="./src/resources/beta/memory.ts">evict</a>({ ...params }) -> void</code>
