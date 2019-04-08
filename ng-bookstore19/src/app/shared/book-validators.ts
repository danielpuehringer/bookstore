import {FormControl} from "@angular/forms";

export class BookValidators {
    static isbnFormat(control: FormControl): {[error:string]:any}{
        if(!control.value){
            return null;
        }
        //regex
        const isolatedNumbers = control.value.replace(/-/g, '');
        const isbnPattern = /(^\d{10})|(^\d{13}$)/;

        return isbnPattern.test(isolatedNumbers) ? null : {isbnFormat: {valid:false}}
    }

    //weitere: einfach googeln: regex preis
    //static checkPrice
}
