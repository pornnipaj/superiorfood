import { Injectable, Component  } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class PostDataService {
  
  constructor(public http: Http) { }

  post(item: any) {
    let headers = new Headers(
      {
        'Content-Type' : 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
      
      let data = JSON.stringify({
        cardToken: 1,
        amount: 500
      });
      
      return new Promise((resolve, reject) => {
        this.http.post('http://localhost:41603/API/Receipt.aspx', data, options)
        .toPromise()
        .then((response) =>
        {
          console.log('API Response : ', response.json());
          resolve(response.json());
        })
        .catch((error) =>
        {console.error('API Error : ', error.status);
        console.error('API Error : ', JSON.stringify(error));
        reject(error.json());
      });
    })
  }
}