/// <reference types="vite/client" />

declare interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

declare type ShippingOption = 'normal' | 'express';
