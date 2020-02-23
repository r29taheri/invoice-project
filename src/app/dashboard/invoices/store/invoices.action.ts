import { Action } from '@ngrx/store';

import { Invoice } from '../../../models/invoice';

export const ADD_INVOICE = '[Invoice] Add new invoice';
export const USER_INVOICES = '[Invoice] Get user\'s invoices';
export const UPDATE_INVOICE = '[Invoice] Edit invoice';
export const DELETE_INVOICE = '[Invoice] Delete invoice';
export const STORE_INVOICES = '[Invoice] Save invoices to storage';
export const GET_INVOICES = '[Invoice] Get invoices from storage';

export class AddInvoice implements Action {
  readonly type = ADD_INVOICE;
  constructor(public payload: Invoice) {}
}

export class UserInvoices implements Action {
  readonly type = USER_INVOICES;
  constructor(public payload: string) {}
}

export class UpdateInvoice implements Action {
  readonly type = UPDATE_INVOICE;
  constructor(public payload: { id: string, invoice: Invoice }) {}
}

export class DeleteInvoice implements Action {
  readonly type = DELETE_INVOICE;
  constructor(public payload: string) {}
}

export class GetInvoices implements Action {
  readonly type = GET_INVOICES;
  constructor(public payload: Invoice[]) {}
}

export class SaveInvoices implements Action {
  readonly type = STORE_INVOICES;
  constructor() {}
}

export type InvoiceActions = AddInvoice | UserInvoices | UpdateInvoice | DeleteInvoice | GetInvoices | SaveInvoices;
