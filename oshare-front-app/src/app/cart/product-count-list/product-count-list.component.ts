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

  productCountChange(data){
    this.listUpdate.emit(
      {id: data.id, 
        count: data.count});
  }

  productDelete(index){
    this.listProductDelete.emit(index);
  }

  ngOnInit(): void {
  }

}
