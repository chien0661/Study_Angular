import {Component, OnInit} from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import {ChartService} from '../service/chart/chart.service';
import {ChartModel} from '../model/chart/chart.model';

@Component({
  selector: 'app-menu3',
  templateUrl: './menu3.component.html',
  styleUrls: ['./menu3.component.css']
})
export class Menu3Component implements OnInit {
  today = new Date();
  tenNhaThau: any[] = [];
  danhSachNam: any[] = [];
  dataGetAll: ChartModel[] = [];
  Quy1 = false;
  Nam = true;
  selectValue !: string;
  index!: number;

  constructor(private chartService: ChartService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.selectValue = this.today.getFullYear().toString(); // lấy năm hiện tại
    this.getAllData();
    setTimeout(() => {
      // Tạo 1 mảng chỉ chứa các năm
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.dataGetAll.length; i++) {
        this.danhSachNam.push(this.dataGetAll[i].nam);
      }
      this.selectData(this.selectValue); // hiển thị dữ liệu với năm được chọn, mặc định là năm hiện tại
      this.HienThiChart(); // hàm hiển thị chart
    }, 500);
  }

  // tslint:disable-next-line:typedef
  getAllData() {
    this.chartService.getAll().subscribe((res: ChartModel[]) => {
      this.dataGetAll = res;
    });
  }

  // tslint:disable-next-line:typedef
  OnChange() { // Lựa chọn hiển thị dữ liệu năm và quý
    this.Quy1 = !this.Quy1;
    this.Nam = !this.Nam;
    // @ts-ignore
    this.HienThiChart();
  }

  // tslint:disable-next-line:typedef
  selectData(nam: string) { // hàm lấy data để hiển thị theo năm đã chọn
    // @ts-ignore
    this.index = this.danhSachNam.indexOf(nam); // Tìm vị trí của năm đã chọn trong danh sách các năm
    this.HienThiChart();
  }

  // tslint:disable-next-line:typedef
  HienThiChart() {
    // Cấu hình kiểu đồ thị
    const chart = am4core.create('chartdiv', am4charts.XYChart);
    chart.padding(40, 40, 10, 40);

    // gán dữ liệu chart: lấy data ở vị trí index từ dataGetAll
    chart.data = this.dataGetAll[this.index].dulieu;
    // ẩn logo
    chart.logo.hidden = true;

    // cấu hình title
    const title = chart.titles.create();
    title.text = 'Tỷ lệ gói CHCT RG nhà thầu trúng thầu trong kỳ ' + this.selectValue;
    title.fontSize = 30;
    title.marginBottom = 30;
    // title.fontWeight = 'bold';

    // cấu hình trục Y
    const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 1;
    categoryAxis.dataFields.category = 'ten'; // trục Y lấy dữ liệu theo trường "ten"
    categoryAxis.renderer.minGridDistance = 5; // chia khoảng trên trục Y
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true; // disable lưới
    // vị trí bắt đầu, kết thúc của cột
    categoryAxis.renderer.cellStartLocation = 0.4;
    categoryAxis.renderer.cellEndLocation = 1;
    categoryAxis.renderer.dy = 15; // khoảng cách dy so với cellStartLocation

    // cấu hình trục X
    const valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minGridDistance = 50; // chia khoảng trên trục X
    // const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;

    // dữ liệu trục x sẽ lấy từ các trường có tên được định nghĩa trong seriesName
    // mặc định là lấy theo năm
    let seriesName = ['dulieunam'];

    // nếu chọn quý thì sẽ lấy theo quý
    if (this.Quy1) {
      seriesName = ['Q1'];
    }
    // vòng for để lấy được hết các cột
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < seriesName.length; i++) {
      const series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.categoryY = 'ten';
      series.dataFields.valueX = seriesName[i];
      series.name = seriesName[i];
      // bo tròn đầu cột
      series.columns.template.column.cornerRadiusBottomRight = 0;
      series.columns.template.column.cornerRadiusTopRight = 0;
      series.columns.template.tooltipText = '{valueX.value}';
      if (series.name === 'Q1') {
        series.columns.template.fill = am4core.color('#F1A140');
      }
      if (series.name === 'dulieunam') {
        series.columns.template.fill = am4core.color('#6D90EB');
      }
      // Hiện %
      chart.numberFormatter.numberFormat = '#as %';

      // cấu hình bullet
      const labelBullet = series.bullets.push(new am4charts.LabelBullet());
      labelBullet.label.horizontalCenter = 'right'; // hiển thị bên trái/phải so với vị trí dầu cột hoặc trục Y
      labelBullet.label.dx = -5; // khoảng cách từ cột y đến data hiện ở cột
      labelBullet.label.text = '{values.valueX.workingValue.formatNumber(\'#as %\')}';
      labelBullet.locationX = 0; // (0 là hiện ở trên đầu các cột còn 1 là hiện thẳng hàng) và cách trục y hoặc đầu cột 1 đoạn dx
      labelBullet.label.fill = am4core.color('#ffffff');
    }

    // export chart
    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.menu.align = 'right';
    chart.exporting.menu.verticalAlign = 'top';
    chart.exporting.menu.items = [
      {
        'label': '...',
        'menu': [
          {'type': 'png', 'label': 'PNG'},
          {'type': 'json', 'label': 'JSON'},
          // {'label': 'Print', 'type': 'print'}
        ]
      }
    ];
  }
}
