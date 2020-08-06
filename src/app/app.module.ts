// Angular
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

// Redux
import { AuthEffects } from 'src/store/effects/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from 'src/store/reducers';
import { StoreModule } from '@ngrx/store';

// Ionic
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

// Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginPage } from './login/login.page';
import { WelcomePage } from './welcome/welcome.page';

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    WelcomePage
  ],
  entryComponents: [],
  imports: [
    AppRoutingModule,
    BrowserModule,
    IonicModule.forRoot(),
    EffectsModule.forRoot([
      AuthEffects
    ]),
    HttpClientModule,
    StoreModule.forRoot(reducer),
    TranslateModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
