const Service = require('./models/Service');
const Portfolio = require('./models/Portfolio');
const Career = require('./models/Career');
const PrivacyPolicy = require('./models/PrivacyPolicy');
const Testimonial = require('./models/Testimonial');
const TeamMember = require('./models/TeamMember');
const SiteSettings = require('./models/SiteSettings');
const Admin = require('./models/Admin');
const Contact = require('./models/Contact');
const Application = require('./models/Application');
const bcrypt = require('bcryptjs');

const initialServices = [
  // FOUNDATION
  {
    id: 'it-services',
    title: 'IT Services',
    description: 'We provide comprehensive IT services to help businesses optimize their technology infrastructure, ensuring seamless operations, security, and scalability in the digital age.',
    icon: '',
    features: [
      { title: 'IT Consulting', desc: 'Strategic guidance to align technology with business goals.' },
      { title: 'Cloud Solutions', desc: 'Secure and scalable cloud migration and management.' },
      { title: 'Cybersecurity', desc: 'Advanced protection against digital threats and data breaches.' },
      { title: 'Network Infrastructure', desc: 'Reliable and high-performance network setup.' }
    ],
    processSteps: ['Consultation', 'Planning', 'Development', 'Testing', 'Deployment', 'Support'],
    technologies: ['Cloud Computing', 'Docker', 'Kubernetes', 'Linux', 'AWS', 'Cybersecurity']
  },
  {
    id: 'salesforce-services',
    title: 'Salesforce Services',
    description: 'Our Salesforce experts help you maximize your CRM investment through custom development, integration, and strategic consulting to drive sales and customer engagement.',
    icon: '',
    features: [
      { title: 'Sales & Service Cloud', desc: 'Customized CRM workflows for sales and support teams.' },
      { title: 'Apex & Lightning Components', desc: 'Tailored backend logic and modern UI components.' },
      { title: 'Integration & Automation', desc: 'Connect Salesforce with ERP, marketing, and database tools.' },
      { title: 'Consulting & Training', desc: 'Maximize team adoption and ROI with expert guidance.' }
    ],
    processSteps: ['Consultation', 'Planning', 'Development', 'Testing', 'Deployment', 'Support'],
    technologies: ['Salesforce', 'Apex', 'Lightning', 'SOQL', 'Sales Cloud']
  },
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'We build fast, responsive, and highly scalable web applications tailored to your specific business requirements with modern frontend and backend architectures.',
    icon: '',
    features: [
      { title: 'Full Stack Web Apps', desc: 'Custom web solutions engineered for speed and reliability.' },
      { title: 'Responsive UI/UX', desc: 'Pixel-perfect mobile and desktop user interfaces.' },
      { title: 'Progressive Web Apps (PWA)', desc: 'App-like web experiences with offline capabilities.' },
      { title: 'API Integration', desc: 'Seamless connection with third-party APIs and microservices.' }
    ],
    processSteps: ['Consultation', 'Planning', 'Development', 'Testing', 'Deployment', 'Support'],
    technologies: ['React', 'NextJS', 'NodeJS', 'TypeScript', 'MongoDB']
  },
  {
    id: 'mobile-app',
    title: 'Mobile App Development',
    description: 'Create engaging native and cross-platform mobile experiences for iOS and Android that delight users and drive long-term business growth.',
    icon: '',
    features: [
      { title: 'iOS & Android Native Apps', desc: 'High-performance native apps built with Swift and Kotlin.' },
      { title: 'Cross-Platform Frameworks', desc: 'Single codebase solutions powered by React Native & Flutter.' },
      { title: 'Intuitive Mobile UI', desc: 'User-centric designs built for high retention and engagement.' },
      { title: 'Push Sync & Offline Support', desc: 'Reliable offline storage and real-time push notifications.' }
    ],
    processSteps: ['Consultation', 'Planning', 'Development', 'Testing', 'Deployment', 'Support'],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'iOS / Android']
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Services',
    description: 'Data-driven marketing strategies to increase your online visibility, drive targeted traffic, and convert qualified leads into loyal customers.',
    icon: '',
    features: [
      { title: 'Search Engine Optimization (SEO)', desc: 'Boost organic search rankings and domain authority.' },
      { title: 'Pay-Per-Click (PPC) Ads', desc: 'High ROI ad campaigns across Google and social platforms.' },
      { title: 'Social Media Strategy', desc: 'Engaging content campaigns tailored for your target audience.' },
      { title: 'Conversion Rate Optimization', desc: 'Turn web visitors into paying customers with analytics.' }
    ],
    processSteps: ['Consultation', 'Planning', 'Development', 'Testing', 'Deployment', 'Support'],
    technologies: ['SEO', 'Google Ads', 'Meta Ads', 'Semrush', 'Analytics']
  },
  {
    id: 'software-development',
    title: 'Software Development',
    description: 'Custom enterprise software engineering solutions tailored to automate your unique business processes and solve complex technical challenges.',
    icon: '',
    features: [
      { title: 'Custom Enterprise Software', desc: 'Tailor-made software built around your exact workflows.' },
      { title: 'Microservices Architecture', desc: 'Decoupled, high-availability cloud-native services.' },
      { title: 'Legacy Refactoring', desc: 'Modernize legacy codebases into modern tech stacks.' },
      { title: 'API & Database Integration', desc: 'Unify internal software tools into a single platform.' }
    ],
    processSteps: ['Consultation', 'Planning', 'Development', 'Testing', 'Deployment', 'Support'],
    technologies: ['Java', 'Python', 'NodeJS', 'Docker', 'PostgreSQL']
  },

  // INNOVATION
  {
    id: 'ai-services',
    title: 'Artificial Intelligence',
    description: 'Leverage the power of AI, Machine Learning, and LLMs to automate repetitive tasks, personalize customer experiences, and unlock new operational capabilities.',
    icon: '',
    features: [
      { title: 'Custom AI & ML Models', desc: 'Train algorithms on proprietary business datasets.' },
      { title: 'Generative AI & Chatbots', desc: 'Smart conversational assistants powered by OpenAI and LLMs.' },
      { title: 'Predictive Analytics', desc: 'Forecast sales trends, user behavior, and market shifts.' },
      { title: 'Natural Language Processing (NLP)', desc: 'Automate document parsing and sentiment analysis.' }
    ],
    processSteps: ['Consultation', 'Planning', 'Development', 'Testing', 'Deployment', 'Support'],
    technologies: ['OpenAI', 'TensorFlow', 'PyTorch', 'Python', 'LangChain']
  },
  {
    id: 'iot',
    title: 'Internet Of Things',
    description: 'Connect, monitor, and manage smart hardware devices to collect real-time data, automate industrial workflows, and build connected ecosystems.',
    icon: '',
    features: [
      { title: 'Smart Hardware Integration', desc: 'Connect sensors, microcontrollers, and edge hardware.' },
      { title: 'Real-Time Telemetry', desc: 'Monitor sensor data streams on live interactive dashboards.' },
      { title: 'IoT Cloud Architecture', desc: 'Scalable cloud backends powered by AWS IoT and MQTT.' },
      { title: 'Edge Computing', desc: 'Process device data locally for zero latency decisions.' }
    ],
    processSteps: ['Consultation', 'Planning', 'Development', 'Testing', 'Deployment', 'Support'],
    technologies: ['MQTT', 'C++', 'AWS IoT', 'Raspberry Pi', 'Arduino']
  },
  {
    id: 'database-design',
    title: 'Database Design',
    description: 'Architecting robust, scalable, high-availability relational and NoSQL databases engineered for lightning-fast queries and zero downtime.',
    icon: '',
    features: [
      { title: 'Relational & NoSQL Architecture', desc: 'Custom schema modeling for SQL and MongoDB databases.' },
      { title: 'High Availability & Replication', desc: 'Master-replica clustering for 99.99% uptime.' },
      { title: 'Indexing & Performance Tuning', desc: 'Optimize slow queries to execute in milliseconds.' },
      { title: 'Data Migration & Security', desc: 'Seamlessly migrate legacy data with zero data loss.' }
    ],
    processSteps: ['Consultation', 'Planning', 'Development', 'Testing', 'Deployment', 'Support'],
    technologies: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'SQL']
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    description: 'Transform raw organizational data into actionable business intelligence dashboards to drive informed strategic decision-making.',
    icon: '',
    features: [
      { title: 'Business Intelligence Dashboards', desc: 'Interactive visual reports built in Tableau & Power BI.' },
      { title: 'Real-Time Data Pipelines', desc: 'ETL processing to consolidate multi-source company data.' },
      { title: 'Statistical Modeling', desc: 'Discover hidden operational bottlenecks and growth insights.' },
      { title: 'Automated Executive Reports', desc: 'Scheduled metrics delivered automatically to stakeholders.' }
    ],
    processSteps: ['Consultation', 'Planning', 'Development', 'Testing', 'Deployment', 'Support'],
    technologies: ['Tableau', 'PowerBI', 'Python', 'Pandas', 'SQL']
  },
  {
    id: 'industrial-automation',
    title: 'Industrial Automation',
    description: 'Streamline manufacturing and industrial processes with advanced SCADA, PLC programming, and smart industrial robotics automation.',
    icon: '',
    features: [
      { title: 'PLC & HMI Programming', desc: 'Custom controller logic for industrial machinery.' },
      { title: 'SCADA System Design', desc: 'Centralized plant monitoring and control interfaces.' },
      { title: 'Robotic Automation', desc: 'Automate repetitive manufacturing assembly lines.' },
      { title: 'Factory Line Telemetry', desc: 'Track machine health and prevent unplanned downtime.' }
    ],
    processSteps: ['Consultation', 'Planning', 'Development', 'Testing', 'Deployment', 'Support'],
    technologies: ['SCADA', 'PLC', 'Robotics', 'Industrial IoT', 'Modbus']
  },
  {
    id: 'software-testing',
    title: 'Software Testing',
    description: 'Rigorous manual and automated QA testing to ensure your software applications are bug-free, secure, and perform flawlessly under heavy load.',
    icon: '',
    features: [
      { title: 'Automated E2E Testing', desc: 'Regression test suites powered by Cypress & Selenium.' },
      { title: 'Performance & Load Testing', desc: 'Simulate high traffic loads to test server boundaries.' },
      { title: 'Security Vulnerability Audits', desc: 'Penetration testing to eliminate security gaps.' },
      { title: 'API & Unit Testing', desc: 'Ensure 100% backend API contract validity.' }
    ],
    processSteps: ['Consultation', 'Planning', 'Development', 'Testing', 'Deployment', 'Support'],
    technologies: ['Selenium', 'Jest', 'Cypress', 'Postman', 'JUnit']
  },

  // ENTERPRISE
  {
    id: 'staffing',
    title: 'Staffing & Payroll',
    description: 'Comprehensive IT workforce staffing, talent acquisition, and automated payroll processing solutions for scaling enterprises.',
    icon: '',
    features: [
      { title: 'Technical Talent Acquisition', desc: 'Source top-tier developers, engineers, and designers.' },
      { title: 'Dedicated IT Staff Augmentation', desc: 'Scale your engineering team rapidly with pre-vetted devs.' },
      { title: 'End-to-End Payroll Management', desc: 'Automated salary calculations, tax filing, and direct deposits.' },
      { title: 'HR Compliance & Auditing', desc: 'Stay compliant with local labor laws and tax regulations.' }
    ],
    processSteps: ['Consultation', 'Planning', 'Development', 'Testing', 'Deployment', 'Support'],
    technologies: ['HRMS', 'Payroll Systems', 'Talent Analytics']
  },
  {
    id: 'payment-gateway',
    title: 'Payment Gateway Service',
    description: 'Secure, PCI-compliant multi-currency payment integration solutions allowing your platforms to accept global credit cards, UPI, and digital wallets.',
    icon: '',
    features: [
      { title: 'Multi-Currency Checkout', desc: 'Accept international payments seamlessly.' },
      { title: 'Recurring Subscription Billing', desc: 'Automated SaaS billing cycles and dunning management.' },
      { title: 'PCI-DSS Compliant Security', desc: 'Bank-grade tokenization for card numbers.' },
      { title: 'Fraud Detection & Webhooks', desc: 'Instant transaction webhooks and automated fraud shielding.' }
    ],
    processSteps: ['Consultation', 'Planning', 'Development', 'Testing', 'Deployment', 'Support'],
    technologies: ['Stripe', 'PayPal', 'Razorpay', 'PCI-DSS', 'Webhooks']
  },
  {
    id: 'cloud-hosting',
    title: 'Cloud & Hosting Service',
    description: 'High-performance cloud server architecture, automated DevOps pipelines, and managed hosting for maximum uptime and ultra-low latency.',
    icon: '',
    features: [
      { title: 'Cloud Migration (AWS/GCP/Azure)', desc: 'Seamlessly shift infrastructure to the cloud.' },
      { title: 'Kubernetes Container Orchestration', desc: 'Auto-scaling container clusters for peak traffic.' },
      { title: 'Managed Server Infrastructure', desc: '24/7 server monitoring, backups, and OS patching.' },
      { title: 'DDoS Shield & CDN Setup', desc: 'Global content delivery network for fast load times.' }
    ],
    processSteps: ['Consultation', 'Planning', 'Development', 'Testing', 'Deployment', 'Support'],
    technologies: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Nginx']
  },
  {
    id: 'shopify-wordpress',
    title: 'Shopify & Wordpress Development',
    description: 'Custom e-commerce storefronts and content management websites engineered for maximum conversion rates, SEO, and fast page speeds.',
    icon: '',
    features: [
      { title: 'Custom Shopify Store Development', desc: 'Tailored Shopify Liquid themes and custom app extensions.' },
      { title: 'WordPress CMS Architecture', desc: 'Custom Gutenberg blocks and high-speed WP setups.' },
      { title: 'WooCommerce Integration', desc: 'Scalable e-commerce capabilities on WordPress.' },
      { title: 'Speed & SEO Optimization', desc: 'Achieve 90+ Google Lighthouse scores.' }
    ],
    processSteps: ['Consultation', 'Planning', 'Development', 'Testing', 'Deployment', 'Support'],
    technologies: ['Shopify', 'WordPress', 'WooCommerce', 'PHP', 'Liquid']
  },
  {
    id: 'oracle',
    title: 'Oracle Development & Consulting',
    description: 'Enterprise Oracle database development, PL/SQL optimization, Oracle ERP Cloud consulting, and seamless database migrations.',
    icon: '',
    features: [
      { title: 'Oracle ERP Cloud Implementation', desc: 'Streamline enterprise financial and operational workflows.' },
      { title: 'Advanced PL/SQL Engineering', desc: 'Write high-performance stored procedures and triggers.' },
      { title: 'Database Performance Tuning', desc: 'Optimize heavy enterprise Oracle query execution.' },
      { title: 'Data Warehouse Integration', desc: 'Consolidate enterprise data into Oracle Autonomous DB.' }
    ],
    processSteps: ['Consultation', 'Planning', 'Development', 'Testing', 'Deployment', 'Support'],
    technologies: ['Oracle DB', 'PL/SQL', 'Oracle ERP Cloud', 'Apex']
  },

  // WEB3 SERVICES
  {
    id: 'ico',
    title: 'ICO Development',
    description: 'Launch successful Initial Coin Offerings with audited smart contracts, investor tokenomics, and fundraising launchpad portals.',
    icon: '',
    features: [
      { title: 'Tokenomics Strategy', desc: 'Design balanced token distribution and vesting schedules.' },
      { title: 'Audited ICO Smart Contracts', desc: 'Bug-free crowdsale contracts on Ethereum & BNB Chain.' },
      { title: 'Investor Launchpad Portal', desc: 'Web3 dashboard for purchasing tokens during public/private sales.' },
      { title: 'KYC/AML Integration', desc: 'Automate investor identity verification.' }
    ],
    processSteps: ['Consultation', 'Planning', 'Development', 'Testing', 'Deployment', 'Support'],
    technologies: ['Solidity', 'Ethereum', 'ERC20', 'Web3.js', 'Smart Contracts']
  },
  {
    id: 'token',
    title: 'Token Development',
    description: 'Create secure custom utility, governance, NFT, or deflationary tokens across Ethereum, BNB Chain, Polygon, and Solana networks.',
    icon: '',
    features: [
      { title: 'ERC-20 & BEP-20 Standard Tokens', desc: 'Create custom crypto tokens for utility or governance.' },
      { title: 'NFT Smart Contracts (ERC-721 / 1155)', desc: 'Build mintable, tradeable digital asset collections.' },
      { title: 'Token Burn & Staking Mechanics', desc: 'Custom smart contract reward and staking pools.' },
      { title: 'Smart Contract Auditing', desc: 'Full security audit against reentrancy and vulnerabilities.' }
    ],
    processSteps: ['Consultation', 'Planning', 'Development', 'Testing', 'Deployment', 'Support'],
    technologies: ['Solidity', 'BEP20', 'ERC20', 'OpenZeppelin', 'Hardhat']
  },
  {
    id: 'web3',
    title: 'Web3 Development',
    description: 'Build next-generation decentralized ecosystems, Web3 protocols, and dApps powered by blockchain technology.',
    icon: '',
    features: [
      { title: 'Decentralized Architecture', desc: 'Architect tamper-proof Web3 protocols.' },
      { title: 'Smart Contract Engineering', desc: 'Write and deploy verified EVM smart contracts.' },
      { title: 'Web3 Wallet Connectivity', desc: 'Integrate Metamask, WalletConnect, and Coinbase Wallet.' },
      { title: 'IPFS Storage Integration', desc: 'Decentralized file hosting for NFTs and dApp assets.' }
    ],
    processSteps: ['Consultation', 'Planning', 'Development', 'Testing', 'Deployment', 'Support'],
    technologies: ['Web3.js', 'Ethers.js', 'Solidity', 'IPFS', 'Metamask API']
  },
  {
    id: 'dapp',
    title: 'DApp Development',
    description: 'End-to-end decentralized application development featuring intuitive Web3 interfaces, smart contract backends, and IPFS storage.',
    icon: '',
    features: [
      { title: 'Full-Stack Web3 DApp Building', desc: 'Responsive React frontend connected to Web3 smart contracts.' },
      { title: 'Decentralized Storage', desc: 'Store metadata and files on IPFS & Arweave.' },
      { title: 'Multi-Wallet Integration', desc: 'Seamlessly support browser extensions & mobile wallets.' },
      { title: 'Gas Optimization', desc: 'Write gas-efficient Solidity code to reduce transaction fees.' }
    ],
    processSteps: ['Consultation', 'Planning', 'Development', 'Testing', 'Deployment', 'Support'],
    technologies: ['React', 'Solidity', 'Ethers.js', 'IPFS', 'Hardhat']
  },
  {
    id: 'wallet',
    title: 'Wallet Development',
    description: 'Non-custodial and custodial crypto wallet solutions featuring multi-chain token support, biometric security, and seamless Web3 dApp browsing.',
    icon: '',
    features: [
      { title: 'Multi-Chain Crypto Support', desc: 'Store Bitcoin, Ethereum, Solana, and custom tokens.' },
      { title: 'Seed Phrase & Biometric Security', desc: 'BIP-39 mnemonic seed generation with biometrics.' },
      { title: 'In-App Token Swaps', desc: 'Trade crypto directly within the wallet UI.' },
      { title: 'dApp Browser Integration', desc: 'Connect to Web3 protocols directly via WalletConnect.' }
    ],
    processSteps: ['Consultation', 'Planning', 'Development', 'Testing', 'Deployment', 'Support'],
    technologies: ['BIP-39', 'Cryptography', 'Ethers.js', 'React Native', 'Solidity']
  },
  {
    id: 'exchange',
    title: 'Exchange Development',
    description: 'High-frequency cryptocurrency exchange platforms featuring institutional-grade security, ultra-fast order matching, and liquidity integration.',
    icon: '',
    features: [
      { title: 'Ultra-Fast Order Engine', desc: 'Execute millions of trade orders per second with zero latency.' },
      { title: 'Spot & Margin Trading', desc: 'Advanced candlestick charts and order book interfaces.' },
      { title: 'Liquidity Provider Integration', desc: 'Connect to external crypto liquidity pools.' },
      { title: 'Bank-Grade Cold/Hot Wallet Storage', desc: 'Multi-signature wallet security for user funds.' }
    ],
    processSteps: ['Consultation', 'Planning', 'Development', 'Testing', 'Deployment', 'Support'],
    technologies: ['Order Engine', 'WebSocket', 'Solidity', 'PostgreSQL', 'Redis']
  },
  {
    id: 'mlm',
    title: 'MLM Software Development',
    description: 'Decentralized, smart contract-driven Multi-Level Marketing software ensuring automated matrix payouts, transparency, and unalterable trust.',
    icon: '',
    features: [
      { title: 'Smart Contract Matrix Payouts', desc: 'Automate commission distributions directly on-chain.' },
      { title: 'Un-alterable Compensation Plan', desc: 'Transparent referral tracking stored on the blockchain.' },
      { title: 'Multi-Tier Genealogy Tree', desc: 'Visualize downlines and team earnings in real-time.' },
      { title: 'Instant Crypto Withdrawals', desc: 'Automated instant wallet deposits for members.' }
    ],
    processSteps: ['Consultation', 'Planning', 'Development', 'Testing', 'Deployment', 'Support'],
    technologies: ['Smart Contracts', 'DeFi Protocols', 'Solidity', 'Web3.js']
  },
  {
    id: 'dex',
    title: 'Dex Platform',
    description: 'Decentralized exchange (DEX) platforms featuring Automated Market Maker (AMM) protocols, yield farming, and peer-to-peer liquidity pools.',
    icon: '',
    features: [
      { title: 'AMM Swap Protocol', desc: 'Trade tokens peer-to-peer without central intermediaries.' },
      { title: 'Liquidity Pools & Yield Farming', desc: 'Allow users to stake token pairs and earn LP fees.' },
      { title: 'Custom DEX Aggregator', desc: 'Route trades across multiple DEXs for optimal pricing.' },
      { title: 'Slippage & Price Impact Protection', desc: 'Safeguard users against MEV bots and front-running.' }
    ],
    processSteps: ['Consultation', 'Planning', 'Development', 'Testing', 'Deployment', 'Support'],
    technologies: ['AMM Protocols', 'Liquidity Pools', 'Solidity', 'Uniswap Protocol', 'Ethers.js']
  }
];

