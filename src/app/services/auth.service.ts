import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase';
import { Facebook } from '@ionic-native/facebook/ngx';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authState: boolean ;

  constructor(
    private AFauth: AngularFireAuth,
    private router: Router,
    private google: GooglePlus,
    private facebook: Facebook
  ) {
    /*this.AFauth.authState.subscribe(( authres: firebase.User) => {
      this.authState =  authres === undefined  || this.authState === null ?  false : true;
      console.log('SINGIG OBSERVALE', authres);
    });*/
  }

  get authenticated(): boolean {
    return this.authState;
  }

  get authenStateO() {
    return this.AFauth.authState;
  }

  async loginWithEmail(email: string, password: string): Promise<boolean | string>   {
    try{
      await this.AFauth.signInWithEmailAndPassword(email, password);
      return true;
    }catch (e) {
      console.log(e);
      return this.convertMessage(e);
    }
  }

  async createUserWithEmail(email: string, password: string): Promise<boolean | string>   {
    try{
      await this.AFauth.createUserWithEmailAndPassword(email, password);
      return true;
    }catch (e) {
      return this.convertMessage(e);
    }
  }

  initWithEmail(email: string, password: string, isNew: boolean): Promise<boolean | string>  {
    if ( isNew) {
      return this.createUserWithEmail(email, password);
    } else {
      return this.loginWithEmail(email, password);
    }
  }

  convertMessage(err: any): string {
          switch (err.code) {
                case 'auth/user-disabled': {
                    return 'Sorry your user is disabled.';
                }
                case 'auth/user-not-found': {
                    return 'Sorry user not found.';
                }
                case 'auth/email-already-exists': {
                    return 'Sorry email is already taken';
                }
                case 'auth/email-already-in-use': {
                  return err.message;
                }
                case 'auth/wrong-password': {
                  return 'Sorry, incorrect password entered. Please try again.';
                }
                case 'auth/argument-error': {
                  return err.message;
                }
                case 'auth/invalid-email': {
                  return err.message;
                }
                case 'auth/weak-password' : {
                  return err.message;
                }

                default: {
                    return 'Login error try again later.';
                }
        }
  }

  async logOut() {
    await this.AFauth.signOut();
    this.authState = false;
    this.router.navigate(['home']);
    return;
  }

  async loginWithGoogle(): Promise<boolean | string>  {
    const user = this.AFauth.authState;
    try{
        const res = await this.google.login({
            webClientId:
              '317108198251-to3cr2tadg50at49brano4luguedt18n.apps.googleusercontent.com',
            scopes: 'email',
            offline: true,
        });
        await  this.AFauth.signInWithCredential(auth.GoogleAuthProvider.credential(res.idToken));
        return true;
    }catch (e) {
        return e;
    }
  }

  async loginWithFacebook(): Promise<boolean | string>  {
    try{
      const res = await this.facebook.login(['email', 'public_profile']);
      await this.AFauth.signInWithCredential(auth.FacebookAuthProvider.credential(res.authResponse.accessToken));
      return true;
    }catch (e) {
      return e;
    }
  }
}

