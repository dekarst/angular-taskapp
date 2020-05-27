import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  notifySubject = new BehaviorSubject<string>('');
  notification: Observable<string>;
  constructor(private toastr: ToastrService) {
    this.notification = this.notifySubject.asObservable();
  }

  notify(type) {
    this.notification.subscribe(message => {
      console.log(message);
      this.toastr[type](message)
      //  fn.bind(this)(message);
    })
  }
}
