import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { DynamicIoModule } from 'ng-dynamic-component'
import { NgSelectModule } from '@ng-select/ng-select'
// import { FileUploadModule } from '@iplab/ngx-file-upload'

import { MatButtonModule } from '@angular/material/button'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatMenuModule } from '@angular/material/menu'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core'
import { MatSortModule } from '@angular/material/sort'
import { MatSelectModule } from '@angular/material/select'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatTableModule } from '@angular/material/table'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MAT_DATE_LOCALE } from '@angular/material/core'
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker'

import { MowAlertModule } from 'app/components/alert'
import { MowEditorModule } from 'app/components/editor'
import { ModalModule } from 'app/components/modal'
import { UploadModule } from 'app/components/upload'
import { MatDialogModule } from '@angular/material/dialog'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRippleModule,
        MatSortModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTableModule,
        MatTooltipModule,
        MatDialogModule,
        DynamicIoModule,
        NgSelectModule,
        HttpClientModule,
        MatProgressSpinnerModule,
        NgxMaterialTimepickerModule,

        // Mow Modules
        MowAlertModule,
        MowEditorModule,
        ModalModule,
        UploadModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRippleModule,
        MatSortModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTableModule,
        MatTooltipModule,

        DynamicIoModule,
        NgSelectModule,
        HttpClientModule,
        NgxMaterialTimepickerModule,

        // Mow Modules
        MowAlertModule,
        MowEditorModule,
        ModalModule,
        UploadModule,
    ],
    providers: [{ provide: MAT_DATE_LOCALE, useValue: 'it-IT' }],
})
export class SharedModule {}
