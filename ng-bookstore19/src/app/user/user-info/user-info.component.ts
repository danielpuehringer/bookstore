import {Component, OnInit, Input} from '@angular/core';
import {AuthService} from "../../shared/authentication.service";
import {User} from "../../shared/user";

@Component({
  selector: 'bs-user-info',
  templateUrl: './user-info.component.html',
  styles: []
})
export class UserInfoComponent implements OnInit {

  @Input()
  userId: number;

  public user: User = new User(
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
      this.auth.getUser(this.userId).subscribe(res => {this.user = res; console.log(res);});
  }

  isAdmin(): boolean {
      return this.auth.isAdmin();
  }
}
