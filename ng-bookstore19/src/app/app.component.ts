import {Component} from '@angular/core';
import {AuthService} from "./shared/authentication.service";

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  constructor(private  authService: AuthService){

  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  getLoginLabel(): String{
    if(!this.isLoggedIn()){
      return "Login";
    }else{
      return "Logout";
    }
  }
}
