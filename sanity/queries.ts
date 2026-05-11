import { client } from "./client";

export type Vehicle = {
  _id: string;
  year: number;
  make: string;
  model: string;
  trim?: string;
  price: number;
  mileage: number;
  drivetrain?: string;
  transmission?: string;
  exteriorColor?: string;
  mpgCity?: number;
  mpgHwy?: number;
  bodyStyle?: string;
  status: string;
  featured: boolean;
  images?: Array<{ asset: { _ref: string } }>;
  description?: string;
  features?: string[];
};

export async function getFeaturedVehicles(): Promise<Vehicle[]> {
  return client.fetch(
    `*[_type == "vehicle" && featured == true && status == "Available"] | order(_createdAt desc)[0...8] {
      _id, year, make, model, trim, price, mileage, drivetrain, transmission,
      exteriorColor, mpgCity, mpgHwy, bodyStyle, status, featured, images, description, features
    }`
  );
}

export async function getAllVehicles(): Promise<Vehicle[]> {
  return client.fetch(
    `*[_type == "vehicle" && status == "Available"] | order(_createdAt desc) {
      _id, year, make, model, trim, price, mileage, drivetrain, transmission,
      exteriorColor, mpgCity, mpgHwy, bodyStyle, status, featured, images, description, features
    }`
  );
}
