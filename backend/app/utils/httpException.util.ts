type HttpErrorStatusCode =
  | 400
  | 401
  | 402
  | 403
  | 404
  | 405
  | 406
  | 407
  | 408
  | 409
  | 410
  | 411
  | 412
  | 413
  | 414
  | 415
  | 416
  | 417
  | 418
  | 421
  | 422
  | 423
  | 424
  | 425
  | 426
  | 428
  | 429
  | 431
  | 451
  | 500
  | 501
  | 502
  | 503
  | 504
  | 505
  | 506
  | 507
  | 508
  | 510
  | 511;

class HttpException extends Error {
  status: HttpErrorStatusCode;
  error: {};
  constructor(status: HttpErrorStatusCode, message: string, error: {} = {}) {
    super(message);

    // if (Error.captureStackTrace) {
    //   Error.captureStackTrace(this, HttpError);
    // }

    this.status = status;
    this.error = error;
  }
}

export default HttpException;
