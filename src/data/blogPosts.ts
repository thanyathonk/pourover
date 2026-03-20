import type { FourSixBrewInput, StandardBrewInput } from "@/types/brew";

export type CoffeeBlogApplyAction =
  | {
      source: "standard";
      patch?: Partial<Omit<StandardBrewInput, "source" | "overrides">>;
      overrides?: Partial<StandardBrewInput["overrides"]>;
    }
  | {
      source: "four-six";
      patch: Partial<Omit<FourSixBrewInput, "source">>;
    };

export type CoffeeBlogCategoryId =
  | "foundations"
  | "technique"
  | "dial-in"
  | "water"
  | "methods"
  | "recipes";

export type CoffeeBlogCategory = {
  id: CoffeeBlogCategoryId;
  label: { en: string; th: string };
  description: { en: string; th: string };
};

export type CoffeeBlogPost = {
  id: string;
  categoryId: CoffeeBlogCategoryId;
  eyebrow: { en: string; th: string };
  title: { en: string; th: string };
  summary: { en: string; th: string };
  readTime: { en: string; th: string };
  tags: string[];
  sections: { en: string[]; th: string[] };
  takeaway: { en: string; th: string };
  sources: Array<{
    label: string;
    url: string;
  }>;
  apply: CoffeeBlogApplyAction & {
    label: { en: string; th: string };
    description: { en: string; th: string };
  };
};

export type CoffeeVideoGuide = {
  id: string;
  categoryId: CoffeeBlogCategoryId;
  eyebrow: { en: string; th: string };
  title: { en: string; th: string };
  creator: string;
  summary: { en: string; th: string };
  method: { en: string[]; th: string[] };
  tags: string[];
  videoId: string;
  watchUrl: string;
  sourceUrl: string;
};

export const coffeeBlogCategories: CoffeeBlogCategory[] = [
  {
    id: "foundations",
    label: { en: "Foundations", th: "พื้นฐาน" },
    description: {
      en: "Core ideas behind bloom, saturation, and even extraction.",
      th: "แนวคิดพื้นฐานเรื่อง bloom, การอิ่มน้ำ และการสกัดที่สม่ำเสมอ",
    },
  },
  {
    id: "technique",
    label: { en: "Technique", th: "เทคนิค" },
    description: {
      en: "How pouring, swirling, and agitation change the cup.",
      th: "การเท การหมุน และ agitation เปลี่ยนรสกาแฟอย่างไร",
    },
  },
  {
    id: "dial-in",
    label: { en: "Dial-In", th: "การจูนสูตร" },
    description: {
      en: "Adjust grind, ratio, and brew time with intention.",
      th: "ปรับ grind, ratio และเวลาอย่างมีทิศทาง",
    },
  },
  {
    id: "water",
    label: { en: "Water", th: "น้ำ" },
    description: {
      en: "Why mineral balance and water quality matter so much.",
      th: "ทำไมน้ำและสมดุลแร่ธาตุจึงสำคัญมากต่อรสชาติ",
    },
  },
  {
    id: "methods",
    label: { en: "Methods", th: "วิธีชง" },
    description: {
      en: "Different brewing logics such as 4:6 or hybrid brewing.",
      th: "ตรรกะของวิธีชงต่าง ๆ เช่น 4:6 หรือ hybrid brewing",
    },
  },
  {
    id: "recipes",
    label: { en: "Recipes", th: "สูตรและการสเกล" },
    description: {
      en: "Practical recipe thinking for larger or more concentrated brews.",
      th: "แนวคิดเชิงปฏิบัติสำหรับสูตรใหญ่ขึ้นหรือสูตรเข้มขึ้น",
    },
  },
];

