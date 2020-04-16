import { ProductCount } from './product-count.model';
export class Order {
    public firstname: string;
    public lastname: string;
    public phone: string;
    public address: string;
    public date: Date;
    public productCounts : ProductCount[];
    public total: number;
    

    constructor(firstname?: string, 
        lastname?: string, 
        phone?: string, 
        address?: string, 
        date?: Date,
        productCounts?: ProductCount[],
        total?: number) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.phone = phone;
        this.address = address;
        this.date = date;
        this.productCounts = productCounts;
        this.total = total;
    }
  }