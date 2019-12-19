import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { PostDataService} from '../app/post-data.service';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  apiKey = '';
  constructor(private http: HttpClient,
    private postDataService: PostDataService) {
  }

  getnew() {
    return this.http.get
    (
      this.postDataService.apiServer_url + 'API/News.ashx'
    );
  }

  getProduct() {
    return this.http.get
    (
      this.postDataService.apiServer_url + 'API/ProductAndManual.ashx'
    );
  }
  getresolution(){
    return this.http.get
    (
    this.postDataService.apiServer_url + 'API/Resolutio.asmx/Detail'
    );
  }
}
