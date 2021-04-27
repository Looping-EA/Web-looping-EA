import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from './../../../shared/interfaces/user.interface';
import { UserService } from './../../../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({});
  
  constructor(private userService: UserService, private formBuilder: FormBuilder,
    private route: Router) {
    
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: new FormControl('', [Validators.nullValidator, Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.nullValidator, Validators.required, Validators.email]),
      fullname: new FormControl('', [Validators.nullValidator, Validators.required]),
      password: new FormControl('', [Validators.nullValidator, Validators.required, Validators.minLength(8)])
    });
  }

  get formControls(){
    return this.registerForm.controls;
  }


  onSubmit(): void{
    if(this.registerForm.valid){
      const username = this.registerForm.value.username;
      const email = this.registerForm.value.email;
      const fullname = this.registerForm.value.fullname;
      const password = this.registerForm.value.password;

      const user = {
        uname: username,
        email: email,
        pswd: password,
        fullname: fullname
      } as User

      this.userService.registerUser(user).subscribe(
        (response) =>{
          console.log(response);
          this.route.navigate(['/home']);
        },
        (error) => {
          console.log(error);
        }
      )
    } else {
      console.log(this.registerForm.status);
    }
  }
}