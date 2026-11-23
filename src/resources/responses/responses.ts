// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ResponsesAPI from './responses';
import { APIPromise } from '../../core/api-promise';
import { Stream } from '../../core/streaming';
import { RequestOptions } from '../../internal/request-options';

/**
 * An OpenAI-Responses-compatible interface for answers grounded in live web research, with URL citations. Point any Responses-API client — the OpenAI Python SDK, OpenAI TypeScript SDK, the Agents SDK, or raw HTTP — at `https://api.parallel.ai` with your Parallel API key, set `model` to `parallel`, and call `/v1/responses`.
 * - `input` accepts a plain string or an array of role/content messages (canonical OpenAI shape; text content only).
 * - `reasoning.effort` (`low`/`medium`/`high`/`auto`) controls how much research is performed, trading response time for answer quality.
 * - Multi-turn via `previous_response_id`.
 * - Structured outputs via `text.format = {"type": "json_schema", "name": ..., "schema": {...}}`.
 * - Streaming (`stream=true`) emits the standard OpenAI Responses SSE lifecycle: `response.created` and `response.in_progress`, then output item / content part / text delta events with URL-citation annotations, the matching `*.done` events, and a terminal `response.completed` — or `response.failed` if the request fails mid-stream.
 */
export class Responses extends APIResource {
  /**
   * Create a response.
   *
   * Generates an answer to the given input, grounded in live web research and
   * annotated with URL citations. Set `model` to `parallel`; `reasoning.effort`
   * (`low`/`medium`/`high`/`auto`) controls how much research is performed, trading
   * response time for answer quality. Returns an OpenAI-format `Response` as
   * `application/json`, or a `text/event-stream` of OpenAI Responses SSE events when
   * `stream=true`.
   *
   * @example
   * ```ts
   * const responseResult = await client.responses.create({
   *   input:
   *     'What are the latest developments in fusion energy?',
   *   model: 'parallel',
   * });
   * ```
   */
  create(body: ResponseCreateParamsNonStreaming, options?: RequestOptions): APIPromise<ResponseResult>;
  create(
    body: ResponseCreateParamsStreaming,
    options?: RequestOptions,
  ): APIPromise<Stream<ResponseStreamEvent>>;
  create(
    body: ResponseCreateParamsBase,
    options?: RequestOptions,
  ): APIPromise<Stream<ResponseStreamEvent> | ResponseResult>;
  create(
    body: ResponseCreateParams,
    options?: RequestOptions,
  ): APIPromise<ResponseResult> | APIPromise<Stream<ResponseStreamEvent>> {
    return this._client.post('/v1/responses', { body, ...options, stream: body.stream ?? false }) as
      | APIPromise<ResponseResult>
      | APIPromise<Stream<ResponseStreamEvent>>;
  }
}

/**
 * A response from the `parallel` model. A completed response contains one
 * `web_search_call` item per web search the model ran, `mcp_list_tools` discovery
 * outcomes, and one `mcp_call` item per MCP tool call it made, followed by a
 * single assistant message whose text is annotated with URL citations grounding
 * the answer.
 */
export interface ResponseResult {
  id: string;

  created_at: number;

  object: 'response';

  output: Array<
    | ResponseResult.ResponseOutputMessage
    | ResponseResult.ResponseFunctionWebSearch
    | ResponseResult.ResponseMcpCall
    | ResponseResult.ResponseMcpListTools
  >;

  parallel_tool_calls: boolean;

  background?: boolean | null;

  completed_at?: number | null;

  conversation?: null;

  /**
   * The effort this response was served and billed at. For `auto`, the effort it
   * picked for this query (either `low` or `medium`). Null until the response
   * completes.
   */
  effort_used?: 'low' | 'medium' | 'high' | null;

  /**
   * Details of a failed response.
   */
  error?: ResponseResult.Error | null;

  /**
   * Details about why the response is incomplete.
   */
  incomplete_details?: ResponseResult.IncompleteDetails | null;

  instructions?: string | null;

  max_output_tokens?: number | null;

  max_tool_calls?: number | null;

  metadata?: { [key: string]: string } | null;

  model?: 'parallel';

  /**
   * Moderation results for the response input and output, if moderated completions
   * were requested.
   */
  moderation?: ResponseResult.Moderation | null;

  previous_response_id?: string | null;

  prompt?: null;

  prompt_cache_key?: string | null;

  prompt_cache_retention?: 'in_memory' | '24h' | null;

  /**
   * Reasoning configuration (OpenAI-compatible subset).
   */
  reasoning?: ResponseResult.Reasoning | null;

  safety_identifier?: string | null;

  service_tier?: 'auto' | 'default' | 'flex' | 'scale' | 'priority' | 'fast' | 'ultrafast' | null;

  status?: 'completed' | 'failed' | 'in_progress' | 'cancelled' | 'queued' | 'incomplete' | null;

  temperature?: number | null;

  /**
   * Text output configuration. By default the response is plain text; for structured
   * output set `format` to `{"type": "json_schema", "name": ..., "schema": {...}}`.
   * On `/v1/responses` the `json_object` format produces plain text and may be
   * refused with a 400; use `json_schema` instead.
   */
  text?: ResponseResult.Text | null;

  tool_choice?: string;

  tools?: Array<ResponseResult.ResponseWebSearchTool | ResponseResult.ResponseMcpTool>;

  top_logprobs?: number | null;

  top_p?: number | null;

  truncation?: 'auto' | 'disabled' | null;

  /**
   * Always null: Parallel bills per request, not per token.
   */
  usage?: null;

  user?: string | null;

  [k: string]: unknown;
}

export namespace ResponseResult {
  /**
   * An assistant message produced by the model.
   */
  export interface ResponseOutputMessage {
    id: string;

    content: Array<ResponseOutputMessage.Content>;

    role: 'assistant';

    status: 'in_progress' | 'completed' | 'incomplete';

    type: 'message';

    phase?: 'commentary' | 'final_answer' | null;

    [k: string]: unknown;
  }

  export namespace ResponseOutputMessage {
    /**
     * A text content part of an output message. `annotations` carries the URL
     * citations grounding the answer.
     */
    export interface Content {
      annotations: Array<Content.Annotation>;

      text: string;

      type: 'output_text';

      logprobs?: Array<Content.Logprob> | null;

      [k: string]: unknown;
    }

