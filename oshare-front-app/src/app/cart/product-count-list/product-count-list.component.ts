import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

export interface productListChangeArgs{
  index: number,
  count: number
}

@Component({
  selector: 'app-product-count-list',
  templateUrl: './product-count-list.component.html',
  styleUrls: ['./product-count-list.component.css']
})
export class ProductCountListComponent implements OnInit {

  @Input() products: Array<object>;
  @Output() listUpdate = new EventEmitter();
  @Output() listProductDelete = new EventEmitter();

  constructor() {}

  productCountChange(index, count){
    this.listUpdate.emit(
      {index: index, 
        count: count});
  }

  productDelete(index){
    this.listProductDelete.emit(index);
  }

  ngOnInit(): void {
  }

}
