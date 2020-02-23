import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { User } from '../../models/user';
import * as authActions from '../store/auth.action';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  @ViewChild('registerForm') registerForm: NgForm;
  users: User[];
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
    const isRegistered = this.users.find(userInfo =>
      userInfo.email === this.registerForm.value.email ||
      userInfo.username === this.registerForm.value.username);
    if (isRegistered) {
      this.hasError = true;
      return true;
    }
    const id = `user-${Date.now()}`;
    const newUser = new User(
      id,
      this.registerForm.value.username,
      this.registerForm.value.email,
      this.registerForm.value.password);
    this.store.dispatch(new authActions.RegisterUser(newUser));
    this.store.dispatch(new authActions.SaveUsers());
    const user = JSON.stringify({
      id,
      email: this.registerForm.value.email,
      username: this.registerForm.value.username
    });
    localStorage.setItem('user', user);
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.getUsersSub.unsubscribe();
  }

}
