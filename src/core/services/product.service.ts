import { Injectable } from '@angular/core';
import { Iproduct } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  productsArr: Iproduct[] = [
    {
      id: "101",
      pName: "Laptop",
      category: "Electronics",
      price: 55000,
      quantity: 10
    },
    {
      id: "102",
      pName: "Smartphone",
      category: "Electronics",
      price: 25000,
      quantity: 15
    },
    {
      id: "103",
      pName: "Headphones",
      category: "Accessories",
      price: 2000,
      quantity: 25
    },
    {
      id: "104",
      pName: "Office Chair",
      category: "Furniture",
      price: 7500,
      quantity: 8
    },
    {
      id: "105",
      pName: "Keyboard",
      category: "Accessories",
      price: 1500,
      quantity: 20
    }
  ];


  fetchProducts() : Iproduct[]{
    return this.productsArr
  }


}
