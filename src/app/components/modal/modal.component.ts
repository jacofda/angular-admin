import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy } from '@angular/core'
import { ModalService } from 'app/components/modal/modal.service'
import { isArray } from 'lodash'

@Component({
    selector: 'mow-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit, OnDestroy {
    @Input() id?: string
    @Input() title?: string
    @Input() scheme?: string
    @Input() showFooter?: boolean = false
    @Input() dynamicComponent?: any
    @Input() bind?: any
    @Input() size?: string
    @Input() notitle?: boolean = false

    public background: string = 'bg-light'
    public isOpen = false

    constructor(private modalService: ModalService, private element: ElementRef) {}

    eventFn = (el) => {
        if (isArray(el.target.className) && el.target.className.includes('mow-modal-backdrop')) {
            this.close()
        }
    }

    ngOnInit() {
        if (this.scheme === 'auto' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.background = 'dark:bg-dark-800'
        }
        if (this.scheme === 'dark') {
            this.background = 'dark:bg-dark-800'
        }

        // close modal on background click
        this.element.nativeElement.addEventListener('click', this.eventFn)
    }

    ngOnDestroy() {
        this.element.nativeElement.removeEventListener('click', this.eventFn)
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    close() {
        this.modalService.close(this.element.nativeElement.id)
    }
}
