import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../productservice';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-row-edit',
  templateUrl: './row-edit.component.html',
  styleUrls: ['./row-edit.component.scss'],
  providers: [MessageService],
  styles: [
    `
      :host ::ng-deep .p-cell-editing {
        padding-top: 0 !important;
        padding-bottom: 0 !important;
      }
    `,
  ],
})
export class RowEditComponent implements OnInit {
  isUniqueCode = false;
  products1: Product[] = [];

  products2: Product[] = [];
  editForm: FormGroup = new FormGroup({});

  statuses: SelectItem[] = [];

  clonedProducts: { [s: string]: Product } = {};

  constructor(
    private productService: ProductService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.productService
      .getProductsSmall()
      .then((data) => (this.products1 = data));
    this.productService
      .getProductsSmall()
      .then((data) => (this.products2 = data));

    this.statuses = [
      { label: 'In Stock', value: 'INSTOCK' },
      { label: 'Low Stock', value: 'LOWSTOCK' },
      { label: 'Out of Stock', value: 'OUTOFSTOCK' },
    ];
  }

  onRowEditInit(product: Product) {
    this.clonedProducts[product.id!] = { ...product };
  }

  onRowEditSave(product: Product, index: number) {
    if (
      product.price! > 0 &&
      product.name! != '' &&
      product.name?.length! >= 4 &&
      product.id! != ''
    ) {
      delete this.clonedProducts[product.id!];
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Product is updated',
      });
    } else {
      // this.products2[index] = this.clonedProducts[product.id!];

      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Invalid Price',
      });
    }
  }

  onRowEditCancel(product: Product, index: number) {
    this.products2[index] = this.clonedProducts[product.id!];
    delete this.clonedProducts[product.id!];
  }
  checkUniqueCode(code: string, index: number) {
    console.log(code, index);
    // this.products2.map((el,i)=>{
    //   if(i != index){
    //     if(code === el.code){

    //     }
    //   }
    // })
    this.isUniqueCode = this.products2.some((element, id) => {
      if (element.code === code && id != index) {
        return true;
      } else return false;
    });
  }
}
