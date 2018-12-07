import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service'; 
import { Contact } from './../shared/contact';   
import { ToastrService } from 'ngx-toastr';      

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.css']
})
export class ListContactComponent implements OnInit {
  p: number = 1;                      
  Contact: Contact[];                 
  hideWhenNoContact: boolean = false; 
  noData: boolean = false;            
   

  constructor(
    public crudApi: CrudService, // Inject Contact CRUD services in constructor.
    public toastr: ToastrService
  ) { }

  ngOnInit() {
    this.dataState(); // Initialize Contact's list, when component is ready
    let s = this.crudApi.GetContactsList(); 
    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.Contact = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.Contact.push(a as Contact);
      })
    })
  }

  // Using valueChanges() method to fetch simple list of Contacts data. It updates the state of hideWhenNoContact, noData & preLoader variables when any changes occurs in Contact data list in real-time.
  dataState() {     
    this.crudApi.GetContactsList().valueChanges().subscribe(data => {
      if(data.length <= 0){
        this.hideWhenNoContact = false;
        this.noData = true;
      } else {
        this.hideWhenNoContact = true;
        this.noData = false;
      }
    })
  }

  // Method to delete Contact object
  deleteContact(contact) {
    if (window.confirm('Are sure you want to delete this contact ?')) { // Page prompt before deleting
      this.crudApi.DeleteContact(contact.$key) // Deletes contact based on key value
      this.toastr.success(contact.name + ' successfully deleted!'); // Message will pop up when contact has been deleted
    }
  }}