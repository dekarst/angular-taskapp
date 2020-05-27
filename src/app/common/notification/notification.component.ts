import { Component, OnInit } from '@angular/core';
import { NotifyService } from './services/notify.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor(private notifyService: NotifyService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.notifyService.notifySubject.next('');
    this.show();
  }

  show() {
    this.notifyService.notify('info')

    // this.notifyService.notification.subscribe(message=>{
    //   this.toastr.error(message);
    // })
  }

}
