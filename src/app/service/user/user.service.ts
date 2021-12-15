import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserModel} from '../../model/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseurl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {
  }


  getAllUser(): Observable<UserModel[]> {
    const url = 'user';
    return this.http.get<UserModel[]>(this.baseurl + url);
  }

  // tslint:disable-next-line:typedef
  getById(id: number) {
    const url = `user/${id}`;
    return this.http.get<any>(this.baseurl + url);
  }

  // tslint:disable-next-line:typedef
  updateUser(filterModel: any, id: number) {
    // var url = 'user';
    //
    // console.log(filterModel);
    // console.log(this.baseurl + url);
    // return this.http.put<any>(this.baseurl + url, filterModel);
    const url = `user/${id}`;
    return this.http.put<any>(this.baseurl + url, filterModel);
  }

  // tslint:disable-next-line:typedef
  createUser(filterModel: any) {
    const url = 'user';
    // console.log(filterModel);
    // console.log(this.baseurl + url);
    return this.http.post<any>(this.baseurl + url, filterModel);
  }

  // tslint:disable-next-line:typedef
  deleteUser(id: number) {
    const url = `user/${id}`;
    return this.http.delete<any>(this.baseurl + url);


  }
}
