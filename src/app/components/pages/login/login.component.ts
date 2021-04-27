import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from './../../../shared/interfaces/user.interface';
import { UserService } from './../../../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Inputs, IMPORTANT!!! type of input must be declared @ the html <input type="----"> 
  @ViewChild('usernameinput', {static: true}) usernameInput: ElementRef | undefined;
  @ViewChild('passwordinput', {static: true}) passwordInput: ElementRef | undefined;

  loginForm=new FormGroup({
    usernameinput: new FormControl('', [Validators.required]),
    passwordinput: new FormControl('', [Validators.required]),
  })

  constructor(private UserService: UserService, private FormBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.FormBuilder.group({
      usernameinput: new FormControl('', [Validators.required, Validators.minLength(5), this.noSpaces]),
      passwordinput: new FormControl('', [Validators.required, Validators.minLength(8), this.noSpaces])
    })
  }

  loginOnClick(): void{

    if(this.loginForm.valid){

      //GRAB THE FIELDS
      const username = this.usernameInput?.nativeElement.value;
      const pswrd = this.passwordInput?.nativeElement.value;

      /*
      MUST CHECK FORMATS:
        - No empty strings
            */

      //EMPTY CHECK 
      if(username.includes(' ') || pswrd.includes(' ')){
        alert('NO FIELD MUST BE LEFT BLANK');
        return;
      }

      //SEND THE USER TO THE API

      const user = {
        "uname": username,
        "pswd": pswrd
      } as User;

      this.UserService.loginUser(user).subscribe(
        (response) =>{
          alert(`${response.uname} welcome`);
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

 