const initialPortfolios = [
  {
    id: 'ekatr',
    title: 'Ekatr - Event Platform',
    image: '',
    caseStudyTitle: 'Case Study - Ekatr',
    description: "Ekatr by White Circle Group is a creative event solution focused on bringing people together through meaningful experiences. Inspired by the idea of 'togetherness,' the platform is designed to deliver seamless and memorable events.",
    challengeDescription: 'Users struggled with cluttered interfaces, poor navigation, and complex booking processes on existing event platforms. The challenge was to create a clean, intuitive platform.',
    challenges: [
      { title: 'Cluttered Interfaces' },
      { title: 'Complex Process' },
      { title: 'Poor Discoverability' },
      { title: 'Low Engagement' }
    ],
    tools: [
      { name: 'Figma' },
      { name: 'React' },
      { name: 'Node.js' },
      { name: 'MongoDB' }
    ],
    testimonial: {
      text: 'I am extremely satisfied with the delivery of Ekatr. The platform turned out exactly as envisioned.',
      author: 'Rahul Sharma',
      role: 'Ekatr Client'
    }
  },
  {
    id: 'consta',
    title: 'Consta - AI Solution',
    image: '',
    caseStudyTitle: 'Case Study: Consta - AI Solution',
    description: 'Consta by White Circle Group is an AI-powered platform designed to simplify complex technological challenges. It enables businesses to leverage advanced AI models.',
    challengeDescription: 'Businesses struggled to integrate AI into their workflows due to complex interfaces and lack of technical clarity. The challenge was to design an intuitive interface.',
    challenges: [
      { title: 'Cluttered Interfaces' },
      { title: 'Complex Process' }
    ],
    tools: [
      { name: 'Figma' },
      { name: 'React' },
      { name: 'Node.js' }
    ],
    testimonial: {
      text: 'Consta has made a recognized difference for our team. The platform is clean, powerful, and easy to use.',
      author: 'Sumit Sharma',
      role: 'Consta Client'
    }
  },
  {
    id: 'samraat-logs',
    title: 'Samraat Logs - Logistics Platform',
    image: '',
    caseStudyTitle: 'Case Study: Samraat Logs',
    description: 'Samraat Logs is a logistics platform developed to streamline supply chain operations with real-time tracking.',
    challengeDescription: 'Users faced difficulty tracking shipments due to outdated systems. The challenge was to create a modern platform with real-time tracking.',
    challenges: [
      { title: 'Cluttered Interfaces' },
      { title: 'Complex Process' }
    ],
    tools: [
      { name: 'Figma' },
      { name: 'React' }
    ],
    testimonial: {
      text: 'Samraat logs has completely transformed our logistics process.',
      author: 'Mohit Sharma',
      role: 'Samraat Logs Client'
    }
  },
  {
    id: 'aquaplus',
    title: 'AquaPlus - Water Brand Website',
    image: '',
    caseStudyTitle: 'Case Study: AquaPlus',
    description: 'AquaPlus is a modern brand website designed to showcase premium water products.',
    challengeDescription: 'The existing website lacked strong visual appeal and failed to communicate product value effectively.',
    challenges: [
      { title: 'Cluttered Interfaces' }
    ],
    tools: [
      { name: 'Figma' },
      { name: 'React' }
    ],
    testimonial: {
      text: 'AquaPlus now perfectly reflects our brand identity.',
      author: 'Rohit Sharma',
      role: 'AquaPlus Client'
    }
  }
];