    export namespace Content {
      /**
       * A citation for a web resource used to generate a model response.
       */
      export interface Annotation {
        end_index: number;

        start_index: number;

        title: string;

        type: 'url_citation';

        url: string;

        [k: string]: unknown;
      }

      /**
       * The log probability of a token.
       */
      export interface Logprob {
        token: string;

        bytes: Array<number>;

        logprob: number;

        top_logprobs: Array<Logprob.TopLogprob>;

        [k: string]: unknown;
      }

      export namespace Logprob {
        /**
         * The top log probability of a token.
         */
        export interface TopLogprob {
          token: string;

          bytes: Array<number>;

          logprob: number;

          [k: string]: unknown;
        }
      }
    }
  }

  /**
   * One web action the `parallel` model took while researching the answer: a
   * `search` (`action.queries` are the search queries issued, `action.query` the
   * first of them) or an `open_page` (`action.url` is the page it read).
   */
  export interface ResponseFunctionWebSearch {
    id: string;

    /**
     * Action type "search" - Performs a web search query.
     */
    action: ResponseFunctionWebSearch.ActionSearch | ResponseFunctionWebSearch.ActionOpenPage;

    status: 'in_progress' | 'searching' | 'completed' | 'failed' | 'incomplete';

    type: 'web_search_call';

    [k: string]: unknown;
  }

  export namespace ResponseFunctionWebSearch {
    /**
     * Action type "search" - Performs a web search query.
     */
    export interface ActionSearch {
      type: 'search';

      queries?: Array<string> | null;

      query?: string | null;

      sources?: Array<ActionSearch.Source> | null;

      [k: string]: unknown;
    }

    export namespace ActionSearch {
      /**
       * A source used in the search.
       */
      export interface Source {
        type: 'url';

        url: string;

        [k: string]: unknown;
      }
    }

    /**
     * Action type "open_page" - Opens a specific URL from search results.
     */
    export interface ActionOpenPage {
      type: 'open_page';

      url?: string | null;

      [k: string]: unknown;
    }
  }

  /**
   * One tool call the `parallel` model made on an MCP server: a server from the
   * request's `mcp` tools, or a partner enabled via `data_sources`. `arguments` is
   * the JSON-encoded input; `output` is the text the tool returned, or `error` the
   * failure when the call did not succeed.
   */
  export interface ResponseMcpCall {
    id: string;

    arguments: string;

    name: string;

    server_label: string;

    status: 'completed' | 'failed';

    type: 'mcp_call';

    error?:
      | ResponseMcpCall.McpProtocolError
      | ResponseMcpCall.McpToolExecutionError
      | ResponseMcpCall.HTTPError
      | null;

    output?: string | null;

    [k: string]: unknown;
  }

  export namespace ResponseMcpCall {
    export interface McpProtocolError {
      code: number;

      message: string;

      type: 'mcp_protocol_error';

      [k: string]: unknown;
    }

    export interface McpToolExecutionError {
      content: unknown;

      type: 'mcp_tool_execution_error';

      [k: string]: unknown;
    }

    export interface HTTPError {
      code: number;

      message: string;

      type: 'http_error';

      [k: string]: unknown;
    }
  }

  /**
   * Tools discovered on a customer MCP server, or a connection/listing error.
   * Requested data partners report failures only, with an empty tools list.
   */
  export interface ResponseMcpListTools {
    id: string;

    server_label: string;

    tools: Array<ResponseMcpListTools.Tool>;

    type: 'mcp_list_tools';

    error?: string | null;

    [k: string]: unknown;
  }

  export namespace ResponseMcpListTools {
    /**
     * A tool available on an MCP server.
     */
    export interface Tool {
      input_schema: unknown;

      name: string;

      annotations?: unknown;

      description?: string | null;

      [k: string]: unknown;
    }
  }

  /**
   * Details of a failed response.
   */
  export interface Error {
    /**
     * Error code; currently always "server_error".
     */
    code: 'server_error';

    message: string;

    [k: string]: unknown;
  }

  /**
   * Details about why the response is incomplete.
   */
  export interface IncompleteDetails {
    reason?: 'max_output_tokens' | 'max_messages' | 'content_filter' | 'steered' | null;

    [k: string]: unknown;
  }

  /**
   * Moderation results for the response input and output, if moderated completions
   * were requested.
   */
  export interface Moderation {
    /**
     * A moderation result produced for the response input or output.
     */
    input: Moderation.ModerationInputModerationResult | Moderation.ModerationInputError;

    /**
     * A moderation result produced for the response input or output.
     */
    output: Moderation.ModerationOutputModerationResult | Moderation.ModerationOutputError;

    [k: string]: unknown;
  }

  export namespace Moderation {
    /**
     * A moderation result produced for the response input or output.
     */
    export interface ModerationInputModerationResult {
      categories: { [key: string]: boolean };

      category_applied_input_types: { [key: string]: Array<'text' | 'image'> };

      category_scores: { [key: string]: number };

      flagged: boolean;

      model: string;

      type: 'moderation_result';

      [k: string]: unknown;
    }

    /**
     * An error produced while attempting moderation for the response input or output.
     */
    export interface ModerationInputError {
      code: string;

      message: string;

      type: 'error';

      [k: string]: unknown;
    }

    /**
     * A moderation result produced for the response input or output.
     */
    export interface ModerationOutputModerationResult {
      categories: { [key: string]: boolean };

      category_applied_input_types: { [key: string]: Array<'text' | 'image'> };

      category_scores: { [key: string]: number };

      flagged: boolean;

      model: string;

      type: 'moderation_result';

      [k: string]: unknown;
    }

    /**
     * An error produced while attempting moderation for the response input or output.
     */
    export interface ModerationOutputError {
      code: string;

      message: string;

      type: 'error';

      [k: string]: unknown;
    }
  }

  /**
   * Reasoning configuration (OpenAI-compatible subset).
   */
  export interface Reasoning {
    /**
     * Controls how much research is performed, trading response time for answer
     * quality. Defaults to `medium` when omitted. `auto` picks the right effort for
     * each query.
     */
    effort?: 'low' | 'medium' | 'high' | 'auto' | null;
  }

