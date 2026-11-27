import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { error } from 'console';
import { Iproduct } from 'src/core/models/product.model';
import { SnackBarService } from 'src/core/services/snack-bar.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  @Output() emitEditPrd: EventEmitter<Iproduct> = new EventEmitter<Iproduct>()
  @Output() emitRemoveId: EventEmitter<string> = new EventEmitter<string>()
  constructor(private _snackBar: SnackBarService) { }

  ngOnInit(): void {
  }

  @Input() products !: Iproduct[]

  onEdit(product: Iproduct) {
    this.emitEditPrd.emit(product)
  }

  onRemove(deletedId: string) {
    let confirmation = confirm("Are You sure, You want to delete!!!")

    if (confirmation) {
      this.emitRemoveId.emit(deletedId)
      this._snackBar.showSnackbar("Product deleted successfully!!!", "danger")
    }
  }

}
