// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as FindAllAPI from './findall';
import {
  FindAll,
  FindAllCancelParams,
  FindAllCandidate,
  FindAllCandidateMatchStatusEvent,
  FindAllCandidateMetrics,
  FindAllCreateParams,
  FindAllEnrichInput,
  FindAllEnrichParams,
  FindAllEntitySearchParams,
  FindAllEntitySearchRequest,
  FindAllEntitySearchResponse,
  FindAllEventsParams,
  FindAllEventsResponse,
  FindAllExtendInput,
  FindAllExtendParams,
  FindAllIngestParams,
  FindAllResultParams,
  FindAllRetrieveParams,
  FindAllRun,
  FindAllRunInput,
  FindAllRunResult,
  FindAllRunStatus,
  FindAllRunStatusEvent,
  FindAllSchema,
  FindAllSchemaParams,
  FindAllSchemaUpdatedEvent,
  IngestInput,
  MatchCondition,
  ParallelBeta,
} from './findall';
import * as MemoryAPI from './memory';
import {
  FindAllMemoryResult,
  Memory,
  MemoryClearParams,
  MemoryClearRequest,
  MemoryEvictParams,
  MemoryEvictRequest,
  MemoryRetrieveParams,
  MemoryRetrieveRequest,
  MemoryRetrieveResponse,
  MonitorMemoryEvent,
  MonitorMemoryResult,
  TaskMemoryResult,
} from './memory';

export class Beta extends APIResource {
  findall: FindAllAPI.FindAll = new FindAllAPI.FindAll(this._client);
  memory: MemoryAPI.Memory = new MemoryAPI.Memory(this._client);
}

Beta.FindAll = FindAll;
Beta.Memory = Memory;

export declare namespace Beta {
  export {
    FindAll as FindAll,
    type FindAllCandidate as FindAllCandidate,
    type FindAllCandidateMatchStatusEvent as FindAllCandidateMatchStatusEvent,
    type FindAllCandidateMetrics as FindAllCandidateMetrics,
    type FindAllEnrichInput as FindAllEnrichInput,
    type FindAllEntitySearchRequest as FindAllEntitySearchRequest,
    type FindAllEntitySearchResponse as FindAllEntitySearchResponse,
    type FindAllExtendInput as FindAllExtendInput,
    type FindAllRun as FindAllRun,
    type FindAllRunInput as FindAllRunInput,
    type FindAllRunResult as FindAllRunResult,
    type FindAllRunStatus as FindAllRunStatus,
    type FindAllRunStatusEvent as FindAllRunStatusEvent,
    type FindAllSchema as FindAllSchema,
    type FindAllSchemaUpdatedEvent as FindAllSchemaUpdatedEvent,
    type IngestInput as IngestInput,
    type MatchCondition as MatchCondition,
    type ParallelBeta as ParallelBeta,
    type FindAllEventsResponse as FindAllEventsResponse,
    type FindAllCreateParams as FindAllCreateParams,
    type FindAllRetrieveParams as FindAllRetrieveParams,
    type FindAllCancelParams as FindAllCancelParams,
    type FindAllEnrichParams as FindAllEnrichParams,
    type FindAllEntitySearchParams as FindAllEntitySearchParams,
    type FindAllEventsParams as FindAllEventsParams,
    type FindAllExtendParams as FindAllExtendParams,
    type FindAllIngestParams as FindAllIngestParams,
    type FindAllResultParams as FindAllResultParams,
    type FindAllSchemaParams as FindAllSchemaParams,
  };

  export {
    Memory as Memory,
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
