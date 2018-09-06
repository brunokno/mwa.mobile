import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserService {
  public user: any;
  userChange: Observable<any>;
  private userChangeObserver = new Subject<any>();

  constructor() {
    //notifico todo mundo que estiver inscrito
    //this.userChange = new Observable((observer: Observer<any>) => {
    //  this.userChangeObserver = observer;
    //});

    var data = localStorage.getItem('mws.user');
    if (data) {
      this.user = data;
    }
  }

  getMessage(): Observable<any> {
    return this.userChangeObserver.asObservable();
  }

  //busco o cara no localstorage se estiver notifico
  authenticate(): boolean {
    var data = localStorage.getItem('mws.user');
    if (data) {
      this.user = data;
      this.userChangeObserver.next(this.user);
      return true;
    }

    return false;
  }

  loadToken(): any {
    var data = localStorage.getItem('mws.token');
    if (data) {
      return data;
    }
  }

  loadUser(): any {
    var data = localStorage.getItem('mws.user');
    if (data) {
      this.user = data;
      return JSON.parse(data);
    }
  }

  save(user: any, token: string) {
    var data = JSON.stringify(user);
    localStorage.setItem('mws.token', token);
    localStorage.setItem('mws.user', data);
    this.user = data;
    this.userChangeObserver.next(this.user);
  }

  logout() {
    localStorage.removeItem('mws.token');
    localStorage.removeItem('mws.user');

    //pra não dar um crash no menu - bug na animação do menu, só quando a animação fechar eu posso removê-lo. Espero 1 segundo
    setTimeout(() => {
      this.user = {};
      this.userChangeObserver.next(this.user);
    }, 1000);
  }

}
