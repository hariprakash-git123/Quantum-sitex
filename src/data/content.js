// ─────────────────────────────────────────────────────────────
//  Content data. Edit copy here; pages render from these lists.
//  Guardrail: no invented clients, numbers, results or credentials.
// ─────────────────────────────────────────────────────────────

// The 10 approved main sections, in order.
export const nav = [
  { slug: 'index', label: 'Home', href: 'index.html' },
  { slug: 'about', label: 'About Us', href: 'about.html' },
  { slug: 'services', label: 'Services', href: 'services.html' },
  { slug: 'projects', label: 'Projects', href: 'projects.html' },
  { slug: 'products', label: 'Products', href: 'products.html' },
  { slug: 'technologies', label: 'Technologies', href: 'technologies.html' },
  { slug: 'industries', label: 'Industries', href: 'industries.html' },
  { slug: 'why', label: 'Why Quantum Sitex', href: 'why.html' },
  { slug: 'contact', label: 'Contact', href: 'contact.html' },
  { slug: 'roadmap', label: 'Future Roadmap', href: 'roadmap.html' },
];

// group = what kind of work it is (shown as a label, not decoration)
export const services = [
  {
    slug: 'website-development',
    name: 'Website Development',
    group: 'Build',
    summary:
      'Fast, responsive websites that explain what you do and make it easy for people to get in touch.',
    includes: ['Company & portfolio sites', 'Landing pages', 'CMS setup', 'SEO foundations'],
  },
  {
    slug: 'web-application-development',
    name: 'Web Application Development',
    group: 'Build',
    summary:
      'Custom web applications — portals, dashboards and internal tools — shaped around how your team actually works.',
    includes: ['Customer portals', 'Admin dashboards', 'Internal tools', 'Role-based access'],
  },
  {
    slug: 'ai-development-integration',
    name: 'AI Development & Integration',
    group: 'Intelligence',
    summary:
      'Practical AI added where it helps: assistants, document processing, smart search and LLM-powered features.',
    includes: ['Chatbots & assistants', 'RAG over your documents', 'AI agents', 'LLM API integration'],
  },
  {
    slug: 'ui-ux-design',
    name: 'UI/UX Design',
    group: 'Design',
    summary:
      'Interfaces planned around real tasks — clear flows, readable layouts and prototypes you can click through before code.',
    includes: ['User flows', 'Wireframes', 'Interactive prototypes', 'Design systems'],
  },
  {
    slug: 'software-automation',
    name: 'Software Automation',
    group: 'Intelligence',
    summary:
      'Repetitive work handed to software — data entry, reports, notifications and hand-offs between tools.',
    includes: ['Workflow automation', 'Scheduled jobs', 'Report generation', 'Tool-to-tool sync'],
  },
  {
    slug: 'cloud-devops',
    name: 'Cloud & DevOps',
    group: 'Operate',
    summary:
      'Deployment, hosting and release pipelines set up so your software ships reliably and scales when it needs to.',
    includes: ['Cloud deployment', 'Containers', 'CI/CD pipelines', 'Monitoring setup'],
  },
  {
    slug: 'api-development-integration',
    name: 'API Development & Integration',
    group: 'Build',
    summary:
      'APIs that let your systems talk to each other, plus connections to payment, messaging and third-party services.',
    includes: ['REST & GraphQL APIs', 'Third-party integrations', 'Webhooks', 'API documentation'],
  },
  {
    slug: 'e-commerce-solutions',
    name: 'E-commerce Solutions',
    group: 'Build',
    summary:
      'Online stores and ordering flows — catalogue, cart, checkout and payments — built to be easy to run day to day.',
    includes: ['Storefronts', 'Payment integration', 'Inventory sync', 'Order management'],
  },
  {
    slug: 'maintenance-support',
    name: 'Maintenance & Support',
    group: 'Operate',
    summary:
      'Updates, fixes and improvements after launch, so your website or application keeps working as things change.',
    includes: ['Bug fixes', 'Security updates', 'Performance tuning', 'Feature additions'],
  },
  {
    slug: 'data-driven-solutions',
    name: 'Data-Driven Solutions',
    group: 'Intelligence',
    summary:
      'Turning scattered data into dashboards and reports that answer the questions your team keeps asking.',
    includes: ['Dashboards', 'Data pipelines', 'Reporting', 'Data cleanup'],
  },
];

