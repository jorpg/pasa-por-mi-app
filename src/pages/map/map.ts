import {Component} from '@angular/core';
import {VehiclesService} from "../../providers/car.service";
import {AlertController} from "ionic-angular";
import {Storage} from "@ionic/storage";

// import { LoginService } from '../../providers/conference-data';
//
// import { Platform } from 'ionic-angular';
//
//
// declare var google: any;


@Component({
    selector: 'page-map',
    templateUrl: 'map.html'
})
export class MapPage {
    private readonly TAG = MapPage.name;

    title = "Nueva Solicitud de Viaje";
    mainToggle = true;
    vehicles = [];

    public constructor(private vehiclesService: VehiclesService,
                       private alertCtrl: AlertController,
                       public storage: Storage) {
        this.storage.set("token", "ed22b859c305a5577c532fd73fa5578fff084dc9");
    }

    ngOnInit() {
        this.vehiclesService.list().subscribe(data => {
            this.vehicles = data;
        }, error => {
            console.error(`${this.TAG}:ngOnInit:vehiclesService:`, JSON.stringify(error));
            this.alertCtrl.create({
                title: 'Error al intentar traer tus vehiculos registrados',
                subTitle: String(error),
                buttons: ['OK']
            }).present();
        });
    }

    mainToggleChanged() {
        console.log(`${this.TAG}:mainToggleChanged:`, this.mainToggle);
        if (this.mainToggle) {
            this.title = "Nueva Oferta de Viaje";
        } else {
            this.title = "Nueva Solicitud de Viaje";
        }
        this.mainToggle = !this.mainToggle
    }

    // @ViewChild('mapCanvas') mapElement: ElementRef;
    // constructor(public confData: LoginService, public platform: Platform) {
    // }

    // ionViewDidLoad() {
    //
    //     this.confData.getMap().subscribe((mapData: any) => {
    //       let mapEle = this.mapElement.nativeElement;
    //
    //       let map = new google.maps.Map(mapEle, {
    //         center: mapData.find((d: any) => d.center),
    //         zoom: 16
    //       });
    //
    //       mapData.forEach((markerData: any) => {
    //         let infoWindow = new google.maps.InfoWindow({
    //           content: `<h5>${markerData.name}</h5>`
    //         });
    //
    //         let marker = new google.maps.Marker({
    //           position: markerData,
    //           map: map,
    //           title: markerData.name
    //         });
    //
    //         marker.addListener('click', () => {
    //           infoWindow.open(map, marker);
    //         });
    //       });
    //       //
    //       // google.maps.event.addListenerOnce(map, 'idle', () => {
    //       //   mapEle.classList.add('show-map');
    //       // });
    //
    //     });


}
