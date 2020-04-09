import { Product } from './product.model';

export class ProductCount {
  public product: Product;
  public count: number;
  public id: number;

  constructor(product?: Product, count?: number, id?:number) {
      this.product = product;
      this.count = count;
      this.id = id;

  }

}

