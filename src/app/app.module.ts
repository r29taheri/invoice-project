import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import * as fromApp from './store/app.reducer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ClientsComponent } from './dashboard/clients/clients.component';
import { InvoicesComponent } from './dashboard/invoices/invoices.component';
import { ModalComponent } from './shared/modal/modal.component';
import { ClientsModifyComponent } from './dashboard/clients/clients-modify/clients-modify.component';
import { ShorteningPipe } from './pipes/shortening.pipe';
import { InvoicesModifyComponent } from './dashboard/invoices/invoices-modify/invoices-modify.component';
import { InvoiceDetailComponent } from './dashboard/invoices/invoice-detail/invoice-detail.component';
import { UserInformationComponent } from './dashboard/user-information/user-information.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NavbarComponent,
    ClientsComponent,
    InvoicesComponent,
    ModalComponent,
    ClientsModifyComponent,
    ShorteningPipe,
    InvoicesModifyComponent,
    InvoiceDetailComponent,
    UserInformationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(fromApp.appReducer)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
