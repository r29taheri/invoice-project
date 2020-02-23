import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { Store } from '@ngrx/store';
import * as clientsActions from '../../clients/store/clients.action';
import * as AuthActions from '../../../authentication/store/auth.action';
import * as fromApp from '../../../store/app.reducer';

import { Invoice } from './../../../models/invoice';
import { Client } from './../../../models/client';
import { User } from './../../../models/user';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss']
})
export class InvoiceDetailComponent implements OnInit, OnDestroy {
  @ViewChild('content') content: ElementRef;
  @Input() invoiceDetail: Invoice;
  clientDetail: Client;
  user: User;
  clientSub: Subscription;
  userSub: Subscription;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.getClientDetail();
    this.getUserInfo();
  }

  getClientDetail() {
    this.store.dispatch(new clientsActions.ClientDetail(this.invoiceDetail.clientId));
    this.clientSub = this.store.select('clients').subscribe(data => {
      this.clientDetail = data.client;
    });
  }

  getUserInfo() {
    const userId = JSON.parse(localStorage.getItem('user')).id;
    this.store.dispatch(new AuthActions.UserInfo(userId));
    this.userSub = this.store.select('auth').subscribe(data => {
      this.user = data.user;
    });
  }

  onGeneratePdf() {
    const div = this.content.nativeElement;
    html2canvas(div).then((canvas) => {
      const img = canvas.toDataURL('image/PNG');
      const doc = new jsPDF('h', 'mm', 'a4');
      const bufferX = 0;
      const bufferY = 0;
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, 180, undefined, 'FAST');
      return doc;
    }).then((doc: jsPDF) => {
      doc.save('invoice.pdf');
    });
  }

  ngOnDestroy(): void {
    if (this.clientSub) {
      this.clientSub.unsubscribe();
    }

    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

}