  /**
   * Text output configuration. By default the response is plain text; for structured
   * output set `format` to `{"type": "json_schema", "name": ..., "schema": {...}}`.
   * On `/v1/responses` the `json_object` format produces plain text and may be
   * refused with a 400; use `json_schema` instead.
   */
  export interface Text {
    /**
     * Default response format. Used to generate text responses.
     */
    format?:
      | Text.ResponseFormatText
      | Text.ResponseFormatTextJsonSchemaConfig
      | Text.ResponseFormatJsonObject
      | null;

    verbosity?: 'low' | 'medium' | 'high' | null;

    [k: string]: unknown;
  }

  export namespace Text {
    /**
     * Default response format. Used to generate text responses.
     */
    export interface ResponseFormatText {
      type: 'text';

      [k: string]: unknown;
    }

    /**
     * JSON Schema output format: the response's output text conforms to `schema`.
     */
    export interface ResponseFormatTextJsonSchemaConfig {
      name: string;

      schema: { [key: string]: unknown };

      type: 'json_schema';

      description?: string | null;

      strict?: boolean | null;

      [k: string]: unknown;
    }

    /**
     * JSON object response format.
     *
     * An older method of generating JSON responses. Using `json_schema` is recommended
     * for models that support it. Note that the model will not generate JSON without a
     * system or user message instructing it to do so.
     */
    export interface ResponseFormatJsonObject {
      type: 'json_object';

      [k: string]: unknown;
    }
  }

  /**
   * The OpenAI `web_search` tool. Web grounding is always on, so the tool itself
   * changes nothing; its `filters` restrict which domains are searched.
   * `search_context_size` and `user_location` are accepted and ignored. Searches
   * always fetch live content, so `external_web_access: false` is rejected. Any
   * other key is rejected.
   */
  export interface ResponseWebSearchTool {
    type: 'web_search' | 'web_search_2025_08_26';

    /**
     * Domain filters on the OpenAI `web_search` tool, mapped onto Parallel's source
     * policy: `allowed_domains` -> `include_domains`, `blocked_domains` ->
     * `exclude_domains`. Entries follow the Source Policy rules (plain domains match
     * their subdomains; no schemes, ports, query strings or fragments; at most 200
     * entries in total). With both lists, a source must be on an allowed domain and
     * not on a blocked one.
     */
    filters?: ResponseWebSearchTool.Filters | null;

    search_context_size?: 'low' | 'medium' | 'high' | null;

    /**
     * The approximate location of the user.
     */
    user_location?: ResponseWebSearchTool.UserLocation | null;
  }

  export namespace ResponseWebSearchTool {
    /**
     * Domain filters on the OpenAI `web_search` tool, mapped onto Parallel's source
     * policy: `allowed_domains` -> `include_domains`, `blocked_domains` ->
     * `exclude_domains`. Entries follow the Source Policy rules (plain domains match
     * their subdomains; no schemes, ports, query strings or fragments; at most 200
     * entries in total). With both lists, a source must be on an allowed domain and
     * not on a blocked one.
     */
    export interface Filters {
      /**
       * Only sources on these domains (and their subdomains) are used. Maps to
       * `source_policy.include_domains`.
       */
      allowed_domains?: Array<string> | null;

      /**
       * Sources on these domains (and their subdomains) are excluded, also inside
       * `allowed_domains`. Maps to `source_policy.exclude_domains`.
       */
      blocked_domains?: Array<string> | null;
    }

    /**
     * The approximate location of the user.
     */
    export interface UserLocation {
      city?: string | null;

      country?: string | null;

      region?: string | null;

      timezone?: string | null;

      type?: 'approximate' | null;
    }
  }

  /**
   * The OpenAI `mcp` tool: a remote MCP server the `parallel` model may call while
   * researching, alongside web search. Each call is reported as an `mcp_call` output
   * item. `headers` and `authorization` are sent to the server and never echoed
   * back. Parallel runs tool calls without an approval round trip, so
   * `require_approval` must be set to `never` explicitly. The model calls tools
   * directly, so `allowed_callers`, when set, must include `direct`. `connector_id`
   * and `tunnel_id` are not supported. Any other key is rejected.
   */
  export interface ResponseMcpTool {
    /**
     * Must be `never`: tool calls run without an approval step.
     */
    require_approval: 'never';

    /**
     * Name for this server. Appears as `server_label` on its `mcp_call` items and must
     * not collide with a `data_sources` partner name.
     */
    server_label: string;

    /**
     * URL of the MCP server.
     */
    server_url: string;

    type: 'mcp';

    /**
     * Tool names the model may call on this server. Omit to allow every tool; an empty
     * list is rejected.
     */
    allowed_tools?: Array<string> | null;

    /**
     * HTTP headers sent on every request to the server, for authentication or other
     * purposes.
     */
    headers?: { [key: string]: string } | null;

    server_description?: string | null;
  }
}

/**
 * An event in the Responses API SSE stream; `type` identifies the event.
 */
export type ResponseStreamEvent =
  | ResponseStreamEvent.ResponseCreatedEvent
  | ResponseStreamEvent.ResponseInProgressEvent
  | ResponseStreamEvent.ResponseOutputItemAddedEvent
  | ResponseStreamEvent.ResponseWebSearchCallInProgressEvent
  | ResponseStreamEvent.ResponseWebSearchCallSearchingEvent
  | ResponseStreamEvent.ResponseWebSearchCallCompletedEvent
  | ResponseStreamEvent.ResponseMcpCallCompletedEvent
  | ResponseStreamEvent.ResponseMcpCallFailedEvent
  | ResponseStreamEvent.ResponseMcpListToolsCompletedEvent
  | ResponseStreamEvent.ResponseMcpListToolsFailedEvent
  | ResponseStreamEvent.ResponseContentPartAddedEvent
  | ResponseStreamEvent.ResponseTextDeltaEvent
  | ResponseStreamEvent.ResponseTextDoneEvent
  | ResponseStreamEvent.ResponseOutputTextAnnotationAddedEvent
  | ResponseStreamEvent.ResponseContentPartDoneEvent
  | ResponseStreamEvent.ResponseOutputItemDoneEvent
  | ResponseStreamEvent.ResponseCompletedEvent
  | ResponseStreamEvent.ResponseFailedEvent
  | ResponseStreamEvent.ResponseIncompleteEvent;

