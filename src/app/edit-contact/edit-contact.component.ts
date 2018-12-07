import {Component, OnInit, AfterViewInit} from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {CrudService} from '../shared/crud.service';
import {ActivatedRoute,Router} from "@angular/router"; 
import {Location} from '@angular/common'; 
import {ToastrService} from 'ngx-toastr';

@Component({
   selector: 'app-edit-contact',
   templateUrl: './edit-contact.component.html',
   styleUrls: ['./edit-contact.component.css']
})

export class EditContactComponent implements OnInit {

   editForm: FormGroup;

   constructor(
      private crudApi: CrudService, 
      private fb: FormBuilder, 
      private location: Location, 
      private actRoute: ActivatedRoute, 
      private router: Router,
      private toastr: ToastrService
   ) {}

   ngOnInit() {
      this.updateContactData();
      const id = this.actRoute.snapshot.paramMap.get('id');
      this.crudApi.GetContact(id).valueChanges().subscribe(data => {
         this.editForm.setValue(data)
      })
   }

   get name() {
      return this.editForm.get('name');
   }
   get email() {
      return this.editForm.get('email');
   }
   get phone() {
      return this.editForm.get('phone');
   }

   updateContactData() {
      this.editForm = this.fb.group({
         name: ['', [Validators.required, Validators.minLength(2)]],
         email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
         phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
      })
   }

   // Defining goBack function
   goBack() {
      this.location.back();
   }

   // Below methods fire when somebody click on submit button
   updateForm() {
      this.crudApi.UpdateContact(this.editForm.value);
      this.toastr.success(this.editForm.controls['name'].value + ' updated successfully'); // Show succes message when data is successfully submited
      this.router.navigate(['view-contacts']); // Returns you to contact's list page when contact data is updated
   }
}