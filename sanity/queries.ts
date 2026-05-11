import { client } from "./client";

export type Vehicle = {
  _id: string;
  slug?: { current: string };
  year: number;
  make: string;
  model: string;
  trim?: string;
  condition?: string;
  bodyStyle?: string;
  stockNumber?: string;
  vin?: string;
  price: number;
  cashDiscount?: number;
  mileage: number;
  passengers?: number;
  drivetrain?: string;
  engine?: string;
  horsepower?: string;
  torque?: string;
  cylinders?: number;
  transmission?: string;
  fuelType?: string;
  fuelCapacity?: string;
  mpgCity?: number;
  mpgHwy?: number;
  exteriorColor?: string;
  interiorColor?: string;
  gvwr?: string;
  dimensions?: string;
  wheelbase?: string;
  doors?: number;
  frontWheel?: string;
  rearWheel?: string;
  frontTire?: string;
  rearTire?: string;
  status: string;
  featured: boolean;
  images?: Array<{ asset: { _ref: string } }>;
  description?: string;
  features?: string[];
};

const VEHICLE_FIELDS = `
  _id, slug, year, make, model, trim, condition, bodyStyle, stockNumber, vin,
  price, cashDiscount, mileage, passengers, drivetrain, engine, horsepower, torque,
  cylinders, transmission, fuelType, fuelCapacity, mpgCity, mpgHwy,
  exteriorColor, interiorColor, gvwr, dimensions, wheelbase, doors,
  frontWheel, rearWheel, frontTire, rearTire,
  status, featured, images, description, features
`;

export async function getFeaturedVehicles(): Promise<Vehicle[]> {
  return client.fetch(
    `*[_type == "vehicle" && featured == true && status == "Available"] | order(_createdAt desc)[0...8] { ${VEHICLE_FIELDS} }`
  );
}

export async function getAllVehicles(): Promise<Vehicle[]> {
  return client.fetch(
    `*[_type == "vehicle"] | order(featured desc, _createdAt desc) { ${VEHICLE_FIELDS} }`
  );
}

export async function getVehicleBySlug(slug: string): Promise<Vehicle | null> {
  return client.fetch(
    `*[_type == "vehicle" && (slug.current == $slug || _id == $slug)][0] { ${VEHICLE_FIELDS} }`,
    { slug }
  );
}

export async function getAllVehicleSlugs(): Promise<{ _id: string; slug?: { current: string } }[]> {
  return client.fetch(`*[_type == "vehicle"] { _id, slug }`);
}
