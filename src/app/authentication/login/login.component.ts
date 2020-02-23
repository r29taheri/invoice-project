import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { User } from '../../models/user';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('loginForm') loginForm: NgForm;
  users: User[];
  isRegistered: boolean;
  getUsersSub: Subscription;
  hasError = false;
  constructor(private store: Store<fromApp.AppState>, private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.getUsersSub = this.store.select('auth').subscribe(data => {
      this.users = data.users;
    });
  }

  onSubmit() {
    const userInfo = this.users.find(user =>
      user.username === this.loginForm.value.username &&
      user.password === this.loginForm.value.password);
    if (userInfo) {
      const user = JSON.stringify({
        id: userInfo.id,
        email: userInfo.email,
        username: userInfo.username
      });
      localStorage.setItem('user', user);
      this.router.navigate(['/']);
    } else {
      this.hasError = true;
    }
  }

  ngOnDestroy(): void {
    this.getUsersSub.unsubscribe();
  }
}