// Planned product categories — NOT launched products.
export const products = [
  {
    slug: 'ai-web-apps',
    name: 'AI-Integrated Web Applications',
    summary:
      'Intelligent web applications that combine modern web technology with AI capabilities.',
    areas: [
      'AI chatbots and assistants',
      'AI agents and workflow automation',
      'Document processing',
      'AI search and recommendations',
      'Data analysis and reporting',
      'Custom AI integrations',
    ],
  },
  {
    slug: 'saas',
    name: 'SaaS Products',
    summary:
      'Cloud-based software products that simplify business operations, improve productivity and help organizations manage their work through connected digital platforms.',
    areas: ['Cloud-hosted, subscription-ready', 'Connected team workspaces', 'Productivity tooling'],
  },
  {
    slug: 'business-software',
    name: 'Business Management Software',
    summary: 'Systems that bring the core operations of a business into one place.',
    areas: [
      'Business Management Systems',
      'ERP',
      'CRM',
      'HR and Employee Management',
      'Finance and Accounting',
      'Inventory and Operations',
      'Project and Task Management',
    ],
  },
  {
    slug: 'industry-software',
    name: 'Industry-Specific Software',
    summary:
      'Software designed around the requirements of particular industries, starting with education and college management.',
    areas: ['Education and college management', 'Further industries over time'],
  },
];

