export class CurrencyFormat
{
    float(moeda : string | number) : number
    {
       return Number(moeda.toString().replace(".", "").replace(",", "."));
    }
    
}