import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { User } from './../../../shared/interfaces/user.interface';
import { UserService } from './../../../shared/services/user.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common'
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document, private userService: UserService, private route: ActivatedRoute, private router: Router) { }
  users:User[]=[];
  ngOnInit(): void {
    this.receiveUsers();
  }
  receiveUsers(): void{
    this.userService.getAllUsers().subscribe(
      (response)=>{this.users=response},
      (error)=>{console.log("no users")}
    );
  }
  onDeleteClick(uname: string){
    
    this.userService.deleteUser(uname).subscribe(
      (response)=>{window.location.reload();},
      (error)=>{console.log("error")}
    );
  }

}
