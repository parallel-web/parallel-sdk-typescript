// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

/**
 * An error message.
 */
export interface ErrorObject {
  /**
   * Human-readable message.
   */
  message: string;

  /**
   * Reference ID for the error.
   */
  ref_id: string;

  /**
   * Optional detail supporting the error.
   */
  detail?: { [key: string]: unknown } | null;
}

/**
 * Response object used for non-200 status codes.
 */
export interface ErrorResponse {
  /**
   * Error.
   */
  error: ErrorObject;

  /**
   * Always 'error'.
   */
  type: 'error';
}

/**
 * Source policy for web search results.
 *
 * Plain domains match that domain and its subdomains. Domain/path entries use
 * case-sensitive path matching at segment boundaries; trailing slashes are
 * ignored, dot segments are normalized, and other percent-encoded path spelling is
 * preserved. Entries omit schemes, ports, query strings, and fragments. When
 * include_domains is non-empty, it defines the complete allowlist and
 * exclude_domains is ignored.
 */
export interface SourcePolicy {
  /**
   * Optional start date for filtering search results. Results will be limited to
   * content published on or after this date. Provided as an RFC 3339 date string
   * (YYYY-MM-DD).
   */
  after_date?: string | null;

  /**
   * List of domains or domain/path prefixes to exclude from results. Applied only
   * when include_domains is empty. If specified, matching sources will be excluded.
   * Accepts plain domains (e.g., reddit.com), domain/path prefixes (e.g.,
   * youtube.com/shorts), or bare domain extensions (e.g., .gov, .edu, .co.uk). The
   * combined number of entries in include_domains and exclude_domains cannot
   * exceed 200.
   */
  exclude_domains?: Array<string>;

  /**
   * List of domains or domain/path prefixes to restrict results to. If specified,
   * only matching sources will be included and exclude_domains will be ignored.
   * Accepts plain domains (e.g., wikipedia.org), domain/path prefixes (e.g.,
   * docs.python.org/3), or bare domain extensions (e.g., .gov, .edu, .co.uk). The
   * combined number of entries in include_domains and exclude_domains cannot
   * exceed 200.
   */
  include_domains?: Array<string>;
}

/**
 * Human-readable message for a task.
 */
export interface Warning {
  /**
   * Human-readable message.
   */
  message: string;

  /**
   * Type of warning. Note that adding new warning types is considered a
   * backward-compatible change.
   */
  type: 'spec_validation_warning' | 'input_validation_warning' | 'warning';

  /**
   * Optional detail supporting the warning.
   */
  detail?: { [key: string]: unknown } | null;
}
