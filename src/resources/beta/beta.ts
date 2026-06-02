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

export class Beta extends APIResource {
  findall: FindAllAPI.FindAll = new FindAllAPI.FindAll(this._client);
}

Beta.FindAll = FindAll;

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
}
