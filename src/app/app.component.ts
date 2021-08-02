import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserInfoComponent } from './user-info/user-info.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userArr: UserInfoComponent[] = [new UserInfoComponent(new FormBuilder)]
  usersData = [] as any

  addUserForm() {
    if(this.userArr.length === 10) {
      alert('You can submit only 10 forms');
      return;
    }
    this.userArr.push(new UserInfoComponent(new FormBuilder))
  }
  deleteUser(i:number) {
    this.userArr.splice(i, 1);
  }

  onSubmit() {
    for(const form of this.userArr) {
      if(form.userInfo.invalid) {
        alert('All forms must be valid');
        return;
      } else {
        this.userArr.map(user => this.usersData.push(user.userInfo.value))
      }
    }
    console.log(this.usersData);
    
  }
}
