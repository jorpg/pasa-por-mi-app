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

    list() {
        const token = Config.token;
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append('Authorization', `Token ${token}`);

        return this.http
            .get(`${Config.API_URL}offers/`, {headers})
            .catch((e) => this.handleErrors(e))
            .map(res => this.extractData(res));
    }

    createOffer(data: any) {
        const token = Config.token;
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append('Authorization', `Token ${token}`);

        return this.http
            .post(`${Config.API_URL}offers/`, data, {headers})
            .catch((e) => this.handleErrors(e))
            .map(res => this.extractData(res));
    }

    create(data: any) {
        const token = Config.token;
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append('Authorization', `Token ${token}`);

        return this.http
            .post(`${Config.API_URL}demands/`, data, {headers})
            .catch((e) => this.handleErrors(e))
            .map(res => this.extractData(res));
    }

}
