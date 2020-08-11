import { HttpHeaders } from "@angular/common/http"

export default  {
  baseUrl: 'https://api.redeoba.com.br/api/values/',
  headers: new HttpHeaders({
        'Content-Type': 'application/json'
  })
}