export const coffeeBlogPosts: CoffeeBlogPost[] = [
  {
    id: "bloom-even-saturation",
    categoryId: "foundations",
    eyebrow: { en: "Foundations", th: "พื้นฐาน" },
    title: {
      en: "Why The Bloom Matters In Pour-Over",
      th: "ทำไมช่วง Bloom จึงสำคัญในการดริปกาแฟ",
    },
    summary: {
      en: "Bloom is not just a ritual. It helps release trapped gas, improves early saturation, and sets up more even extraction in the rest of the brew.",
      th: "Bloom ไม่ได้เป็นแค่พิธีกรรม แต่ช่วยระบายก๊าซที่ค้างอยู่ ทำให้กากกาแฟอิ่มน้ำตั้งแต่ต้น และปูทางไปสู่การสกัดที่สม่ำเสมอกว่าในช่วงที่เหลือ",
    },
    readTime: { en: "4 min read", th: "อ่าน 4 นาที" },
    tags: ["Bloom", "Saturation", "Even Extraction"],
    sections: {
      en: [
        "The bloom is the first contact between water and coffee. According to Perfect Daily Grind’s reporting with SCA-certified baristas, this stage is where trapped carbon dioxide starts to leave the bed, reducing the resistance that keeps water from fully reaching aromatic compounds later in the brew.",
        "That is why many brewers treat bloom as a saturation step rather than a flavor step. The goal is to wet all grounds quickly and evenly, not to extract aggressively. If dry pockets remain, later pours can channel around them and the cup can taste flatter or more uneven.",
        "In practice, a calm but complete bloom usually supports a fuller, rounder cup. As an inference from those sources, if your brew tastes sharp, patchy, or underdeveloped, bloom quality is one of the first variables worth stabilizing before changing ratio or dose.",
      ],
      th: [
        "Bloom คือช่วงแรกที่น้ำสัมผัสกับผงกาแฟ จากรายงานของ Perfect Daily Grind ที่อ้างความเห็นของบาริสต้าซึ่งผ่านการรับรองจาก SCA ช่วงนี้คือเวลาที่ก๊าซคาร์บอนไดออกไซด์ซึ่งค้างอยู่ในผงกาแฟเริ่มถูกปล่อยออกมา ทำให้น้ำเข้าถึงสารหอมได้ดีขึ้นในช่วงต่อมา",
        "จึงมีบาริสต้าจำนวนมากมองว่า bloom เป็นช่วงของการทำให้กากกาแฟอิ่มน้ำ มากกว่าจะเป็นช่วงสำหรับรีดรสชาติ เป้าหมายคือทำให้ผงกาแฟเปียกทั่วอย่างรวดเร็วและสม่ำเสมอ ไม่ใช่การเร่งสกัด ถ้ายังมีกลุ่มผงแห้งค้างอยู่ การเทรอบต่อไปอาจไหลอ้อมและทำให้ถ้วยออกมาไม่สม่ำเสมอ",
        "ในทางปฏิบัติ bloom ที่สงบแต่ทั่วถึงมักช่วยให้ถ้วยกลมและเต็มขึ้น และจากการสังเคราะห์ข้อมูลเหล่านี้ ถ้ากาแฟของคุณออกคม แบน หรือไม่ค่อยเปิดรส การทำ bloom ให้เสถียรก่อน มักคุ้มกว่าการไปเปลี่ยน ratio หรือ dose ทันที",
      ],
    },
    takeaway: {
      en: "Treat bloom as the foundation for even saturation. A better bloom often fixes the cup earlier than a bigger recipe change.",
      th: "มอง bloom เป็นฐานของการอิ่มน้ำที่สม่ำเสมอ เพราะ bloom ที่ดีมักแก้ปัญหาถ้วยได้เร็วกว่าการเปลี่ยนสูตรครั้งใหญ่",
    },
    sources: [
      {
        label: "Perfect Daily Grind: Swirl Or Stir? Achieving Even Extraction With Filter Coffee Drippers",
        url: "https://perfectdailygrind.com/2021/01/swirl-or-stir-achieving-even-extraction-with-filter-coffee-drippers/",
      },
      {
        label: "Perfect Daily Grind: Brew Guide: Hario V60 for Beginners",
        url: "https://perfectdailygrind.com/2015/01/brew-guide-hario-v60-for-beginners/",
      },
    ],
    apply: {
      source: "standard",
      label: { en: "Apply Bloom-Friendly Setup", th: "ใช้สูตรที่เป็นมิตรกับ Bloom" },
      description: {
        en: "Moves the recipe toward a calmer, clarity-first standard setup for easier saturation control.",
        th: "ปรับสูตรให้เป็น standard setup ที่นิ่งและเน้นความใส เพื่อคุมการอิ่มน้ำได้ง่ายขึ้น",
      },
      overrides: {
        ratio: 15.8,
        roastLevel: "light",
        process: "washed",
      },
    },
  },
  {
    id: "swirl-stir-agitation",
    categoryId: "technique",
    eyebrow: { en: "Technique", th: "เทคนิค" },
    title: {
      en: "Swirl, Stir, Or Leave It Alone?",
      th: "ควรหมุน คน หรือปล่อยไว้เฉย ๆ ดี",
    },
    summary: {
      en: "Agitation helps distribute water and reduce channeling, but too much movement can also overdrive extraction and blur structure.",
      th: "Agitation ช่วยกระจายน้ำและลด channeling ได้ แต่ถ้ามากเกินไปก็อาจเร่งการสกัดจนโครงรสพร่าได้เช่นกัน",
    },
    readTime: { en: "5 min read", th: "อ่าน 5 นาที" },
    tags: ["Agitation", "Swirl", "Stir"],
    sections: {
      en: [
        "Perfect Daily Grind’s interviews on swirl versus stir frame agitation as a way to improve water distribution through the slurry. The idea is simple: more even contact means fewer dry pockets and less channeling.",
        "The same discussion also shows why technique must be measured, not automatic. Swirling during bloom is often enough to mix the slurry and flatten the bed. Beyond that, every extra stir or spin adds more movement, and more movement changes extraction speed and body.",
        "A useful practical rule is to add agitation only when it solves a visible problem such as dry clumps, uneven drawdown, or a domed bed. That conclusion is an inference from the source material, but it matches the logic: use agitation as a correction tool, not as decoration.",
      ],
      th: [
        "บทความของ Perfect Daily Grind ที่เปรียบเทียบการ swirl กับ stir อธิบายว่า agitation คือวิธีช่วยกระจายน้ำให้ทั่ว slurry แนวคิดหลักคือเมื่อน้ำสัมผัสผงกาแฟสม่ำเสมอขึ้น โอกาสเกิดผงแห้งและ channeling ก็ลดลง",
        "แต่ข้อมูลชุดเดียวกันก็ชี้ให้เห็นว่าการขยับกากกาแฟไม่ควรทำแบบอัตโนมัติเสมอไป การหมุนเบา ๆ ในช่วง bloom มักเพียงพอที่จะช่วยให้ slurry เข้ากันและทำให้ bed แบนขึ้น หลังจากนั้นทุกครั้งที่คุณคนหรือหมุนเพิ่ม ก็เท่ากับเพิ่มพลังในการสกัดและเปลี่ยน body ของถ้วยด้วย",
        "กฎใช้งานที่ช่วยได้มากคือเติม agitation เฉพาะเมื่อมันแก้ปัญหาที่มองเห็นได้จริง เช่น มีกลุ่มผงแห้ง drawdown ไหลไม่เท่ากัน หรือ bed นูนผิดปกติ ข้อนี้เป็นการสังเคราะห์จากแหล่งข้อมูล แต่สอดคล้องกับตรรกะของการชงมากที่สุด",
      ],
    },
    takeaway: {
      en: "Use agitation deliberately. If the bed is already even, more movement is not automatically better.",
      th: "ใช้ agitation อย่างมีเจตนา ถ้า bed เรียบและสม่ำเสมออยู่แล้ว การขยับเพิ่มไม่จำเป็นว่าจะดีกว่าเสมอไป",
    },
    sources: [
      {
        label: "Perfect Daily Grind: Swirl Or Stir? Achieving Even Extraction With Filter Coffee Drippers",
        url: "https://perfectdailygrind.com/2021/01/swirl-or-stir-achieving-even-extraction-with-filter-coffee-drippers/",
      },
      {
        label: "Perfect Daily Grind: How To Take Your Pour Over Brewing To The Next Level",
        url: "https://perfectdailygrind.com/2020/07/tips-for-next-level-pour-over-coffee-brewing/",
      },
    ],
    apply: {
      source: "standard",
      label: { en: "Apply Calm Agitation Setup", th: "ใช้สูตรแบบ agitation นิ่ง" },
      description: {
        en: "Biases the setup toward a cleaner, calmer profile before adding more movement.",
        th: "ปรับสูตรให้เอนไปทางความใสและนิ่งก่อนที่จะเพิ่ม agitation",
      },
      overrides: {
        ratio: 16,
        roastLevel: "light",
      },
    },
  },
  {
    id: "grind-ratio-drawdown",
    categoryId: "dial-in",
    eyebrow: { en: "Dial-In", th: "การจูนสูตร" },
    title: {
      en: "Read Grind Size Through Drawdown, Not Guesswork",
      th: "อ่านขนาดบดผ่าน Drawdown ไม่ใช่เดาเอา",
    },
    summary: {
      en: "Grind size, brew time, and ratio interact. The easiest signal to watch is how the bed drains and whether the cup feels hollow, harsh, or muddy.",
      th: "ขนาดบด เวลา และ ratio ทำงานร่วมกัน สัญญาณที่อ่านง่ายที่สุดคือการไหลของน้ำและรสที่ออกมาว่ากลวง คม หรือขุ่นเกินไป",
    },
    readTime: { en: "5 min read", th: "อ่าน 5 นาที" },
    tags: ["Grind Size", "Ratio", "Drawdown"],
    sections: {
      en: [
        "Beginner V60 guides often present grind size and time together because one affects the other. Finer coffee creates more resistance, which can lengthen drawdown and increase extraction, while coarser coffee can speed things up and leave the cup thin or underdeveloped.",
        "Perfect Daily Grind’s beginner V60 guide and next-level pour-over reporting both point toward watching the whole brew rather than a single number. If the brew stalls, tastes bitter, or leaves a dense muddy finish, grind may be too fine or agitation too strong. If it rushes and tastes weak, the opposite may be true.",
        "The practical move is to adjust only one lever at a time. As an inference from those sources, ratio can shape concentration, but grind is usually the cleaner first adjustment when brew time and extraction character are obviously off.",
      ],
      th: [
        "คู่มือ V60 สำหรับผู้เริ่มต้นมักพูดถึงขนาดบดกับเวลาไปพร้อมกัน เพราะสองอย่างนี้เชื่อมกันโดยตรง กาแฟที่บดละเอียดขึ้นจะเพิ่มแรงต้าน ทำให้ drawdown นานขึ้นและมักสกัดมากขึ้น ส่วนกาแฟที่หยาบขึ้นจะไหลเร็วและอาจทำให้ถ้วยบางหรือยังไม่พัฒนา",
        "ทั้งคู่มือ V60 เบื้องต้นและบทความเชิงลึกของ Perfect Daily Grind ชี้ไปที่การมองทั้ง flow ของการชง ไม่ใช่ดูแค่ตัวเลขเดียว ถ้ากาแฟไหลช้า ติด ขม หรือมีปลายขุ่นหนักเกินไป ขนาดบดอาจละเอียดเกินหรือ agitation แรงเกิน แต่ถ้าไหลเร็วและรสอ่อนเกิน ก็มักอยู่คนละฝั่ง",
        "วิธีที่ใช้งานได้จริงคือปรับทีละคันโยก จากข้อมูลเหล่านี้ ผมสรุปว่า ratio เหมาะกับการเปลี่ยนความเข้มของถ้วย แต่ถ้าเวลาและลักษณะการสกัดผิดชัดเจน ขนาดบดมักเป็นจุดเริ่มที่สะอาดกว่า",
      ],
    },
    takeaway: {
      en: "Watch how the brew drains and tastes. If time looks wrong, grind is usually the first lever before ratio.",
      th: "ดูทั้งการไหลและรสชาติ ถ้าเวลาเริ่มผิดธรรมชาติ ขนาดบดมักเป็นคันโยกแรกก่อน ratio",
    },
    sources: [
      {
        label: "Perfect Daily Grind: Brew Guide: Hario V60 for Beginners",
        url: "https://perfectdailygrind.com/2015/01/brew-guide-hario-v60-for-beginners/",
      },
      {
        label: "Perfect Daily Grind: How To Take Your Pour Over Brewing To The Next Level",
        url: "https://perfectdailygrind.com/2020/07/tips-for-next-level-pour-over-coffee-brewing/",
      },
    ],
    apply: {
      source: "standard",
      label: { en: "Apply Balanced Dial-In", th: "ใช้สูตรจูนสมดุล" },
      description: {
        en: "Sets a balanced standard recipe that is easier to read while adjusting grind outside the app.",
        th: "ตั้งสูตรมาตรฐานที่สมดุลเพื่อให้อ่านผลได้ง่ายขึ้นระหว่างจูนขนาดบดภายนอกแอป",
      },
      overrides: {
        ratio: 15.5,
        roastLevel: "medium",
      },
    },
  },
  {
    id: "water-minerals-matter",
    categoryId: "water",
    eyebrow: { en: "Water", th: "น้ำ" },
    title: {
      en: "Great Pour-Over Starts With Better Water",
      th: "ดริปที่ดีเริ่มต้นจากน้ำที่ดีกว่า",
    },
    summary: {
      en: "Water is most of the cup. Mineral balance changes clarity, texture, and how consistently a recipe behaves from one brew to the next.",
      th: "น้ำคือส่วนใหญ่ของถ้วยกาแฟ สมดุลแร่ธาตุจึงเปลี่ยนทั้งความใส เนื้อสัมผัส และความสม่ำเสมอของสูตรได้โดยตรง",
    },
    readTime: { en: "4 min read", th: "อ่าน 4 นาที" },
    tags: ["Water", "Minerals", "Consistency"],
    sections: {
      en: [
        "The Specialty Coffee Association has emphasized that enjoyment begins with water because water quality defines the brewing conditions that every recipe depends on. Their recent article on mineralized water highlights a simple point: when water is standardized, flavor clarity and consistency improve.",
        "For pour-over, this matters because the brewer is often tuning small variables such as ratio, agitation, and grind. If the water itself changes hardness or buffering too much, it becomes difficult to know whether a recipe change improved the cup or whether the water did.",
        "A practical inference is that stable water often makes recipes easier to repeat than chasing small pouring tweaks. If your brews feel inconsistent day to day, check your water before rewriting the entire recipe.",
      ],
      th: [
        "Specialty Coffee Association เน้นมาหลายครั้งว่าความอร่อยของกาแฟเริ่มจากน้ำ เพราะคุณภาพน้ำเป็นตัวกำหนดเงื่อนไขการสกัดทั้งหมดที่สูตรชงต้องอาศัยอยู่ บทความล่าสุดของ SCA เรื่องน้ำที่ปรับแร่ธาตุแล้วก็ย้ำประเด็นนี้ชัดเจนว่า เมื่อน้ำมีมาตรฐาน รสชาติและความสม่ำเสมอก็จะดีขึ้น",
        "สำหรับการดริป ประเด็นนี้สำคัญมากเพราะผู้ชงมักกำลังปรับตัวแปรเล็ก ๆ เช่น ratio, agitation หรือ grind ถ้าน้ำเปลี่ยน hardness หรือ buffering มากเกินไป เราจะไม่รู้ว่าที่รสดีขึ้นหรือแย่ลงนั้นมาจากสูตร หรือมาจากน้ำกันแน่",
        "ข้อสรุปเชิงปฏิบัติคือ น้ำที่เสถียรมักช่วยให้สูตรทำซ้ำได้ง่ายกว่าการไปไล่จูนท่าการเทเล็ก ๆ ถ้ากาแฟของคุณดีบ้างแย่บ้างแม้จะชงสูตรเดิม ลองตรวจเรื่องน้ำก่อนเขียนสูตรใหม่ทั้งหมด",
      ],
    },
    takeaway: {
      en: "If repeatability matters, standardize water first. Stable water makes every other variable easier to read.",
      th: "ถ้าความทำซ้ำสำคัญ ให้เริ่มจากทำให้น้ำเสถียรก่อน เพราะมันทำให้ตัวแปรอื่นอ่านผลได้ง่ายขึ้นทั้งหมด",
    },
    sources: [
      {
        label: "Specialty Coffee Association: The Enjoyment of Coffee Begins with Water",
        url: "https://sca.coffee/sca-news/perfectly-mineralized-water-bwt-pfksf",
      },
      {
        label: "Barista Hustle: The Water Calculator",
        url: "https://www.baristahustle.com/the-water-calculator/",
      },
    ],
    apply: {
      source: "standard",
      label: { en: "Apply Water-First Setup", th: "ใช้สูตรสำหรับน้ำเสถียร" },
      description: {
        en: "Uses a clean standard recipe so water changes are easier to notice and compare.",
        th: "ใช้สูตรมาตรฐานที่สะอาด เพื่อให้สังเกตผลจากการเปลี่ยนน้ำได้ง่ายขึ้น",
      },
      overrides: {
        ratio: 16,
        process: "washed",
      },
    },
  },
  {
    id: "four-six-logic",
    categoryId: "methods",
    eyebrow: { en: "Methods", th: "วิธีชง" },
    title: {
      en: "What The 4:6 Method Actually Changes",
      th: "4:6 Method เปลี่ยนอะไรในถ้วยจริง ๆ",
    },
    summary: {
      en: "The 4:6 method is not just a pattern of pours. Its logic is that the first 40% shapes taste, while the remaining 60% shapes density and strength.",
      th: "4:6 Method ไม่ได้เป็นแค่ลำดับการเท แต่มีตรรกะชัดเจนว่าช่วง 40% แรกใช้กำหนดรส ส่วน 60% หลังใช้กำหนดความแน่นและความเข้ม",
    },
    readTime: { en: "5 min read", th: "อ่าน 5 นาที" },
    tags: ["4:6 Method", "Kasuya", "Taste Design"],
    sections: {
      en: [
        "Hario’s official Kasuya model page summarizes the 4:6 idea clearly: divide total water into 40% and 60%. The first part is used to steer taste, while the second part is used to steer density. That is why 4:6 feels more like a flavor-planning framework than a fixed recipe.",
        "The same page also points out two practical constraints: use coarse grounds and wait for the first pour to drain before the second. Those details explain why 4:6 often feels distinct from tighter pulse recipes. It is designed to make deliberate flavor moves while keeping the pour logic readable.",
        "In practical use, 4:6 is especially helpful when a coffee feels too thin, too sharp, or too vague on a standard V60 recipe. That is partly source-based and partly inference, but it matches how the method separates taste and body decisions more explicitly than many standard profiles.",
      ],
      th: [
        "หน้าทางการของ Hario สำหรับ Kasuya model อธิบายแนวคิด 4:6 ไว้อย่างชัดเจนว่า ให้แบ่งน้ำทั้งหมดเป็น 40% และ 60% โดยช่วงแรกใช้กำหนดทิศทางของรส ส่วนช่วงหลังใช้กำหนดความแน่นของกาแฟ นี่จึงเป็นเหตุผลที่ 4:6 ให้ความรู้สึกเหมือน framework สำหรับออกแบบรสมากกว่าจะเป็นสูตรตายตัว",
        "หน้าเดียวกันยังระบุข้อกำหนดสำคัญสองอย่างคือ ใช้กาแฟบดหยาบ และรอให้น้ำจากการเทครั้งแรกไหลผ่านก่อนจึงค่อยเทครั้งถัดไป รายละเอียดนี้อธิบายว่าทำไม 4:6 จึงต่างจากสูตร pulse pour ที่แน่นและชิดกว่า เพราะมันถูกออกแบบมาเพื่อให้ขยับรสชาติได้อย่างตั้งใจและยังอ่าน logic ของการเทได้ง่าย",
        "ในทางใช้งาน 4:6 เหมาะมากเมื่อกาแฟออกบาง คม หรือไม่ชัดเจนบนสูตร V60 ทั่วไป ข้อนี้มาจากทั้งข้อมูลต้นทางและการสังเคราะห์ร่วมกัน แต่ก็สอดคล้องกับธรรมชาติของวิธีที่แยกการตัดสินใจเรื่องรสกับ body ออกจากกันได้ชัดกว่าสูตรมาตรฐานหลายแบบ",
      ],
    },
    takeaway: {
      en: "Use 4:6 when you want the recipe structure itself to steer taste and body more explicitly.",
      th: "ใช้ 4:6 เมื่อคุณอยากให้โครงสร้างของสูตรเป็นตัวกำหนดทั้งรสและ body อย่างชัดเจน",
    },
    sources: [
      {
        label: "HARIO: V60 Dripper KASUYA Model",
        url: "https://global.hario.com/pickup_kasuyamodel/KDC.html",
      },
      {
        label: "HARIO 2021 Catalog: Kasuya Series",
        url: "https://global.hario.com/pdf2021/2021catalog.pdf",
      },
    ],
    apply: {
      source: "four-six",
      label: { en: "Apply To 4:6", th: "ใช้กับ 4:6" },
      description: {
        en: "Moves the app into a coarse, sweetness-first 4:6 setup for clearer flavor design.",
        th: "ย้ายแอปไปสู่สูตร 4:6 ที่เน้น sweetness ก่อน เพื่อออกแบบรสได้ชัดขึ้น",
      },
      patch: {
        roastLevel: "medium",
        tasteMode: "sweetness",
        bodyMode: "stronger",
        ratio: 15,
      },
    },
  },
  {
    id: "switch-hybrid-brewing",
    categoryId: "recipes",
    eyebrow: { en: "Recipes", th: "สูตรและการสเกล" },
    title: {
      en: "Hybrid Brewing Shows How Structure Can Change Extraction",
      th: "Hybrid Brewing ชี้ให้เห็นว่าโครงสร้างการชงเปลี่ยนการสกัดได้อย่างไร",
    },
    summary: {
      en: "Recipes like the V60 Switch combine open pours with steep-and-release. This changes not only timing, but also how extraction builds through the cup.",
      th: "สูตรอย่าง V60 Switch รวมทั้งการเทแบบเปิดและช่วง steep-and-release เข้าไว้ด้วยกัน สิ่งที่เปลี่ยนจึงไม่ใช่แค่เวลา แต่รวมถึงลักษณะการสกัดทั้งถ้วยด้วย",
    },
    readTime: { en: "4 min read", th: "อ่าน 4 นาที" },
    tags: ["Switch", "Hybrid", "Steep & Release"],
    sections: {
      en: [
        "Hario USA’s Switch recipe with Partners Coffee is useful because it shows a hybrid logic in explicit stages: bloom with the valve open, a second pour still open, then a closed-valve immersion phase before draining. The point is not the exact numbers alone, but the way structure changes contact time.",
        "Compared with a fully open dripper, a hybrid sequence can increase contact time in a controlled later phase without forcing the entire brew into a tighter grind or heavier agitation. That makes it a good example of how brew architecture itself shapes flavor.",
        "Even if you do not brew with a Switch, the lesson carries over: changing stage structure can be more effective than making tiny tweaks everywhere. That is an inference from the recipe design, but it is a practical one for recipe planning.",
      ],
      th: [
        "สูตร V60 Switch ของ Hario USA ที่ทำร่วมกับ Partners Coffee มีประโยชน์มากเพราะแสดงตรรกะของ hybrid brewing แบบเห็นเป็นช่วงชัดเจน: bloom โดยเปิดวาล์ว เทรอบสองขณะยังเปิดวาล์ว จากนั้นปิดวาล์วเพื่อแช่ และค่อยเปิดให้ไหลออก ประเด็นสำคัญจึงไม่ใช่แค่ตัวเลข แต่คือโครงสร้างที่ทำให้ contact time เปลี่ยนไปอย่างตั้งใจ",
        "เมื่อเทียบกับดริปเปอร์ที่เปิดตลอด สูตรแบบ hybrid สามารถเพิ่มเวลาสัมผัสระหว่างน้ำกับกาแฟในช่วงท้ายอย่างควบคุมได้ โดยไม่จำเป็นต้องบังคับให้ทั้งสูตรใช้กาแฟละเอียดขึ้นหรือ agitation แรงขึ้น นี่คืออีกตัวอย่างชัดเจนว่า architecture ของสูตรชงเองก็เปลี่ยนรสชาติได้",
        "ถึงแม้คุณจะไม่ได้ใช้ Switch โดยตรง บทเรียนสำคัญยังนำไปใช้ต่อได้คือ การเปลี่ยนโครงสร้างของแต่ละ stage อาจมีผลมากกว่าการจูนจุดเล็ก ๆ กระจายไปทุกที่ ข้อนี้เป็นการสังเคราะห์จากสูตรต้นทาง แต่ใช้เป็นหลักคิดได้ดีมากในการออกแบบสูตร",
      ],
    },
    takeaway: {
      en: "Recipe structure is a lever on its own. Sometimes changing stages is smarter than micro-adjusting every variable.",
      th: "โครงสร้างสูตรเป็นคันโยกในตัวเอง บางครั้งการเปลี่ยน stage ฉลาดกว่าการจูนทุกตัวแปรแบบละเอียดเกินไป",
    },
    sources: [
      {
        label: "Hario USA: V60 SWITCH Recipe With Partners Coffee",
        url: "https://www.hario-usa.com/blogs/brewing-demos-and-recipes/v60-switch-recipe-with-partners-coffee",
      },
      {
        label: "Perfect Daily Grind: How To Take Your Pour Over Brewing To The Next Level",
        url: "https://perfectdailygrind.com/2020/07/tips-for-next-level-pour-over-coffee-brewing/",
      },
    ],
    apply: {
      source: "standard",
      label: { en: "Apply Structured Pulse Recipe", th: "ใช้สูตร pulse ที่มีโครงสร้างชัด" },
      description: {
        en: "Keeps the app on a readable standard recipe so stage structure is easier to compare brew-to-brew.",
        th: "คงแอปไว้ที่สูตรมาตรฐานที่อ่านง่าย เพื่อให้เปรียบเทียบโครงสร้างแต่ละช่วงได้ง่ายขึ้นในแต่ละครั้งที่ชง",
      },
      overrides: {
        ratio: 15.7,
        roastLevel: "medium",
        process: "washed",
      },
    },
  },
];

