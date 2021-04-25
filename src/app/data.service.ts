import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public FetchPinCodeData(pincode): any {
    return this.http.get('https://api.postalpincode.in/pincode/' + pincode);
  }
}
