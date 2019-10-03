import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../auth-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  //#region data
  data;
  product;
  items;
  title;
  ItemsName;
  ItemsCode;
  Description;
  cat1;
  cat2;
  cat3
  ProductName;
  ProductCode;

  //#endregion data

  //#region constructor

  constructor(private DataService: AuthServiceService) {

    this.DataService.getProduct().subscribe(data => {
      this.data = data;

      for (let i = 0; i < this.data.length; i++) {
        this.data[i].DetailProduct = JSON.parse(this.data[i].DetailProduct);                

        if (this.data[i].ProductID == 'd0506370-b111-45d5-8532-69ff00d833de') {          
          this.product = this.data[i].DetailProduct;
          this.title = this.data[i].ProductName;
        console.log(this.title);

        }
      }
    });    
  }

  onChange(value) {
    this.items = value.detail.value

    this.DataService.getProduct().subscribe(data => {
      this.data = data;
      
      for (let i = 0; i < this.data.length; i++) {
        this.data[i].DetailProduct = JSON.parse(this.data[i].DetailProduct);

        if (this.data[i].ProductID == this.items) {
          this.product = this.data[i].DetailProduct;

        }
      }
    });
  }

  detail(item) {
    console.log(item);
    this.ItemsName = item.ItemsName;
    this.ItemsCode = item.ItemsCode;
    this.Description = item.Description;
    this.cat1 = item.cat1;
    this.cat2 = item.cat2;
    this.cat3 = item.cat3
    this.ProductName = item.ProductName;
    this.ProductCode = item.ProductCode;
  }

  ngOnInit() {

  }

  //#endregion

  //#region click

  //#endregion
}
