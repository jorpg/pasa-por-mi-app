import {Component} from '@angular/core';
import {VehiclesService} from "../../providers/car.service";
import {AlertController, LoadingController} from "ionic-angular";
import {Storage} from "@ionic/storage";
import {Config} from "../../app/config";
import {TripService} from "../../providers/trip.service";

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
    seatsText = "requeridos";
    tripTypeText = "Puestos";
    mainToggle = true;
    vehicles = [];
    selectedVehicle: number;
    departureAddress: any;
    arrivalAddress: any;
    tripDate: String = new Date().toISOString();
    seats: any;
    price: any;
    tripType: any;


    public constructor(private vehiclesService: VehiclesService,
                       private alertCtrl: AlertController,
                       public storage: Storage,
                       public tripService: TripService,
                       public loadingCtrl: LoadingController) {
        this.storage.set("token", "ed22b859c305a5577c532fd73fa5578fff084dc9");
        Config.token = "ed22b859c305a5577c532fd73fa5578fff084dc9";
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
            this.seatsText = "disponibles";
        } else {
            this.title = "Nueva Solicitud de Viaje";
            this.seatsText = "requeridos";
        }
        this.mainToggle = !this.mainToggle
    }

    create() {
        const loading = this.loadingCtrl.create({
            content: 'Creando...'
        });
        loading.present();

        const data = {
            "departure_address": {
                "latitude": "0",
                "longitude": "0",
                "text": `${this.departureAddress}`
            },
            "departure_date": `${this.tripDate}`,
            "arrival_address": {
                "latitude": "0",
                "longitude": "0",
                "text": `${this.arrivalAddress}`
            },
            "vehicle_id": `${this.selectedVehicle}`,
            "seats": `${this.seats}`,
            "condition": `${this.tripType}`,
            "price": `${this.price}`
        };

        if (this.mainToggle) { // Solicitud
            this.tripService.create(data).subscribe(res => {
                console.log(`${this.TAG}:create:`, JSON.stringify(res));
                loading.dismiss();
                this.alertCtrl.create({
                    title: this.mainToggle ? "Solicitud creada" : "Oferta creada",
                    buttons: ['OK']
                }).present();

            }, error => {
                console.error(`${this.TAG}:create:`, JSON.stringify(error));
                loading.dismiss();
                this.alertCtrl.create({
                    title: 'Error al intentar crear',
                    subTitle: String(error),
                    buttons: ['OK']
                }).present();
            });
        } else { //Oferta
            this.tripService.createOffer(data).subscribe(res => {
                console.log(`${this.TAG}:create:`, JSON.stringify(res));
                loading.dismiss();
                this.alertCtrl.create({
                    title: this.mainToggle ? "Solicitud creada" : "Oferta creada",
                    buttons: ['OK']
                }).present();

            }, error => {
                console.error(`${this.TAG}:create:`, JSON.stringify(error));
                loading.dismiss();
                this.alertCtrl.create({
                    title: 'Error al intentar crear',
                    subTitle: String(error),
                    buttons: ['OK']
                }).present();
            });
        }

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
