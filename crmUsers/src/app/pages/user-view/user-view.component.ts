import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Iuser } from '../../interfaces/iuser.interface';
import { ButtonsComponent } from "../../shared/buttons/buttons.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-view',
  imports: [ButtonsComponent],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent {
  userService= inject(UserService)
  @Input() id: string = "";
  user: Iuser = {
    "_id": "",
    "id": 0,
    "first_name": "",
    "last_name": "",
    "username": "",
    "email": "",
    "image": "",
    "password": ""
  };
  router= inject(Router)
  @Output() deleteItemEmit: EventEmitter<Boolean> = new EventEmitter();

 async ngOnInit(){

    this.user = await this.userService.getById(this.id)
  }

  
  deleteUser(event: Boolean) {
    this.deleteItemEmit.emit(event)
    this.router.navigate(['/home'])
  }

}
