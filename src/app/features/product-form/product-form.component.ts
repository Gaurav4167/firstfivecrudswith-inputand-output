import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Iproduct } from 'src/core/models/product.model';
import { UuIdServiceService } from 'src/core/services/uu-id-service.service';
import { EventEmitter } from '@angular/core';
import { SnackBarService } from 'src/core/services/snack-bar.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnChanges {

  @ViewChild('formRef') formRef !: NgForm
  isInEditMode : boolean = false
  edit_id !: string 
  @Input() editedProduct !: Iproduct

  constructor(private _uuidService : UuIdServiceService,
    private _snackBar : SnackBarService
  ) { }
  // @Output() emitNewProduct : EventEmitter<Iproduct> = new EventEmitter<Iproduct>()
  @Output() emitNewProduct : EventEmitter<Iproduct> = new EventEmitter<Iproduct>()
  @Output() emitUpdatedProduct : EventEmitter<Iproduct> = new EventEmitter<Iproduct>()

  ngOnInit(): void {

  }
  
  ngOnChanges(changes: SimpleChanges): void {
    // this.isInEditMode = true
    let editProd = changes['editedProduct'].currentValue
    if(editProd){
      this.isInEditMode = true
      this.edit_id = editProd.id
      setTimeout(() => {
        this.formRef.form.patchValue(editProd)
      })
    }
  }
  onAddNewProduct(){
    let newProduct : Iproduct = {...this.formRef.form.value, id : this._uuidService.uniqueId()}
    // console.log(newProduct)
    this.emitNewProduct.emit(newProduct)
    this.formRef.form.reset()
     this._snackBar.showSnackbar("Product Added successfully!!!", 'success')

  }

  onUpdate(){
    let updatedProduct : Iproduct = {...this.formRef.form.value, id : this.edit_id}
    this.edit_id = ''
    this.emitUpdatedProduct.emit(updatedProduct)
     this.formRef.form.reset()
     this._snackBar.showSnackbar("Product updated successfully!!!", "success")
     this.isInEditMode = false

  }

  


}
