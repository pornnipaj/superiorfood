import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../auth-service.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
})
export class OverviewPage implements OnInit {

  data: any;
  Today;
  month;
  intMonth;
  intYear;
  textShow;
  all;
  finish;
  form :any = {
    month : '',
    year : ''
  };
  test:any;

  constructor(public DataService: AuthServiceService) {
    this.ChangeMonth();

    this.Today = new Date();
    this.DataService.getJobDetail().subscribe(data => {
      this.data = data;
      // console.log(this.data);
    });
  }

  // onchangeMonth(type) {

  //   // const year = new Date().getFullYear();
  //   // this.intYear = year;  
  //   // console.log(type);

  //   if (this.month != '') {
  //     this.ChangeMonth();
  //     console.log(this.intMonth);
  //     console.log(this.month);   
  //   }
  //   if (type == 'now') {
  //     this.ChangeMonth();
  //     console.log(this.intMonth);
  //     console.log(this.month); 
  //   }
  //   if (type == 'back') { 
  //     this.intMonth = this.intMonth - 1 
  //     console.log(this.intMonth);
  //   }
  //   if (type == 'next') {
  //     this.ChangeMonth();
  //     this.intMonth+1
  //     console.log(this.intMonth);
  //   }    
  // }

  ChangeMonth() {
    const month = new Date().getMonth() + 1;
    this.intMonth = month;
    const year = new Date().getFullYear();
    this.intYear = year;

    //#region changemonth  
    if (month == 1) {
      this.month = 'มกราคม'
      this.intMonth = 1;
      this.textShow = this.month + " " + this.intYear
    }
    if (month == 2) {
      this.month = 'กุมภาพันธ์'
      this.intMonth = 2;
      this.textShow = this.month + " " + this.intYear
    }
    if (month == 3) {
      this.month = 'มีนาคม'
      this.intMonth = 3;
      this.textShow = this.month + " " + this.intYear
    }
    if (month == 4) {
      this.month = 'เมษายน'
      this.intMonth = 4;
      this.textShow = this.month + " " + this.intYear
    }
    if (month == 5) {
      this.month = 'พฤษภาคม'
      this.intMonth = 5;
      this.textShow = this.month + " " + this.intYear
    }
    if (month == 6) {
      this.month = 'มิถุนายน'
      this.intMonth = 6;
      this.textShow = this.month + " " + this.intYear
    }
    if (this.intMonth == 7) {
      this.month = 'กรกฎาคม'
      this.intMonth = 7;
      this.textShow = this.month + " " + this.intYear
    }
    if (this.intMonth == 8) {
      this.month = 'สิงหาคม'
      this.all = '8';
      this.finish = '8';
      this.intMonth = 8;
      this.textShow = this.month + " " + this.intYear
    }
    if (this.intMonth == 9) {
      this.month = 'กันยายน'
      this.all = '9';
      this.finish = '9';
      this.intMonth = 9;
      this.textShow = this.month + " " + this.intYear
    }
    if (this.intMonth == 10) {
      this.month = 'ตุลาคม'
      this.all = '10';
      this.finish = '10';
      this.intMonth = 10;
      this.textShow = this.month + " " + this.intYear
    }
    if (month == 11) {
      this.month = 'พฤศจิกายน'
      this.intMonth = 11;
      this.textShow = this.month + " " + this.intYear
    }
    if (month == 12) {
      this.month = 'ธันวาคม'
      this.intMonth = 12;
      this.textShow = this.month + " " + this.intYear
    }
    //#endregion

    // if (this.intYear > year) {
    //   this.intYear = year
    // }
    console.log(this.intMonth)
    console.log(this.intYear)
  }

  changeMonthNext() {
    // const year = new Date().getFullYear();
    //#region nextmonth
    if (this.month == 'มกราคม') {
      this.month = 'กุมภาพันธ์'
      this.all = '2';
      this.finish = '2';
      this.intMonth = 2;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'กุมภาพันธ์') {
      this.month = 'มีนาคม'
      this.all = '3';
      this.finish = '3';
      this.intMonth = 3;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'มีนาคม') {
      this.month = 'เมษายน'
      this.all = '4';
      this.finish = '4';
      this.intMonth = 4;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'เมษายน') {
      this.month = 'พฤษภาคม'
      this.all = '5';
      this.finish = '5';
      this.intMonth = 5;
    }
    else if (this.month == 'พฤษภาคม') {
      this.month = 'มิถุนายน'
      this.all = '6';
      this.finish = '6';
      this.intMonth = 6;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'มิถุนายน') {
      this.month = 'กรกฎาคม'
      this.all = '7';
      this.finish = '7';
      this.intMonth = 7;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'กรกฎาคม') {
      this.month = 'สิงหาคม'
      this.all = '8';
      this.finish = '8';
      this.intMonth = 8;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'สิงหาคม') {
      this.month = 'กันยายน'
      this.all = '9';
      this.finish = '9';
      this.intMonth = 9;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'กันยายน') {
      this.month = 'ตุลาคม'
      this.all = '10';
      this.finish = '10';
      this.intMonth = 10;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'ตุลาคม') {
      this.month = 'พฤศจิกายน'
      this.all = '11';
      this.finish = '11';
      this.intMonth = 11;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'พฤศจิกายน') {
      this.month = 'ธันวาคม'
      this.all = '12';
      this.finish = '12';
      this.intMonth = 12;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'ธันวาคม') {
      this.month = 'มกราคม'
      this.intMonth = 1;
      this.intYear = this.intYear + 1
      this.textShow = this.month + " " + this.intYear
    }
    // if (this.intYear > year) {
    //   this.intYear = year
    // }
    //#endregion
    console.log(this.intMonth)
    console.log(this.intYear)
  }

