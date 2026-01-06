
export type Category = 'Mochilas' | 'Juguetes' | 'Accesorios' | 'Mini electrónicos' | 'Regalos' | 'Librería y Hogar';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  phonePrefix: string;
  phone: string;
  email: string;
  comments: string;
}

export interface EmailValidationResult {
  isValid: boolean;
  message: string;
  score?: number;
}
