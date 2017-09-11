import {Component, ViewChild} from '@angular/core';

import {
    AlertController,
    App,
    List,
    NavController,
    LoadingController,
    Events
} from 'ionic-angular';

/*
  To learn how to use third party libs in an
  Ionic app check out our docs here: http://ionicframework.com/docs/v2/resources/third-party-libs/
*/
import * as moment from 'moment';

import {SessionDetailPage} from '../session-detail/session-detail';
import {Storage} from "@ionic/storage";
import {Config} from "../../app/config";
import {TripService} from "../../providers/trip.service";


@Component({
    selector: 'page-schedule',
    templateUrl: 'schedule.html'
})
export class SchedulePage {
    private readonly TAG = SchedulePage.name;
    // the list is a child of the schedule page
    // @ViewChild('scheduleList') gets a reference to the list
    // with the variable #scheduleList, `read: List` tells it to return
    // the List and not a reference to the element
    @ViewChild('scheduleList', {read: List}) scheduleList: List;

    dayIndex = 0;
    queryText = '';
    segment = 'all';
    excludeTracks: any = [];
    shownSessions: any = [];
    groups: any = [];
    confDate: string;

    title = "Solicitudes";
    demandsMode = true;
    trips: any[] = [];

    constructor(private alertCtrl: AlertController,
                private app: App,
                private loadingCtrl: LoadingController,
                private navCtrl: NavController,
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
        this.app.setTitle('Viajes');
        this.load();
    }

    private load() {
        if (this.demandsMode) {
            this.loadDemandsTrips();
        } else {
            this.loadOffersTrips();
        }
    }

    private loadDemandsTrips() {
        const loading = this.loadingCtrl.create({
            content: 'Listando...'
        });
        loading.present();

        this.tripService.listDemands().subscribe(res => {
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

    private loadOffersTrips() {
        const loading = this.loadingCtrl.create({
            content: 'Listando...'
        });
        loading.present();

        this.tripService.listOffers().subscribe(res => {
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