  changeMonthBack() {
    //#region 
    if (this.month == 'มกราคม') {
      this.month = 'ธันวาคม'
      this.intMonth = 12;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'กุมภาพันธ์') {
      this.month = 'มกราคม'
      this.intMonth = 1;
      this.textShow = this.month + " " + this.intYear
      this.intYear = this.intYear - 1
    }
    else if (this.month == 'มีนาคม') {
      this.month = 'กุมภาพันธ์'
      this.intMonth = 2;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'เมษายน') {
      this.month = 'มีนาคม'
      this.intMonth = 3;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'พฤษภาคม') {
      this.month = 'เมษายน'
      this.intMonth = 4;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'มิถุนายน') {
      this.month = 'พฤษภาคม'
      this.intMonth = 5;
      this.textShow = this.month + " " + this.intYear
      console.log(this.intMonth);
    }
    else if (this.month == 'กรกฎาคม') {
      this.month = 'มิถุนายน'
      this.intMonth = 6;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'สิงหาคม') {
      this.month = 'กรกฎาคม'
      this.intMonth = 7;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'กันยายน') {
      this.month = 'สิงหาคม'
      this.all = '8';
      this.finish = '8';
      this.intMonth = 8;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'ตุลาคม') {
      this.month = 'กันยายน'
      this.all = '9';
      this.finish = '9';
      this.intMonth = 9;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'พฤศจิกายน') {
      this.month = 'ตุลาคม'
      this.all = '10';
      this.finish = '10';
      this.intMonth = 10;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'ธันวาคม') {
      this.month = 'พฤศจิกายน'
      this.intMonth = 11;
      this.textShow = this.month + " " + this.intYear
    }

    //#endregion
    console.log(this.intMonth)
    console.log(this.intYear)
  }

