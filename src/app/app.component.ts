import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { SseService } from './core/sse/sse.service';
import { environment } from 'environments/environment';
import { AuthService } from './core/auth/auth.service';
import { confirmationDeleteOptions, confirmationDeleteScenario, confirmationDeplyOptions, error401Options } from './shared/confirmations/popoup';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { MowAlertService } from './components/alert';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class AppComponent
{
    /**
     * Constructor
     */
    constructor(
        private _sseService: SseService,
        private _fuseConfirmationService: FuseConfirmationService,
        protected _mowAlertService: MowAlertService,
        protected _changeDetectorRef: ChangeDetectorRef,
        protected _ngZone: NgZone,
    )
    {
        // this.connectSse();
    }

    // Mi connetto alla rotta di SSE
    public connectSse() {
        this._sseService.getServerSentEvent(environment.publicUrl + 'sse').subscribe((data) => {
            const res = JSON.parse(data.data);
            if(res.type === 'deploy' && res.message === 'new') {
                this._ngZone.run(()=> {
                    this._fuseConfirmationService.open(confirmationDeplyOptions).afterClosed().subscribe((result) => {
                        if(result === 'confirmed') {
                            window.location.reload();
                        }
                    });
                });
            }
        })
    };
}
