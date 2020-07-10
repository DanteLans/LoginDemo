import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  email: string;
  password: string;
  newUser = false;
  constructor(private auth: AuthService, private router: Router, private toastController: ToastController) {}

  async signInWithGoogle() {
    const res = await this.auth.loginWithGoogle();
    this.redirect(res);
  }

  async singInWithFacebook(){
    const res = await this.auth.loginWithFacebook();
    this.redirect(res);
  }

  async initWithEmail() {
    const res = await this.auth.initWithEmail(this.email, this.password, this.newUser);
    this.redirect(res);
  }

  redirect(result: boolean | string) {
    console.log(result);
    if (result === true) {
      this.auth.authState = true;
      this.router.navigate(['info']);
      this.email = '';
      this.password = '';
    } else {
      this.presentToast(result as string);
    }
  }

  async presentToast(msm: string) {
    const toast = await this.toastController.create({
      message: msm,
      duration: 2000
    });
    toast.present();
  }



}