  insert() {
    this.form.month = this.intMonth
    this.form.year = this.intYear
    this.test = "123"    
    alert(this.DataService.insert(this.test));
    this.DataService.insert(this.test).then((data) => {
      console.log(data);
    },(err) => {
      console.log(err);
      
    });
  }
  OnPostJSON() {   
      //Receipt
      var documentData = {
          "DocTypeID": "5",
          "DocID": "M19H00068",
          "Email": "patchank@scg.com",
          "LineID": "aimmilulu",
          "EnName": "SCG Logistics Management",
          "JobName": "", "DocDetailList": [{ "Origin": "ตำบล หลังสวน, ตำบล หลังสวน อำเภอ หลังสวน ชุมพร 86110 ประเทศไทย", "TruckMaxWeight": "2.500", "PONo": "PO19H0008", "ShipperRequestID": "110", "ConfirmDate": "2019-08-08 23:09:58.0", "Product": "สินค้าเกษตร", "AdminRemarks": "", "OrderID": "M19H00068", "Loc3ContactName": "", "CreateDate": "2019-08-07 22:10:02.0", "ShipperID": "77", "DeadheadDestination": "0.000", "DestinationLongitude": "100.536541", "UpdateDate": "2019-08-09 15:30:18.0", "Loc4Longitude": "0.000000", "Loc3Time": "", "Remarks": "", "Loc1Label": "จุดที่ 1: รับสินค้า", "DestinationName": "กรุงเทพมหานคร", "PickUpTime": "", "Loc4Latitude": "0.000000", "Loc4PlaceID": "", "ID": "68", "BillingNo": "", "Loc1Type": "1", "Loc3PlaceID": "", "Distance": "532483.000", "Loc4Time": "", "Status": "6", "OriginContactName": "คุณหนูแดง", "Loc4Name": "", "Loc4Detail": "", "DestinationContactTel": "086-885-1360", "DestinationPlaceID": "ChIJd0Wbks6e4jAR3MWLIOib5Eg", "Loc2Label": "จุดที่ 2: ส่งสินค้า", "ConfirmUserID": "254", "Loc3Name": "", "Weight": "2.500", "WHTNo": "", "Loc4": "", "DeliveryTemplateID": "2", "CarrierID": "5", "DeadheadOrigin": "0.000", "Valid": "false", "NoOfTrucks": "1", "Loc3": "", "QoutationNo": "QT19H0007", "DestinationLatitude": "100.536541", "DestinationDate": "2019-08-10 00:00:00.0", "DestinationContactName": "คุณสรศักดิ", "Destination": "11/5 ราชดำริ แขวง ปทุมวัน เขตปทุมวัน กรุงเทพมหานคร 10330 ประเทศไทย", "PickUpToDate": "2019-08-08 00:00:00.0", "OriginPlaceID": "ChIJf6mPmg56VjAREDE4LLwjAgQ", "DriverName": "", "Confirm": "1", "DriverLineID": "", "Loc4Type": "0", "UserID": "254", "PickUpFormDate": "2019-08-08 00:00:00.0", "TruckLicenseID": "", "ReceiptNo": "", "Loc3ContactTel": "", "OriginDetail": "อำเภอหลังสวน จังหวัดชุมพรnสหกรณ์การเกษตร หลังสวน", "DestinationTime": "10.00", "SpecialRequest": "รับสินค้าที่ต้นทาง 21.00 น. วันที่ 8 สค. ส่งถึงปลายทางภายใน 08.00 น. วันที่ 9 สค.nnรถเป็นปิคอัพคอกสูงสำหรับขนผลไม้", "BuyingPrice": "6500.000", "HandlingUnitID": "6", "Loc2Type": "2", "Loc3Latitude": "0.000000", "Loc3Date": "2019-08-09 00:00:00.0", "InvoiceNo": "IV19H0006", "DeliveryOrderHeaderID": "68", "ProductID": "4", "SourceLatitude": "9.948601", "ProductRemark": "มังคุดบรรจุกล่อง", "SourceLongitude": "99.081991", "OriginContactTel": "087-277-1441", "OriginName": "อำเภอหลังสวน,จ.ชุมพร", "DestinationDetail": "ร้านโครงการหลวง สาขาเซ็นทรัลเวิลด์", "Loc4ContactName": "", "UnitPrice": "6800.000", "CarrierRequestID": "0", "BookingNo": "BK19H0005", "TruckType": "4 ล้อ ตู้ทึบ", "HandlingUnit": "Box - กล่อง", "Loc4ContactTel": "", "Loc4Date": "2019-08-09 00:00:00.0", "Loc3Longitude": "0.000000", "TruckTypeID": "2", "Loc3Type": "0", "Loc3Detail": "", "DriverContact": "" }], "Photo": "", "Latitude": "0.000000", "CreditTerm": "7", "Subdistrict": "102901", "CreateDate": "2019-02-22 08:38:07.0", "Name": "พัชญ์ชนก", "ReferCode": "", "CompanyAddress": "เลขที่ 1 ถนนปูนซิเมนต์ไทย  เขตบางซื่อ บางซื่อ กรุงเทพมหานคร 10800", "CompanyName": "บจก. เอสซีจี โลจิสติกส์ แมเนจเม้นท์", "UpdateDate": "2019-08-09", "PhoneNo": "0614105517", "UserID": "176", "GetReferByCode": "", "Zipcode": "10800", "ID": "77", "Notes": "", "Status": "1", "ItemTax": "1", "Tier": "1", "TaxTypeID": "53", "InvoiceNo": "IV19H0006", "TaxID": "0105533060315", "CompanyType": "1", "Longitude": "0.000000", "ItemVat": "7", "Province": "10", "SaleName": "แพรวพรรณ", "OrderDate": "2019-08-09", "PrintType": "1", "DocRemarks": "", "OwnerID": "77", "Valid": "false", "RegisProgress": "50", "Volume": "0.000", "FullName": "พัชญ์ชนก คุ้มพิทักษ์", "Tel": "", "LastName": "คุ้มพิทักษ์", "District": "1029"
      }

      $.ajax({
          //url: 'Docs/Quotation',
          //url: 'Docs/Booking',
          //url: 'Docs/PO',
          //url: 'Docs/Invoice',
          url: 'http://localhost:41603/API/Receipt.aspx',
          //url: 'Docs/Billing',
          //url: 'Docs/Withholding',
          //url:'OLogout.ashx',
          type: 'post',
          dataType: 'json',
          contentType: 'application/json',
          data: JSON.stringify(documentData),
          success: function (data) {
              console.log('--Success--');
              console.log(data);             
          },
          error: function (result) {
              //alert('failed');
              console.log('--fail--');
              console.log(result);             
          }
      });
  }     
  ngOnInit() {
  }
  // getDate(){
  //   var today = new Date();
  // var dd = String(today.getDate()).padStart(2, '0');
  // var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  // var yyyy = today.getFullYear();

  // this.Today = mm + '/' + dd + '/' + yyyy;
  // console.log(this.Today);
  // }
}
