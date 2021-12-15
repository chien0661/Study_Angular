import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserModel} from '../../model/user/user.model';
import {ChartModel} from '../../model/chart/chart.model';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  baseurl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {
  }


  getAll(): Observable<ChartModel[]> {
    const url = 'chart';
    return this.http.get<ChartModel[]>(this.baseurl + url);
  }
}
