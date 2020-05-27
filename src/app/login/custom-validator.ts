import { Validators } from '@angular/forms';

export class CustomValidator {
    static unique(control) {
        const forbidden = ['tsv@abv.bg'];
        return new Promise((resolve) => {
            setTimeout(()=>{
                if (forbidden.indexOf(control.value) !== -1) {
                    resolve({ unique: false })
                }
                resolve(null);    
            },3000)
        })
    }
}