export const techCategories = [
  { name: 'Frontend', items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Next.js'] },
  { name: 'Backend', items: ['Python', 'Flask', 'FastAPI', 'Java', 'Spring Boot', 'Node.js'] },
  { name: 'Mobile', items: ['React Native', 'Flutter', 'Kotlin'] },
  {
    name: 'AI & Machine Learning',
    items: ['Artificial Intelligence', 'Machine Learning', 'Generative AI', 'LLMs', 'AI Agents', 'RAG', 'NLP'],
  },
  {
    name: 'AI Platforms & Integration',
    items: ['OpenAI', 'Anthropic Claude', 'Gemini', 'AI APIs', 'AI Automation'],
  },
  { name: 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQLite'] },
  {
    name: 'Cloud & DevOps',
    items: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'CI/CD'],
  },
  {
    name: 'APIs & Integration',
    items: ['REST APIs', 'WebSockets', 'GraphQL', 'Third-party integrations'],
  },
  { name: 'Tools', items: ['Git', 'GitHub', 'Figma', 'Linux'] },
];

// Marquee rows: [label, simple-icons slug | null]
export const techMarquee = {
  left: [
    ['HTML5', 'html5'], ['CSS3', 'css'], ['JavaScript', 'javascript'], ['TypeScript', 'typescript'],
    ['React', 'react'], ['Next.js', 'nextdotjs'], ['Python', 'python'], ['Flask', 'flask'],
    ['FastAPI', 'fastapi'], ['Java', 'openjdk'], ['Spring Boot', 'springboot'], ['Node.js', 'nodedotjs'],
    ['React Native', 'react'], ['Flutter', 'flutter'], ['Kotlin', 'kotlin'],
  ],
  right: [
    ['OpenAI', null], ['Claude', 'claude'], ['Gemini', 'googlegemini'], ['PostgreSQL', 'postgresql'],
    ['MySQL', 'mysql'], ['MongoDB', 'mongodb'], ['Redis', 'redis'], ['SQLite', 'sqlite'],
    ['AWS', null], ['Azure', null], ['Google Cloud', 'googlecloud'], ['Docker', 'docker'],
    ['Kubernetes', 'kubernetes'], ['GitHub Actions', 'githubactions'], ['GraphQL', 'graphql'],
    ['Git', 'git'], ['GitHub', 'github'], ['Figma', 'figma'], ['Linux', 'linux'],
  ],
};

export const industries = [
  { slug: 'education', name: 'Education', line: 'Student portals, college management, learning tools and admissions workflows.' },
  { slug: 'healthcare', name: 'Healthcare', line: 'Appointment booking, patient records interfaces and clinic operations software.' },
  { slug: 'real-estate', name: 'Real Estate', line: 'Property listings, lead management and agent dashboards.' },
  { slug: 'retail', name: 'Retail & E-commerce', line: 'Online stores, inventory sync and order management.' },
  { slug: 'finance', name: 'Finance & FinTech', line: 'Dashboards, reporting tools and secure customer portals.' },
  { slug: 'hospitality', name: 'Hospitality', line: 'Reservations, guest communication and property operations.' },
  { slug: 'logistics', name: 'Logistics & Transportation', line: 'Shipment tracking, fleet scheduling and dispatch tools.' },
  { slug: 'manufacturing', name: 'Manufacturing', line: 'Production tracking, inventory and operations reporting.' },
  { slug: 'professional-services', name: 'Professional Services', line: 'Client portals, project tracking, billing and document automation.' },
  { slug: 'media', name: 'Media & Entertainment', line: 'Content platforms, publishing workflows and audience tools.' },
];

export const why = [
  {
    name: 'Client-Focused Approach',
    text: 'We start with your goals, your users and your constraints — then shape the solution around them, not around a template.',
  },
  {
    name: 'Modern Technology',
    text: 'We choose current, well-supported frameworks and platforms so what we build stays maintainable after launch.',
  },
  {
    name: 'AI-Driven Innovation',
    text: 'We look for places where AI genuinely saves time or adds value — and say so plainly when it doesn’t.',
  },
  {
    name: 'Custom Solutions',
    text: 'Every business works differently. We build for the way yours works instead of forcing it into a generic product.',
  },
  {
    name: 'Scalable Development',
    text: 'Clean architecture and sensible foundations, so your software can grow with more users, data and features.',
  },
  {
    name: 'Continuous Support',
    text: 'Launch is a milestone, not the finish line. We stay available for updates, fixes and the next improvement.',
  },
];

export const roadmap = [
  {
    stage: 'Stage 1',
    name: 'Building the Foundation',
    status: 'Current focus',
    text: 'Establish the company website, service offerings and development capabilities.',
  },
  {
    stage: 'Stage 2',
    name: 'Expanding Digital Products',
    status: 'Planned',
    text: 'Develop AI-integrated applications, SaaS products and business management software.',
  },
  {
    stage: 'Stage 3',
    name: 'Growing the Ecosystem',
    status: 'Planned',
    text: 'Expand product offerings, explore more industries and serve customers globally.',
  },
];

// Real, completed projects only. The Projects page groups them by `category`.
// Images go in src/assets/projects/ — use the original screenshots, unedited.
// Shape: { slug, title, category, status, tech: [], summary, description: [],
//          features: [], skills: [], image, imageAlt, width, height, demoUrl?, codeUrl? }
export const projects = [
  {
    slug: 'mobile-sales-dashboard',
    title: 'Mobile Sales Dashboard',
    category: 'Data Analytics',
    status: 'Completed',
    tech: ['Microsoft Power BI'],
    summary:
      'An interactive Power BI dashboard analysing mobile phone sales across brands, cities, payment methods and models.',
    description: [
      'This project presents an interactive Mobile Sales Dashboard built using Microsoft Power BI.',
      'The dashboard provides a comprehensive analysis of mobile phone sales performance across different brands, cities, payment methods and mobile models.',
      'The objective of this project is to transform raw sales data into meaningful business insights through interactive visualizations, KPIs, filters and data analysis.',
    ],
    features: [
      'Total Orders KPI',
      'Total Quantity KPI',
      'Cities Overview',
      'Brands Overview',
      'Payment Methods Overview',
      'Orders Trend by Month',
      'Top Brands Analysis',
      'Revenue by Brand',
      'Payment Method Distribution',
      'Top Selling Models',
      'Interactive Brand and City Filters',
    ],
    skills: [
      'Microsoft Power BI', 'Data Visualization', 'Business Intelligence', 'Sales Performance Analysis',
      'KPI Reporting', 'Interactive Dashboard Design', 'Data Analysis',
    ],
    image: 'assets/projects/mobile-sales-dashboard.jpeg',
    imageAlt:
      'Mobile Sales Dashboard in Power BI showing order, quantity, city, brand and payment-method KPIs, a monthly orders trend, top brands, revenue by brand, payment method split and top selling models.',
    width: 1331,
    height: 737,
  },
  {
    slug: 'car-sales-dashboard-dax',
    title: 'Car Sales Dashboard (DAX)',
    category: 'Data Analytics',
    status: 'Completed',
    tech: ['Microsoft Power BI', 'DAX'],
    summary:
      'A Power BI and DAX dashboard covering car sales performance, revenue, profitability, sales growth and brand contributions.',
    description: [
      'This project presents a Car Sales Dashboard built using Microsoft Power BI and DAX.',
      'The dashboard provides an overview of car sales performance, revenue, profitability, sales growth and brand contributions through interactive visualizations and business performance indicators.',
      'It helps users explore sales trends and understand different aspects of car sales performance.',
    ],
    features: [
      'YTD Sales KPI',
      'Month-over-Month Growth KPI',
      'Total Revenue KPI',
      'Profit Margin KPI',
      'Profit per Car KPI',
      'Sales Growth Percentage KPI',
      'YTD Sales by Month',
      'Sales Amount by Region',
      'Sales Contribution by Brand',
      'Revenue vs Profit Analysis',
      'Customer Rating by Brand',
      'Year, Month and Region Filters',
    ],
    skills: [
      'Microsoft Power BI', 'DAX', 'Data Visualization', 'Business Intelligence', 'Sales and Revenue Analysis',
      'Profitability Analysis', 'KPI Development', 'Interactive Dashboard Design',
    ],
    image: 'assets/projects/car-sales-dashboard-dax.png',
    imageAlt:
      'Car Sales Dashboard (DAX) in Power BI showing YTD sales, month-over-month growth, revenue, profit margin, profit per car and sales growth KPIs, with charts for YTD sales by month, sales by region, brand contribution, revenue versus profit and customer rating by brand.',
    width: 1415,
    height: 798,
  },
  {
    slug: 'personal-portfolio-website',
    title: 'Personal Portfolio Website',
    category: 'Website Development',
    status: 'Completed',
    tech: [],
    summary:
      'A personal portfolio website that showcases professional information, skills, projects and personal work through a dedicated online presence.',
    description: [
      'A personal portfolio website developed to showcase professional information, skills, projects and personal work through a dedicated online presence.',
      'The website provides visitors with an overview of the portfolio owner’s background, capabilities and work.',
    ],
    image: 'assets/projects/personal-portfolio-website.png',
    imageAlt:
      'Home page of the personal portfolio website: a dark layout with the headline “Hi, I’m Hariprakash P”, a short introduction, View Projects, GitHub Profile and Contact Me buttons, and a circular profile photo marked “Open to roles”.',
    imageCaption: 'Original website screenshot.',
    width: 1917,
    height: 1025,
    demoUrl: 'https://hariprakashportfoliohp.netlify.app/',
    demoLabel: 'View live website',
  },
  {
    slug: 'sitex-spectrum',
    title: 'Sitex Spectrum',
    category: 'Web Application Development',
    status: 'Project Showcase',
    tech: ['React', 'Vite', 'Express.js', 'OpenSearch', 'MongoDB', 'Redis', 'Parallel Search'],
    summary:
      'A web-based search platform combining modern frontend development with backend search infrastructure.',
    description: [
      'Sitex Spectrum is a web-based search platform designed to provide an integrated search experience through a modern user interface and backend search infrastructure.',
      'The project combines frontend development, backend services, search infrastructure and database technologies to support a search-focused web application.',
      'The objective is to create a unified search experience through a dedicated web interface and supporting backend technologies.',
    ],
    image: 'assets/projects/sitex-spectrum.png',
    imageAlt:
      'Sitex Spectrum front page: a dark search interface with the title “Sitex Spectrum”, the tagline “Search beyond keywords.”, a large search bar, an “I’m Feeling Curious” button and shortcut icons for Wikipedia, YouTube, GitHub, Stack Overflow and LinkedIn.',
    imageCaption: 'Front-page screenshot.',
    width: 1895,
    height: 1023,
  },
];

export const process = ['Imagine it', 'Design it', 'Develop it', 'Integrate AI', 'Launch it', 'Grow it'];
