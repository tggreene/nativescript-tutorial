import {Component} from "@angular/core";
import {User} from "../../shared/user/user";
import {UserService} from "../../shared/user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: "my-app",
  providers: [UserService],
  templateUrl: "pages/login/login.html",
  styleUrls: ["pages/login/login-common.css", "pages/login/login.css"],
})

export class LoginPage {
  user: User;
  isLoggingIn = true;

  constructor(private _router: Router, private _userService: UserService) {
    this.user = new User();
  }

  submit() {
    if (this.isLoggingIn) {
      this.login();
    } else {
      this.signUp();
    }
  }

  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
  }

  login() {
    this._userService.login(this.user)
                     .subscribe(
                         () => this._router.navigate(["/list"]),
                         (error) => alert("Unfortunately we could not find your account")
                     )
  }

  signUp() {
    this._userService
        .register(this.user)
        .subscribe(
          () => {
            alert("Your account was successfully created.");
            this.toggleDisplay();
          },
          () => alert("Unfortunately we were unable to create your account.")
        );
  }
}