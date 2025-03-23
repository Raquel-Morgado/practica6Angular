import { Component, inject, Input } from '@angular/core';
import { FormControl, FormsModule, NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Iuser } from '../../interfaces/iuser.interface';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';
import { AbstractControl, ReactiveFormsModule, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {

    userForm: FormGroup;
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
    constructor(){
      this.userForm = new FormGroup({
        first_name: new FormControl("", [Validators.required]),  // Nombre
        last_name: new FormControl("", [Validators.required]),  // Apellido
        username: new FormControl("", [Validators.required]),   // Nombre de Usuario
        email: new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),  // Email
        image: new FormControl("", [Validators.required, Validators.pattern('^(http|https):\/\/.*$')]),  // Imagen (URL)
      });
    }
    async ngOnInit(){
      console.log(this.id)
      if (this.id === undefined) {
        this.text= "Registrar"
      } else {
        this.text= "Actualizar"
        
        this.user = await this.userService.getById(this.id)
        this.userForm.patchValue({
          first_name: this.user.first_name,
          last_name: this.user.last_name,
          username: this.user.username,
          email: this.user.email,
          image: this.user.image
        });
      }
    }
    async getDataForm() {
      let newUser: Iuser = this.userForm.value
      newUser._id=this.id;
      //llamar al servicio para guardar los datos en la base
      let response :Iuser = await this.userService.updateUser(newUser);
      this.router.navigate(['/user', this.id])
      this.userForm.reset();
      toast.success('Finalizado con éxito');

    }
    
    checkControl(controlName: string, errorName: string): boolean | undefined {
    return this.userForm.get(controlName)?.hasError(errorName) && this.userForm.get(controlName)?.touched
    }

}
