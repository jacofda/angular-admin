import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { TranslocoService } from '@ngneat/transloco'
import { environment } from 'environments/environment'
import { Observable } from 'rxjs'

@Injectable()
export class LangUrlInterceptor implements HttpInterceptor {
    constructor(private _translocoService: TranslocoService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Se non ci sono lingue disponibili, il multilingua è disabilitato
        if (this._translocoService.getAvailableLangs().length === 0) {
            return next.handle(request)
        }

        const lang = this._translocoService.getActiveLang()
        const url = request.url
        const ignoreEndpoints = ['/auth']


        if (url.startsWith(environment.baseUrl) && !ignoreEndpoints.some((endpoint) => url.includes(endpoint))) {
            // Aggiunge la lingua all'url della richiesta prima di '/api/core'
            const locale = this._translocoService.getActiveLang()
            const url = request.url.split('/api/core')
            request = request.clone({
                url: url[0] + '/' + locale + '/api/core' + url[1],
            })
        }
        return next.handle(request)
    }
}