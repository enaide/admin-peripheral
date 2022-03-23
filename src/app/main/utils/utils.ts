import { FormGroup } from '@angular/forms';
export class Util {

/**
     * Marks all controls in a form group as touched
     * @param formGroup - The group to caress..hah
     */
     static markFormGroupTouched(formGroup: FormGroup) {
        formGroup.updateValueAndValidity({ emitEvent: true });
        (<any>Object).values(formGroup.controls).forEach(control => {
            control.updateValueAndValidity({
                emitEvent: true
            });
            control.markAsTouched();
            if (control.controls) {
                this.markFormGroupTouched(control);
            }
        });
    }
}