/**
 * Seed script — creates 6 blog posts in Sanity with real Unsplash images.
 * Run: node scripts/seed-posts.mjs
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

// Unsplash images (car / road / finance themed) — direct source URLs
const IMAGES = [
  { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80", filename: "car-financing.jpg" },
  { url: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&q=80", filename: "used-car-check.jpg" },
  { url: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200&q=80", filename: "suv-sedan.jpg" },
  { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80", filename: "carfax.jpg" },
  { url: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&q=80", filename: "trade-in.jpg" },
  { url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80", filename: "awd-winter.jpg" },
];

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

async function uploadImage(img) {
  console.log(`  ↑ Uploading ${img.filename}...`);
  const buf = await fetchBuffer(img.url);
  const asset = await client.assets.upload("image", Readable.from(buf), {
    filename: img.filename,
    contentType: "image/jpeg",
  });
  console.log(`  ✓ ${img.filename} → ${asset._id}`);
  return asset._id;
}

function makeBlock(text) {
  return {
    _type: "block",
    _key: Math.random().toString(36).slice(2),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: Math.random().toString(36).slice(2), text, marks: [] }],
  };
}

function makeH2(text) {
  return {
    _type: "block",
    _key: Math.random().toString(36).slice(2),
    style: "h2",
    markDefs: [],
    children: [{ _type: "span", _key: Math.random().toString(36).slice(2), text, marks: [] }],
  };
}

function makeH3(text) {
  return {
    _type: "block",
    _key: Math.random().toString(36).slice(2),
    style: "h3",
    markDefs: [],
    children: [{ _type: "span", _key: Math.random().toString(36).slice(2), text, marks: [] }],
  };
}

const POSTS = [
  {
    title: "How to Get Approved for Auto Financing with Bad Credit",
    slug: "auto-financing-bad-credit",
    publishedAt: "2025-03-10T12:00:00Z",
    excerpt: "Bad credit doesn't mean no car. Here's exactly how GubMotors helps customers with all credit types get on the road — and what you can do to improve your chances before you apply.",
    imageIndex: 0,
    seoTitle: "Bad Credit Auto Financing | GubMotors — Bucks County, PA",
    seoDescription: "GubMotors works with all credit types. Learn how to get approved for a car loan with bad credit in Bucks County and Philadelphia, PA.",
    body: [
      makeBlock("If you've been turned down for an auto loan before, you're not alone. Millions of Americans have less-than-perfect credit — and millions of them still drive off car lots every year. At GubMotors, we've helped over 2,000 customers find financing regardless of their credit history. Here's how it works."),
      makeH2("Why Bad Credit Doesn't Mean No Car"),
      makeBlock("Traditional banks are conservative. They use rigid credit score cutoffs that don't tell the whole story. But GubMotors works with a network of 12+ specialized lenders who evaluate your complete financial picture — your income, employment history, down payment, and more."),
      makeBlock("A credit score is a snapshot, not a sentence. Someone who went through a rough patch two years ago but has been steady since can absolutely get approved. We see it every week."),
      makeH2("What Lenders Actually Look At"),
      makeH3("Income and Employment"),
      makeBlock("Steady income is the single biggest factor for subprime lenders. Most want to see at least $1,500–$2,000/month take-home and at least 6 months at your current job. Self-employed? Bring your last two years of tax returns."),
      makeH3("Down Payment"),
      makeBlock("Putting money down signals commitment and reduces lender risk. Even $500–$1,000 down can be the difference between approval and denial. If you have a trade-in, that counts too."),
      makeH3("Debt-to-Income Ratio"),
      makeBlock("Lenders look at what percentage of your monthly income goes to existing debt payments. Keeping this below 40–45% puts you in a much better position."),
      makeH2("Steps to Take Before You Apply"),
      makeBlock("1. Pull your free credit report at AnnualCreditReport.com and dispute any errors — they're more common than you'd think.\n\n2. If possible, pay down any high-utilization credit cards before applying.\n\n3. Save up at least a small down payment if you can.\n\n4. Gather your documents: pay stubs, ID, proof of insurance, and proof of residence."),
      makeH2("How GubMotors Makes It Easier"),
      makeBlock("Our finance team, led by Diane Torres, has seen every credit situation imaginable. We submit your application to multiple lenders simultaneously to find the best rate and terms — not just whoever will approve it, but whoever will approve it well. We'll walk you through the numbers honestly and never bury you in a payment you can't afford."),
      makeBlock("Ready to see what you qualify for? Stop by our Bucks County lot or give us a call. There's no obligation and no hard pull until you're ready to move forward."),
    ],
  },
  {
    title: "Top 5 Things to Check Before Buying a Used Car",
    slug: "things-to-check-before-buying-used-car",
    publishedAt: "2025-04-02T12:00:00Z",
    excerpt: "Don't skip these five checks before you sign anything. A little due diligence goes a long way on a pre-owned purchase and can save you thousands down the line.",
    imageIndex: 1,
    seoTitle: "5 Things to Check Before Buying a Used Car | GubMotors Blog",
    seoDescription: "Before you buy a pre-owned vehicle, run through these five critical checks. GubMotors breaks down exactly what to look for on any used car lot.",
    body: [
      makeBlock("Buying a used car is one of the biggest purchases most people make. The difference between a great deal and a money pit often comes down to a few simple checks that most buyers skip. Here are the five things we'd never skip before signing — and we've sold a lot of cars."),
      makeH2("1. Vehicle History Report (CarFax or AutoCheck)"),
      makeBlock("Before you fall in love with the car, check the history. A VIN report reveals accident history, title problems (salvage, flood, lemon law buyback), service records, and odometer discrepancies. At GubMotors, every vehicle comes with a CarFax — it's non-negotiable. If a dealer won't provide one, walk away."),
      makeH2("2. Independent Pre-Purchase Inspection"),
      makeBlock("Even if the dealer has their own inspection on file, spending $100–$150 for an independent mechanic to put the car on a lift is money extremely well spent. They'll check things most buyers can't: frame condition, suspension wear, hidden rust, fluid leaks, and more. Any honest dealer will let you do this — be wary of one who won't."),
      makeH2("3. Test Drive — For Real"),
      makeBlock("A parking lot lap tells you almost nothing. Drive the car on the highway. Merge at speed. Brake hard in a safe area. Listen for rattles, pulls, vibrations, or hesitation. Test all the electronics — windows, HVAC, infotainment, backup camera. Turn the AC on max cold and the heat on max hot. These systems are expensive to fix."),
      makeH2("4. Exterior and Undercarriage Visual"),
      makeBlock("Walk around the car slowly in good lighting. Look for mismatched paint panels (signs of a repair), uneven panel gaps (signs of frame damage or poor bodywork), and rust — especially underneath, around wheel wells, and along door bottoms. A little surface rust is normal in Pennsylvania. Structural rust is a deal-breaker."),
      makeH2("5. Title and Lien Check"),
      makeBlock("Make sure the title is clean and in the seller's name. If there's an outstanding loan on the vehicle, the lender technically owns it until paid off. At a dealership like GubMotors, all titles are cleared before delivery — but on private sales, this is critical. You can check for liens through your state's DMV or a title search service."),
      makeBlock("Taking two hours to do these five things properly can save you from a $5,000 mistake. At GubMotors, we do this work upfront on every vehicle so you don't have to worry — but the same habits apply anywhere you buy."),
    ],
  },
  {
    title: "SUV vs Sedan: Which Is Right for Your Family?",
    slug: "suv-vs-sedan-which-is-right-for-your-family",
    publishedAt: "2025-04-18T12:00:00Z",
    excerpt: "Fuel economy, cargo space, third-row seating, ground clearance — we break down the real differences so you can pick the right body style with confidence.",
    imageIndex: 2,
    seoTitle: "SUV vs Sedan: Which Should You Buy? | GubMotors Blog",
    seoDescription: "Choosing between an SUV and a sedan? GubMotors breaks down the pros and cons of each to help Bucks County families make the right call.",
    body: [
      makeBlock("It's the most common question we hear from family car shoppers: SUV or sedan? Both categories have exploded in quality over the past decade. The answer depends entirely on how you live — not on what's trending in car commercials."),
      makeH2("The Case for an SUV"),
      makeH3("Space and Versatility"),
      makeBlock("If you have kids, a dog, sports equipment, or you regularly haul things, an SUV's cargo area is genuinely transformative. Most mid-size SUVs offer 35–40 cubic feet behind the rear seats — and with seats folded, you're looking at 70–80+ cubic feet. Sedans typically max out around 15 cubic feet in the trunk."),
      makeH3("Ground Clearance and AWD"),
      makeBlock("Pennsylvania winters and the occasional rough road make ground clearance matter more than people think. Most SUVs sit 7–9 inches off the ground vs. 5–6 for sedans. Pair that with AWD and you've got a significantly more capable vehicle in bad conditions."),
      makeH3("Towing"),
      makeBlock("Even a compact SUV can typically tow 1,500–3,500 lbs — enough for a small trailer, jet ski, or camper. Most sedans are rated for zero towing."),
      makeH2("The Case for a Sedan"),
      makeH3("Fuel Economy"),
      makeBlock("Sedans win here, consistently. A Honda Accord averages 30+ MPG combined. A Honda Pilot (similar price) averages 22–23 MPG. At $3.50/gallon and 15,000 miles/year, that's nearly $500/year in savings — more if you drive a lot."),
      makeH3("Handling and Driver Experience"),
      makeBlock("Sedans sit lower, have a lower center of gravity, and generally handle better in corners. If you enjoy driving — not just transporting things — a well-sorted sedan delivers a more engaging experience."),
      makeH3("Price"),
      makeBlock("Sedans are almost universally cheaper to buy, insure, and maintain than comparable SUVs. If budget is tight, a well-equipped sedan often delivers more car per dollar."),
      makeH2("The Bottom Line"),
      makeBlock("Get an SUV if: you have a growing family, regularly haul cargo, drive in snow, or value flexibility. Get a sedan if: it's mainly a commuter, you're driving solo or with one passenger most of the time, or fuel costs are a priority."),
      makeBlock("At GubMotors we carry both — and our sales team isn't incentivized to push you toward a higher-priced vehicle. Tell us how you live and we'll match you to the right car."),
    ],
  },
  {
    title: "What Is a CarFax Report and Why Does It Matter?",
    slug: "what-is-a-carfax-report",
    publishedAt: "2025-05-01T12:00:00Z",
    excerpt: "A vehicle history report can reveal accidents, title problems, odometer fraud, and more. We explain what to look for and why GubMotors includes CarFax on every vehicle.",
    imageIndex: 3,
    seoTitle: "What Is a CarFax Report? | GubMotors Blog — Bucks County PA",
    seoDescription: "CarFax reports reveal accidents, title issues, and odometer fraud on used cars. Learn what to look for and why GubMotors provides one on every vehicle.",
    body: [
      makeBlock("You've seen the ads. \"Show me the CarFax!\" But a lot of buyers aren't sure what a CarFax report actually tells them — or what to look for when they get one. Here's a plain-English breakdown."),
      makeH2("What Is a CarFax Report?"),
      makeBlock("A CarFax (or AutoCheck) report is a vehicle history document generated from a car's VIN (Vehicle Identification Number). It pulls data from thousands of sources — DMVs, insurance companies, police departments, auction records, and service shops — to build a timeline of the vehicle's life."),
      makeH2("What a CarFax Shows You"),
      makeH3("Accident and Damage History"),
      makeBlock("This is the big one. CarFax reports accidents that were reported to insurance companies or police. Minor fender-benders often don't show up — but significant damage typically does. Pay attention to the severity category (minor, moderate, severe) and which area of the vehicle was affected. Front-end and rear-end damage heals well. Structural/frame damage is a red flag."),
      makeH3("Title History"),
      makeBlock("The title section will tell you if the car has been branded as: Salvage (declared a total loss), Flood damage, Lemon law buyback, Rebuilt (was salvage but repaired), or Odometer rollback. Any of these significantly affects value and reliability. Avoid salvage and flood titles unless you know exactly what you're doing."),
      makeH3("Number of Owners and Usage Type"),
      makeBlock("How many people owned it? Was it a personal vehicle, fleet vehicle (rental, corporate), or taxi/rideshare? Fleet and rental cars often have high mileage but regular maintenance. Rideshare vehicles can have serious interior wear and above-average mechanical stress."),
      makeH3("Service and Maintenance Records"),
      makeBlock("If the previous owner took the car to a dealer or reporting shop for oil changes and service, those records appear here. A well-documented service history is a great sign. A total absence of records isn't necessarily bad — many people use non-reporting shops — but it's worth asking about."),
      makeH2("What CarFax Doesn't Show"),
      makeBlock("CarFax has real limitations. It only shows reported incidents. A car can have significant unreported damage — especially from private-party repairs. It won't tell you about mechanical issues, deferred maintenance, or how hard the car was driven. This is why an independent inspection is still worth doing even on a clean CarFax."),
      makeH2("CarFax at GubMotors"),
      makeBlock("Every vehicle on our lot comes with a full CarFax report, no charge. We review them ourselves before pricing — a car with accident history is priced accordingly. We believe transparency is how you earn repeat business and referrals, and 500+ five-star reviews suggest that approach is working."),
    ],
  },
  {
    title: "Trade-In Tips: How to Get the Most for Your Current Car",
    slug: "trade-in-tips-get-most-for-your-car",
    publishedAt: "2025-05-08T12:00:00Z",
    excerpt: "Timing, condition, and negotiation all affect your trade-in value. Here's how to walk in prepared and walk out with the best deal on your current vehicle.",
    imageIndex: 4,
    seoTitle: "How to Maximize Your Trade-In Value | GubMotors Blog",
    seoDescription: "Get the most for your trade-in at GubMotors. Expert tips on timing, prep, and negotiation to maximize your car's value in Bucks County, PA.",
    body: [
      makeBlock("Your trade-in is money. Most people leave some of it on the table. Here's how to walk into any dealership — including ours — and get the number you deserve."),
      makeH2("Know Your Car's Market Value Before You Go"),
      makeBlock("Spend 20 minutes on KBB.com, Edmunds, and CarGurus before stepping foot on a lot. Get the trade-in value range for your exact car — year, make, model, trim, mileage, condition. This takes your trade-in value from a mystery to a benchmark. Dealers know exactly what your car is worth. Now you will too."),
      makeH2("Clean the Car — Seriously"),
      makeBlock("This sounds obvious but it gets overlooked constantly. A clean, well-presented car signals that it was cared for. Spend $20 on a full detail — inside and out. Fix any cheap cosmetic issues (burned-out bulbs, missing floor mats, cracked trim pieces). You won't get dollar-for-dollar return, but a clean car consistently appraises higher than a dirty one."),
      makeH2("Gather Your Documentation"),
      makeBlock("Bring the title (or know where it is), any service records you have, and the most recent registration. Service records are gold — they demonstrate care and let the appraiser discount their risk. Even a folder of oil change receipts helps."),
      makeH2("Time It Right"),
      makeBlock("Dealers need inventory constantly, but seasonal timing matters. Convertibles and sports cars appraise better in spring/summer. Trucks and SUVs peak in fall. If you're in no rush and driving a seasonal vehicle, waiting for the right time of year can net you hundreds more."),
      makeH2("Negotiate Trade-In and Purchase Separately"),
      makeBlock("This is the most important tip. Never let a dealer bundle your trade-in value and purchase price into a single monthly payment negotiation. Keep them as two separate transactions. Get a firm trade-in offer first (or get offers from CarMax and Carvana as benchmarks), then negotiate the price of your new vehicle independently."),
      makeH2("At GubMotors"),
      makeBlock("We give honest, no-pressure trade-in appraisals. Pull up to the lot, we'll look it over and give you a written offer within 20 minutes — whether you're buying from us or not. If we can beat CarMax's number, we will. If we can't, we'll tell you that too."),
    ],
  },
  {
    title: "AWD vs 4WD vs FWD: Which Drivetrain Do You Need in Pennsylvania?",
    slug: "awd-vs-4wd-vs-fwd-pennsylvania",
    publishedAt: "2025-05-12T12:00:00Z",
    excerpt: "Pennsylvania winters are no joke. We break down the drivetrain options and which one makes sense for Bucks County roads, suburbs, and highway commutes.",
    imageIndex: 5,
    seoTitle: "AWD vs 4WD vs FWD for Pennsylvania Winters | GubMotors Blog",
    seoDescription: "Which drivetrain is best for Pennsylvania winters? GubMotors compares AWD, 4WD, and FWD for Bucks County commuters and families.",
    body: [
      makeBlock("Pennsylvania winters range from 'barely a dusting' to 'full-on ice rink' depending on the year. If you're buying a car and wondering whether to pay extra for AWD or 4WD — or whether FWD is good enough — here's an honest breakdown."),
      makeH2("Front-Wheel Drive (FWD)"),
      makeBlock("FWD gets a bad reputation in snow, but it's mostly undeserved. Modern FWD vehicles with good all-season or winter tires handle the vast majority of Pennsylvania winter conditions just fine. The engine weight sits over the driven wheels, which actually provides decent traction for acceleration."),
      makeBlock("FWD's weakness is oversteer in corners — the front end can push wide in slippery conditions. But for a typical Bucks County commuter on plowed roads? FWD with quality tires works well and saves you money on purchase price and fuel."),
      makeH2("All-Wheel Drive (AWD)"),
      makeBlock("AWD is the sweet spot for most Pennsylvania drivers. It operates automatically and seamlessly — no switches, no modes, no thinking. The system constantly monitors wheel slip and redistributes power in real time. You get meaningfully better traction on snow, ice, and slush without any driver input required."),
      makeBlock("Modern AWD systems (Honda SH-AWD, Subaru Symmetrical AWD, Toyota Dynamic Torque Vectoring) are sophisticated enough that they also improve handling in dry conditions. The trade-offs are a slight fuel economy penalty (1–3 MPG typically) and added mechanical complexity."),
      makeH3("Best for:"),
      makeBlock("Suburban commuters, families, anyone who wants peace of mind in winter without thinking about it. The most popular choice on our lot for a reason."),
      makeH2("Four-Wheel Drive (4WD)"),
      makeBlock("4WD is the serious off-road and severe-weather system. Unlike AWD, traditional 4WD locks front and rear driveshafts together — it's brute force traction. You'll find it on trucks and body-on-frame SUVs (F-150, Tacoma, Wrangler, 4Runner)."),
      makeBlock("Modern 4WD systems offer selectable modes: 2WD (normal driving), 4WD High (slippery roads, moderate off-road), and 4WD Low (rock crawling, deep mud/snow). The low-range gearing is what separates 4WD from AWD for serious capability."),
      makeH3("Best for:"),
      makeBlock("Truck owners, anyone who tows, rural drivers on unpaved roads, or people who actually go off-road. For a Bucks County suburban commuter, it's often overkill — but if you want a truck anyway, it's a great bonus."),
      makeH2("The Tire Caveat"),
      makeBlock("No drivetrain overcomes bad tires. A FWD vehicle on dedicated winter tires will out-handle an AWD vehicle on worn all-seasons in snow and ice. If you're serious about winter driving, a dedicated set of winter tires on steel wheels (swap in October, swap out in April) is the highest-value safety upgrade you can make — regardless of drivetrain."),
      makeH2("What We See on Our Lot"),
      makeBlock("The majority of our customers in Bucks County gravitate toward AWD SUVs and crossovers — Honda CR-V, Toyota RAV4, Subaru Outback, Ford Escape. They're the right balance of capability, fuel economy, and everyday practicality for this area. But we have solid FWD options that'll save you money if your commute is mostly plowed highway."),
      makeBlock("Come in and tell us your actual driving situation — we'll match you to the right drivetrain for where you live, not just what sounds good on paper."),
    ],
  },
];

async function run() {
  console.log("🚗 GubMotors Blog Seeder\n");

  // Upload all images first
  console.log("Uploading images...");
  const assetIds = [];
  for (const img of IMAGES) {
    try {
      const id = await uploadImage(img);
      assetIds.push(id);
    } catch (err) {
      console.error(`  ✗ Failed to upload ${img.filename}:`, err.message);
      assetIds.push(null);
    }
  }

  // Create posts
  console.log("\nCreating posts...");
  for (const post of POSTS) {
    const assetId = assetIds[post.imageIndex];
    const doc = {
      _type: "post",
      title: post.title,
      slug: { _type: "slug", current: post.slug },
      publishedAt: post.publishedAt,
      excerpt: post.excerpt,
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
      body: post.body,
      ...(assetId
        ? { mainImage: { _type: "image", asset: { _type: "reference", _ref: assetId } } }
        : {}),
    };

    try {
      // Check if post already exists
      const existing = await client.fetch(
        `*[_type == "post" && slug.current == $slug][0]._id`,
        { slug: post.slug }
      );
      if (existing) {
        await client.patch(existing).set(doc).commit();
        console.log(`  ↺ Updated: ${post.title}`);
      } else {
        await client.create(doc);
        console.log(`  ✓ Created: ${post.title}`);
      }
    } catch (err) {
      console.error(`  ✗ Failed: ${post.title}:`, err.message);
    }
  }

  console.log("\n✅ Done! Posts are live in Sanity.");
}

run().catch(console.error);
