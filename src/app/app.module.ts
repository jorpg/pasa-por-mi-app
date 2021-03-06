import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {NgModule, ErrorHandler} from '@angular/core';

import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';

import {InAppBrowser} from '@ionic-native/in-app-browser';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Facebook} from '@ionic-native/facebook';

import {IonicStorageModule} from '@ionic/storage';

import {ConferenceApp} from './app.component';

import {AboutPage} from '../pages/about/about';
import {PopoverPage} from '../pages/about-popover/about-popover';
import {AccountPage} from '../pages/account/account';
import {LoginPage} from '../pages/login/login';
import {MapPage} from '../pages/map/map';
import {SchedulePage} from '../pages/schedule/schedule';
import {ScheduleFilterPage} from '../pages/schedule-filter/schedule-filter';
import {SessionDetailPage} from '../pages/session-detail/session-detail';
import {SignupPage} from '../pages/signup/signup';
import {SpeakerDetailPage} from '../pages/speaker-detail/speaker-detail';
import {SpeakerListPage} from '../pages/speaker-list/speaker-list';
import {TabsPage} from '../pages/tabs-page/tabs-page';
import {TutorialPage} from '../pages/tutorial/tutorial';
import {SupportPage} from '../pages/support/support';

import {ConferenceData} from '../providers/conference-data';
import {UserData} from '../providers/user-data';
import {ProfilePage} from "../pages/profile/profile";
import {CreatedTripsPage} from "../pages/created-trips/created-trips";
import {LoginService} from "../providers/login.service";
import {TripService} from "../providers/trip.service";
import {VehiclesService} from "../providers/car.service";


@NgModule({
    declarations: [
        ConferenceApp,
        AboutPage,
        CreatedTripsPage,
        ProfilePage,
        AccountPage,
        LoginPage,
        MapPage,
        PopoverPage,
        SchedulePage,
        ScheduleFilterPage,
        SessionDetailPage,
        SignupPage,
        SpeakerDetailPage,
        SpeakerListPage,
        TabsPage,
        TutorialPage,
        SupportPage
    ],
    imports: [
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(ConferenceApp, {}, {
            links: [
                {component: TabsPage, name: 'TabsPage', segment: 'tabs-page'},
                {component: SchedulePage, name: 'Schedule', segment: 'schedule'},
                {component: SessionDetailPage, name: 'SessionDetail', segment: 'sessionDetail'},
                {component: ScheduleFilterPage, name: 'ScheduleFilter', segment: 'scheduleFilter'},
                {component: SpeakerListPage, name: 'SpeakerList', segment: 'speakerList'},
                {component: SpeakerDetailPage, name: 'SpeakerDetail', segment: 'speakerDetail/:speakerId'},
                {component: MapPage, name: 'Map', segment: 'map'},
                {component: AboutPage, name: 'About', segment: 'about'},
                {component: CreatedTripsPage, name: 'MisViajes', segment: 'mis-viajes'},
                {component: ProfilePage, name: 'Perfil', segment: 'profile'},
                {component: TutorialPage, name: 'Tutorial', segment: 'tutorial'},
                {component: SupportPage, name: 'SupportPage', segment: 'support'},
                {component: LoginPage, name: 'LoginPage', segment: 'login'},
                {component: AccountPage, name: 'AccountPage', segment: 'account'},
                {component: SignupPage, name: 'SignupPage', segment: 'signup'}
            ]
        }),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        ConferenceApp,
        AboutPage,
        CreatedTripsPage,
        ProfilePage,
        AccountPage,
        LoginPage,
        MapPage,
        PopoverPage,
        SchedulePage,
        ScheduleFilterPage,
        SessionDetailPage,
        SignupPage,
        SpeakerDetailPage,
        SpeakerListPage,
        TabsPage,
        TutorialPage,
        SupportPage
    ],
    providers: [
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        ConferenceData,
        LoginService,
        TripService,
        VehiclesService,
        UserData,
        InAppBrowser,
        SplashScreen,
        Facebook,
    ]
})
export class AppModule {
}
