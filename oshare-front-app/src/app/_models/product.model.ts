export class Product {
  title: string;
  Rate: string;
  Price: number;
  Description: string;
  ProductImage: string;
  comment: string;

  constructor(title?: string, Rate?: string, Price?: number, Description?: string, ProductImage?: string, comment?: string) {
    this.title = title;
    this.Rate = Rate;
    this.Price = Price;
    this.Description = Description;
    this.ProductImage = ProductImage;
    this.comment = comment;
  }
}



