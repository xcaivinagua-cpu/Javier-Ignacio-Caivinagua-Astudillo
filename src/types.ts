/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Photograph {
  id: string;
  title: string;
  englishTitle?: string;
  artist: string;
  year: string;
  collectionId: 'landscape' | 'urban' | 'abstract' | 'minimalist';
  description: string;
  specs: {
    camera: string;
    lens: string;
    shutter: string;
    aperture: string;
    iso: string;
  };
  imagePath: string;
  limitedEditionCount: number;
}

export interface PrintOption {
  id: string;
  name: string;
  description: string;
  dimensions: string;
  costAuthor: number;
  costPrint: number;
  totalCost: number;
  isDigital: boolean;
  material: string;
  certificateType: 'digital' | 'analog';
}

export interface CartItem {
  id: string; // unique cart item id (photoId + opacityKey)
  photo: Photograph;
  selectedOption: PrintOption;
  quantity: number;
}

export type PaymentMethod = 'stripe' | 'paypal' | 'payphone' | 'kushki' | 'transferencia';

export interface OrderDetails {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address?: string;
  zipCode?: string;
  paymentMethod: PaymentMethod;
  cartItems: CartItem[];
  totalAmount: number;
}
