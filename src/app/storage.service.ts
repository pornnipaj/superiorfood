import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface User {
  id: number,
  name: string,
  username: string,
  position: string,
  empID: string
}

export interface Sig {
  base64: string,
}

const user_KEY = 'my-user';
const sig_KEY = 'my-sig';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  users;
  sigs;

  constructor(private storage: Storage) { 
    
  }

  
  addSig(sig: Sig): Promise<any> {   
    return this.storage.get(sig_KEY).then((sigs: Sig[]) => {
      alert(1);
      if (sigs) {
        sigs.push(sig);
        return this.storage.set(sig_KEY, sigs);
      } else {
        return this.storage.set(sig_KEY, [sigs]);
      }
    });
  }

  getSig(): Promise<Sig[]> {
    return this.storage.get(sig_KEY);
  }

  addUser(user: User): Promise<any> {
    return this.storage.get(user_KEY).then((users: User[]) => {
      if (users) {
        users.push(user);
        return this.storage.set(user_KEY, users);
      } else {
        return this.storage.set(user_KEY, [user]);
      }
    });
  }

  getUser(): Promise<User[]> {
    return this.storage.get(user_KEY);
  }

  deleteUser(id: number): Promise<User> {
    return this.storage.get(user_KEY).then((users: User[]) => {
      if (!users || users.length === 0) {
        return null;
      }

      let toKeep: User[] = [];

      for (let i of users) {
        if (i.id !== id) {
          toKeep.push(i);
        }
      }
      return this.storage.set(user_KEY, toKeep);
    });
  }

  resetLocalStorage() {
    this.storage.clear();
  }

}
