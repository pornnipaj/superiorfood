import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { StorageService, User } from '../storage.service';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user;
  newUser: User = <User>{};
  authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage, 
    private plt: Platform,
    private storageService: StorageService) {
    this.plt.ready().then(() => {
      this.checkToken();
    });    
  }

   checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);   
        console.log(res);
                    
      }
    })
  }

  saveuser(res){
    this.storageService.resetLocalStorage();
    this.user = JSON.parse(res);
    this.newUser.id = 1;
    this.newUser.name = this.user.name;
    this.newUser.username = this.user.username;
    this.newUser.position = this.user.position;
    this.newUser.empID = this.user.empID;
    this.newUser.role = this.user.role;
    this.newUser.status = this.user.status;
    this.newUser.link = this.user.link;
    console.log(this.newUser);

    this.storageService.addUser(this.newUser).then(item => {
      this.newUser = <User>{};
    });
  }

  login(id) {
    let name = JSON.stringify(id);
    return this.storage.set(TOKEN_KEY, name).then(() => {
      this.authenticationState.next(true);
    });
  }
 
  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }
 
  isAuthenticated() {
    return this.authenticationState.value;
  }
}
