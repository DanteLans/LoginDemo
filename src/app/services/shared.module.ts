import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { AuthService } from './auth.service';

@NgModule({
    providers: [AuthService, GooglePlus, Facebook]
})
export class SharedModule  {
    static forRoot(): ModuleWithProviders  {
        return {
            ngModule: SharedModule,
        };
    }
}