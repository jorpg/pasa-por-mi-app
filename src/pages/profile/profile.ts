import {Component} from '@angular/core';
import {Facebook, FacebookLoginResponse} from "@ionic-native/facebook";
import {LoginService} from "../../providers/login.service";
import {AlertController, LoadingController} from "ionic-angular";
import {Storage} from "@ionic/storage";


@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html'
})
export class ProfilePage {
    protected readonly TAG = ProfilePage.name;

    constructor(private fb: Facebook,
                private loginService: LoginService,
                private alertCtrl: AlertController,
                private storage: Storage,
                public loadingCtrl: LoadingController) {
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
}
