import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'telefone'
})
export class PhonePipe implements PipeTransform {
    transform(tel) {
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var city, number;

        switch (value.length) {
            case 10: // +1PPP####### -> C (PPP) ###-####

                city = value.slice(0, 2);
                number = value.slice(2);
                break;

            case 11: // +CPPP####### -> CCC (PP) #####-####

                city = value.slice(0, 2);
                number = value.slice(2);
                break;

            default:
                return tel;
        }

        number = (value.length == 11) ? number.slice(0, 5) + '-' + number.slice(5) : number.slice(0, 4) + '-' + number.slice(4);


        return ("(" + city + ") " + number).trim();
    }
}