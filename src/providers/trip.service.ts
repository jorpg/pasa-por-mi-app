import {Injectable} from '@angular/core';

import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {BaseService} from "./base.service";
import {Storage} from "@ionic/storage";
import {Config} from "../app/config";


@Injectable()
export class TripService extends BaseService {
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
            .get(`${Config.API_URL}mobile/accounts/signup-facebook/`, {headers})
            .catch((e) => this.handleErrors(e))
            .map(res => this.extractData(res));
    }

    processData(data: any) {
        // just some good 'ol JS fun with objects and arrays
        // build up the data by linking speakers to sessions
        this.data = data.json();

        this.data.tracks = [];

        // loop through each day in the schedule
        this.data.schedule.forEach((day: any) => {
            // loop through each timeline group in the day
            day.groups.forEach((group: any) => {
                // loop through each session in the timeline group
                group.sessions.forEach((session: any) => {
                    session.speakers = [];
                    if (session.speakerNames) {
                        session.speakerNames.forEach((speakerName: any) => {
                            let speaker = this.data.speakers.find((s: any) => s.name === speakerName);
                            if (speaker) {
                                session.speakers.push(speaker);
                                speaker.sessions = speaker.sessions || [];
                                speaker.sessions.push(session);
                            }
                        });
                    }

                    if (session.tracks) {
                        session.tracks.forEach((track: any) => {
                            if (this.data.tracks.indexOf(track) < 0) {
                                this.data.tracks.push(track);
                            }
                        });
                    }
                });
            });
        });

        return this.data;
    }

    filterSession(session: any, queryWords: string[], excludeTracks: any[], segment: string) {

        let matchesQueryText = false;
        if (queryWords.length) {
            // of any query word is in the session name than it passes the query test
            queryWords.forEach((queryWord: string) => {
                if (session.name.toLowerCase().indexOf(queryWord) > -1) {
                    matchesQueryText = true;
                }
            });
        } else {
            // if there are no query words then this session passes the query test
            matchesQueryText = true;
        }

        // if any of the sessions tracks are not in the
        // exclude tracks then this session passes the track test
        let matchesTracks = false;
        session.tracks.forEach((trackName: string) => {
            if (excludeTracks.indexOf(trackName) === -1) {
                matchesTracks = true;
            }
        });

        // if the segement is 'favorites', but session is not a user favorite
        // then this session does not pass the segment test
        let matchesSegment = false;
        if (segment === 'favorites') {
            matchesSegment = true;
        } else {
            matchesSegment = true;
        }

        // all tests must be true if it should not be hidden
        session.hide = !(matchesQueryText && matchesTracks && matchesSegment);
    }

}