const initialCareers = [
  {
    id: '100',
    title: 'Software developer (SDE-1)',
    department: 'Product and Platform Engineering',
    type: 'Full-time',
    experience: '0-2 years',
    location: 'Bhopal, India',
    date: '30/06/2026',
    description: 'Extensive experience in Java programming, demonstrating advanced proficiency in developing scalable applications. You will be responsible for building robust backend systems and integrating with microservices.',
    primarySkills: 'Java Backend, Java, Python',
    secondarySkills: 'Java + spring boot + Microservices, SQL',
    overview: 'JD Focus: Strong CS fundamentals, coding, and data structures skills.',
    eligibility: 'Candidates must have a CGPA of 7.5 and above.'
  },
  {
    id: '101',
    title: 'Software Engineer Intern',
    department: 'Engineering',
    type: 'Internship',
    experience: '0 years',
    location: 'Raipur, India',
    date: '25/06/2026',
    description: 'Looking for a passionate intern to help build scalable user interfaces and backend systems.',
    primarySkills: 'JavaScript, React, Node.js',
    secondarySkills: 'HTML, CSS, Git',
    overview: 'JD Focus: Fast learner with a solid foundation in computer science and web development.',
    eligibility: 'Currently pursuing or recently graduated with a Bachelor\'s degree.'
  },
  {
    id: '102',
    title: 'Frontend developer',
    department: 'UI/UX Engineering',
    type: 'Full-time',
    experience: '1-4 years',
    location: 'Bhopal, India',
    date: '20/06/2026',
    description: 'Join our frontend team to build robust UI interfaces serving millions of users.',
    primarySkills: 'React, Next.js, TypeScript',
    secondarySkills: 'Tailwind CSS, Redux',
    overview: 'JD Focus: Deep understanding of React ecosystem.',
    eligibility: 'B.Tech/BE in CS/IT. Strong problem-solving skills.'
  }
];

