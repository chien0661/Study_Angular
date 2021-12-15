import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-menu2',
  templateUrl: './menu2.component.html',
  styleUrls: ['./menu2.component.css']
})
export class Menu2Component implements OnInit {

  constructor(
    public translate: TranslateService
  ) {
    translate.addLangs(['vn', 'en']);
    translate.setDefaultLang('vn');
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  switchLang(lang: string) {
    this.translate.use(lang);
  }

}
