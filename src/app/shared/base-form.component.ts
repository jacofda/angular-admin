import { ChangeDetectorRef, Component, Injectable, Input, ViewChild } from '@angular/core';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { catchError, debounceTime, distinctUntilChanged, firstValueFrom, map, merge, Observable, of, startWith, Subject, switchMap, takeUntil } from 'rxjs'
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { confirmationOptions } from 'app/shared/confirmations/popoup'
import { environment } from 'environments/environment';

@Component({
    selector   : 'base-form',
    template: ''
})
export class BaseFormComponent
{
    @Input() child: boolean = false;
    @Input() id: string;
    @Input() close: Function;

    public isLoading: boolean = false;
    public form: FormGroup;
    public item: any;
    public scheme: string = 'light'
    public isCreate: boolean = this.router.url.includes('/create');
    public cdn: string = environment.cdn
    protected _unsubscribeAll: Subject<any> = new Subject<any>()
    protected _service: any;
    protected baseUrl: string = '';

    constructor( 
        protected location: Location,
        protected _fuseConfirmationService: FuseConfirmationService,
        protected router: Router,
        protected _changeDetectorRef: ChangeDetectorRef
    )
    {}

     /**
     * On destroy
     */
     ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null)
        this._unsubscribeAll.complete()
    }

    /**
     * Submit generico
     */
    public submit(continua = false): void {
        !((!this.child && !this.isCreate)|| (this.child && this.id)) ? this.onSubmitCreate(continua) : this.onSubmitUpdate(continua)
    }

    /**
     * Submit di creazione
     * @returns 
     */
    public onSubmitCreate(continua = false): void {
        this.form.markAllAsTouched();
        this.form.updateValueAndValidity();
        this._changeDetectorRef.markForCheck()

        if (this.form.invalid) {
            // Mark for check
            return
        }
        const formData: any = this.form.value
        this._service.create(formData).subscribe((response: any) => {
            const confirmation = this._fuseConfirmationService.open(confirmationOptions);
            if(continua) { 
                // sostiriusco il create con l'id del nuovo elemento
                this.router.navigateByUrl(this.router.url.replace('create', response.id))
                return;
            }
            !this.child ? confirmation.afterClosed().subscribe(() => this.router.navigateByUrl(this.baseUrl)) : this.close();
        })
    }

    /**
     * Submit di edit
     * @returns 
     */
    public onSubmitUpdate(continua = false): void {
        this.form.markAllAsTouched();
        this.form.updateValueAndValidity();
        this._changeDetectorRef.markForCheck()

        if (this.form.invalid) {
            return
        }
        const formData: any = this.form.value

        confirmationOptions.title = 'Contenuto aggiornato'
        confirmationOptions.message = 'Aggiornamento contenuto avvenuto con successo!'

        this._service.update(this.item.id, formData).subscribe((response: any) => {
            const confirmation = this._fuseConfirmationService.open(confirmationOptions);
            if(continua) { 
                return;
            }
            !this.child ? confirmation.afterClosed().subscribe(() => this.router.navigateByUrl(this.baseUrl)) : this.close();
        })
    }

    public async selectFormSearch(func: Observable<any>): Promise<any> {
        return await firstValueFrom(func);
    }

    public goToBack(): void {
        this.child ? this.close() : this.location.back();
    }
}
