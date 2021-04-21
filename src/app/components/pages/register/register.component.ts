import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from './../../../shared/interfaces/user.interface';
import { UserService } from './../../../shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  // Inputs, IMPORTANT!!! type of input must be declared @ the html <input type="----"> 
  @ViewChild('usernameinput', {static: true}) usernameInput: ElementRef | undefined;
  @ViewChild('emailinput', {static: true}) emailInput: ElementRef | undefined;
  @ViewChild('fullnameinput', {static: true}) fullnameInput: ElementRef | undefined;
  @ViewChild('passwordinput', {static: true}) passwordInput: ElementRef | undefined;

  constructor(private UserService: UserService, private FormBuilder: FormBuilder) {
   }

  registerForm=new FormGroup({
    uusernameinput: new FormControl('', [Validators.required]),
    emailinput: new FormControl('', [Validators.required]),
    passwordinput: new FormControl('', [Validators.required]),
    fullnameinput: new FormControl('',[Validators.required])
  })
  
  ngOnInit(): void {
    this.registerForm = this.FormBuilder.group({
      usernameinput: new FormControl(''),
      emailinput: new FormControl(''),
      fullnameinput: new FormControl(''),
      passwordinput: new FormControl('')
    })
  }

  registerOnClick() : void {
    
    // GRAB THE FIELDS
    const username = this.usernameInput?.nativeElement.value;
    const email = this.emailInput?.nativeElement.value;
    const fullname = this.fullnameInput?.nativeElement.value;
    const pswrd = this.passwordInput?.nativeElement.value;

    /*
    
    MUST CHECK FORMATS:
      - No empty strings
      - Email must have email-ish sense
      - length of the fields must be over a certain limit
    
    */

    // empty check
    /*if(username == "" || email == "" || fullname == "" || pswrd == ""
    || username == " " || email == " " || fullname == " " || pswrd == " "){
      alert('NO FIELD MUST BE LEFT BLANK');
      return;
    }

    // length check
    if(username.length < 5 || pswrd.length < 4){
      alert('SOME FIELDS DO NOT MATCH THE REQUIREMENTS');
      return;
    }

    // email validator
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(email)){
      alert('EMAIL HAS NO RIGHT FORMAT');
      return;
    }*/
    if (this.registerForm.valid){
      // all successful, send the user to the API

      // GENERATE USER
      const user = {
        "uname": username,
        "email": email,
        "fullname": fullname,
        "pswd": pswrd
      } as User;

      this.UserService.registerUser(user).subscribe(
        (response) =>{
          alert(`User registered: ${response.uname}`);
        },
        (error) =>{
          alert(`11`);
        }
      );
    }
  }
}
