import { Component, EventEmitter, Inject, inject, Input, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Iuser } from '../../interfaces/iuser.interface';
import {  ActivatedRoute, Router } from '@angular/router';
import { ButtonsComponent } from "../../shared/buttons/buttons.component";

@Component({
  selector: 'app-user-view',
  imports: [ButtonsComponent],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent {
  userService= inject(UserService)
  @Input() id: string = "";
  user!: Iuser ;
  route= Inject(ActivatedRoute);
  @Output() deleteItemEmit: EventEmitter<Boolean> = new EventEmitter();

 async ngOnInit(){

    this.user = await this.userService.getById(this.id)
  }

  
  deleteUser(event: Boolean) {
    this.deleteItemEmit.emit(event)
  }

}
