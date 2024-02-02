import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import * as Sentry from "@sentry/angular-ivy";

@Injectable()
export class CustomErrorHandler extends ErrorHandler {
  handleError(error: Error): void {
    console.error(error);
    Sentry.captureException(error || error);
  }
}