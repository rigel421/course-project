import { Injectable } from '@angular/core';
import { Contact } from '../shared/contact'; 
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database'; 

@Injectable({
  providedIn: 'root'
})

export class CrudService {
  contactsRef: AngularFireList<any>;   
  contactRef: AngularFireObject<any>;   
  

  constructor(private db: AngularFireDatabase) { }

  // Create Contact object
  AddContact(contact: Contact) {
    this.contactsRef.push({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    })
  }

  // Retrieve a single contact object
  GetContact(id: string) {
    this.contactRef = this.db.object('contacts-list/' + id);
    return this.contactRef;
  }

  // Retrieve entire list of contacts
  GetContactsList() {
    this.contactsRef = this.db.list('contacts-list');
    return this.contactsRef;
  }  

  // Update Contact object
  UpdateContact(contact: Contact) {
    this.contactRef.update({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    })
  }  

  // Delete Contact object
  DeleteContact(id: string) { 
    this.contactRef = this.db.object('contacts-list/'+id);
    this.contactRef.remove();
  }
  
}