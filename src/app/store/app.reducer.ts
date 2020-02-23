import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../authentication/store/auth.reducer';
import * as fromClient from '../dashboard/clients/store/clients.reducer';
import * as fromInvoice from '../dashboard/invoices/store/invoices.reducer';

export interface AppState {
    auth: fromAuth.State;
    clients: fromClient.State;
    invoices: fromInvoice.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  clients: fromClient.clientsReducer,
  invoices: fromInvoice.invoicesReducer,
};
