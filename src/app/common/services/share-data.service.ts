import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  dataSource: BehaviorSubject<any> = new BehaviorSubject(null);
  data: Observable<any>;
  constructor() { this.data = this.dataSource.asObservable()}
}
