import { UserService } from 'src/app/_services/user.service';
import { Observable } from 'rxjs';
import { Directive } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';

@Directive({
  selector: '[UniqueUsername]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: UniqueUsernameValidatorDirective, multi: true }]
})
export class UniqueUsernameValidatorDirective implements AsyncValidator {

  constructor(private userService: UserService) {

  }
  validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.userService.getUserByUsername(c.value).pipe(
      map(response => {
        if(response.detail == null) return { 'UniqueUsername': true };
        else return null;
      })
    );
  }
}
