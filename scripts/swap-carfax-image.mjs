/**
 * Swaps the CarFax post's main image to a car/paperwork relevant photo.
 * Run: node scripts/swap-carfax-image.mjs
 */
import { createClient } from "@sanity/client";
import https from "https";
import { Readable } from "stream";

const client = createClient({
  projectId: "y2zf7jkl",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: "skgUXJxZl1atELY9lt7LTxudMxUdZYSzuRcz10zDt1V56tAGUpv6VEGF8lcjBW1tRWLOel6fpi5bIvapgsdWXRR0HKxkjj8bEiVR0fvawrqkvuoVJ3p48uTT5kgtrcMZW9cUsmYSSGSlkmPpUi9Xe5TUt7p83JmfWY5qgDb0bE7cOnLGop38",
  useCdn: false,
});

// Car documents / paperwork / inspection photo
const NEW_IMAGE = {
  url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=85",
  filename: "car-paperwork.jpg",
};

async function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "GubMotors/1.0" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchBuffer(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    }).on("error", reject);
  });
}

async function run() {
  console.log("Uploading new CarFax image...");
  const buf = await fetchBuffer(NEW_IMAGE.url);
  const asset = await client.assets.upload("image", Readable.from(buf), {
    filename: NEW_IMAGE.filename,
    contentType: "image/jpeg",
  });
  console.log(`✓ Uploaded → ${asset._id}`);

  const postId = await client.fetch(
    `*[_type == "post" && slug.current == "what-is-a-carfax-report"][0]._id`
  );
  if (!postId) {
    console.error("Post not found!");
    process.exit(1);
  }

  await client
    .patch(postId)
    .set({ mainImage: { _type: "image", asset: { _type: "reference", _ref: asset._id } } })
    .commit();

  console.log("✅ CarFax post image updated!");
}

run().catch(console.error);
