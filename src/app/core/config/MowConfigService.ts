import { Inject, Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { merge } from 'lodash-es'
import { FUSE_APP_CONFIG } from '@fuse/services/config/config.constants'

@Injectable({
    providedIn: 'root',
})
export class MowConfigService {
    private _config: BehaviorSubject<any>

    /**
     * Constructor
     */
    constructor(@Inject(FUSE_APP_CONFIG) config: any) {
        // Private
        this._config = new BehaviorSubject(config)
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for config
     */
    set config(value: any) {
        // Merge the new config over to the current config
        const config = merge({}, this._config.getValue(), value)
        localStorage.setItem('config', JSON.stringify(config))
        // Execute the observable
        this._config.next(config)
    }

    // eslint-disable-next-line @typescript-eslint/member-ordering
    get config$(): Observable<any> {
        if (localStorage.getItem('config')) {
            this._config.next(JSON.parse(localStorage.getItem('config')))
        }

        return this._config.asObservable()
    }

    /**
     * Salvo lo state di una tabella
     * @param key 
     * @param state 
     */
    public saveTableState(key, state: any): void {
        let tables = JSON.parse(localStorage.getItem('tables'));
        if(tables) {
            if(this.getTableState(key)) {
                const exists = tables.find( item => {
                    return item.key === key;
                })
                if(exists) {
                    tables = tables.map(item => {
                        if(item.key === key) {
                            return state;
                        }
                        return item;
                    }) 
                } else {
                    tables.push(state);
                }
                
                localStorage.setItem('tables', JSON.stringify(tables))
            } else {
                
                tables.push(state);
                localStorage.setItem('tables', JSON.stringify(tables))
            }    
        } else {
            localStorage.setItem('tables', JSON.stringify([state]))
        }
    }

    /**
     * Recupero lo state di una tabella
     * @param key 
     * @returns 
     */
    public getTableState(key) {
        if (localStorage.getItem('tables')) {
            const tables = JSON.parse(localStorage.getItem('tables'));
            const confTable = tables.find( item => {
                return item.key === key;
            })
            return confTable ? confTable : null;
        }

        return null;
    }

    /**
     * Metodo di pulizia di table state
     * @param key 
     */
    public clearTableState(key) {
        if (localStorage.getItem('tables')) {
            const tables = JSON.parse(localStorage.getItem('tables'));
            const filtersTable = tables.filter( item => {
                return item.key !== key;
            })
            localStorage.setItem('tables', JSON.stringify(filtersTable))
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resets the config to the default
     */
    reset(): void {
        localStorage.removeItem('config')
        // Set the config
        this._config.next(this.config)
    }
}