export namespace ResponseStreamEvent {
  export interface ResponseCreatedEvent {
    /**
     * A response from the `parallel` model. A completed response contains one
     * `web_search_call` item per web search the model ran, `mcp_list_tools` discovery
     * outcomes, and one `mcp_call` item per MCP tool call it made, followed by a
     * single assistant message whose text is annotated with URL citations grounding
     * the answer.
     */
    response: ResponsesAPI.ResponseResult;

    sequence_number: number;

    type: 'response.created';

    [k: string]: unknown;
  }

  export interface ResponseInProgressEvent {
    /**
     * A response from the `parallel` model. A completed response contains one
     * `web_search_call` item per web search the model ran, `mcp_list_tools` discovery
     * outcomes, and one `mcp_call` item per MCP tool call it made, followed by a
     * single assistant message whose text is annotated with URL citations grounding
     * the answer.
     */
    response: ResponsesAPI.ResponseResult;

    sequence_number: number;

    type: 'response.in_progress';

    [k: string]: unknown;
  }

  export interface ResponseOutputItemAddedEvent {
    /**
     * An assistant message produced by the model.
     */
    item:
      | ResponseOutputItemAddedEvent.ResponseOutputMessage
      | ResponseOutputItemAddedEvent.ResponseFunctionWebSearch
      | ResponseOutputItemAddedEvent.ResponseMcpCall
      | ResponseOutputItemAddedEvent.ResponseMcpListTools;

    output_index: number;

    sequence_number: number;

    type: 'response.output_item.added';

    [k: string]: unknown;
  }

  export namespace ResponseOutputItemAddedEvent {
    /**
     * An assistant message produced by the model.
     */
    export interface ResponseOutputMessage {
      id: string;

      content: Array<ResponseOutputMessage.Content>;

      role: 'assistant';

      status: 'in_progress' | 'completed' | 'incomplete';

      type: 'message';

      phase?: 'commentary' | 'final_answer' | null;

      [k: string]: unknown;
    }

    export namespace ResponseOutputMessage {
      /**
       * A text content part of an output message. `annotations` carries the URL
       * citations grounding the answer.
       */
      export interface Content {
        annotations: Array<Content.Annotation>;

        text: string;

        type: 'output_text';

        logprobs?: Array<Content.Logprob> | null;

        [k: string]: unknown;
      }

      export namespace Content {
        /**
         * A citation for a web resource used to generate a model response.
         */
        export interface Annotation {
          end_index: number;

          start_index: number;

          title: string;

          type: 'url_citation';

          url: string;

          [k: string]: unknown;
        }

        /**
         * The log probability of a token.
         */
        export interface Logprob {
          token: string;

          bytes: Array<number>;

          logprob: number;

          top_logprobs: Array<Logprob.TopLogprob>;

          [k: string]: unknown;
        }

        export namespace Logprob {
          /**
           * The top log probability of a token.
           */
          export interface TopLogprob {
            token: string;

            bytes: Array<number>;

            logprob: number;

            [k: string]: unknown;
          }
        }
      }
    }

    /**
     * One web action the `parallel` model took while researching the answer: a
     * `search` (`action.queries` are the search queries issued, `action.query` the
     * first of them) or an `open_page` (`action.url` is the page it read).
     */
    export interface ResponseFunctionWebSearch {
      id: string;

      /**
       * Action type "search" - Performs a web search query.
       */
      action: ResponseFunctionWebSearch.ActionSearch | ResponseFunctionWebSearch.ActionOpenPage;

      status: 'in_progress' | 'searching' | 'completed' | 'failed' | 'incomplete';

      type: 'web_search_call';

      [k: string]: unknown;
    }

    export namespace ResponseFunctionWebSearch {
      /**
       * Action type "search" - Performs a web search query.
       */
      export interface ActionSearch {
        type: 'search';

        queries?: Array<string> | null;

        query?: string | null;

        sources?: Array<ActionSearch.Source> | null;

        [k: string]: unknown;
      }

      export namespace ActionSearch {
        /**
         * A source used in the search.
         */
        export interface Source {
          type: 'url';

          url: string;

          [k: string]: unknown;
        }
      }

      /**
       * Action type "open_page" - Opens a specific URL from search results.
       */
      export interface ActionOpenPage {
        type: 'open_page';

        url?: string | null;

        [k: string]: unknown;
      }
    }

    /**
     * One tool call the `parallel` model made on an MCP server: a server from the
     * request's `mcp` tools, or a partner enabled via `data_sources`. `arguments` is
     * the JSON-encoded input; `output` is the text the tool returned, or `error` the
     * failure when the call did not succeed.
     */
    export interface ResponseMcpCall {
      id: string;

      arguments: string;

      name: string;

      server_label: string;

      status: 'completed' | 'failed';

      type: 'mcp_call';

      error?:
        | ResponseMcpCall.McpProtocolError
        | ResponseMcpCall.McpToolExecutionError
        | ResponseMcpCall.HTTPError
        | null;

      output?: string | null;

      [k: string]: unknown;
    }

    export namespace ResponseMcpCall {
      export interface McpProtocolError {
        code: number;

        message: string;

        type: 'mcp_protocol_error';

        [k: string]: unknown;
      }

      export interface McpToolExecutionError {
        content: unknown;

        type: 'mcp_tool_execution_error';

        [k: string]: unknown;
      }

      export interface HTTPError {
        code: number;

        message: string;

        type: 'http_error';

        [k: string]: unknown;
      }
    }

    /**
     * Tools discovered on a customer MCP server, or a connection/listing error.
     * Requested data partners report failures only, with an empty tools list.
     */
    export interface ResponseMcpListTools {
      id: string;

      server_label: string;

      tools: Array<ResponseMcpListTools.Tool>;

      type: 'mcp_list_tools';

      error?: string | null;

      [k: string]: unknown;
    }

    export namespace ResponseMcpListTools {
      /**
       * A tool available on an MCP server.
       */
      export interface Tool {
        input_schema: unknown;

        name: string;

        annotations?: unknown;

        description?: string | null;

        [k: string]: unknown;
      }
    }
  }

  /**
   * Emitted when a web search call is initiated.
   */
  export interface ResponseWebSearchCallInProgressEvent {
    item_id: string;

    output_index: number;

    sequence_number: number;

    type: 'response.web_search_call.in_progress';

    [k: string]: unknown;
  }

  /**
   * Emitted when a web search call is executing.
   */
  export interface ResponseWebSearchCallSearchingEvent {
    item_id: string;

