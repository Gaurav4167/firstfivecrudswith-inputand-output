import { Component, Input, OnInit } from '@angular/core';
import { Iproduct } from 'src/core/models/product.model';
import { ProductService } from 'src/core/services/product.service';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss']
})
export class ProductDashboardComponent implements OnInit {

  editedProduct !: Iproduct 
  constructor( private _product : ProductService) {

   }

  ngOnInit(): void {
  }

  productsArr : Iproduct[] = this._product.fetchProducts()

  onAddNewProduct(newProduct : Iproduct){
    this.productsArr.unshift(newProduct)
  }

  onEditProduct(editedProduct : Iproduct){
    this.editedProduct = editedProduct
  }

  onUpdateProduct(updatedProduct : Iproduct){
    let getIndex = this.productsArr.findIndex(ele => ele.id = updatedProduct.id)
    this.productsArr[getIndex] = updatedProduct
  }

  removeProduct(id : string){
   let getIndex = this.productsArr.findIndex(ele => ele.id === id)
   this.productsArr.splice(getIndex,1)
  }

  

}
