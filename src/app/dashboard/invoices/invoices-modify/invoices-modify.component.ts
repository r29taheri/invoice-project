import { InvoiceItem } from './../../../models/invoice';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { Invoice } from '../../../models/invoice';
import { Client } from '../../../models/client';

import * as invoicesAction from '../store/invoices.action';
import * as clientsActions from '../../clients/store/clients.action';
import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-invoices-modify',
  templateUrl: './invoices-modify.component.html',
  styleUrls: ['./invoices-modify.component.scss']
})
export class InvoicesModifyComponent implements OnInit, OnDestroy {
  invoiceForm: FormGroup;
  @Input() invoiceInfo: Invoice;
  @Output() closeModal = new EventEmitter<boolean>();
  clients: Observable<{userClients: Client[]}>;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.invoiceForm = new FormGroup({
      client: new FormControl(this.invoiceInfo?.clientId || null, Validators.required),
      name: new FormControl(this.invoiceInfo?.name || null, Validators.required),
      items: new FormArray([]),
    });
    this.getUserClients();
  }

  onClose() {
    this.closeModal.emit(false);
  }

  getUserClients() {
    const userId = JSON.parse(localStorage.getItem('user')).id;
    this.store.dispatch(new clientsActions.UserClients(userId));
    this.clients = this.store.select('clients');
    if (this.invoiceInfo) {
      this.invoiceInfo.items.forEach(item => {
        const control = new FormGroup({
          name: new FormControl(item.name, Validators.required),
          description: new FormControl(item.description, Validators.required),
          cost: new FormControl(item.cost, [
            Validators.required,
            Validators.min(1)
          ]),
          qtyHr: new FormControl(item.qtyHr, [
            Validators.required,
            Validators.min(1)
          ]),
          amount: new FormControl(item.amount, [
            Validators.required,
            Validators.min(1)
          ]),
        });
        (this.invoiceForm.get('items') as FormArray).push(control);
      });
    } else {
      const control = new FormGroup({
        name: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required),
        cost: new FormControl(null, [
          Validators.required,
          Validators.min(1)
        ]),
        qtyHr: new FormControl(null, [
          Validators.required,
          Validators.min(1)
        ]),
        amount: new FormControl(null, [
          Validators.required,
          Validators.min(1)
        ]),
      });
      (this.invoiceForm.get('items') as FormArray).push(control);
    }
  }

  onAddItem() {
    const control = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      cost: new FormControl(null, Validators.required),
      qtyHr: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
    });
    (this.invoiceForm.get('items') as FormArray).push(control);
  }
  onRemoveItem() {
    const lastItem = (this.invoiceForm.get('items') as FormArray).length - 1;
    (this.invoiceForm.get('items') as FormArray).removeAt(lastItem);
  }

  get itemsList() {
    return (this.invoiceForm.get('items') as FormArray).controls;
  }

  onSubmit() {
    const id = this.invoiceInfo ? this.invoiceInfo.id : `client-${Date.now()}`;
    const userId = JSON.parse(localStorage.getItem('user')).id;
    const subTotal = this.invoiceForm.value.items.reduce(
      (accumulator: number, currentValue: InvoiceItem) => accumulator + currentValue.cost, 0);
    const tax = subTotal * 0.13;
    const total = subTotal + tax;
    const invoice = new Invoice(
      id,
      userId,
      this.invoiceForm.value.client,
      this.invoiceForm.value.name,
      new Date(),
      subTotal,
      tax,
      total,
      this.invoiceForm.value.items);
    if (this.invoiceInfo) {
      this.store.dispatch(new invoicesAction.UpdateInvoice({id, invoice}));
    } else {
      this.store.dispatch(new invoicesAction.AddInvoice(invoice));
    }
    this.store.dispatch(new invoicesAction.UserInvoices(userId));
    this.store.dispatch(new invoicesAction.SaveInvoices());
    this.onClose();
  }

  ngOnDestroy(): void {
  }

}