    output_index: number;

    sequence_number: number;

    type: 'response.web_search_call.searching';

    [k: string]: unknown;
  }

  /**
   * Emitted when a web search call is completed.
   */
  export interface ResponseWebSearchCallCompletedEvent {
    item_id: string;

    output_index: number;

    sequence_number: number;

    type: 'response.web_search_call.completed';

    [k: string]: unknown;
  }

  /**
   * Emitted when an MCP tool call has completed successfully.
   */
  export interface ResponseMcpCallCompletedEvent {
    item_id: string;

    output_index: number;

    sequence_number: number;

    type: 'response.mcp_call.completed';

    [k: string]: unknown;
  }

  /**
   * Emitted when an MCP tool call has failed.
   */
  export interface ResponseMcpCallFailedEvent {
    item_id: string;

    output_index: number;

    sequence_number: number;

    type: 'response.mcp_call.failed';

    [k: string]: unknown;
  }

  /**
   * Emitted when the list of available MCP tools has been successfully retrieved.
   */
  export interface ResponseMcpListToolsCompletedEvent {
    item_id: string;

    output_index: number;

    sequence_number: number;

    type: 'response.mcp_list_tools.completed';

    [k: string]: unknown;
  }

  /**
   * Emitted when the attempt to list available MCP tools has failed.
   */
  export interface ResponseMcpListToolsFailedEvent {
    item_id: string;

    output_index: number;

    sequence_number: number;

    type: 'response.mcp_list_tools.failed';

    [k: string]: unknown;
  }

  export interface ResponseContentPartAddedEvent {
    content_index: number;

    item_id: string;

    output_index: number;

    /**
     * A text content part of an output message. `annotations` carries the URL
     * citations grounding the answer.
     */
    part: ResponseContentPartAddedEvent.Part;

    sequence_number: number;

    type: 'response.content_part.added';

    [k: string]: unknown;
  }

  export namespace ResponseContentPartAddedEvent {
    /**
     * A text content part of an output message. `annotations` carries the URL
     * citations grounding the answer.
     */
    export interface Part {
      annotations: Array<Part.Annotation>;

      text: string;

      type: 'output_text';

      logprobs?: Array<Part.Logprob> | null;

      [k: string]: unknown;
    }

    export namespace Part {
      /**
       * A citation for a web resource used to generate a model response.
       */
      export interface Annotation {
        end_index: number;

        start_index: number;

        title: string;

        type: 'url_citation';

        url: string;

        [k: string]: unknown;
      }

      /**
       * The log probability of a token.
       */
      export interface Logprob {
        token: string;

        bytes: Array<number>;

        logprob: number;

        top_logprobs: Array<Logprob.TopLogprob>;

        [k: string]: unknown;
      }

      export namespace Logprob {
        /**
         * The top log probability of a token.
         */
        export interface TopLogprob {
          token: string;

          bytes: Array<number>;

          logprob: number;

          [k: string]: unknown;
        }
      }
    }
  }

  /**
   * Emitted when there is an additional text delta.
   */
  export interface ResponseTextDeltaEvent {
    content_index: number;

    delta: string;

    item_id: string;

    logprobs: Array<ResponseTextDeltaEvent.Logprob>;

    output_index: number;

    sequence_number: number;

    type: 'response.output_text.delta';

    [k: string]: unknown;
  }

  export namespace ResponseTextDeltaEvent {
    /**
     * A logprob is the logarithmic probability that the model assigns to producing a
     * particular token at a given position in the sequence. Less-negative (higher)
     * logprob values indicate greater model confidence in that token choice.
     */
    export interface Logprob {
      token: string;

      logprob: number;

      top_logprobs?: Array<Logprob.TopLogprob> | null;

      [k: string]: unknown;
    }

    export namespace Logprob {
      export interface TopLogprob {
        token?: string | null;

        logprob?: number | null;

        [k: string]: unknown;
      }
    }
  }

  /**
   * Emitted when text content is finalized.
   */
  export interface ResponseTextDoneEvent {
    content_index: number;

    item_id: string;

    logprobs: Array<ResponseTextDoneEvent.Logprob>;

    output_index: number;

    sequence_number: number;

    text: string;

    type: 'response.output_text.done';

    [k: string]: unknown;
  }

  export namespace ResponseTextDoneEvent {
    /**
     * A logprob is the logarithmic probability that the model assigns to producing a
     * particular token at a given position in the sequence. Less-negative (higher)
     * logprob values indicate greater model confidence in that token choice.
     */
    export interface Logprob {
      token: string;

      logprob: number;

      top_logprobs?: Array<Logprob.TopLogprob> | null;

      [k: string]: unknown;
    }

    export namespace Logprob {
      export interface TopLogprob {
        token?: string | null;

        logprob?: number | null;

        [k: string]: unknown;
      }
    }
  }

  export interface ResponseOutputTextAnnotationAddedEvent {
    /**
     * A citation for a web resource used to generate a model response.
     */
    annotation: ResponseOutputTextAnnotationAddedEvent.Annotation;

    annotation_index: number;

    content_index: number;

    item_id: string;

    output_index: number;

    sequence_number: number;

    type: 'response.output_text.annotation.added';

    [k: string]: unknown;
  }

  export namespace ResponseOutputTextAnnotationAddedEvent {
    /**
     * A citation for a web resource used to generate a model response.
     */
    export interface Annotation {
      end_index: number;

      start_index: number;

      title: string;

      type: 'url_citation';

      url: string;

      [k: string]: unknown;
    }
  }

  export interface ResponseContentPartDoneEvent {
    content_index: number;

    item_id: string;

    output_index: number;

    /**
     * A text content part of an output message. `annotations` carries the URL
     * citations grounding the answer.
     */
    part: ResponseContentPartDoneEvent.Part;

    sequence_number: number;

    type: 'response.content_part.done';

    [k: string]: unknown;
  }

  export namespace ResponseContentPartDoneEvent {
    /**
     * A text content part of an output message. `annotations` carries the URL
     * citations grounding the answer.
     */
    export interface Part {
      annotations: Array<Part.Annotation>;

      text: string;

      type: 'output_text';

      logprobs?: Array<Part.Logprob> | null;

      [k: string]: unknown;
    }

