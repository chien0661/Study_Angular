import {Component, OnInit} from '@angular/core';

export interface CheclList {
  id: number,
  name: string,
  checked: boolean,
}

@Component({
  selector: 'app-menu1',
  templateUrl: './menu1.component.html',
  styleUrls: ['./menu1.component.css']
})
export class Menu1Component implements OnInit {
  checkList : CheclList[] = [];
  currentTab = 1;
  check = false;
  Tab = [
    {
      id: 1,
      name: 'Home',
      checked: false,
    }, {
      id: 2,
      name: 'Tab 1',
      checked: false,
    }, {
      id: 3,
      name: 'Tab 2',
      checked: false,
    }, {
      id: 4,
      name: 'Tab 3',
      checked: false,
    },
    {
      id: 5,
      name: 'Tab 4',
      checked: false,
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  onChange(id: number) {
    for (let i = 0; i < this.Tab.length; i++) {
      // tslint:disable-next-line:prefer-const
      let value = this.Tab[i];
      if (this.Tab[i].id === id) {
        this.Tab[i] = {...this.Tab[i], checked: !this.Tab[i].checked};
        if (this.Tab[i].checked == true) {
          // @ts-ignore
          this.checkList.push(this.Tab[i]);
        } else {
          // @ts-ignore
          const index = this.checkList.indexOf(value); // Lấy vị trí của phần tử trong mảng
          // @ts-ignore
          this.checkList.splice(index, 1);
        }
      }
    }
  }

  // tslint:disable-next-line:typedef
  onCLick(id: any) {
    this.currentTab = id;
  }


}
