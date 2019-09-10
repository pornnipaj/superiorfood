import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    username :string;
    password : string;
  constructor(public DataService: AuthServiceService) { }

  ngOnInit() {
  }

  login() {
    console.log(this.username);
    console.log(this.password);
    if  (this.username == "admin" && this.password == "wingplus") {
      window.location.href="/menu";
    }
    // this.DataService.insert(this.form).then((data:any) => {
    //   console.log(data);
    // });
  }

}
