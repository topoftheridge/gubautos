import { defineField, defineType } from "sanity";

export const vehicle = defineType({
  name: "vehicle",
  title: "Vehicle",
  type: "document",
  fields: [
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
    defineField({ name: "price", title: "Price ($)", type: "number", validation: (r) => r.required() }),
    defineField({ name: "mileage", title: "Mileage", type: "number", validation: (r) => r.required() }),
    defineField({ name: "stockNumber", title: "Stock #", type: "string" }),
    defineField({ name: "vin", title: "VIN", type: "string" }),
    defineField({
      name: "bodyStyle",
      title: "Body Style",
      type: "string",
      options: { list: ["Sedan", "SUV", "Truck", "Coupe", "Convertible", "Van", "Wagon", "Hatchback"] },
    }),
    defineField({
      name: "drivetrain",
      title: "Drivetrain",
      type: "string",
      options: { list: ["FWD", "RWD", "AWD", "4WD"] },
    }),
    defineField({
      name: "transmission",
      title: "Transmission",
      type: "string",
      options: { list: ["Automatic", "Manual", "CVT"] },
    }),
    defineField({ name: "engine", title: "Engine", type: "string" }),
    defineField({
      name: "fuelType",
      title: "Fuel Type",
      type: "string",
      options: { list: ["Gasoline", "Diesel", "Hybrid", "Electric", "Plug-in Hybrid"] },
    }),
    defineField({ name: "cylinders", title: "Cylinders", type: "number" }),
    defineField({ name: "doors", title: "Doors", type: "number" }),
    defineField({ name: "exteriorColor", title: "Exterior Color", type: "string" }),
    defineField({ name: "interiorColor", title: "Interior Color", type: "string" }),
    defineField({ name: "mpgCity", title: "MPG (City)", type: "number" }),
    defineField({ name: "mpgHwy", title: "MPG (Highway)", type: "number" }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["Available", "Pending", "Sold"] },
      initialValue: "Available",
    }),
    defineField({ name: "featured", title: "Featured on Homepage?", type: "boolean", initialValue: false }),
    defineField({
      name: "images",
      title: "Photos",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
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
    select: { title: "make", subtitle: "model", media: "images.0" },
    prepare({ title, subtitle, media }) {
      return { title: `${title} ${subtitle}`, media };
    },
  },
});
