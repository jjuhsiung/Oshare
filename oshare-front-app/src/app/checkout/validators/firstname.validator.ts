import { AbstractControl, ValidationErrors, ControlContainer } from '@angular/forms';

export class firstNameValidators {

    static lengthCheck(control: AbstractControl) : Promise<ValidationErrors | null>{

        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                if((control.value as string).length>20){
                    resolve({ lengthCheck: true });
                }
                else 
                    return resolve(null);
            }, 2000);
        });

    }

}