    export namespace Part {
      /**
       * A citation for a web resource used to generate a model response.
       */
      export interface Annotation {
        end_index: number;

        start_index: number;

        title: string;

        type: 'url_citation';

        url: string;

        [k: string]: unknown;
      }

      /**
       * The log probability of a token.
       */
      export interface Logprob {
        token: string;

        bytes: Array<number>;

        logprob: number;

        top_logprobs: Array<Logprob.TopLogprob>;

        [k: string]: unknown;
      }

      export namespace Logprob {
        /**
         * The top log probability of a token.
         */
        export interface TopLogprob {
          token: string;

          bytes: Array<number>;

          logprob: number;

          [k: string]: unknown;
        }
      }
    }
  }

  export interface ResponseOutputItemDoneEvent {
    /**
     * An assistant message produced by the model.
     */
    item:
      | ResponseOutputItemDoneEvent.ResponseOutputMessage
      | ResponseOutputItemDoneEvent.ResponseFunctionWebSearch
      | ResponseOutputItemDoneEvent.ResponseMcpCall
      | ResponseOutputItemDoneEvent.ResponseMcpListTools;

    output_index: number;

    sequence_number: number;

    type: 'response.output_item.done';

    [k: string]: unknown;
  }

  export namespace ResponseOutputItemDoneEvent {
    /**
     * An assistant message produced by the model.
     */
    export interface ResponseOutputMessage {
      id: string;

      content: Array<ResponseOutputMessage.Content>;

      role: 'assistant';

      status: 'in_progress' | 'completed' | 'incomplete';

      type: 'message';

      phase?: 'commentary' | 'final_answer' | null;

      [k: string]: unknown;
    }

    export namespace ResponseOutputMessage {
      /**
       * A text content part of an output message. `annotations` carries the URL
       * citations grounding the answer.
       */
      export interface Content {
        annotations: Array<Content.Annotation>;

        text: string;

        type: 'output_text';

        logprobs?: Array<Content.Logprob> | null;

        [k: string]: unknown;
      }

      export namespace Content {
        /**
         * A citation for a web resource used to generate a model response.
         */
        export interface Annotation {
          end_index: number;

          start_index: number;

          title: string;

          type: 'url_citation';

          url: string;

          [k: string]: unknown;
        }

        /**
         * The log probability of a token.
         */
        export interface Logprob {
          token: string;

          bytes: Array<number>;

          logprob: number;

          top_logprobs: Array<Logprob.TopLogprob>;

          [k: string]: unknown;
        }

        export namespace Logprob {
          /**
           * The top log probability of a token.
           */
          export interface TopLogprob {
            token: string;

            bytes: Array<number>;

            logprob: number;

            [k: string]: unknown;
          }
        }
      }
    }

    /**
     * One web action the `parallel` model took while researching the answer: a
     * `search` (`action.queries` are the search queries issued, `action.query` the
     * first of them) or an `open_page` (`action.url` is the page it read).
     */
    export interface ResponseFunctionWebSearch {
      id: string;

      /**
       * Action type "search" - Performs a web search query.
       */
      action: ResponseFunctionWebSearch.ActionSearch | ResponseFunctionWebSearch.ActionOpenPage;

      status: 'in_progress' | 'searching' | 'completed' | 'failed' | 'incomplete';

      type: 'web_search_call';

      [k: string]: unknown;
    }

    export namespace ResponseFunctionWebSearch {
      /**
       * Action type "search" - Performs a web search query.
       */
      export interface ActionSearch {
        type: 'search';

        queries?: Array<string> | null;

        query?: string | null;

        sources?: Array<ActionSearch.Source> | null;

        [k: string]: unknown;
      }

      export namespace ActionSearch {
        /**
         * A source used in the search.
         */
        export interface Source {
          type: 'url';

          url: string;

          [k: string]: unknown;
        }
      }

      /**
       * Action type "open_page" - Opens a specific URL from search results.
       */
      export interface ActionOpenPage {
        type: 'open_page';

        url?: string | null;

        [k: string]: unknown;
      }
    }

    /**
     * One tool call the `parallel` model made on an MCP server: a server from the
     * request's `mcp` tools, or a partner enabled via `data_sources`. `arguments` is
     * the JSON-encoded input; `output` is the text the tool returned, or `error` the
     * failure when the call did not succeed.
     */
    export interface ResponseMcpCall {
      id: string;

      arguments: string;

      name: string;

      server_label: string;

      status: 'completed' | 'failed';

      type: 'mcp_call';

      error?:
        | ResponseMcpCall.McpProtocolError
        | ResponseMcpCall.McpToolExecutionError
        | ResponseMcpCall.HTTPError
        | null;

      output?: string | null;

      [k: string]: unknown;
    }

    export namespace ResponseMcpCall {
      export interface McpProtocolError {
        code: number;

        message: string;

        type: 'mcp_protocol_error';

        [k: string]: unknown;
      }

      export interface McpToolExecutionError {
        content: unknown;

        type: 'mcp_tool_execution_error';

        [k: string]: unknown;
      }

      export interface HTTPError {
        code: number;

        message: string;

        type: 'http_error';

        [k: string]: unknown;
      }
    }

    /**
     * Tools discovered on a customer MCP server, or a connection/listing error.
     * Requested data partners report failures only, with an empty tools list.
     */
    export interface ResponseMcpListTools {
      id: string;

      server_label: string;

      tools: Array<ResponseMcpListTools.Tool>;

      type: 'mcp_list_tools';

      error?: string | null;

      [k: string]: unknown;
    }

    export namespace ResponseMcpListTools {
      /**
       * A tool available on an MCP server.
       */
      export interface Tool {
        input_schema: unknown;

        name: string;

        annotations?: unknown;

        description?: string | null;

        [k: string]: unknown;
      }
    }
  }

  export interface ResponseCompletedEvent {
    /**
     * A response from the `parallel` model. A completed response contains one
     * `web_search_call` item per web search the model ran, `mcp_list_tools` discovery
     * outcomes, and one `mcp_call` item per MCP tool call it made, followed by a
     * single assistant message whose text is annotated with URL citations grounding
     * the answer.
     */
    response: ResponsesAPI.ResponseResult;

    sequence_number: number;

    type: 'response.completed';

    [k: string]: unknown;
  }

