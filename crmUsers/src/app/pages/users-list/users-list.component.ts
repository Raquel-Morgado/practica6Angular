import { Component, inject } from '@angular/core';
import { Iuser } from '../../interfaces/iuser.interface';
import { UserService } from '../../services/user.service';
import { IResponse } from '../../interfaces/iresponse.interface';
import { CardUserComponent } from "../../shared/card-user/card-user.component";

@Component({
  selector: 'app-users-list',
  imports: [CardUserComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  users: Iuser[] = [];
  userServices = inject(UserService);
  page: number = 0;
  total_page: number = 0;
  link: string= `https://peticiones.online/api/users?page=`

  async ngOnInit() {
    this.getUsers();

  }

  gotoNext() {
    (this.page >= this.total_page) ? this.page=1 : this.page++
    this.link= `https://peticiones.online/api/users?page=${this.page}`
    this.getUsers(this.link)
  }

  gotoPrev() {
    (this.page == 1) ? this.page=this.total_page : this.page= this.page-1
    this.link= `https://peticiones.online/api/users?page=${this.page}`
    this.getUsers(this.link)
  }
  async getUsers(url: string = "") {
    
    try {
      let response: IResponse = await this.userServices.getAllPromise(url)
      this.page = response.page;
      this.total_page = response.total_pages;
      this.users = response.results
    } catch (error) {
      console.log(error)
    }
  }
  deleteUser(event: Boolean) {
    if (event) {
      this.getUsers()
    }
  }
}
