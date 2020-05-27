import { AbstractControl, ValidatorFn } from '@angular/forms'

export class CustomFormValidator {
    static valueSelected(options: any[]): ValidatorFn {
        return (control: AbstractControl): { [key: string]: Boolean } | null => {
            let selectedValue = control.value;
            let hasSelection = options.filter(option => option.name == selectedValue);
            console.log(hasSelection, options)
            if (hasSelection.length == 0) {
                return { 'nomatches': true }
            }
            return null;
        }
    }
}