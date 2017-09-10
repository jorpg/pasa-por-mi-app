import {Component} from '@angular/core';

import {NavParams} from 'ionic-angular';

import {MapPage} from '../map/map';
import {SchedulePage} from '../schedule/schedule';
import {SpeakerListPage} from '../speaker-list/speaker-list';
import {ProfilePage} from "../profile/profile";
import {CreatedTripsPage} from "../created-trips/created-trips";

@Component({
    templateUrl: 'tabs-page.html'
})
export class TabsPage {
    // set the root pages for each tab
    tab1Root: any = SchedulePage;
    tab2Root: any = SpeakerListPage;
    tab3Root: any = MapPage;
    tab4Root: any = CreatedTripsPage;
    tab5Root: any = ProfilePage;
    mySelectedIndex: number;

    constructor(navParams: NavParams) {
        this.mySelectedIndex = navParams.data.tabIndex || 0;
    }

}
