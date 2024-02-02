import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';

@Injectable({
    providedIn: 'root',
})
export class SseService {
    
    private _eventSource: NativeEventSource | EventSourcePolyfill = NativeEventSource || EventSourcePolyfill;

    public getEventSource(url: string): EventSource {
        return new this._eventSource(url);
    }

    public getServerSentEvent(url: string) {
        return Observable.create(observer => {
            const eventSource = this.getEventSource(url);

            eventSource.onmessage = event => {
                observer.next(event);
            }

            eventSource.onerror = event => {
                observer.next(event);
            }
        })
    }
}
