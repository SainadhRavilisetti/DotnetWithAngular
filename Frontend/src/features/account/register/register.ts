import { Component, input } from '@angular/core';
import { register, User } from '../../../types/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
profilefromHome=input.required<User[]>();
protected creds={} as register;
register(){
  console.log(this.creds);
}
cancel(){
  console.log('cancelled');
}
}
