import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as authActions from './store/auth.action';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  login = true;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    const users = JSON.parse(localStorage.getItem('users'));
    if (users) {
      this.store.dispatch(new authActions.GetUsers(users));
    }
  }

}
