import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from 'angular-2-local-storage';
import { HttpClient } from '@angular/common/http';

import { BaseProvider } from './base.provider';
import { Subject, Observable } from 'rxjs';
import { CONFIG } from './config';
import { tokenGetter } from './helpers';
import { Credentials, LoginResponse } from '../../models/form.models';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseProvider {

  static LOGIN_URI = 'authenticate';
  static LOGOUT_URI = 'user/logout';

  constructor(
    private _storage: LocalStorageService,
    private tokenHelper: JwtHelperService,
    private http: HttpClient
  ) {
    super();
  }

  public logout() {
    return this.http.post(this.getFullUrl(AuthService.LOGOUT_URI), {});
  }
  
  public clearToken() {
    this._storage.clearAll();
  }

  /**
   * Retrieve token from Storage
   */
  public getToken() {
    return tokenGetter(this._storage);
  }

  /**
   * Write to Storage
   * @param token string
   */
  private writeToken(token: string): boolean {
    return this._storage.set(CONFIG.AUTH_TOKEN_KEY, token);
  }

  /**
   * Is Token Expred
   * @returns boolean
   */
  public isAuthenticated(): boolean {
    const token = this.getToken();

    if ([null, undefined, ''].indexOf(token) > -1) {
      return false;
    }

    return !this.tokenHelper.isTokenExpired(token);
  }

  public decodeToken(): any {
    if (!this.isAuthenticated()) { return {}; }

    const tokenDecoded = this.tokenHelper.decodeToken(this.getToken());
    return tokenDecoded;
  }

  /**
   * Login
   * @param credentials Credentials
   */
  public login(credentials: Credentials): Observable<any> {
    const loginOp: Observable<LoginResponse> = this.http.post<LoginResponse>(
      this.getFullUrl(AuthService.LOGIN_URI),
      credentials
    );

    const loginSubject = new Subject<boolean>();

    loginOp.subscribe(
      (resp: any) => {
        if (!resp.error && null !== resp.result.token) {
          return loginSubject.next(this.writeToken(resp.result.token));
        }

        loginSubject.error('Error encountered during Login');
      },
      httpError => {
        loginSubject.error(httpError.error.error || httpError);
      }
    );

    return loginSubject.asObservable();
  }

  guest() {
    return !this.isAuthenticated();
  }

  // Must Have all roles specified
  allOf(...rights): boolean {
    const user = this.decodeToken();
    if (typeof rights[0] === 'object') {
      rights = rights[0];
    }
    return !this.guest() && (user.is_admin || rights.reduce((a, r) => {
      return a && user.permissions.indexOf(r) > -1;
    }, true));
  }

  // Must Have at least one of the roles specified
  oneOf(...rights): boolean {
    if (typeof rights[0] === 'object') {
      rights = rights[0];
    }
    const user = this.decodeToken();
    return !this.guest() && (user.is_admin || rights.reduce((a, r) => {
      return a || user.permissions.indexOf(r) > -1;
    }, false));
  }
}
