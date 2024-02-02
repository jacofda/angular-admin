import { Injectable } from '@angular/core'
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { FuseConfirmationService } from '@fuse/services/confirmation'
import {
    error403Options,
    error500Options,
    error422Options,
    error401Options,
    confirmationDeplyOptions,
} from 'app/shared/confirmations/popoup'
import { Router } from '@angular/router'
import * as Sentry from '@sentry/angular-ivy'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    protected dialogIsOpen: boolean = false
    constructor(
        private _fuseConfirmationService: FuseConfirmationService,
        private _router: Router,
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    const deploykey = event.headers.get('Deploy-Back-Key')
                    // Se la response è un json e contiene il Deploy-Keys-Value
                    if (deploykey) {
                        const current = localStorage.getItem('deploy-back-key')
                        if (current && current !== deploykey && !this.dialogIsOpen) {
                            const _matDialog = this._fuseConfirmationService.open(confirmationDeplyOptions)
                            _matDialog.afterClosed().subscribe((result) => {
                                if (result === 'confirmed') {
                                    window.location.reload()
                                }
                                this.dialogIsOpen = false
                            })
                            _matDialog.afterOpened().subscribe((result) => {
                                this.dialogIsOpen = true
                            })

                            localStorage.setItem('deploy-back-key', deploykey)
                        }
                        if (!current) {
                            localStorage.setItem('deploy-back-key', deploykey)
                        }
                    }
                }
            }),
            catchError((error) => {
                if (error instanceof HttpErrorResponse && error.status === 400) {
                    error403Options.title = 'Errore cod.400'
                    error403Options.message = error.error.message
                    this._fuseConfirmationService.open(error403Options)
                    return
                }
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    localStorage.removeItem('accessToken')
                    error401Options.title = 'Errore 401'
                    error401Options.message = 'Sessione scaduta, effettuare nuovamente il login'
                    const confirmation = this._fuseConfirmationService.open(error401Options)
                    confirmation.afterClosed().subscribe((result) => {
                        location.href = '/'
                    })
                    return
                }
                if (error instanceof HttpErrorResponse && error.status === 403) {
                    error403Options.title = 'Errore cod.403'
                    error403Options.message = error.error.message
                    this._fuseConfirmationService.open(error403Options)
                    return
                }
                if (error instanceof HttpErrorResponse && error.status === 404) {
                    this._router.navigate(['/404'])
                    return
                }
                if (error instanceof HttpErrorResponse && error.status === 422) {
                    error422Options.title = 'Errore cod.422'
                    error422Options.message = error.error.message
                    this._fuseConfirmationService.open(error422Options)
                    return
                }
                if (error instanceof HttpErrorResponse && error.status === 400) {
                    error422Options.title = 'Errore di validazione'
                    error422Options.message = error.error.message
                    this._fuseConfirmationService.open(error422Options)
                    return
                }
                if (error instanceof HttpErrorResponse && error.status === 500) {
                    error500Options.title = 'Errore cod.500'
                    error500Options.message = error.error.message
                    this._fuseConfirmationService.open(error500Options)
                    Sentry.captureException(new Error(error.error.message))
                }
                return throwError(() => new Error(error))
            })
        )
    }
}
