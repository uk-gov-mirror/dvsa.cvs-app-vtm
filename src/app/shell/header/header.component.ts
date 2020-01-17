import { Component, OnInit } from '@angular/core';
import { IAppState } from '@app/store/state/app.state';
import { Store } from '@ngrx/store';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { UserDetailsModel } from '../store/user-details.model';
import { GetUserDetailsAction } from './../store/user-details.actions';

@Component({
  selector: 'vtm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName: string;
  menuOpen = false;
  constructor(private adal: MsAdalAngular6Service,
    private _store: Store<IAppState>) {
  }

  ngOnInit() {
    this.userName = this.adal.userInfo != null ? this.adal.userInfo.profile.name : '';
    const userDetails: UserDetailsModel = {
      msOid: this.adal.userInfo.profile.oid,
      msUser: this.adal.userInfo.userName
    };
    this._store.dispatch(new GetUserDetailsAction(userDetails));
  }

  onClick($event) {
    this.menuOpen = !this.menuOpen;
  }

  logOut() {
    (this.adal.isAuthenticated) ? this.adal.logout() : false;
  }
}
