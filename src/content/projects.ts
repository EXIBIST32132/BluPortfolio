import type { AccentColorPreset, Project, ProjectImage } from "@/types/portfolio";

const image = (src: string, alt: string): ProjectImage => ({
  src,
  alt,
});

const asset = (slug: string, filename: string, alt: string): ProjectImage =>
  image(`/images/projects/${slug}/${filename}`, alt);

const newspaper = (filename: string, alt = "Newspaper Design project image."): ProjectImage =>
  asset("newspaper-design", filename, alt);

const award = (
  filename: string,
  alt = "Award Presentation Materials project image.",
): ProjectImage => asset("award-presentation-materials", filename, alt);

const event = (filename: string, alt = "Event Design project image."): ProjectImage =>
  asset("event-design", filename, alt);

const nhsjc = (filename: string, alt = "NHSJC Competitions project image."): ProjectImage =>
  asset("nhsjc-competitions", filename, alt);

const mk = (filename: string, alt = "MK Pottery project image."): ProjectImage =>
  asset("mk-pottery", filename, alt);

type ProjectDraft = Omit<Project, "accentColorPreset" | "featured" | "order"> & {
  accentColorPreset: AccentColorPreset;
};

const emptyLegacyCopy = "";

const baseProjects: ProjectDraft[] = [
  {
    slug: "newspaper-design",
    title: "Newspaper Design",
    subtitle:
      "Publication spreads and feature graphics for The Standard built around pacing, hierarchy, and page rhythm.",
    year: "",
    status: "",
    tags: ["Editorial", "Layout", "Print"],
    heroImage: newspaper("1.png", "Newspaper spread with illustrated language and culture features."),
    thumbnail: newspaper("1.png", "Newspaper spread with illustrated language and culture features."),
    accentColor: "#6698e2",
    accentColorPreset: "blue",
    clockAngle: 288,
    role: "",
    tools: [],
    summary:
      "Publication spreads and feature graphics for The Standard built around pacing, hierarchy, and page rhythm.",
    overview:
      "Newspaper design found me before I had a name for it. I started laying out pages for The Scroll, my middle school paper, in 6th grade — mostly helping friends who needed an extra hand. That turned into becoming Arts Editor a year later, and by high school I'd moved onto The Standard, first as a staff reporter, then onto the Media Team, and eventually into the Diversity, Equity & Inclusion Editor and Community Engagement Editor roles. Through all of it, the design work never stopped: every issue needs pages that hold a reader's attention without losing the paper's identity from spread to spread.",
    brief: emptyLegacyCopy,
    process: emptyLegacyCopy,
    outcome: emptyLegacyCopy,
    reflection: emptyLegacyCopy,
    processImages: [],
    gallery: [
      newspaper("1.png"),
      newspaper("2.png"),
      newspaper("3.png"),
      newspaper("4.png"),
      newspaper("5.png"),
      newspaper("6.png"),
      newspaper("7.png"),
      newspaper("8.png"),
      newspaper("9.png"),
      newspaper("10.png"),
      newspaper("11.png"),
      newspaper("12.png"),
      newspaper("13.png"),
      newspaper("14.jpg"),
      newspaper("15.jpg"),
      newspaper("16.png"),
    ],
    caseStudy: {
      layout: "newspaper",
      blurb: "Spreads, covers, and new publications built across two newsrooms.",
      heroImage: newspaper("1.png", "Newspaper spread with illustrated language and culture features."),
      overview:
        "Newspaper design found me before I had a name for it. I started laying out pages for The Scroll, my middle school paper, in 6th grade — mostly helping friends who needed an extra hand. That turned into becoming Arts Editor a year later, and by high school I'd moved onto The Standard, first as a staff reporter, then onto the Media Team, and eventually into the Diversity, Equity & Inclusion Editor and Community Engagement Editor roles. Through all of it, the design work never stopped: every issue needs pages that hold a reader's attention without losing the paper's identity from spread to spread.",
      featuredSpreads: [
        {
          heading: "Featured: “Core Values”",
          copy: "Five values, five colors, one continuous diagonal sweep — I wanted the page to feel less like a list and more like a single gesture. The rotated type and the megaphone illustration anchor the motion so the eye reads it as one idea instead of five separate call-outs.",
          image: newspaper("2.png", "Core Values newspaper spread."),
        },
        {
          heading: "Featured: “Language & Culture Special”",
          copy: "Typesetting across Chinese, French, and Spanish in one shared layout meant building a grid that could flex for entirely different scripts and reading rhythms without looking like three different pages stapled together. I paired each piece with its own illustration — a vase, a sailboat, a bonfire — treating them almost like editorial ligatures, so the visuals carried a throughline the text alone couldn't.",
          image: newspaper("4.png", "Language and culture newspaper spread."),
        },
        {
          heading: "“Recurring Column: Blu's Bytes”",
          copy: "Beyond individual pages, I built a masthead and visual identity for my own recurring review column — including the character illustration work for pieces like the Marvel Rivals review. It was a side project of designing a small brand within a larger one, consistent enough to be recognizable issue to issue.",
          image: newspaper("3.png", "Blu's Bytes recurring review column spread."),
        },
      ],
      coverDesign: {
        heading: "Cover Design",
        copy: "Two covers, two different approaches to type as the whole image. The Senior Supplement leaned into a bold oversized numeral and script pairing built to feel like a keepsake. The 50th Anniversary cover took the same instinct — one giant numeral carrying the entire page — and used it to mark institutional history instead of a graduating class.",
        images: [
          newspaper("5.png", "Senior Supplement cover design."),
          newspaper("6.png", "50th Anniversary cover design."),
        ],
      },
      rangeAcrossVolumes: [
        newspaper("7.png"),
        newspaper("8.png"),
        newspaper("9.png"),
        newspaper("10.png"),
        newspaper("11.png"),
        newspaper("12.png"),
        newspaper("13.png"),
      ],
      bottomFeatures: [
        {
          heading: "New Ground: The Ampersand",
          image: newspaper("1.png", "The Ampersand publication design image."),
        },
        {
          heading: "Where It Started: The Scroll",
          image: newspaper("14.jpg", "The Scroll newspaper spread."),
        },
      ],
      beyondPage: {
        heading: "Beyond the Page",
        copy: "The paper's identity had to travel past print, too. I designed the social media and newsletter templates The Standard now runs on, and lead the content strategy behind them, extending the same visual language readers get in print into the channels where they actually spend their time.",
        images: [
          newspaper("15.jpg", "The Standard digital newsletter design."),
          newspaper("16.png", "Student journalism event photo."),
        ],
      },
      outcomes: {
        heading: "Outcomes",
        copy: "This body of work, spreads, covers, illustration, and the systems built around them, contributed to The Standard earning 2026 CSPA Gold Crown Award, 2025 Specialty Magazine Third Place Best of Show, 2025 NSPA Newspaper Pacemaker Finalist, and 2025 CSPA Gold Crown Award.",
      },
    },
  },
  {
    slug: "award-presentation-materials",
    title: "Award Presentation Materials",
    subtitle:
      "Impact presentation design for FRC regionals, built to communicate the team's story clearly to judges.",
    year: "",
    status: "",
    tags: ["Presentation Design", "Print"],
    heroImage: award("3.png", "Griffins 1884 impact map presentation design."),
    thumbnail: award("3.png", "Griffins 1884 impact map presentation design."),
    accentColor: "#6698e2",
    accentColorPreset: "mixed",
    clockAngle: 0,
    role: "",
    tools: [],
    summary:
      "Impact presentation design for FRC regionals, built to communicate the team's story clearly to judges.",
    overview:
      "Award presentations in FIRST Robotics aren't just about the robot — judges are evaluating the whole program: outreach, sustainability, team culture, and impact on the wider STEM community. Across multiple seasons, I've led the design of the materials that carry that story to judges, translating a year of team work into something they can actually sit with in a 15-minute room.",
    brief: emptyLegacyCopy,
    process: emptyLegacyCopy,
    outcome: emptyLegacyCopy,
    reflection: emptyLegacyCopy,
    processImages: [],
    gallery: [award("3.png"), award("1.jpeg"), award("2.JPG"), award("4.png")],
    caseStudy: {
      layout: "award",
      title: "Award Presentation",
      blurb:
        "Impact presentation design for FRC regionals, built to communicate the team's story clearly to judges.",
      heroImage: award("3.png", "Griffins 1884 impact map presentation design."),
      overview:
        "Award presentations in FIRST Robotics aren't just about the robot — judges are evaluating the whole program: outreach, sustainability, team culture, and impact on the wider STEM community. Across multiple seasons, I've led the design of the materials that carry that story to judges, translating a year of team work into something they can actually sit with in a 15-minute room.",
      impactBoard: {
        heading: "The Impact Board",
        copy: "For our IMPACT award submission, I helped design an interactive presentation board built around translucent sheets printed with tube-line style diagrams — each sheet flips to layer onto the last, building up a fuller picture of the team's reach as the presentation progresses. It turns a static pitch into something judges can physically page through alongside us.",
        largeImage: award("1.jpeg", "Students presenting an interactive impact board."),
        supportImages: [
          award("2.JPG", "Students holding a translucent impact board sheet."),
          award("4.png", "Tube-line style diagram from the impact board."),
        ],
      },
      impactBook: {
        heading: "The Impact Book",
        copy: "Our most ambitious piece: a perfect-bound, magazine-style book showcasing the full scope of the team's work for our IMPACT submission — outreach, sustainability, mentorship, and community partnerships all in one printed volume judges could keep. Treating it as a real bound publication, rather than a stapled packet, was a deliberate choice: it signals the same seriousness we bring to the robot itself.",
        image: award("impact-book-cover.png", "Perfect-bound impact book cover."),
      },
      outcomes: {
        heading: "Outcomes",
        copy: "This material contributed directly to the team's 2023 Engineering Inspiration and 2024 Dow Team Sustainability Award at the Hudson Valley Regional, and the 2026 IMPACT Award at the Sao Paulo Regional, recognition that goes to the program as a whole, built presentation by presentation, season by season.",
      },
    },
  },
  {
    slug: "event-design",
    title: "Event Design",
    subtitle:
      "Pit displays and signage designed to hold up under the noise and pace of live competition.",
    year: "",
    status: "",
    tags: ["Signage", "Print", "Environmental"],
    heroImage: event("1.jpeg", "Robotics pit display and event signage installation."),
    thumbnail: event("1.jpeg", "Robotics pit display and event signage installation."),
    accentColor: "#a87ce6",
    accentColorPreset: "purple",
    clockAngle: 72,
    role: "",
    tools: [],
    summary:
      "Pit displays and signage designed to hold up under the noise and pace of live competition.",
    overview:
      "Event design for the team splits into two problems: representing ourselves well when we're guests at someone else's competition, and building our own event from scratch when we're the host. Both come down to the same thing, a visual system that has to work instantly, without anyone standing there to explain it.",
    brief: emptyLegacyCopy,
    process: emptyLegacyCopy,
    outcome: emptyLegacyCopy,
    reflection: emptyLegacyCopy,
    processImages: [],
    gallery: [
      event("1.jpeg"),
      event("pit-left-banner.png"),
      event("pit-top-banner.png"),
      event("pit-middle-banner.png"),
      event("4.jpg"),
    ],
    caseStudy: {
      layout: "event",
      blurb: "Pit displays and signage designed to hold up under the noise and pace of live competition.",
      heroImage: event("1.jpeg", "Robotics pit display and event signage installation."),
      overview:
        "Event design for the team splits into two problems: representing ourselves well when we're guests at someone else's competition, and building our own event from scratch when we're the host. Both come down to the same thing, a visual system that has to work instantly, without anyone standing there to explain it.",
      pitSignage: {
        heading: "Pit Signage: The Four-Banner Wrap",
        copy: "At the competition, our pit has four banners, left, right, middle, and back, so the booth reads as one coherent space no matter which direction a visitor or judge approaches from.",
        images: [
          event("pit-left-banner.png", "Tall robotics pit banner."),
          event("pit-top-banner.png", "Griffins 1884 pit header banner."),
          event("pit-middle-banner.png", "Tall robotics pit infographic banner."),
          event("pit-left-banner.png", "Second tall robotics pit banner."),
        ],
        largeImage: event("1.jpeg", "Robotics pit signage installed at competition."),
      },
      festival: {
        heading: "Festival of Robotics: Event Branding",
        copy: "Now in its fourth year, Festival of Robotics needed an identity that could hold up as a returning event rather than a one-off — something people would recognize year to year, not rebuild from scratch each time. I designed the colours, logo, and signage system it now runs on.",
        image: event("4.jpg", "Festival of Robotics event branding graphic."),
      },
    },
  },
  {
    slug: "nhsjc-competitions",
    title: "NHSJC Competitions",
    subtitle: "Advert and logo contest entries exploring compact communication and visual identity.",
    year: "",
    status: "",
    tags: ["Branding", "Advertising", "Print"],
    heroImage: nhsjc("1.png", "The Soup Stop advertisement competition entry."),
    thumbnail: nhsjc("1.png", "The Soup Stop advertisement competition entry."),
    accentColor: "#6698e2",
    accentColorPreset: "blue",
    clockAngle: 144,
    role: "",
    tools: [],
    summary: "Advert and logo contest entries exploring compact communication and visual identity.",
    overview:
      "NHSJC's design contests work from a locked brief: a fictional business, a fixed set of facts, and a small set of provided images, nothing else allowed in. Across three entries and three years, the constraint stayed the same while the problem changed each time: sometimes a logo, sometimes a full advertisement, always judged on typography, originality, and clean execution under a tight deadline.",
    brief: emptyLegacyCopy,
    process: emptyLegacyCopy,
    outcome: emptyLegacyCopy,
    reflection: emptyLegacyCopy,
    processImages: [],
    gallery: [nhsjc("2.jpeg"), nhsjc("1.png"), nhsjc("3.png")],
    caseStudy: {
      layout: "nhsjc",
      blurb: "Advert and logo contest entries exploring compact communication and visual identity.",
      heroImage: nhsjc("1.png", "The Soup Stop advertisement competition entry."),
      overview:
        "NHSJC's design contests work from a locked brief: a fictional business, a fixed set of facts, and a small set of provided images, nothing else allowed in. Across three entries and three years, the constraint stayed the same while the problem changed each time: sometimes a logo, sometimes a full advertisement, always judged on typography, originality, and clean execution under a tight deadline.",
      nhsjcEntries: [
        {
          heading: "2025 · Logo — Play On Music",
          copy: "The brief: a new music shop on Nashville's Music Row, selling instruments, offering repairs and lessons. I built the logo into a piano-key motif — \"PLAY ON\" set directly into the black keys, with \"music shop\" in a lighter, friendlier type to soften the boldness of the main lockup.",
          image: nhsjc("2.jpeg", "Play On Music logo competition entry."),
        },
        {
          heading: "2024 · Advertisement — The Soup Stop",
          copy: "Given a two-location soup vendor's real details — addresses, hours, phone numbers, a per-cup price range — the challenge was fitting all of it into a 5-by-7-inch ad without it reading as a spec sheet. The pouring ladle became the visual anchor, with the wordmark built into the steam rising from the bowl, and a row of flavor bowls along the bottom doing double duty as menu and decoration.",
          image: nhsjc("1.png", "The Soup Stop advertisement competition entry."),
        },
        {
          heading: "2023 · Logo — Beacon Hill Photography Club",
          copy: "The brief called for a 50th-anniversary mark for a school photography club — a milestone that needed to read at a glance without over-explaining itself. I built the logo around a camera silhouette, with the club name wrapped inside the lens and a starburst carrying the \"50th Year\" callout, submitted in both full-color and grayscale as required.",
          image: nhsjc("3.png", "Beacon Hill Photography Club logo competition entry."),
        },
      ],
    },
  },
  {
    slug: "mk-pottery",
    title: "MK Pottery",
    subtitle:
      "Branding, advertising, and workshop information design for MK Pottery, spanning identity and print materials.",
    year: "",
    status: "",
    tags: ["Logo Design", "Advertising", "Competition"],
    heroImage: mk("2.png", "MK ceramics logo mark."),
    thumbnail: mk("2.png", "MK ceramics logo mark."),
    accentColor: "#a87ce6",
    accentColorPreset: "mixed",
    clockAngle: 216,
    role: "",
    tools: [],
    summary:
      "Branding, advertising, and workshop information design for MK Pottery, spanning identity and print materials.",
    overview:
      "MK Pottery Studio needed more than a logo, it needed a system flexible enough to represent a working ceramics studio, host its own events, and communicate complex, detail-heavy workshop information across two languages. I built the brand around the potter’s handwritten mark, then extended it into the materials the studio actually runs on.",
    brief: emptyLegacyCopy,
    process: emptyLegacyCopy,
    outcome: emptyLegacyCopy,
    reflection: emptyLegacyCopy,
    processImages: [],
    gallery: [
      mk("2.png"),
      mk("3.png"),
      mk("4.png"),
      mk("1.jpg"),
      mk("6.jpg"),
      mk("7.jpg"),
      mk("8.jpg"),
      mk("9.jpg"),
      mk("10.jpg"),
    ],
    caseStudy: {
      layout: "mk-pottery",
      title: "MK Pottery Studio",
      blurb:
        "Branding, advertising, and workshop information design for MK Pottery, spanning identity and print materials.",
      heroImage: mk("2.png", "MK ceramics logo mark."),
      overview:
        "MK Pottery Studio needed more than a logo, it needed a system flexible enough to represent a working ceramics studio, host its own events, and communicate complex, detail-heavy workshop information across two languages. I built the brand around the potter’s handwritten mark, then extended it into the materials the studio actually runs on.",
      brandIdentity: {
        heading: "Brand Identity:",
        copy: "The core mark — a hand-brushed enso circle wrapped around a lettered \"MK\" — stays constant, with the wordmark beneath it swapped depending on context: \"ceramics\" for the studio's core identity, \"events\" for anything hosted rather than made. Same hand, same gesture, different job.",
        images: [
          mk("2.png", "MK ceramics logo mark."),
          mk("3.png", "MK events logo mark."),
          mk("4.png", "MK logo mark without wordmark."),
        ],
      },
      brochure: {
        heading: "The Anagama Workshop Brochure",
        copy: "For the 2026 Anagama Kiln Building Workshop, I designed a full bilingual booklet — matching English and Spanish editions, structured around a numbered chapter system (Overview, Schedule, Teaching Team, Experience, Studio Guidelines, Logistics). Dense, practical information pricing, dietary needs, bank transfer details, sits alongside full-bleed photography of the kiln itself and circular-cropped portraits of the teaching team, so a genuinely bureaucratic amount of logistics still reads as an invitation rather than a form.",
        featureImages: [
          mk("1.jpg", "Anagama kiln building workshop cover."),
          mk("6.jpg", "Anagama workshop brochure course overview spread."),
        ],
        supportImages: [
          mk("7.jpg", "Anagama workshop brochure table of contents page."),
          mk("8.jpg", "Anagama workshop brochure teaching team page."),
          mk("9.jpg", "Anagama workshop brochure logistics page."),
          mk("10.jpg", "Anagama workshop kiln photograph page."),
        ],
      },
    },
  },
];

export const projects: Project[] = baseProjects.map((project, index) => ({
  ...project,
  featured: true,
  order: (index + 1) * 10,
}));

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);

  if (index === -1) {
    return projects[0];
  }

  return projects[(index + 1) % projects.length];
}
