import { ClientsComponent } from './dashboard/clients/clients.component';
import { InvoicesComponent } from './dashboard/invoices/invoices.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserInformationComponent } from './dashboard/user-information/user-information.component';


const routes: Routes = [
  {
    path: 'login', component: AuthenticationComponent,
  },
  {
    path: '', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      {
        path: '', component: InvoicesComponent
      },
      {
        path: 'clients', component: ClientsComponent
      },
      {
        path: 'info', component: UserInformationComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
