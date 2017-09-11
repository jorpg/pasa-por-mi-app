import {Component} from '@angular/core';

import {
    ActionSheet, AlertController, App,
    Events, LoadingController,
    NavController
} from 'ionic-angular';

import {SessionDetailPage} from '../session-detail/session-detail';

import * as moment from 'moment';
import {TripService} from "../../providers/trip.service";
import {Config} from "../../app/config";
import {Storage} from "@ionic/storage";

@Component({
    selector: 'page-speaker-list',
    templateUrl: 'speaker-list.html'
})
export class SpeakerListPage {
    private readonly TAG = SpeakerListPage.name;
    actionSheet: ActionSheet;
    speakers: any[] = [];
    shownSessions: any = [];
    title = "Solicitudes";
    demandsMode = true;
    trips: any[] = [];

    constructor(private navCtrl: NavController,
                private alertCtrl: AlertController,
                private app: App,
                private loadingCtrl: LoadingController,
                private storage: Storage,
                private tripService: TripService,
                private events: Events) {
        this.storage.set("token", "ed22b859c305a5577c532fd73fa5578fff084dc9");
        Config.token = "ed22b859c305a5577c532fd73fa5578fff084dc9";
        this.events.subscribe("trip:created", () => {
            this.load();
        });
    }

    ionViewDidLoad() {
        this.app.setTitle('Viajes Pendientes');
        this.load();
    }

    private load() {
        if (this.demandsMode) {
            this.loadPendingDemandTrips();
        } else {
            this.loadPendingOffersTrips();
        }
    }

    private loadPendingDemandTrips() {
        const loading = this.loadingCtrl.create({
            content: 'Listando...'
        });
        loading.present();

        this.tripService.listPendingDemands().subscribe(res => {
            console.log(`${this.TAG}:loadTrips:tripService:`, JSON.stringify(res));
            loading.dismiss();
            let tmp = [];
            for (let t of res) {
                let obj = t;
                obj.departure_date = moment(obj.departure_date).format('YYYY MM DD');
                tmp.push(obj);
            }
            this.trips = tmp;
        }, error => {
            console.error(`${this.TAG}:loadTrips:tripService:`, JSON.stringify(error));
            this.alertCtrl.create({
                title: 'Error al listar la información',
                subTitle: String(error),
                buttons: ['OK']
            }).present();

        });

    }

    private loadPendingOffersTrips() {
        const loading = this.loadingCtrl.create({
            content: 'Listando...'
        });
        loading.present();

        this.tripService.listPendingOffers().subscribe(res => {
            console.log(`${this.TAG}:loadTrips:tripService:`, JSON.stringify(res));
            loading.dismiss();
            let tmp = [];
            for (let t of res) {
                let obj = t;
                obj.departure_date = moment(obj.departure_date).format('YYYY MM DD');
                tmp.push(obj);
            }
            this.trips = tmp;
        }, error => {
            console.error(`${this.TAG}:loadTrips:tripService:`, JSON.stringify(error));
            this.alertCtrl.create({
                title: 'Error al listar la información',
                subTitle: String(error),
                buttons: ['OK']
            }).present();
        });

    }

    mainToggleChanged() {
        console.log(`${this.TAG}:mainToggleChanged:`, this.demandsMode);
        if (this.demandsMode) {
            this.title = "Ofertas";
        } else {
            this.title = "Solicitudes";
        }
        this.demandsMode = !this.demandsMode
        this.load();
    }

    detail(trip: any) {
        this.storage.set("trip", trip);
        this.navCtrl.push(SessionDetailPage);
    }

    doRefresh() {
        this.load();
    }

}
