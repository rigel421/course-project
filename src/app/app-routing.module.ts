import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Use RouterModule, Routes for activating routing in angular
import { RouterModule, Routes } from '@angular/router';

// Include components for in which router service to be used
import { AddContactComponent } from './add-contact/add-contact.component';
import { ListContactComponent } from './list-contact/list-contact.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';

const routes: Routes = [
  { path: '', redirectTo: '/create-contact', pathMatch: 'full' },
  { path: 'create-contact', component: AddContactComponent },
  { path: 'view-contacts', component: ListContactComponent },
  { path: 'edit-contact/:id', component: EditContactComponent }
];

// Import RouterModule and inject routes array in it and dont forget to export the RouterModule
@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }