export class CurrencyFormat
{
    float(moeda : string | number) : number
    {
       return Number(moeda.toString().replace(".", "").replace(",", "."));
    }

    convertToFloat(val) {
        if (val != '') {
            if (val.indexOf(',') !== -1)
                val.replace(',', '');
            val = parseFloat(val);
            while (/(\d+)(\d{3})/.test(val.toString())) {
                val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
            }
        }
        return val;
    }
    
}