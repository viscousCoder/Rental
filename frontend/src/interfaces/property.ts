export interface Amenities {
  [key: string]: boolean;
}

export interface PropertyImage {
  url: string;
}

export interface PropertyPayload {
  propertyName: string;
  propertyType: string;
  location: string;
  monthlyRent: string;
  securityDeposit: string;
  roomType: string;
  noofrooms: string;
  description: string;
  houseRules: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  amenities: Amenities;
  images: File[]; // from <input type="file" multiple />
}