export const coffeeVideoGuides: CoffeeVideoGuide[] = [
  {
    id: "james-hoffmann-one-cup-v60",
    categoryId: "methods",
    eyebrow: { en: "Video Guide", th: "วิดีโอแนะนำ" },
    title: {
      en: "A Better 1 Cup V60 Technique",
      th: "เทคนิค V60 สำหรับ 1 แก้วที่ทำซ้ำง่ายขึ้น",
    },
    creator: "James Hoffmann",
    summary: {
      en: "This video reframes one-cup V60 brewing as a simple, repeatable pulse structure for sweeter and fuller extraction with small doses.",
      th: "วิดีโอนี้อธิบายการชง V60 1 แก้วใหม่ให้เป็นโครงสร้างการเทแบบ pulse ที่เรียบง่ายและทำซ้ำง่ายขึ้น เพื่อให้ถ้วยหวานและเต็มขึ้นแม้ใช้ dose น้อย",
    },
    method: {
      en: [
        "Use 15g coffee with 250g soft filtered water and preheat the brewer thoroughly.",
        "Bloom with up to 50g water for about 45 seconds, then continue in 50g blocks.",
        "Keep pours low and circular to encourage even agitation rather than dramatic turbulence.",
      ],
      th: [
        "ใช้กาแฟ 15 กรัมกับน้ำกรอง 250 กรัม และอุ่นอุปกรณ์ให้ร้อนก่อนชง",
        "Bloom ด้วยน้ำราว 50 กรัมประมาณ 45 วินาที แล้วเทต่อเป็นช่วงละ 50 กรัม",
        "คุมการเทให้ต่ำและเป็นวงกลม เพื่อให้ agitation สม่ำเสมอโดยไม่ปั่น bed แรงเกินไป",
      ],
    },
    tags: ["V60", "1 Cup", "Pulse Pour"],
    videoId: "1oB1oDrDkHM",
    watchUrl: "https://www.youtube.com/watch?v=1oB1oDrDkHM",
    sourceUrl: "https://glasp.co/youtube/p/a-better-1-cup-v60-technique",
  },
  {
    id: "tetsu-kasuya-four-six",
    categoryId: "methods",
    eyebrow: { en: "Video Guide", th: "วิดีโอแนะนำ" },
    title: {
      en: "V60 Pour Over: 4:6 Method",
      th: "V60 Pour Over แบบ 4:6 Method",
    },
    creator: "Tetsu Kasuya method demo",
    summary: {
      en: "This demo makes the 4:6 logic visible: split water into five pours, let the first 40% shape taste, and use the remaining pours to shape density.",
      th: "วิดีโอนี้ทำให้เห็น logic ของ 4:6 ชัดขึ้น โดยแบ่งน้ำเป็น 5 ครั้ง ให้ 40% แรกกำหนดรส และใช้ส่วนที่เหลือกำหนดความแน่นของกาแฟ",
    },
    method: {
      en: [
        "Use coarse grounds, 15g coffee, and 225g water split across five pours.",
        "The early pours bias taste; later pours bias body and strength.",
        "Keep timing regular so the structure of the recipe remains readable cup to cup.",
      ],
      th: [
        "ใช้กาแฟบดหยาบ 15 กรัม กับน้ำ 225 กรัม แบ่งเท 5 ครั้ง",
        "การเทช่วงต้นใช้กำหนดทิศทางรส ส่วนช่วงท้ายใช้กำหนด body และความเข้ม",
        "รักษาจังหวะเวลาให้คงที่ เพื่อให้โครงสร้างสูตรอ่านผลได้ชัดในแต่ละครั้งที่ชง",
      ],
    },
    tags: ["4:6", "Kasuya", "Taste Design"],
    videoId: "fKl8_ZlGMbk",
    watchUrl: "https://www.youtube.com/watch?v=fKl8_ZlGMbk",
    sourceUrl: "https://www.youtube.com/watch?v=fKl8_ZlGMbk",
  },
  {
    id: "switch-recipe-video",
    categoryId: "recipes",
    eyebrow: { en: "Video Guide", th: "วิดีโอแนะนำ" },
    title: {
      en: "Hario Switch Recipe",
      th: "สูตรชง Hario Switch",
    },
    creator: "Eight Ounce Coffee",
    summary: {
      en: "This short guide shows how steep-and-release changes the brew structure, making it easier to build body without forcing the entire recipe into one extraction style.",
      th: "วิดีโอสั้นนี้แสดงให้เห็นว่า steep-and-release เปลี่ยนโครงสร้างการชงอย่างไร ทำให้เพิ่ม body ได้โดยไม่ต้องบังคับให้ทั้งสูตรอยู่ในรูปแบบการสกัดแบบเดียว",
    },
    method: {
      en: [
        "Bloom and early pours behave more like a pour-over, keeping the cup articulate.",
        "Closing the switch adds a controlled immersion phase for extra contact time.",
        "Opening the valve later releases the brew and creates a hybrid profile between drip and immersion.",
      ],
      th: [
        "ช่วง bloom และการเทต้น ๆ ยังทำงานคล้าย pour-over จึงคงความชัดของถ้วยไว้ได้",
        "การปิดวาล์วเพิ่มช่วง immersion อย่างควบคุม เพื่อเพิ่ม contact time",
        "การเปิดวาล์วในตอนท้ายทำให้สูตรนี้มีบุคลิกกึ่งกลางระหว่าง drip และ immersion",
      ],
    },
    tags: ["Switch", "Hybrid", "Immersion"],
    videoId: "XXwrrGWOINQ",
    watchUrl: "https://www.youtube.com/watch?v=XXwrrGWOINQ",
    sourceUrl: "https://www.youtube.com/watch?v=XXwrrGWOINQ",
  },
];
