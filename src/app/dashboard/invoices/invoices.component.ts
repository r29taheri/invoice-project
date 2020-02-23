import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { Invoice } from '../../models/invoice';
import * as invoicesActions from './store/invoices.action';
import * as clientsActions from '../clients/store/clients.action';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {
  invoices: Observable<{userInvoices: Invoice[]}>;
  showModal = false;
  showDetailModal = false;
  userId: string;
  invoiceInfo: Invoice;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.getInvoices();
  }

  getInvoices() {
    const invoices = JSON.parse(localStorage.getItem('invoices'));
    const clients = JSON.parse(localStorage.getItem('clients'));
    this.userId = JSON.parse(localStorage.getItem('user')).id;
    this.userId = JSON.parse(localStorage.getItem('user')).id;
    if (invoices) {
      this.store.dispatch(new invoicesActions.GetInvoices(invoices));
    }
    if (clients) {
      this.store.dispatch(new clientsActions.GetClients(clients));
    }
    this.store.dispatch(new invoicesActions.UserInvoices(this.userId));
    this.invoices = this.store.select('invoices');
  }

  onCloseModal(event: boolean) {
    this.showModal = event;
  }

  onCloseDetailModal(event: boolean) {
    this.showDetailModal = event;
  }

  openDetail(invoice: Invoice) {
    this.showDetailModal = true;
    this.invoiceInfo = invoice;
  }

  openModify(invoice?: Invoice) {
    this.showModal = true;
    this.invoiceInfo = invoice;
  }

  onDelete(id: string) {
    this.store.dispatch(new invoicesActions.DeleteInvoice(id));
    this.store.dispatch(new invoicesActions.UserInvoices(this.userId));
  }

}
