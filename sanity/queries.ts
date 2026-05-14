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

export type BodyStyleCount = { bodyStyle: string; count: number };

export async function getBodyStyleCounts(): Promise<BodyStyleCount[]> {
  // Get all vehicles and count by bodyStyle
  const vehicles: { bodyStyle?: string }[] = await client.fetch(
    `*[_type == "vehicle"] { bodyStyle }`
  );
  const counts: Record<string, number> = {};
  for (const v of vehicles) {
    const key = v.bodyStyle || "Other";
    counts[key] = (counts[key] || 0) + 1;
  }
  return Object.entries(counts)
    .map(([bodyStyle, count]) => ({ bodyStyle, count }))
    .sort((a, b) => b.count - a.count);
}

export async function getVehiclesByFilter(bodyStyle?: string): Promise<Vehicle[]> {
  const filter = bodyStyle
    ? `*[_type == "vehicle" && bodyStyle == $bodyStyle]`
    : `*[_type == "vehicle"]`;
  return client.fetch(
    `${filter} | order(featured desc, _createdAt desc) { ${VEHICLE_FIELDS} }`,
    bodyStyle ? { bodyStyle } : {}
  );
}

// ─── Blog Posts ───────────────────────────────────────────────────────────────

export type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt?: string;
  excerpt?: string;
  mainImage?: { asset: { _ref: string } };
  body?: unknown[];
  seoTitle?: string;
  seoDescription?: string;
};

const POST_FIELDS = `
  _id, title, slug, publishedAt, excerpt, mainImage, body, seoTitle, seoDescription
`;

export async function getAllPosts(): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post" && defined(publishedAt)] | order(publishedAt desc) { ${POST_FIELDS} }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function getLatestPosts(count = 3): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post" && defined(publishedAt)] | order(publishedAt desc)[0...$count] { ${POST_FIELDS} }`,
    { count },
    { next: { revalidate: 60 } }
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] { ${POST_FIELDS} }`,
    { slug },
    { next: { revalidate: 60 } }
  );
}

export async function getAllPostSlugs(): Promise<{ slug: { current: string } }[]> {
  return client.fetch(`*[_type == "post" && defined(publishedAt)] { slug }`);
}
