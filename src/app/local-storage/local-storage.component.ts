import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-local-storage',
  templateUrl: './local-storage.component.html',
  styleUrls: ['./local-storage.component.css']
})
export class LocalStorageComponent implements OnInit {
  localStorageName = 'name';
  data = [];
  value = '';
  dataTest = [];

  constructor() {
  }

  ngOnInit(): void {
    const localStorageData = JSON.parse(localStorage.getItem(this.localStorageName) as string);
    if (localStorageData !== null) {
      this.data = localStorageData;
    } else {
      this.data = this.dataTest;
    }
  }

  // tslint:disable-next-line:typedef
  valueChanged(value: string) {
    this.value = value;
  }

  // tslint:disable-next-line:typedef
  add() {
    if (this.value !== '') {
      // @ts-ignore
      this.data.push(this.value);
      localStorage.setItem(this.localStorageName, JSON.stringify(this.data));
    }
    // clear input
    this.value = '';

  }


}
