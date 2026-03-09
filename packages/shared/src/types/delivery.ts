export interface NovaPoshtaCity {
  ref: string;
  name: string;
  area: string;
}

export interface NovaPoshtaWarehouse {
  ref: string;
  number: string;
  name: string;
  address: string;
  cityRef: string;
}

export interface DeliveryCalculation {
  cost: number;
  estimatedDays: number;
}

export interface DeliveryCalculateRequest {
  citySender: string;
  cityRecipient: string;
  weight: number;
  cost: number;
}
