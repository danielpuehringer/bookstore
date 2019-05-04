import {Component, OnInit, Input} from '@angular/core';
import {User} from "../../shared/user";
import {AuthService} from "../../shared/authentication.service";

@Component({
  selector: 'bs-user-info',
  templateUrl: './user-info.component.html',
  styles: []
})
export class UserInfoComponent implements OnInit {

  @Input()
  userId: number;

  private user: User = new User(
      new Date(),
      "...",
      2,
      "...",
      new Date(),
      false,
      "...",
      "...",
      "..."
  );

  constructor(private auth: AuthService) { }

  ngOnInit() {
      console.log(this.userId);

      this.auth.getUser(this.userId).subscribe(res => {this.user = res; console.log(this.user);});
  }

  isAdmin(): boolean {
      return this.auth.isAdmin();
  }

}