  export interface ResponseFailedEvent {
    /**
     * A response from the `parallel` model. A completed response contains one
     * `web_search_call` item per web search the model ran, `mcp_list_tools` discovery
     * outcomes, and one `mcp_call` item per MCP tool call it made, followed by a
     * single assistant message whose text is annotated with URL citations grounding
     * the answer.
     */
    response: ResponsesAPI.ResponseResult;

    sequence_number: number;

    type: 'response.failed';

    [k: string]: unknown;
  }

  export interface ResponseIncompleteEvent {
    /**
     * A response from the `parallel` model. A completed response contains one
     * `web_search_call` item per web search the model ran, `mcp_list_tools` discovery
     * outcomes, and one `mcp_call` item per MCP tool call it made, followed by a
     * single assistant message whose text is annotated with URL citations grounding
     * the answer.
     */
    response: ResponsesAPI.ResponseResult;

    sequence_number: number;

    type: 'response.incomplete';

    [k: string]: unknown;
  }
}

export type ResponseCreateParams = ResponseCreateParamsNonStreaming | ResponseCreateParamsStreaming;

export interface ResponseCreateParamsBase {
  /**
   * The input to generate a response for: a plain string, or a list of role/content
   * messages that includes at least one `user` message. Must be non-empty, and only
   * text content is supported. `input` and `instructions` together may total at most
   * 20,000 characters.
   */
  input: string | Array<ResponseCreateParams.UnionMember1>;

  /**
   * The model to run. `parallel` is the only supported value (matched
   * case-insensitively); any other value is rejected. To trade response time for
   * answer quality, set `reasoning.effort` (low/medium/high/auto) rather than
   * changing the model name.
   */
  model: string;

  /**
   * Background mode is not supported: requests with `background=true` are rejected
   * with a 422 validation error. Use the Task API (POST /v1/tasks/runs) for
   * long-running work.
   */
  background?: boolean | null;

  /**
   * Data partners to enable for this request, in addition to web search:
   * `pay_per_use` partners are billed per call, `free` partners are not. Same names
   * and shape as the Task API's `advanced_settings.data_sources`; see the Data
   * Sources documentation. Supported at every `reasoning.effort`. Lower efforts make
   * fewer partner calls per answer, and `auto` can stop at `low`. For a partner
   * whose lookups take several steps, such as a search and then a detail fetch, use
   * `medium` (the default) or `high`. A partner name must not collide with an `mcp`
   * tool's `server_label`.
   */
  data_sources?: ResponseCreateParams.DataSources | null;

  /**
   * System instructions for the model.
   */
  instructions?: string | null;

  /**
   * Arbitrary key-value pairs, echoed back on the Response object. Useful for
   * tagging requests. At most 16 keys; keys up to 64 characters, values up to 512
   * characters.
   */
  metadata?: { [key: string]: string } | null;

  /**
   * ID of a previous response to use as conversation context.
   */
  previous_response_id?: string | null;

  /**
   * Reasoning configuration (OpenAI-compatible subset).
   */
  reasoning?: ResponseCreateParams.Reasoning | null;

  /**
   * Whether to stream the response.
   */
  stream?: boolean | null;

  /**
   * Text output configuration. By default the response is plain text; for structured
   * output set `format` to `{"type": "json_schema", "name": ..., "schema": {...}}`.
   * On `/v1/responses` the `json_object` format produces plain text and may be
   * refused with a 400; use `json_schema` instead.
   */
  text?: ResponseCreateParams.Text | null;

  /**
   * OpenAI tools. Web grounding is always on, so no tool is needed to search; a
   * `web_search` tool's `filters` restrict the domains searched and cited
   * (`allowed_domains` maps to Parallel's `source_policy.include_domains`,
   * `blocked_domains` to `exclude_domains`). An `mcp` tool gives the model a remote
   * MCP server to call; at most 10 per request. A tool of any other `type` is
   * accepted and ignored. A tool whose `type` is missing or not a string is
   * rejected.
   */
  tools?: Array<
    | ResponseCreateParams.ResponseWebSearchTool
    | ResponseCreateParams.ResponseMcpTool
    | { [key: string]: unknown }
  > | null;
}

export namespace ResponseCreateParams {
  /**
   * A single input message for the Responses API.
   *
   * `content` accepts either a bare string (`"hi"`) or the canonical OpenAI
   * list-of-parts (`[{"text": "hi", "type": "input_text"}]`).
   */
  export interface UnionMember1 {
    /**
     * Text content of the message. Either a string or a list of content parts
     * (`{text, type}` objects) for OpenAI SDK clients.
     */
    content: string | Array<UnionMember1.UnionMember1>;

    /**
     * The role of the message author.
     */
    role: 'user' | 'assistant' | 'system' | 'developer';
  }

  export namespace UnionMember1 {
    /**
     * A single content part of a message, e.g. `{"text": "hi", "type": "input_text"}`.
     * Only text parts are supported; requests containing image, audio, or file parts
     * fail with a 422 error.
     */
    export interface UnionMember1 {
      /**
       * The text payload, when the part carries one.
       */
      text?: string | null;

      /**
       * The content part type. Supported: `input_text`, `output_text`, and `text`.
       * Multimodal types (`input_image`, `input_audio`, `input_file`) are rejected with
       * a 422 error.
       */
      type?: string | null;
    }
  }

  /**
   * Data partners to enable for this request, in addition to web search:
   * `pay_per_use` partners are billed per call, `free` partners are not. Same names
   * and shape as the Task API's `advanced_settings.data_sources`; see the Data
   * Sources documentation. Supported at every `reasoning.effort`. Lower efforts make
   * fewer partner calls per answer, and `auto` can stop at `low`. For a partner
   * whose lookups take several steps, such as a search and then a detail fetch, use
   * `medium` (the default) or `high`. A partner name must not collide with an `mcp`
   * tool's `server_label`.
   */
  export interface DataSources {
    /**
     * Data partners included with the processor to keep out of this task. Excluding a
     * partner also blocks its own domains. See the Data Sources documentation for the
     * available names.
     */
    excluded?: Array<string>;

    /**
     * Free data partners to enable for this task, in addition to sources included with
     * the processor. Never billed. See the Data Sources documentation for the
     * available names.
     */
    free?: Array<string>;

    /**
     * Pay-per-use data partners to enable for this task, in addition to sources
     * included with the processor. See the Data Sources documentation for the
     * available names.
     */
    pay_per_use?: Array<string>;
  }

