import { defineField, defineType } from "sanity";

export const vehicle = defineType({
  name: "vehicle",
  title: "Vehicle",
  type: "document",
  fields: [
    // ── Core Identity ──
    defineField({ name: "year", title: "Year", type: "number", validation: (r) => r.required().min(1990).max(2030) }),
    defineField({ name: "make", title: "Make", type: "string", validation: (r) => r.required() }),
    defineField({ name: "model", title: "Model", type: "string", validation: (r) => r.required() }),
    defineField({ name: "trim", title: "Trim", type: "string" }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: (doc: Record<string, unknown>) => `${doc.year}-${doc.make}-${doc.model}`, maxLength: 96 },
      validation: (r) => r.required(),
    }),

    // ── Condition & Classification ──
    defineField({
      name: "condition",
      title: "Condition",
      type: "string",
      options: { list: ["Pre-owned", "New", "Certified Pre-Owned"] },
      initialValue: "Pre-owned",
    }),
    defineField({
      name: "bodyStyle",
      title: "Body Type",
      type: "string",
      options: { list: ["Sedan", "SUV", "Truck", "Coupe", "Convertible", "Van", "Minivan", "Wagon", "Hatchback"] },
    }),
    defineField({ name: "stockNumber", title: "Stock #", type: "string" }),
    defineField({ name: "vin", title: "VIN", type: "string" }),

    // ── Pricing ──
    defineField({ name: "price", title: "Sticker Price / MSRP ($)", type: "number", validation: (r) => r.required() }),
    defineField({ name: "cashDiscount", title: "Cash / Trade-In Credit ($)", type: "number", description: "Discount shown as red savings on detail page" }),

    // ── Key Stats ──
    defineField({ name: "mileage", title: "Mileage", type: "number", validation: (r) => r.required() }),
    defineField({ name: "passengers", title: "Passengers", type: "number" }),

    // ── Drivetrain & Engine ──
    defineField({
      name: "drivetrain",
      title: "Drivetrain",
      type: "string",
      options: { list: ["FWD", "RWD", "AWD", "4WD"] },
    }),
    defineField({ name: "engine", title: "Engine", type: "string", description: "e.g. V6, 3.5L" }),
    defineField({ name: "horsepower", title: "Horsepower", type: "string", description: "e.g. 302 hp @ 6600 RPM" }),
    defineField({ name: "torque", title: "Torque", type: "string", description: "e.g. 267 lb-ft @ 4700 RPM" }),
    defineField({ name: "cylinders", title: "Cylinders", type: "number" }),
    defineField({
      name: "transmission",
      title: "Transmission",
      type: "string",
      description: "e.g. 8-speed automatic",
    }),

    // ── Fuel ──
    defineField({
      name: "fuelType",
      title: "Fuel Type",
      type: "string",
      options: { list: ["Gasoline", "Diesel", "Hybrid", "Electric", "Plug-in Hybrid"] },
    }),
    defineField({ name: "fuelCapacity", title: "Fuel Capacity", type: "string", description: "e.g. 16 gallons" }),
    defineField({ name: "mpgCity", title: "MPG City", type: "number" }),
    defineField({ name: "mpgHwy", title: "MPG Highway", type: "number" }),

    // ── Colors ──
    defineField({ name: "exteriorColor", title: "Exterior Color", type: "string" }),
    defineField({ name: "interiorColor", title: "Interior Color", type: "string" }),

    // ── Dimensions & Weight ──
    defineField({ name: "gvwr", title: "Gross Vehicle Weight Rating", type: "string", description: "e.g. 4,740 lbs." }),
    defineField({ name: "dimensions", title: "Dimensions (W x L x H)", type: "string", description: 'e.g. 73.4" w x 195.9" l x 56.9" h' }),
    defineField({ name: "wheelbase", title: "Wheelbase", type: "string", description: 'e.g. 113"' }),
    defineField({ name: "doors", title: "Doors", type: "number" }),

    // ── Wheels & Tires ──
    defineField({ name: "frontWheel", title: "Front Wheel", type: "string", description: "e.g. 17.0 x 7.5" }),
    defineField({ name: "rearWheel", title: "Rear Wheel", type: "string", description: "e.g. 17.0 x 7.5" }),
    defineField({ name: "frontTire", title: "Front Tire", type: "string", description: "e.g. 215/55R17 94V" }),
    defineField({ name: "rearTire", title: "Rear Tire", type: "string", description: "e.g. 215/55R17 94V" }),

    // ── Status & Display ──
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["Available", "Pending", "Sold"] },
      initialValue: "Available",
    }),
    defineField({ name: "featured", title: "Featured on Homepage?", type: "boolean", initialValue: false }),

    // ── Media ──
    defineField({
      name: "images",
      title: "Photos",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),

    // ── Content ──
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({
      name: "features",
      title: "Features / Options",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
  ],
  preview: {
    select: { year: "year", make: "make", model: "model", media: "images.0" },
    prepare({ year, make, model, media }) {
      return { title: `${year} ${make} ${model}`, media };
    },
  },
});