const initialTestimonials = [
  {
    author: 'Ashish Maurya',
    role: 'Event Organizer',
    content: 'The website exceeded my expectations. Loved the minimal and clean look. Done within the deadline and communication was excellent. Highly recommended.',
    rating: 5,
    avatar: ''
  },
  {
    author: 'Sanjay',
    role: 'Public Speaker',
    content: 'Outstanding job by the team ! Everything was smooth and well-coordinated. Truly a memorable experience.',
    rating: 4,
    avatar: ''
  }
];

const initialTeam = [
  { name: 'Nitin Kumar Tiwari', role: 'Founder', image: '' },
  { name: 'Nikhil Raj Soni', role: 'Managing Director', image: '' },
  { name: 'Dharmendra Chakrawarti', role: 'Head Designer', image: '' },
  { name: 'Om Hardaha', role: 'Website Designer', image: '' },
  { name: 'Saurabh Namdev', role: 'Technical Relationship Manager', image: '' }
];

const seedDatabase = async () => {
  try {
    // Seed Admin
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      await Admin.create({ email: 'admin@maatrshrigroup.in', password: hashedPassword });
      console.log('✅ Default Admin created: admin@maatrshrigroup.in / admin123');
    }

    // Seed Services
    for (const svc of initialServices) {
      const existing = await Service.findOne({ id: svc.id });
      const formattedSvc = {
        ...svc,
        processSteps: svc.processSteps.map(step => (typeof step === 'string' ? { title: step } : step))
      };
      if (!existing) {
        await Service.create(formattedSvc);
      } else {
        await Service.updateOne(
          { id: svc.id },
          { 
            $set: { 
              technologies: svc.technologies,
              features: svc.features,
              description: svc.description
            } 
          }
        );
      }
    }
    console.log('✅ All 25 Services seeded/updated in MongoDB');

    // Seed Portfolio
    const portfolioCount = await Portfolio.countDocuments();
    if (portfolioCount === 0) {
      await Portfolio.insertMany(initialPortfolios);
      console.log('✅ Initial Portfolio seeded into MongoDB');
    }

    // Seed Careers
    const careerCount = await Career.countDocuments();
    if (careerCount === 0) {
      await Career.insertMany(initialCareers);
      console.log('✅ Initial Careers seeded into MongoDB');
    }

    // Seed Testimonials
    const testimonialCount = await Testimonial.countDocuments();
    if (testimonialCount === 0) {
      await Testimonial.insertMany(initialTestimonials);
      console.log('✅ Initial Testimonials seeded into MongoDB');
    }

    // Seed Team
    const teamCount = await TeamMember.countDocuments();
    if (teamCount === 0) {
      await TeamMember.insertMany(initialTeam);
      console.log('✅ Initial Leadership Team seeded into MongoDB');
    }

    // Seed SiteSettings
    const settingsCount = await SiteSettings.countDocuments();
    if (settingsCount === 0) {
      await SiteSettings.create({
        siteName: 'MAATRSHRI Group',
        contactEmail: 'hr@maatrshrigroup.in',
        contactPhone: '+91 78987 69872',
        contactAddress: 'Headquarter: Swastik Galaxy A Block, 1st Floor, Near Indra Square, Shahdol, MP',
        socialLinks: {
          instagram: 'https://www.instagram.com/_whitecirclegroup?igsh=dWljbTVoMnFlcXRq',
          linkedin: 'https://www.linkedin.com/company/whitecircle-group/',
          whatsapp: 'https://wa.me/message/4BLHTNLKXWDKG1'
        },
        aboutUsText: 'At MAATRSHRI, we are more than just a technology provider; we are architects of the digital future. We have partnered with global enterprises to solve complex business challenges through cutting-edge IT solutions, strategic consulting, and robust engineering.',
        privacyPolicy: `At MAATRSHRI Group, we take your privacy seriously. This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from our website.`
      });
      console.log('✅ Initial Site Settings seeded into MongoDB');
    }

    // Seed Contacts
    const contactCount = await Contact.countDocuments();
    if (contactCount === 0) {
      await Contact.insertMany([
        {
          name: 'Rahul Sharma',
          email: 'rahul.sharma@gmail.com',
          subject: 'Web Development Inquiry',
          message: 'Hello MAATRSHRI team, we are looking for a full stack web development agency for our e-commerce platform.',
          submittedAt: new Date()
        },
        {
          name: 'Priya Verma',
          email: 'priya.verma@techsolutions.com',
          subject: 'AI & Cloud Consulting',
          message: 'Hi, I would like to schedule a consultation regarding DevOps and Cloud hosting options for our enterprise app.',
          submittedAt: new Date()
        }
      ]);
      console.log('✅ Initial Contact Inquiries seeded into MongoDB');
    }

    // Seed Applications
    const appCount = await Application.countDocuments();
    if (appCount === 0) {
      await Application.insertMany([
        {
          jobTitle: 'Software developer (SDE-1)',
          jobId: '100',
          firstName: 'Amit',
          lastName: 'Patel',
          email: 'amit.patel@example.com',
          countryCode: '+91',
          phone: '9876543210',
          country: 'India',
          city: 'Bhopal',
          resumeName: 'Amit_Patel_Resume.pdf',
          coverLetter: 'I am a passionate software engineer with 1.5 years experience in Java, Spring Boot, and React. Looking forward to joining MAATRSHRI Group!',
          githubUrl: 'https://github.com/amitpatel',
          linkedinUrl: 'https://linkedin.com/in/amitpatel',
          appliedAt: new Date()
        },
        {
          jobTitle: 'Frontend developer',
          jobId: '102',
          firstName: 'Neha',
          lastName: 'Singh',
          email: 'neha.singh@example.com',
          countryCode: '+91',
          phone: '8765432109',
          country: 'India',
          city: 'Indore',
          resumeName: 'Neha_Singh_Frontend.pdf',
          coverLetter: 'Experienced frontend developer proficient in React, Next.js, and CSS design systems. Excited to apply for the Frontend Developer role.',
          githubUrl: 'https://github.com/nehasingh',
          linkedinUrl: 'https://linkedin.com/in/nehasingh',
          appliedAt: new Date()
        }
      ]);
      console.log('✅ Initial Job Applications seeded into MongoDB');
    }

    // Seed PrivacyPolicy
    const privacyCount = await PrivacyPolicy.countDocuments();
    if (privacyCount === 0) {
      await PrivacyPolicy.create({
        title: 'Privacy Policy',
        subtitle: 'Your data. Your consent. Your Privacy Matters.',
        introText: 'At White Circle Group, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or use our services. Please read it carefully to understand how we handle your information.',
        sections: [
          {
            number: 1,
            iconName: 'FileText',
            title: '1. Introduction',
            content: 'White Circle Group collects, builds, and deploys professional applications for users. This policy outlines how we handle user data when you visit our website or use our products.'
          },
          {
            number: 2,
            iconName: 'Database',
            title: '2. Information We Collect',
            content: '',
            col1Title: '2.1 Personal Data',
            col1Content: 'The only personal data shared with us is:\n• Name, email address, phone number, and company details.\n• Information received through forms, emails, or inquiries.',
            col2Title: '2.2 Non-Personal Data',
            col2Content: 'We may collect non-personal data such as:\n• Browser type and device information.\n• Pages visited and interaction data.'
          },
          {
            number: 3,
            iconName: 'Settings',
            title: '3. How We Use Your Information',
            content: '• Respond to your queries and provide support.\n• Improve our products and website experience.\n• Send updates, offers, or important information related to our products.\n• Prevent fraud and protect against unauthorized access.'
          },
          {
            number: 4,
            iconName: 'Shield',
            title: '4. Data Protection',
            content: 'We use appropriate security measures to protect your personal information from loss, unauthorized access, or disclosure.'
          },
          {
            number: 5,
            iconName: 'Mail',
            title: '5. Sharing of Information',
            content: 'White Circle Group does not sell or rent your personal information to third parties. We may share data only:\n• When required by law.\n• With trustworthy partners who agree to strictly guard user privacy.'
          },
          {
            number: 6,
            iconName: 'Cookie',
            title: '6. Cookies',
            content: 'Our website may use cookies to improve user experience and analyze website traffic. You can disable cookies through your browser settings if you prefer.'
          },
          {
            number: 7,
            iconName: 'Link',
            title: '7. Third-Party Links',
            content: 'Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these websites.'
          },
          {
            number: 8,
            iconName: 'User',
            title: '8. Your Rights',
            content: 'You have the right to:\n• Request copy of your data.\n• Correct inaccurate information.\n• Delete your information from our system.\nTo make such requests, please contact us through our official website.'
          },
          {
            number: 9,
            iconName: 'RotateCw',
            title: '9. Updates to This Policy',
            content: 'White Circle Group may update this Privacy Policy from time to time. Any changes will be posted on this page.'
          },
          {
            number: 10,
            iconName: 'Mail',
            title: '10. Contact Us',
            content: 'If you have questions regarding this Privacy Policy, please contact us through our contact page.'
          }
        ]
      });
      console.log('✅ Initial Privacy Policy seeded into MongoDB');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

module.exports = seedDatabase;
