import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { PasswordValidator } from 'src/validators/password.validator';
import { MustMatch } from 'src/validators/confirmPass.validator';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  @Input() id!: number;
  @Output() addNewUser = new EventEmitter<any>();
  @Output() deleteUser = new EventEmitter<any>();


  userInfo: any;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.userInfo = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.pattern('[0-9 ]{9}'), Validators.required]],
        password: ['', PasswordValidator.strong],
        confirmPassword: ['', Validators.required],
        addUser: this.fb.array([])
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }


  ngOnInit(): void {}

  get password() {
    return this.userInfo.controls['password'];
  }
  get confirmPassword() {
    return this.userInfo.controls['confirmPassword'];
  }
  
  addUser() {
    this.addNewUser.emit()
  }

  deleteUserForm() {
    this.deleteUser.emit(this.id)
  }
  
}
