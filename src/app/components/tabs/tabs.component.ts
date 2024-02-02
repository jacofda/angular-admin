import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy } from '@angular/core'
import { TabsService } from './tabs.service'
import { Tab } from 'app/shared/types/tabs';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
    selector: 'tabs-component',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class TabsComponent implements OnInit, OnDestroy {

    @Input() activeTab: Tab = null;
    @Input() tabs: Array<Tab> = [];

    public tabs$: Observable<Array<Tab>> = this.tabsService.tabs$;

    constructor(private tabsService: TabsService, private element: ElementRef) {}

    ngOnInit() {
        this.tabsService.tabs = this.tabs;
    }

    ngOnDestroy() {
       
    }

    public onTabSelect(activeTab: Tab | null) {
        this.activeTab = activeTab;
    }

    public isActive(tab: Tab): boolean {
        return tab === this.activeTab;
    }

    selectCompareTabsWith(tab1: Tab | null, tab2: Tab | null): boolean {
        return (tab1?.title == tab2?.title);
    }
}
