import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Client } from '../../models/client';
import * as clientsActions from './store/clients.action';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clients: Observable<{userClients: Client[]}>;
  showModal = false;
  userId: string;
  clientInfo: Client;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.getClients();
  }

  onCloseModal(event: boolean) {
    this.showModal = event;
  }

  openModify(client?: Client) {
    this.showModal = true;
    this.clientInfo = client;
  }

  getClients() {
    const clients = JSON.parse(localStorage.getItem('clients'));
    this.userId = JSON.parse(localStorage.getItem('user')).id;
    if (clients) {
      this.store.dispatch(new clientsActions.GetClients(clients));
    }
    this.store.dispatch(new clientsActions.UserClients(this.userId));
    this.clients = this.store.select('clients');
  }

  onDelete(id: string) {
    this.store.dispatch(new clientsActions.DeleteClient(id));
    this.store.dispatch(new clientsActions.UserClients(this.userId));
    this.store.dispatch(new clientsActions.SaveClients());
  }

}
