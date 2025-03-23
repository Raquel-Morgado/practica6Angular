import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IResponse } from '../interfaces/iresponse.interface';
import { lastValueFrom } from 'rxjs';
import { Iuser } from '../interfaces/iuser.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

private httpClient = inject(HttpClient)
private baseUrl: string = "https://peticiones.online/api/users"

getAllPromise(url: string): Promise<IResponse> {
  url = (url === "") ? this.baseUrl : url
  return lastValueFrom(this.httpClient.get<IResponse>(url))
}

getById(id: string): Promise<Iuser> {
  return lastValueFrom(this.httpClient.get<Iuser>(`${this.baseUrl}/${id}`))
}

updateUser(user: Iuser){
  return lastValueFrom(this.httpClient.put<Iuser>(`${this.baseUrl}/${user._id}`, user))
}

delete(id: string): Promise<Iuser> {
  return lastValueFrom(this.httpClient.delete<Iuser>(`${this.baseUrl}/${id}`));
}

}
