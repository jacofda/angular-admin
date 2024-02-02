import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, ReplaySubject, tap } from 'rxjs'
import { environment } from 'environments/environment'
import { MowNavigationItem, Navigation } from 'app/core/navigation/navigation.types'

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    private _navigation: ReplaySubject<Navigation> = new ReplaySubject<Navigation>(1)

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigation> {
        return this._navigation.asObservable()
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
    get(): Observable<MowNavigationItem[]> {
        return this._httpClient.get<MowNavigationItem[]>(environment.baseUrl + 'programmi/navigation').pipe(
            tap((navItems) => {
                // Ripulisce la proprietà active di tutti gli elementi
                navItems = this._cleanNavigationItem(navItems)

                this._navigation.next({
                    default: this._getItemsByTemplateName(navItems, 'default'),
                    compact: this._getItemsByTemplateName(navItems, 'compact'),
                    horizontal: this._getItemsByTemplateName(navItems, 'horizontal'),
                    futuristic: this._getItemsByTemplateName(navItems, 'futuristic'),
                })
            })
        )
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    private _getItemsByTemplateName(navItems: MowNavigationItem[], templateName: string): MowNavigationItem[] {
        return navItems
            .filter((item) => item.templates?.[templateName])
            .map((item) => {
                return {
                    ...item,
                    type: item.templates?.[templateName],
                    children: item.children ? this._getItemsByTemplateName(item.children, templateName) : [],
                }
            })
    }

    private _cleanNavigationItem(navItems: MowNavigationItem[]): MowNavigationItem[] {
        return navItems.map((item) => {
            return {
                ...item,
                active: false,

                // Se non è presente l'icona, ma è presente la classe icon, allora usa l'icona di default
                // altrimenti non mettere nessuna icona
                // Questo fintone serve per far stampare l'elemento "mat-icon" senza triggerare l'errore, l'icona di FontAwesome
                // sostituisce quella di material
                icon: item.icon || (!!item.classes?.icon ? 'heroicons_outline:exclamation-triangle' : null),

                // Converti l'array di queryParams in un oggetto con chiave: valore
                queryParams: item.queryParams?.reduce((a, param) => {
                    return {
                        ...a,
                        [param.key]: param.value,
                    }
                }, {}),
                children: item.children ? this._cleanNavigationItem(item.children) : [],
            }
        })
    }
}
