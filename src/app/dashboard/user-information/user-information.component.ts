import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { User } from '../../models/user';
import * as AuthActions from '../../authentication/store/auth.action';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss']
})
export class UserInformationComponent implements OnInit, OnDestroy {
  userForm: FormGroup;
  user: User;
  userUpdated = false;
  userSub: Subscription;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.userForm = new FormGroup({
      phone: new FormControl(this.user.phone),
      website: new FormControl(this.user.website),
      address: new FormControl(this.user.address),
      country: new FormControl(this.user.country),
      city: new FormControl(this.user.city),
      state: new FormControl(this.user.state),
      zipCode: new FormControl(this.user.zipCode),
    });
  }

  getUserInfo() {
    const userId = JSON.parse(localStorage.getItem('user')).id;
    const users = JSON.parse(localStorage.getItem('users'));
    if (users) {
      this.store.dispatch(new AuthActions.GetUsers(users));
    }
    this.store.dispatch(new AuthActions.UserInfo(userId));
    this.userSub = this.store.select('auth').subscribe(data => {
      this.user = data.user;
    });
  }

  onSubmit() {
    const id = JSON.parse(localStorage.getItem('user')).id;
    const user = new User(
      id,
      this.user.username,
      this.user.email,
      this.user.password,
      this.userForm.value.phone,
      this.userForm.value.website,
      this.userForm.value.address,
      this.userForm.value.country,
      this.userForm.value.city,
      this.userForm.value.state,
      this.userForm.value.zipCode);
    this.store.dispatch(new AuthActions.UpdateUser({id, user}));
    this.store.dispatch(new AuthActions.SaveUsers());
    this.userUpdated = true;
  }

  ngOnDestroy(): void {
  }

}
