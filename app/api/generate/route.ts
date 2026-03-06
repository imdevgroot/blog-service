import { NextRequest, NextResponse } from "next/server";

const FALLBACK_POST = `**Meta Description:** Discover why Smith Plumbing is Austin's top-rated plumbing company. From emergency repairs to full installations, we keep Austin homes flowing smoothly.

# Why Austin Homeowners Trust Smith Plumbing for Every Job

When a pipe bursts at 2 AM or your water heater decides to quit on the coldest morning of the year, you need a plumber you can count on. Austin homeowners have trusted Smith Plumbing for over a decade — and for good reason. We combine fast response times, honest pricing, and expert craftsmanship to solve your plumbing problems right the first time.

In a city that's growing as fast as Austin, reliable home services aren't a luxury — they're a necessity. Whether you're in South Congress, Round Rock, or Cedar Park, Smith Plumbing has a local team ready to respond.

## Emergency Plumbing Services That Don't Keep You Waiting

Plumbing emergencies don't follow business hours, and neither do we. Smith Plumbing offers 24/7 emergency response across the greater Austin area. Our dispatch team answers every call live — no voicemail, no waiting for a callback. Most emergency calls are answered within 60 minutes.

From burst pipes and sewer backups to gas line issues and flooding, our licensed master plumbers arrive equipped to handle any situation. We carry the most common parts and fittings on our trucks so we can fix the problem in a single visit, not two.

## Transparent Pricing — No Hidden Fees, Ever

One of the biggest complaints Austin residents have about home service companies is surprise charges that show up on the final invoice. At Smith Plumbing, we operate on flat-rate pricing. That means you get a firm quote before we touch a single pipe — and that's the price you pay.

No overtime rates. No fuel surcharges. No "complexity fees." Just honest, upfront pricing that respects your budget. We also offer flexible payment options for larger jobs like water heater replacements or repiping projects.

## Full-Service Plumbing for Austin Homes and Businesses

Smith Plumbing handles everything from routine maintenance to full-scale plumbing installations. Our services include:

- Water heater installation and repair (tank and tankless)
- Drain cleaning and hydro-jetting
- Leak detection and pipe repair
- Bathroom and kitchen remodel plumbing
- Sewer line inspection and replacement
- Water softener installation

Whether you're a homeowner dealing with low water pressure or a property manager overseeing a commercial building, we scale to meet your needs.

## Conclusion

When plumbing problems strike in Austin, don't settle for a company that treats you like a number. Smith Plumbing delivers the expertise, speed, and transparency that Austin homeowners deserve. Call us today or request a quote online — and discover why we're Austin's highest-rated plumbing service.`;

export async function POST(req: NextRequest) {
  const { businessName, niche, city, topic } = await req.json();

  if (!businessName || !niche || !city || !topic) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey || apiKey === "placeholder") {
    // Return fallback sample post
    return NextResponse.json({ post: FALLBACK_POST });
  }

  const prompt = `Write a 500-word SEO-optimized blog post for a local business with the following details:
- Business name: ${businessName}
- Industry/niche: ${niche}
- City: ${city}
- Topic: ${topic}

Structure the post EXACTLY as follows:
1. Start with: **Meta Description:** [compelling 150-character meta description]
2. Then an H1 title (use # markdown)
3. An engaging intro paragraph (2-3 sentences)
4. Three H2 sections (use ## markdown) with 2-3 paragraphs each
5. A conclusion paragraph

Requirements:
- Include the city name and business name naturally throughout
- Use local SEO keywords related to the niche and city
- Write in a professional yet approachable tone
- Target local customers searching for this service in the city
- Total length: approximately 500 words

Return only the blog post content in markdown format. No preamble or explanation.`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const post = data.choices?.[0]?.message?.content;

    if (!post) throw new Error("No content returned");

    return NextResponse.json({ post });
  } catch (err) {
    console.error("OpenAI error, returning fallback:", err);
    return NextResponse.json({ post: FALLBACK_POST });
  }
}
