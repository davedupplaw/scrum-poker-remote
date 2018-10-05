import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Registration} from '../../../shared/domain/Registration';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private _registrations: BehaviorSubject<Registration[]> = new BehaviorSubject<Registration[]>([]);

  public readonly  registrations : Observable<Registration[]> = this._registrations.asObservable();

  constructor() {

  }

  public receiveRegistration( registration: Registration ): void {
    this._registrations.getValue().push( registration );
  }
}
