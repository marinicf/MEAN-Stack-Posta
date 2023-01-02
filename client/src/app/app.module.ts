import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';
import { HttpClientModule } from '@angular/common/http';
import { PostaListComponent } from './components/posta-list/posta-list.component';
import { PostaItemComponent } from './components/posta-item/posta-item.component';
import { PostaDetailComponent } from './components/posta-detail/posta-detail.component';
import { FilterPipe } from './filter.pipe'
import { AgmCoreModule } from '@agm/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PipeTest } from './pipetest.pipe';
import { PathComponent } from './components/path/path.component'
import { JwtModule } from '@auth0/angular-jwt';
import { LoadingSpinerComponent } from './components/loading-spiner/loading-spiner.component';
import { PostaComponent } from './components/posta/posta.component';
import { PostaStartComponent } from './components/posta-start/posta-start.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'


export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    MapComponent,
    PostaListComponent,
    PostaItemComponent,
    PostaDetailComponent,
    FilterPipe,
    PipeTest,
    PathComponent,
    LoadingSpinerComponent,
    PostaComponent,
    PostaStartComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyBffQ_0jTAEiWz6tbf2QCjDarygMcu1Fug',
      libraries: ['places', 'drawing', 'geometry'],
    }),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
