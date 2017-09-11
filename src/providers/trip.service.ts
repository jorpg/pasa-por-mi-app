import {Injectable} from '@angular/core';

import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {BaseService} from "./base.service";
import {Config} from "../app/config";


@Injectable()
export class TripService extends BaseService {
    data: any;

    constructor(public http: Http) {
        super();
    }

    listDemands() {
        const token = Config.token;
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append('Authorization', `Token ${token}`);

        return this.http
            .get(`${Config.API_URL}demands/`, {headers})
            .catch((e) => this.handleErrors(e))
            .map(res => this.extractData(res));
    }

    listOffers() {
        const token = Config.token;
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append('Authorization', `Token ${token}`);

        return this.http
            .get(`${Config.API_URL}offers/`, {headers})
            .catch((e) => this.handleErrors(e))
            .map(res => this.extractData(res));
    }

    listMyDemands() {
        const token = Config.token;
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append('Authorization', `Token ${token}`);

        return this.http
            .get(`${Config.API_URL}my-demands/`, {headers})
            .catch((e) => this.handleErrors(e))
            .map(res => this.extractData(res));
    }

    listMyOffers() {
        const token = Config.token;
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append('Authorization', `Token ${token}`);

        return this.http
            .get(`${Config.API_URL}my-offers/`, {headers})
            .catch((e) => this.handleErrors(e))
            .map(res => this.extractData(res));
    }

    listPendingDemands() {
        const token = Config.token;
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append('Authorization', `Token ${token}`);

        return this.http
            .get(`${Config.API_URL}my-demands/?status=Re`, {headers})
            .catch((e) => this.handleErrors(e))
            .map(res => this.extractData(res));
    }

    listPendingOffers() {
        const token = Config.token;
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append('Authorization', `Token ${token}`);

        return this.http
            .get(`${Config.API_URL}my-offers/`, {headers})
            .catch((e) => this.handleErrors(e))
            .map(res => this.extractData(res));
    }

    createOffer(data: any) {
        const token = Config.token;
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append('Authorization', `Token ${token}`);

        return this.http
            .post(`${Config.API_URL}my-offers/?status=Re`, data, {headers})
            .catch((e) => this.handleErrors(e))
            .map(res => this.extractData(res));
    }

    create(data: any) {
        const token = Config.token;
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append('Authorization', `Token ${token}`);

        return this.http
            .post(`${Config.API_URL}my-demands/`, data, {headers})
            .catch((e) => this.handleErrors(e))
            .map(res => this.extractData(res));
    }

    requestSeat(offer: any, text: string) {
        const token = Config.token;
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append('Authorization', `Token ${token}`);

        return this.http
            .post(`${Config.API_URL}offers/${offer.id}/request/`, {text}, {headers})
            .catch((e) => this.handleErrors(e))
            .map(res => this.extractData(res));
    }

}
