import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    Output,
    ViewEncapsulation,
    EventEmitter,
    Input,
    ViewChild,
    ElementRef,
    AfterViewInit
} from '@angular/core'
import { fuseAnimations } from '@fuse/animations'
import  * as L from 'leaflet';
import 'mapbox-gl-leaflet';

@Component({
    selector: 'form-point',
    templateUrl: './point.component.html',
    styleUrls: ['./point.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    animations: fuseAnimations,
    exportAs: 'form-point',
})
export class PointComponent implements OnInit, AfterViewInit {
    private map: L.Map;
    protected currentCenter: any[];
    @ViewChild('map')
    private mapContainer: ElementRef<HTMLElement>;

    @Input() pointer: any[];
    @Input() center: any[];
    @Input() zoom: number = 6;
    @Output() readonly setLocation: EventEmitter<any> = new EventEmitter<any>()


    constructor() {}
    /**
     * On init
     */
    ngOnInit(): void {
    }

    ngAfterViewInit() {
        this.currentCenter = [this.center ? this.center[0] : 11.324886314955837, this.center ? this.center[1] : 43.96607831958842, ];
        const initialState = {
          lng: this.currentCenter[0],
          lat: this.currentCenter[1],
          zoom: this.zoom
        };
    
        const map = new L.Map(this.mapContainer.nativeElement).setView(
          [initialState.lat, initialState.lng],
          initialState.zoom
        );

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        let marker = L.marker([this.pointer ? this.pointer[1] : this.currentCenter[1], this.pointer ? this.pointer[0] : this.currentCenter[0]], {
            draggable: true,
            autoPan: true
          });
          
          marker.on('dragend', (event) => {
            let marker = event.target;
            let location = marker.getLatLng();
            let lat = location.lat;
            let lon = location.lng;
            this.setLocation.emit({lat,lon});
        });

        marker.addTo(map);
    
      }
   
}
