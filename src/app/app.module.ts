// Angular
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AuthInterceptor } from '../interceptors/auth.interceptor';

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterPage } from './register/register';
import { CustomTranslationLoader } from 'src/factories/translation-loader.factory';


@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    RegisterPage,
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
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducer),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: { provide: TranslateLoader, useClass: CustomTranslationLoader }
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
