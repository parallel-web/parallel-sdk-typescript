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
  detail?: unknown | null;
}

/**
 * Response object used for non-200 status codes.
 */
export interface ErrorResponse {
  /**
   * An error message.
   */
  error: ErrorObject;

  /**
   * Always 'error'.
   */
  type?: 'error';
}
