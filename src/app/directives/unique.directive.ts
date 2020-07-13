import { Directive, forwardRef, Input } from '@angular/core';
import { Validator, NG_ASYNC_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserUniqueService } from '../registration/services/user-unique.service';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Directive({
  selector: '[appUnique]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueDirective),
      multi: true
    }
  ]
})
export class UniqueDirective implements Validator {
  @Input() appUniqueApply: boolean;

  constructor(private userUniqueService: UserUniqueService) { }

  validate(control: AbstractControl): any {

    return new Promise((resolve) => {
      setTimeout(() => {
        if (!this.appUniqueApply) { resolve(null) }

        this.userUniqueService.checkExistingUser(control.value).subscribe(user => {
          if (user && user.length > 0) {
            resolve({ unique: false })
          }
          else resolve(null);
        })
      }, 3000)
    })
  }

}
