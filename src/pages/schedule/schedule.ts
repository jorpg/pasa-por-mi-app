import {Component, ViewChild} from '@angular/core';

import {
    AlertController,
    App,
    List,
    NavController,
    ToastController,
    LoadingController,
    Refresher, Events
} from 'ionic-angular';

/*
  To learn how to use third party libs in an
  Ionic app check out our docs here: http://ionicframework.com/docs/v2/resources/third-party-libs/
*/
import * as moment from 'moment';

import {ConferenceData} from '../../providers/conference-data';
import {UserData} from '../../providers/user-data';

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
    mainToggle = true;
    trips: any[] = [];

    constructor(public alertCtrl: AlertController,
                public app: App,
                public loadingCtrl: LoadingController,
                public navCtrl: NavController,
                public toastCtrl: ToastController,
                public confData: ConferenceData,
                public user: UserData,
                public storage: Storage,
                private tripService: TripService,
                private events: Events) {
        this.storage.set("token", "ed22b859c305a5577c532fd73fa5578fff084dc9");
        Config.token = "ed22b859c305a5577c532fd73fa5578fff084dc9";
        this.events.subscribe("trip:created", () => {
            if (this.mainToggle) {
                this.loadDemandsTrips();
            } else {
                this.loadOffersTrips();
            }
        });
    }

    ionViewDidLoad() {
        this.app.setTitle('Viajes');
        this.loadDemandsTrips();
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
                title: 'Error al intentar crear',
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
            this.trips = res;
            loading.dismiss();
        }, error => {
            console.error(`${this.TAG}:loadTrips:tripService:`, JSON.stringify(error));
            this.alertCtrl.create({
                title: 'Error al intentar crear',
                subTitle: String(error),
                buttons: ['OK']
            }).present();
        });

    }

    mainToggleChanged() {
        console.log(`${this.TAG}:mainToggleChanged:`, this.mainToggle);
        if (this.mainToggle) {
            this.title = "Ofertas";
            this.loadDemandsTrips();
        } else {
            this.title = "Solicitudes";
            this.loadOffersTrips();
        }
        this.mainToggle = !this.mainToggle
    }

    detail(trip: any) {
        this.storage.set("trip", trip);
        this.navCtrl.push(SessionDetailPage);
    }


    doRefresh(refresher: Refresher) {
        this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
            this.shownSessions = data.shownSessions;
            this.groups = data.groups;

            // simulate a network request that would take longer
            // than just pulling from out local json file
            setTimeout(() => {
                refresher.complete();

                const toast = this.toastCtrl.create({
                    message: 'Sessions have been updated.',
                    duration: 3000
                });
                toast.present();
            }, 1000);
        });
    }
}
