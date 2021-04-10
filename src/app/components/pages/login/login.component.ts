import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    // Inputs, IMPORTANT!!! type of input must be declared @ the html <input type="----"> 
    @ViewChild('usernameinput', {static: true}) usernameInput: ElementRef | undefined;
    @ViewChild('passwordinput', {static: true}) passwordInput: ElementRef | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  loginOnClick(): void{

    //GRAB THE FIELDS
    const username = this.usernameInput?.nativeElement.value;
    const pswrd = this.passwordInput?.nativeElement.value;

    /*
    MUST CHECK FORMATS:
      - No empty strings
      - No spaces in the strings
          */

    //EMPTY CHECK 
    const check = 0;
    for(let i = 0; i < username.length; i++){
      if(username.charAt(i) == " "){
        alert('Fill the blanks properly');
      return;
      }
    }

    //SPACE CHECK
    for(let i = 0; i < pswrd.length; i++){
      if(pswrd.charAt(i) == " "){
        alert('Fill the blanks properly');
      return;
      }
    }
    if(username == "" || pswrd == ""){
      alert('Fill the blanks properly');
      return;
    }

    //SEND THE USER TO THE API

    //MATCH THE USER
    


  }

}

 