import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { error } from 'console';
import { Iproduct } from 'src/core/models/product.model';
import { SnackBarService } from 'src/core/services/snack-bar.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnChanges {

  @Output() emitEditPrd: EventEmitter<Iproduct> = new EventEmitter<Iproduct>()
  @Output() emitRemoveId: EventEmitter<string> = new EventEmitter<string>()
  @Output() emidUpdateId: EventEmitter<string> = new EventEmitter<string>()

  constructor(private _snackBar: SnackBarService) { }

  ngOnInit(): void {
  }



  disableDeleteButton !: string
  @Input() enableDeleteButton !: string

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['enableDeleteButton']){
      this.disableDeleteButton = changes['enableDeleteButton'].currentValue
    }
  }

  @Input() products !: Iproduct[]

  onEdit(product: Iproduct) {
    this.emitEditPrd.emit(product)
    this.disableDeleteButton = product.id
    this.emidUpdateId.emit(this.disableDeleteButton)
  }

  onRemove(deletedId: string) {
    let confirmation = confirm("Are You sure, You want to delete!!!")

    if (confirmation) {
      this.emitRemoveId.emit(deletedId)
      this._snackBar.showSnackbar("Product deleted successfully!!!", "danger")
    }
  }

}
