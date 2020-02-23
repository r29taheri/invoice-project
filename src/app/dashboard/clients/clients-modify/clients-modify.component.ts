import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Client } from '../../../models/client';
import * as clientsActions from '../store/clients.action';
import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-clients-modify',
  templateUrl: './clients-modify.component.html',
  styleUrls: ['./clients-modify.component.scss']
})
export class ClientsModifyComponent implements OnInit, OnDestroy {
  clientForm: FormGroup;
  @Input() clientInfo: Client;
  @Output() closeModal = new EventEmitter<boolean>();

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.clientForm = new FormGroup({
      fullName: new FormControl(this.clientInfo?.fullName || null, Validators.required),
      address: new FormControl(this.clientInfo?.address || null, Validators.required),
      country: new FormControl(this.clientInfo?.country || null, Validators.required),
      city: new FormControl(this.clientInfo?.city || null, Validators.required),
      state: new FormControl(this.clientInfo?.state || null, Validators.required),
      zipCode: new FormControl(this.clientInfo?.zipCode || null, [
        Validators.required,
        Validators.minLength(5)
      ]),
    });
  }

  onClose() {
    this.closeModal.emit(false);
  }

  onSubmit() {
    const id = this.clientInfo ? this.clientInfo.id : `client-${Date.now()}`;
    const userId = JSON.parse(localStorage.getItem('user')).id;
    const client = new Client(
      id,
      userId,
      this.clientForm.value.fullName,
      this.clientForm.value.address,
      this.clientForm.value.country,
      this.clientForm.value.city,
      this.clientForm.value.state,
      this.clientForm.value.zipCode);
    if (this.clientInfo) {
      this.store.dispatch(new clientsActions.UpdateClient({id, client}));
    } else {
      this.store.dispatch(new clientsActions.AddClient(client));
    }
    this.store.dispatch(new clientsActions.UserClients(userId));
    this.store.dispatch(new clientsActions.SaveClients());
    this.onClose();
  }

  ngOnDestroy(): void {
  }

}
