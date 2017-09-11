import {Component} from '@angular/core';
import {AlertController, Events, IonicPage, NavController} from 'ionic-angular';

import {Storage} from "@ionic/storage";
import {TripService} from "../../providers/trip.service";
import {Config} from "../../app/config";
import {ViewController} from 'ionic-angular';

@IonicPage({
    segment: 'session/:sessionId'
})
@Component({
    selector: 'page-session-detail',
    templateUrl: 'session-detail.html'
})
export class SessionDetailPage {
    private readonly TAG = SessionDetailPage.name;
    session: any;
    trip: any = {
        departure_date: "",
        departure_address: {
            text: ""
        },
        arrival_address: {
            text: ""
        },
    };

    constructor(private storage: Storage,
                public navCtrl: NavController,
                private tripService: TripService,
                private alertCtrl: AlertController,
                private events: Events,
                private viewCtrl: ViewController) {
        console.log(`${this.TAG}:`, JSON.stringify(this.trip));
        Config.token = "ed22b859c305a5577c532fd73fa5578fff084dc9";
        this.storage.get("trip").then(trip => {
            this.trip = trip;
        });
    }


    request() {
        let alert = this.alertCtrl.create({
            title: 'Solicitar',
            inputs: [
                {
                    name: 'text',
                    placeholder: 'Comentario'
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: () => {
                    }
                },
                {
                    text: 'Solicitar',
                    handler: data => {
                        this.tripService.requestSeat(this.trip, data.text).subscribe((res) => {
                            console.log(`${this.TAG}:request:Solicitar:`, JSON.stringify(res));
                            this.events.publish("trip:created");
                            this.viewCtrl.dismiss().then(() => {
                                this.events.publish("trip:requested");
                            });
                        }, error => {
                            console.error(`${this.TAG}:request:Solicitar:`, JSON.stringify(error));
                        })
                    }
                }
            ]
        });
        alert.present();
    }
}
