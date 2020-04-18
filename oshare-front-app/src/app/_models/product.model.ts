export class Product {
  title: string;
  Rate: string;
  Price: number;
  Description: string;
  ProductImage: string;
  comment: string;
  index?: number; // interfaces allow fields to be optional

  constructor(title?: string, Rate?: string, Price?: number, Description?: string, ProductImage?: string, comment?: string, index ?: number) {
    this.title = title;
    this.Rate = Rate;
    this.Price = Price;
    this.Description = Description;
    this.ProductImage = ProductImage;
    this.comment = comment;
    this.index = index;
  }
}



