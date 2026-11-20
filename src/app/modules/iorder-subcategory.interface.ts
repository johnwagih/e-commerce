export interface IAllOrders {
  shippingAddress: IShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: 'cash' | 'card';
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: IOrderUser;
  cartItems: IOrderCartItem[];
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}

export interface IShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface IOrderUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface IOrderCartItem {
  count: number;
  _id: string;
  product: IOrderProduct;
  price: number;
}

export interface IOrderProduct {
  subcategory: IOrderSubcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  imageCover: string;
  category: IOrderCategory;
  brand: IOrderBrand;
  ratingsAverage: number;
  id: string;
}

export interface IOrderSubcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface IOrderCategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface IOrderBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}