import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Iuser } from '../../interfaces/iuser.interface';
import { UserService } from '../../services/user.service';
import { toast } from 'ngx-sonner';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-buttons',
  imports: [],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css'
})
export class ButtonsComponent {
  @Input() user: Iuser | any;
  userService = inject(UserService);
  @Output() deleteItemEmit: EventEmitter<Boolean> = new EventEmitter();
  router = inject(Router);
  @Input() volver: Boolean = false;

  deleteUser(id: string) {
    toast(`Vas a borrar al usuario ${this.user.first_name} ${this.user.last_name} `, {
      action: {
        label: 'Aceptar',
        onClick: async () => {
          await this.userService.delete(id)
          if (this.deleteItemEmit.observed) {
            this.deleteItemEmit.emit(true)
          } else {
            this.router.navigate(['/home'])
          }

        }
      },
      cancel: {
        label: 'Cancelar',
        onClick: () => {
          
        }
      }
    });
  }
  updateUser(id: string) {
    toast(`Vas a editar al usuario ${this.user.first_name} ${this.user.last_name} `, {
      action: {
        label: 'Aceptar',
        onClick: () => {
            this.router.navigate(['/updateuser', this.user._id])
        }
      },
      cancel: {
        label: 'Cancelar',
        onClick: () => {
          
        }
      }
    });
  }
  
  verUser(id: string) {
    this.router.navigate(['/user', this.user._id])
  }

  goToHome() {
    this.router.navigate(['/home'])
}
}
