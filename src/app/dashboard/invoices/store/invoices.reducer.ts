import { Invoice } from '../../../models/invoice';
import * as invoiceActions from './invoices.action';

export interface State {
  invoices: Invoice[];
  userInvoices: Invoice[];
}

const initialState: State = {
  invoices: [
    new Invoice('invoice-12345', 'user-12345', 'client-123128', 'Invoice test', new Date(), 4000, 520, 4520, [
      {
        id: '111',
        name: 'asd',
        description: 'asdasdsad',
        cost: 1000,
        qtyHr: 1,
        amount: 1000
      },
      {
        id: '111',
        name: 'asd',
        description: 'asdasdsad',
        cost: 1000,
        qtyHr: 1,
        amount: 1000
      },
      {
        id: '111',
        name: 'asd',
        description: 'asdasdsad',
        cost: 1000,
        qtyHr: 1,
        amount: 1000
      },
      {
        id: '111',
        name: 'asd',
        description: 'asdasdsad',
        cost: 1000,
        qtyHr: 1,
        amount: 1000
      },
    ]),
  ],
  userInvoices: new Array<Invoice>(),
};

export function invoicesReducer(state: State = initialState, action: invoiceActions.InvoiceActions) {
    switch (action.type) {
      case invoiceActions.ADD_INVOICE:
        const withNewInvoice = [...state.invoices, action.payload];
        return {
          ...state,
          invoices: withNewInvoice
        };
      case invoiceActions.USER_INVOICES:
        return {
          ...state,
          userInvoices: state.invoices.filter(invoice => {
            return invoice.userId === action.payload;
          })
        };
      case invoiceActions.UPDATE_INVOICE:
        const invoiceId = state.invoices.findIndex(invoice => invoice.id === action.payload.id);
        const updatedInvoices = [...state.invoices];
        updatedInvoices[invoiceId] = action.payload.invoice;
        return {
            ...state,
            invoices: updatedInvoices
      };
      case invoiceActions.DELETE_INVOICE:
        return {
          ...state,
          invoices: state.invoices.filter(invoice => {
              return invoice.id !== action.payload;
          })
        };
      case invoiceActions.GET_INVOICES:
        return {
          ...state,
          invoices: action.payload
        };
      case invoiceActions.STORE_INVOICES:
        const invoices = JSON.stringify([...state.invoices]);
        localStorage.setItem('invoices', invoices);
        return {
          ...state
        };
      default:
        return state;
    }
}
