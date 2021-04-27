import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from './../../../shared/interfaces/user.interface';
import { UserService } from './../../../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Inputs, IMPORTANT!!! type of input must be declared @ the html <input type="----"> 
  @ViewChild('usernameinput', {static: true}) usernameInput: ElementRef | undefined;
  @ViewChild('passwordinput', {static: true}) passwordInput: ElementRef | undefined;

  loginForm=new FormGroup({});

  constructor(private UserService: UserService, private formBuilder: FormBuilder, private route: Router) {
   
   }
   get formControls(){
     return this.loginForm.controls;
   }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      usernameinput: new FormControl('', [Validators.required, Validators.minLength(5), this.noSpaces]),
      passwordinput: new FormControl('', [Validators.required, Validators.minLength(8), this.noSpaces])
    })
  }

  loginOnClick(): void{

    if(this.loginForm.valid){

      //GRAB THE FIELDS
      const username = this.loginForm.value.usernameinput;
      const pswrd = this.loginForm.value.passwordinput;

      

      //SEND THE USER TO THE API

      const user = {
        uname: username,
        pswd: pswrd
      } as User;

      this.UserService.loginUser(user).subscribe(
        (response) =>{
          alert(`${response.uname} welcome`);
          this.route.navigate(['/home']);
        },
        (error) =>{
          alert(`Try again`);
        }
      );

    }
    else{
      //SOMETHING IS WRONG
      console.log("Do it better");
      alert('Fill the blanks correctly');
    }
    


  }

  public noSpaces(control: FormControl){
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

}

 