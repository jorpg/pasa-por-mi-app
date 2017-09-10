import {Injectable} from '@angular/core';

import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {BaseService} from "./base.service";
import {Storage} from "@ionic/storage";
import {Config} from "../app/config";


@Injectable()
export class VehiclesService extends BaseService {
    data: any;

    constructor(public http: Http, private storage: Storage) {
        super();
    }

    list() {
        const token = this.storage.get("token")
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append('Authorization', `Token ${token}`);

        return this.http
            .get(`${Config.API_URL}/my-vehicles/`, {headers})
            .catch((e) => this.handleErrors(e))
            .map(res => this.extractData(res));
    }

}
