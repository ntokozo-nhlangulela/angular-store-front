export class Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  quantity: number;
  total: number;
  constructor() {
    this.title = '';
    this.id = 0;
    this.category = '';
    this.price = 0;
    this.description = '';
    this.image = '';
    this.quantity = 0;
  }
}
