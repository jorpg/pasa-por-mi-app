import {Facebook, FacebookLoginResponse} from "@ionic-native/facebook";
import {LoginService} from "../../providers/login.service";
import {AlertController, LoadingController} from "ionic-angular";
import {Storage} from "@ionic/storage";
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';


@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html'
})
export class ProfilePage {
    protected readonly TAG = ProfilePage.name;
    conferenceDate = '2047-05-17';
    username: string;

    constructor(private fb: Facebook,
                private loginService: LoginService,
                private alertCtrl: AlertController,
                private storage: Storage,
                public loadingCtrl: LoadingController,
                private nav: NavController) {
    }

    ngOnInit() {
    }

    loginWithFacebook() {
        this.fb.login(['public_profile', 'user_friends', 'email'])
            .then((res: FacebookLoginResponse) => {
                console.log(`${this.TAG}:loginWithFacebook:login:`, JSON.stringify(res));
                // Progress Bar
                const loading = this.loadingCtrl.create({
                    content: 'Iniciando Sesión...'
                });
                loading.present();

                this.loginService.loginWithFacebook(res.authResponse.accessToken).subscribe((res) => {
                    console.log(`${this.TAG}:loginWithFacebook:login:loginService:`, JSON.stringify(res));
                    loading.dismiss();
                    this.alertCtrl.create({
                        title: 'Logueado',
                        subTitle: "Ahora puedes comenzar a disfrutar de Pasa Por Mi!",
                        buttons: ['OK']
                    }).present();
                    this.storage.set("token", res.token);
                }, (error) => {
                    console.error(`${this.TAG}:loginWithFacebook:login:loginService:`, JSON.stringify(error));
                    loading.dismiss();
                    this.alertCtrl.create({
                        title: 'Error al intentar loguearse con Facebook',
                        subTitle: String(error),
                        buttons: ['OK']
                    }).present();
                });
            })
            .catch(e => {
                console.error(`${this.TAG}:loginWithFacebook:login:`, JSON.stringify(e));
            });
    }

    ngAfterViewInit() {
        this.getUsername();
    }

    updatePicture() {
        console.log('Clicked to update picture');
    }

    // Present an alert with the current username populated
    // clicking OK will update the username and display it
    // clicking Cancel will close the alert and do nothing
    changeUsername() {
        let alert = this.alertCtrl.create({
            title: 'Change Username',
            buttons: [
                'Cancel'
            ]
        });
        alert.addInput({
            name: 'username',
            value: this.username,
            placeholder: 'username'
        });
        alert.addButton({
            text: 'Ok',
            handler: () => {
                this.getUsername();
            }
        });

        alert.present();
    }

    getUsername() {
    }

    changePassword() {
        console.log('Clicked to change password');
    }

    logout() {
        this.nav.setRoot('LoginPage');
    }

    support() {
        this.nav.push('SupportPage');
    }


    presentPopover() {
    }

}
