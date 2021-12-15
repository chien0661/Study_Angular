import {Component, Input, OnInit, Output} from '@angular/core';
import {UserModel} from '../model/user/user.model';
import {Subscription} from 'rxjs';
import {UserService} from '../service/user/user.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';


@Component({
  selector: 'app-trangchu',
  templateUrl: 'trangchu.component.html',
  styleUrls: ['./trangchu.component.css'],
})
export class TrangchuComponent implements OnInit {
  public checkedList: any[];

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router
  ) {
    this.filterModel = {
      id: 0,
      name: '',
      department: '',
      startDate: '',
      skills: [],
    };
    this.checkedList = [];

  }


  // Phân trang - data
  public itemPerPage = 6; // Số item trên 1 trang
  public itemTotal!: number;
  public pageTotal!: number;
  public currentItem!: number;
  public currentPage = 1;
  public indexStart!: number; // vị trí bắt đầu lấy data
  public indexStop!: number; // vị trí kết thúc lấy data
  public  z = 0;
  public  x = 0;
  public y = 0;

  // Phân trang - page
  public allPage!: [];
  public prePage!: number;
  public nextPage!: number;

  // Combobox
  public  show = true;
  public showDepartment = true;
  public change = false;
  public disable = false;

  public  getAll = false;
  public showField = false;
  public title = 'Chọn tất cả';
  public lastItem!: any;
  public  sua = false;
  public  last!: number ;
  public  submitted = false;
  public  selectDepartment!: string ;
  public userChangeForm!: FormGroup ;
  public filterModel: any;
  public dataDefault: any;
  public  dataList = [] ;
  public  id!: number ;
  public dataUser: UserModel[] = [];
  public dataUserPerPage: UserModel[] = [];
  public promise!: Promise<void>;
  public subscription!: Subscription;

  public groupSkill = [
    {
      id: 1,
      skill: 'HTML',
      checked: false,
    }, {
      id: 2,
      skill: 'CSS',
      checked: false,
    }, {
      id: 3,
      skill: 'Angular',
      checked: false,
    }, {
      id: 4,
      skill: 'MVC',
      checked: false,
    },
    {
      id: 5,
      skill: 'Spring Boot',
      checked: false,
    },
  ];

  public  departments = [
    {
      id: 1,
      name: 'Phòng phát triển',
      checked: false,
    }, {
      id: 2,
      name: 'Phòng kỹ thuật công nghệ',
      checked: false,
    }, {
      id: 3,
      name: 'Phòng giải pháp',
      checked: false,
    }, {
      id: 4,
      name: 'Phòng kiểm thử',
      checked: false,
    },
    {
      id: 5,
      name: 'Phòng tổng hợp',
      checked: false,
    },
  ];

  // tslint:disable-next-line:typedef
  public currentId: any;
  public nextId: any;

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.userChangeForm = this.formBuilder.group({
      name: new FormControl(this.filterModel.name, Validators.required),
      department: new FormControl(this.filterModel.department, Validators.required),
      startDate: new FormControl(this.filterModel.startDate, Validators.required),
      skills: new FormControl(this.filterModel.skills, Validators.required),
    });
    this.getAllUser();
  }

