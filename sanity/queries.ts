import { client } from "./client";

export type Vehicle = {
  _id: string;
  slug: { current: string };
  year: number;
  make: string;
  model: string;
  trim?: string;
  price: number;
  mileage: number;
  drivetrain?: string;
  transmission?: string;
  exteriorColor?: string;
  interiorColor?: string;
  mpgCity?: number;
  mpgHwy?: number;
  vin?: string;
  stockNumber?: string;
  bodyStyle?: string;
  engine?: string;
  fuelType?: string;
  doors?: number;
  cylinders?: number;
  status: string;
  featured: boolean;
  images?: Array<{ asset: { _ref: string } }>;
  description?: string;
  features?: string[];
};

const VEHICLE_FIELDS = `
  _id, slug, year, make, model, trim, price, mileage, drivetrain, transmission,
  exteriorColor, interiorColor, mpgCity, mpgHwy, vin, stockNumber, bodyStyle,
  engine, fuelType, doors, cylinders, status, featured, images, description, features
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
