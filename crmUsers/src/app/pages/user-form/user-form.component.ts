import { Component, inject, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Iuser } from '../../interfaces/iuser.interface';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {

    //inyectar el servicio
    userService = inject(UserService)
    router = inject(Router);
    @Input() id: string =""
    text: string =""
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

    async ngOnInit(){
      console.log(this.id)
      if (this.id === undefined) {
        this.text= "Registrar"
      } else {
        this.text= "Actualizar"
        
        this.user = await this.userService.getById(this.id)
      }
    }
    async getDataForm(userForm: NgForm) {
      let newUser: Iuser = userForm.value;
      newUser._id=this.id;
      //llamar al servicio para guardar los datos en la base
      let response :Iuser = await this.userService.updateUser(newUser);
      this.router.navigate(['/user', this.id])
      userForm.reset();
      toast.success('Usuario creado');

    }

}
