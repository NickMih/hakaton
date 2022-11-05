import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formGroup = this._initForm();

  isRegistration = false;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) { }

  private _initForm(): FormGroup {
    return this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get password(): AbstractControl | null {
    return this.formGroup.get('password');
  }

  get username(): AbstractControl | null {
    return this.formGroup.get('username');
  }

  send = () => '';
  submit() {
    (this.isRegistration ?
      this.auth.registration(this.formGroup.value) :
      this.auth.login({ username: this.username!.value, password: this.password!.value }))
      .pipe()
      .subscribe();
  }
}