  /**
   * Reasoning configuration (OpenAI-compatible subset).
   */
  export interface Reasoning {
    /**
     * Controls how much research is performed, trading response time for answer
     * quality. Defaults to `medium` when omitted. `auto` picks the right effort for
     * each query.
     */
    effort?: 'low' | 'medium' | 'high' | 'auto' | null;
  }

  /**
   * Text output configuration. By default the response is plain text; for structured
   * output set `format` to `{"type": "json_schema", "name": ..., "schema": {...}}`.
   * On `/v1/responses` the `json_object` format produces plain text and may be
   * refused with a 400; use `json_schema` instead.
   */
  export interface Text {
    /**
     * Default response format. Used to generate text responses.
     */
    format?:
      | Text.ResponseFormatText
      | Text.ResponseFormatTextJsonSchemaConfig
      | Text.ResponseFormatJsonObject
      | null;

    verbosity?: 'low' | 'medium' | 'high' | null;

    [k: string]: unknown;
  }

  export namespace Text {
    /**
     * Default response format. Used to generate text responses.
     */
    export interface ResponseFormatText {
      type: 'text';

      [k: string]: unknown;
    }

    /**
     * JSON Schema output format: the response's output text conforms to `schema`.
     */
    export interface ResponseFormatTextJsonSchemaConfig {
      name: string;

      schema: { [key: string]: unknown };

      type: 'json_schema';

      description?: string | null;

      strict?: boolean | null;

      [k: string]: unknown;
    }

    /**
     * JSON object response format.
     *
     * An older method of generating JSON responses. Using `json_schema` is recommended
     * for models that support it. Note that the model will not generate JSON without a
     * system or user message instructing it to do so.
     */
    export interface ResponseFormatJsonObject {
      type: 'json_object';

      [k: string]: unknown;
    }
  }

  /**
   * The OpenAI `web_search` tool. Web grounding is always on, so the tool itself
   * changes nothing; its `filters` restrict which domains are searched.
   * `search_context_size` and `user_location` are accepted and ignored. Searches
   * always fetch live content, so `external_web_access: false` is rejected. Any
   * other key is rejected.
   */
  export interface ResponseWebSearchTool {
    type: 'web_search' | 'web_search_2025_08_26';

    /**
     * Domain filters on the OpenAI `web_search` tool, mapped onto Parallel's source
     * policy: `allowed_domains` -> `include_domains`, `blocked_domains` ->
     * `exclude_domains`. Entries follow the Source Policy rules (plain domains match
     * their subdomains; no schemes, ports, query strings or fragments; at most 200
     * entries in total). With both lists, a source must be on an allowed domain and
     * not on a blocked one.
     */
    filters?: ResponseWebSearchTool.Filters | null;

    search_context_size?: 'low' | 'medium' | 'high' | null;

    /**
     * The approximate location of the user.
     */
    user_location?: ResponseWebSearchTool.UserLocation | null;
  }

  export namespace ResponseWebSearchTool {
    /**
     * Domain filters on the OpenAI `web_search` tool, mapped onto Parallel's source
     * policy: `allowed_domains` -> `include_domains`, `blocked_domains` ->
     * `exclude_domains`. Entries follow the Source Policy rules (plain domains match
     * their subdomains; no schemes, ports, query strings or fragments; at most 200
     * entries in total). With both lists, a source must be on an allowed domain and
     * not on a blocked one.
     */
    export interface Filters {
      /**
       * Only sources on these domains (and their subdomains) are used. Maps to
       * `source_policy.include_domains`.
       */
      allowed_domains?: Array<string> | null;

      /**
       * Sources on these domains (and their subdomains) are excluded, also inside
       * `allowed_domains`. Maps to `source_policy.exclude_domains`.
       */
      blocked_domains?: Array<string> | null;
    }

    /**
     * The approximate location of the user.
     */
    export interface UserLocation {
      city?: string | null;

      country?: string | null;

      region?: string | null;

      timezone?: string | null;

      type?: 'approximate' | null;
    }
  }

  /**
   * The OpenAI `mcp` tool: a remote MCP server the `parallel` model may call while
   * researching, alongside web search. Each call is reported as an `mcp_call` output
   * item. `headers` and `authorization` are sent to the server and never echoed
   * back. Parallel runs tool calls without an approval round trip, so
   * `require_approval` must be set to `never` explicitly. The model calls tools
   * directly, so `allowed_callers`, when set, must include `direct`. `connector_id`
   * and `tunnel_id` are not supported. Any other key is rejected.
   */
  export interface ResponseMcpTool {
    /**
     * Must be `never`: tool calls run without an approval step.
     */
    require_approval: 'never';

    /**
     * Name for this server. Appears as `server_label` on its `mcp_call` items and must
     * not collide with a `data_sources` partner name.
     */
    server_label: string;

    /**
     * URL of the MCP server.
     */
    server_url: string;

    type: 'mcp';

    /**
     * Tool names the model may call on this server. Omit to allow every tool; an empty
     * list is rejected.
     */
    allowed_tools?: Array<string> | null;

    /**
     * OAuth access token, sent as `Authorization: Bearer <token>`.
     */
    authorization?: string | null;

    /**
     * HTTP headers sent on every request to the server, for authentication or other
     * purposes.
     */
    headers?: { [key: string]: string } | null;

    server_description?: string | null;
  }

  export type ResponseCreateParamsNonStreaming = ResponsesAPI.ResponseCreateParamsNonStreaming;
  export type ResponseCreateParamsStreaming = ResponsesAPI.ResponseCreateParamsStreaming;
}

export interface ResponseCreateParamsNonStreaming extends ResponseCreateParamsBase {
  /**
   * Whether to stream the response.
   */
  stream?: false | null;
}

export interface ResponseCreateParamsStreaming extends ResponseCreateParamsBase {
  /**
   * Whether to stream the response.
   */
  stream: true;
}

export declare namespace Responses {
  export {
    type ResponseResult as ResponseResult,
    type ResponseStreamEvent as ResponseStreamEvent,
    type ResponseCreateParams as ResponseCreateParams,
    type ResponseCreateParamsNonStreaming as ResponseCreateParamsNonStreaming,
    type ResponseCreateParamsStreaming as ResponseCreateParamsStreaming,
  };
}
