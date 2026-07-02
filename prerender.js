import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { caseStudies } from './src/utils/Constant/caseStudies.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Simple zero-dependency .env reader
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const [key, ...valueParts] = trimmed.split('=');
      const val = valueParts.join('=').trim();
      process.env[key.trim()] = val.replace(/^["']|["']$/g, '');
    }
  });
}

const API_BASE_URL = process.env.VITE_API_BASE_URL || 'https://api.futurisesolutions.com';
const DIST_PATH = path.join(__dirname, 'dist');
const INDEX_HTML_PATH = path.join(DIST_PATH, 'index.html');

async function run() {
  if (!fs.existsSync(INDEX_HTML_PATH)) {
    console.error('❌ dist/index.html not found. Please run "npm run build" first.');
    process.exit(1);
  }

  const template = fs.readFileSync(INDEX_HTML_PATH, 'utf-8');

  // Fetch blogs from API
  console.log(`📡 Fetching blogs from ${API_BASE_URL}...`);
  let blogs = [];
  try {
    const res = await fetch(`${API_BASE_URL}/api/blogs/admin/all`);
    if (res.ok) {
      const data = await res.json();
      blogs = Array.isArray(data) ? data : (data?.blogs || data?.data || []);
    } else {
      console.warn(`⚠️ Failed to fetch blogs: ${res.statusText}`);
    }
  } catch (err) {
    console.warn(`⚠️ Error fetching blogs: ${err.message}`);
  }

  console.log(`📝 Found ${blogs.length} blogs to pre-render.`);

  // 1. Pre-render Blog Detail Pages
  for (const blog of blogs) {
    if (!blog.slug) continue;

    const slug = blog.slug;
    const title = blog.meta?.metaTitle || blog.title || '';
    const description = blog.meta?.metaDescription || blog.shortDescription || '';
    const imageUrl = blog.featuredImage ? (
      /^https?:\/\//i.test(blog.featuredImage) ? blog.featuredImage : `${API_BASE_URL}${blog.featuredImage}`
    ) : 'https://www.futurisesolutions.com/home.png';
    const keywords = (blog.meta?.metaKeywords || blog.tags || []).join(', ');

    const html = injectMetadata(template, {
      title: `${title} | Futurise Solutions`,
      description,
      imageUrl,
      keywords,
      url: `https://www.futurisesolutions.com/blog/${slug}`,
    });

    const dir = path.join(DIST_PATH, 'blog', slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf-8');
    console.log(`✅ Pre-rendered: /blog/${slug}`);
  }

  // 2. Pre-render Case Study Detail Pages
  const caseStudySlugs = Object.keys(caseStudies);
  console.log(`📝 Found ${caseStudySlugs.length} case studies to pre-render.`);

  for (const slug of caseStudySlugs) {
    const study = caseStudies[slug];
    const title = study.meta?.title || '';
    const description = study.meta?.description || '';
    const imageUrl = study.meta?.ogImage ? (
      /^https?:\/\//i.test(study.meta.ogImage) ? study.meta.ogImage : `https://www.futurisesolutions.com${study.meta.ogImage}`
    ) : 'https://www.futurisesolutions.com/home.png';
    const keywords = study.meta?.keywords || '';

    const html = injectMetadata(template, {
      title,
      description,
      imageUrl,
      keywords,
      url: `https://www.futurisesolutions.com/case-studies/${slug}`,
    });

    const dir = path.join(DIST_PATH, 'case-studies', slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf-8');
    console.log(`✅ Pre-rendered: /case-studies/${slug}`);
  }

  // 3. Pre-render Service Detail Pages
  const servicesData = [
    {
      slug: 'web-development',
      title: 'Web Development Services | Futurise Solutions',
      desc: 'Lightning-fast, SEO-ready websites and web apps built with modern frameworks and clean, maintainable code. Serving NZ, India, USA & worldwide.',
      keywords: 'web development company, React developer, Next.js, Node.js, full stack development, website development New Zealand, India, USA',
      image: '/webdevelopment.png',
    },
    {
      slug: 'app-development',
      title: 'App Development Company — iOS & Android (React Native) | Futurise Solutions',
      desc: 'Cross-platform iOS & Android apps built with React Native & Expo — fast, polished and scalable from one codebase. Serving NZ, India, the USA & worldwide.',
      keywords: 'mobile app development, React Native, Expo, iOS Android app, cross-platform app, app developer New Zealand',
      image: '/appdevlopment.png',
    },
    {
      slug: 'ui-ux-design',
      title: 'UI/UX Design Services | Futurise Solutions',
      desc: 'Research-driven product design and intuitive interfaces that turn first-time visitors into loyal customers. Wireframes, design systems, prototypes.',
      keywords: 'UI UX design, Figma design, product design, user experience design, mobile UI design, web design New Zealand',
      image: '/uiuxdevelopment.png',
    },
    {
      slug: 'blockchain-development',
      title: 'Blockchain & Web3 Development Services | Futurise Solutions',
      desc: 'Web3 frontends, DeFi platforms, MEV bots, launchpads, smart contracts, and multi-chain dApps built for real production on Ethereum, Solana, and BSC.',
      keywords: 'blockchain development, DeFi development, Web3, dApp development, MEV bot, Solana, Ethereum, smart contract',
      image: '/blockchaindevelopment.png',
    },
    {
      slug: 'ai-ml-solutions',
      title: 'AI & ML Solutions | Futurise Solutions',
      desc: 'Custom AI agents, LLM & RAG integrations, machine learning, and AI-powered features that automate workflows and make your product smarter.',
      keywords: 'AI development, ML solutions, AI agents, LLM integration, ChatGPT integration, AI SaaS, machine learning New Zealand',
      image: '/aimlsol.png',
    },
    {
      slug: 'digital-marketing',
      title: 'Digital Marketing Services — SEO & Performance | Futurise Solutions',
      desc: 'Data-led SEO, performance marketing, paid search, paid social, CRO, and analytics that grow traffic, leads, and revenue.',
      keywords: 'digital marketing agency, SEO services, Google Ads, social media marketing, performance marketing New Zealand',
      image: '/digitalmarkiting.png',
    },
  ];

  console.log(`📝 Found ${servicesData.length} service pages to pre-render.`);
  for (const svc of servicesData) {
    const html = injectMetadata(template, {
      title: svc.title,
      description: svc.desc,
      imageUrl: `https://www.futurisesolutions.com${svc.image}`,
      keywords: svc.keywords,
      url: `https://www.futurisesolutions.com/service/${svc.slug}`,
    });

    const dir = path.join(DIST_PATH, 'service', svc.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf-8');
    console.log(`✅ Pre-rendered: /service/${svc.slug}`);
  }

  // 4. Pre-render static pages to their own folders for SEO indexing
  const staticPages = [
    {
      pathName: 'about',
      title: 'About Us — AI & Web Development Studio | Futurise Solutions',
      desc: 'Meet Futurise Solutions — a senior team building AI agents, SaaS platforms, web apps, mobile apps & Web3 products for ambitious brands in New Zealand, India & USA. Our mission, values & tech expertise.',
      keywords: 'about Futurise Solutions, AI development team, web development company, mobile app developers, blockchain team, New Zealand tech agency, digital product studio',
      image: '/about.png'
    },
    {
      pathName: 'contact',
      title: 'Contact Us — Get a Free Quote | Futurise Solutions',
      desc: 'Start your AI, SaaS, web or mobile app project with Futurise Solutions. We reply within hours to schedule a free consultation. Based in Wellington, NZ — serving India, USA & worldwide.',
      keywords: 'contact Futurise Solutions, hire web developer New Zealand, get a quote AI app, start SaaS project, web development consultation, mobile app quote, free project consultation',
      image: '/contactus.png'
    },
    {
      pathName: 'portfolio',
      title: 'Portfolio — AI, SaaS, Web & Mobile Projects | Futurise Solutions',
      desc: 'Explore our portfolio: SaaS dashboards, AI-powered platforms, luxury e-commerce, real-estate sites, crypto trading terminals & hotel booking apps — built for clients in New Zealand, India & USA.',
      keywords: 'web development portfolio, AI app portfolio, SaaS portfolio, React projects, blockchain projects, mobile app portfolio, New Zealand web agency portfolio, case studies',
      image: '/portfolio.png'
    },
    {
      pathName: 'case-studies',
      title: 'Case Studies — Real Results From Real Projects | Futurise Solutions',
      desc: 'Explore how Futurise Solutions delivered measurable outcomes across AI, Web, App, Blockchain, UI/UX, and Digital Marketing — with verified results and client testimonials.',
      keywords: 'Futurise Solutions case studies, AI development case study, SaaS platform case study, mobile app case study, DeFi protocol case study, UI UX redesign case study, SEO growth case study',
      image: '/home.png'
    },
    {
      pathName: 'blog',
      title: 'Blog | Futurise Solutions',
      desc: 'Insights, deep-dives and engineering notes from Futurise Solutions on AI, SaaS, web and mobile development.',
      keywords: 'software development blog, AI development insights, web development, SaaS, app development, futurise solutions',
      image: '/home.png'
    },
    {
      pathName: 'privacy',
      title: 'Privacy Policy | Futurise Solutions',
      desc: 'Learn how Futurise Solutions collects, uses, and protects your personal information. Our privacy policy covers data handling for our AI, web, mobile, and blockchain services.',
      keywords: 'Futurise Solutions privacy policy, data protection, personal information, GDPR, New Zealand Privacy Act, data security',
      image: '/home.png'
    },
    {
      pathName: 'terms',
      title: 'Terms & Conditions | Futurise Solutions',
      desc: 'Read the Terms and Conditions governing the use of Futurise Solutions\' website and services including AI development, web development, mobile apps, UI/UX design, blockchain, and digital marketing.',
      keywords: 'Futurise Solutions terms and conditions, service agreement, client terms, web development contract, AI development terms, New Zealand digital agency terms',
      image: '/home.png'
    }
  ];

  for (const page of staticPages) {
    const imageUrl = page.image && page.image.startsWith('/') 
      ? `https://www.futurisesolutions.com${page.image}` 
      : (page.image || 'https://www.futurisesolutions.com/home.png');

    const html = injectMetadata(template, {
      title: page.title,
      description: page.desc,
      imageUrl: imageUrl,
      keywords: page.keywords,
      url: `https://www.futurisesolutions.com/${page.pathName}`,
    });

    const dir = path.join(DIST_PATH, page.pathName);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf-8');
    console.log(`✅ Pre-rendered: /${page.pathName}`);
  }

  console.log('🎉 Pre-rendering completed successfully!');
}

function injectMetadata(html, { title, description, imageUrl, keywords, url }) {
  let modified = html;

  // Helper function to replace attributes in meta tags safely
  const replaceMetaTag = (htmlText, keyName, attrName, newContent) => {
    // Matches a <meta ... name/property="keyName" ...> tag, spanning across newlines if needed
    const metaTagRegex = new RegExp(`<meta\\s+([^>]*?(?:name|property)=["']${attrName}["'][^>]*?)>`, 'is');
    
    return htmlText.replace(metaTagRegex, (match, attributes) => {
      if (attributes.includes('content=')) {
        // Replace existing content attribute value
        return `<meta ${attributes.replace(/content=(["'])(.*?)\1/is, `content=$1${newContent}$1`)}>`;
      } else {
        // Append content attribute if it doesn't exist
        return `<meta ${attributes} content="${newContent}">`;
      }
    });
  };

  // Title tag (special case as it's not a meta tag)
  modified = modified.replace(/<title>[^<]*<\/title>/is, `<title>${title}</title>`);

  // Canonical tag (special case)
  modified = modified.replace(/<link\s+[^>]*?rel=["']canonical["'][^>]*?>/is, (match) => {
    return match.replace(/href=(["'])(.*?)\1/is, `href=$1${url}$1`);
  });

  // Basic meta tags
  modified = replaceMetaTag(modified, 'description', 'description', description);
  modified = replaceMetaTag(modified, 'keywords', 'keywords', keywords);

  // Open Graph meta tags
  modified = replaceMetaTag(modified, 'og:title', 'og:title', title);
  modified = replaceMetaTag(modified, 'og:description', 'og:description', description);
  modified = replaceMetaTag(modified, 'og:image', 'og:image', imageUrl);
  modified = replaceMetaTag(modified, 'og:url', 'og:url', url);

  // Twitter meta tags
  modified = replaceMetaTag(modified, 'twitter:title', 'twitter:title', title);
  modified = replaceMetaTag(modified, 'twitter:description', 'twitter:description', description);
  modified = replaceMetaTag(modified, 'twitter:image', 'twitter:image', imageUrl);

  return modified;
}

run();
