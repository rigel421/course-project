import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms'; 

import { NgxPaginationModule } from 'ngx-pagination';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { ListContactComponent } from './list-contact/list-contact.component';

@NgModule({
  declarations: [
    AppComponent,
    AddContactComponent,
    EditContactComponent,
    ListContactComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