// tslint:disable-next-line:typedef
  getAllUser() {
    this.sua = false;
    this.userService.getAllUser().subscribe((data) => {
      this.dataUser = data;
      this.Phantrang();
    });
  }


  // tslint:disable-next-line:typedef
  createUser() {
    this.sua = true;
    this.disable = true;
    this.lastItem = this.dataUser.pop();
    this.dataUser.push(this.lastItem);
    this.dataDefault = {
      id: Number(this.lastItem.id) + 1,
      name: '',
      department: '',
      startDate: '',
      skills: [],
    };
    this.userService.createUser(this.dataDefault).subscribe(() => {
      this.getAllUser();
      this.getUserById(this.dataDefault.id);

      this.z = 1;
      this.tinhSoTrang();
      this.currentPage = this.pageTotal;
      this.Phantrang();
    });


  }

  // tslint:disable-next-line:typedef
  getUserById(id: number) {
    this.sua = true;
    // this.disable = false;
    this.userService.getById(id).subscribe(res => {
      this.filterModel.id = res.id;
      this.filterModel.name = res.name;
      this.filterModel.department = res.department;
      this.filterModel.startDate = res.startDate;
      this.filterModel.skills = res.skills;
      this.selectDepartment = this.filterModel.department;
      this.onShowList();
      this.checkedList = this.filterModel.skills;


    });
  }

  // tslint:disable-next-line:typedef
  onSaveUser() {
    this.submitted = true;
    this.filterModel.department = this.selectDepartment;
    if (this.filterModel.name !== '' && this.filterModel.department !== '' && this.filterModel.startDate !== '') {
      this.disable = false;
      this.userService.updateUser(this.filterModel, this.filterModel.id).subscribe(() => {
        this.ngOnInit();
      });
    }
    this.sua = false;
  }

  // tslint:disable-next-line:typedef
  ondeleteById(id: number) {
    if (confirm('ban co chac chan muon xoa')) {
      this.userService.deleteUser(id).subscribe(res => {
        window.location.reload();
      });
    }
  }

  // tslint:disable-next-line:typedef
  onCancel(id: number) {
    this.sua = false;
    // tslint:disable-next-line:label-position
    this.currentId = this.lastItem.id;
    this.nextId = this.currentId + 1;
    if (this.nextId === id) {
      this.userService.deleteUser(id).subscribe(res => {
        window.location.reload();
      });
    } else {
      window.location.reload();
    }
  }

  // Hàm này để lấy data và trạng trái checkbox từ Json và hiển thị
  // tslint:disable-next-line:typedef
  onShowList() {
    this.show = !this.show;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.filterModel.skills.length; i++) {
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < this.groupSkill.length; j++) {
        if (this.filterModel.skills[i] === this.groupSkill[j].skill) {
          this.groupSkill[j].checked = true; // nếu data trong JSON trùng với giá trị skill nào trong list thì giá trị đó được check
        }
      }
    }
  }

  // từ trạng thái check/uncheck bên view để lấy data
  // tslint:disable-next-line:typedef
  getSelectedValue(status: boolean, value: string) {
    this.checkedList = this.filterModel.skills;

    // Nếu được check thì thêm phần tử đó vào mảng checkedlist
    if (status) {
      // @ts-ignore
      this.checkedList.push(value);
    } else { // trường hợp uncheck thì sẽ xóa phần tử đó khỏi mảng checklist
      // @ts-ignore
      const index = this.checkedList.indexOf(value); // Lấy vị trí của phần tử trong mảng
      // @ts-ignore
      this.checkedList.splice(index, 1); // xóa 1 phần tử từ vị trí index
    }
    this.filterModel.skills = this.checkedList;

  }

  // show/hide combobox
  // tslint:disable-next-line:typedef
  onClickDepartment() {
    this.showDepartment = !this.showDepartment;
  }

  // Lấy phòng ban được chọn từ view
  // tslint:disable-next-line:typedef
  getValueDepartment(value: string) {
    this.selectDepartment = value;
  }

  // tslint:disable-next-line:typedef
  tinhSoTrang() {
    // z: khi thêm mới thì z=1
    // dataUser : data lấy được từ getAll
    this.x = Math.floor((this.dataUser.length + this.z) / this.itemPerPage); // lấy phần nguyên
    this.y = this.dataUser.length % this.itemPerPage; // lấy phần dư
  }

  // tslint:disable-next-line:typedef
  Phantrang() {
    this.tinhSoTrang();
    // data hiển thị sẽ lấy từ mảng này. ban đầu tạo mảng rỗng để push data vào
    this.dataUserPerPage = [];
    if (this.y === 0) {
      // Nếu y=0 thì tổng số trang = x
      this.pageTotal = this.x;
      this.indexStart = ((this.currentPage - 1) * this.itemPerPage); // chỉ số bắt đầu lấy data từ getAll để push vào dataUserPerPage
      this.indexStop = this.indexStart + this.itemPerPage; // chỉ số kết thức lấy data từ getAll để push vào dataUserPerPage
      for (let i = this.indexStart; i < this.indexStop; i++) {
        this.dataUserPerPage.push(this.dataUser[i]);
      }
    } else {
      // Nếu y!=0 thì tổng số trang = x+1
      this.pageTotal = this.x + 1;
      if (this.currentPage < this.pageTotal) {
        // từ trang bắt đầu đến trước trang cuối cùng thì hiển thị đủ số bản ghi quy định ( itemPerPage)
        this.indexStart = ((this.currentPage - 1) * this.itemPerPage);
        this.indexStop = this.indexStart + this.itemPerPage;
        for (let i = this.indexStart; i < this.indexStop; i++) {
          this.dataUserPerPage.push(this.dataUser[i]);
        }
      } else {
        // trang cuối cùng hiển thị data còn lại( đến +y)
        this.indexStart = ((this.currentPage - 1) * this.itemPerPage);
        this.indexStop = this.indexStart + this.y;
        for (let i = this.indexStart; i < this.indexStop; i++) {
          this.dataUserPerPage.push(this.dataUser[i]);
        }
      }
    }

    // các trang hien thị ở thanh phân trang
    this.allPage = [];
    if (this.pageTotal < 5) {
      for (let i = 1; i < this.pageTotal; i++) {
        // @ts-ignore
        this.allPage.push(i);
      }
    } else {
      if (this.currentPage <= 2) {
        for (let i = 1; i < 5; i++) {
          // @ts-ignore
          this.allPage.push(i);
        }
      } else if (this.currentPage >= (this.pageTotal - 2)) {
        for (let i = this.pageTotal - 4; i < this.pageTotal; i++) {
          // @ts-ignore
          this.allPage.push(i);
        }
      } else {
        for (let i = this.currentPage - 2; i <= this.currentPage + 2; i++) {
          // @ts-ignore
          this.allPage.push(i);
        }
      }
    }
    this.z = 0;
  }

  // Nhận page được chọn từ view và truyền vào currentPage
// tslint:disable-next-line:typedef
  setpage(page: number) {
    this.currentPage = page;
    this.Phantrang();
  }

  // tslint:disable-next-line:typedef
  Pre() {
    this.currentPage = this.currentPage - 1;
    this.Phantrang();
  }

  // tslint:disable-next-line:typedef
  Next() {
    this.currentPage = this.currentPage + 1;
    this.Phantrang();
  }


}
