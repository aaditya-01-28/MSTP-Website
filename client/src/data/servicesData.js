// Import all GIFs
import gifIT from '../assets/services/it service F.gif';
import gifSalesforce from '../assets/services/Salesforce-F.gif';
import gifWebDev from '../assets/services/WEB_D_F.gif';
import gifDigital from '../assets/services/Digital_ F.gif';
import gifSoftwareDev from '../assets/services/Software dev-F.gif';

import gifAI from '../assets/services/AI F.gif';
import gifIOT from '../assets/services/IOT-F.gif';
import gifDatabase from '../assets/services/Database F.gif';
import gifDataAnalytics from '../assets/services/Data analytics-F.gif';
import gifIndustrial from '../assets/services/industrial_auto F.gif';
import gifSoftwareTesting from '../assets/services/software testing F.gif';

import gifStaffing from '../assets/services/Staffing Payroll F.gif';
import gifPayment from '../assets/services/Payment Gateway F.gif';
import gifCloud from '../assets/services/cloud F.gif';
import gifWordpress from '../assets/services/Wordpress F.gif';
import gifOracle from '../assets/services/Oracle F.gif';

import gifICO from '../assets/services/ico dev F.gif';
import gifToken from '../assets/services/Token F.gif';
import gifWeb3 from '../assets/services/Web3 F.gif';
import gifDApp from '../assets/services/Decentralized app F.gif';
import gifWallet from '../assets/services/Wallet F.gif';
import gifExchange from '../assets/services/Exchange F.gif';
import gifMLM from '../assets/services/MLM F.gif';
import gifDex from '../assets/services/Dex Plat F.gif';

// Import MP4 Videos
import videoAI from '../assets/services/AI_service.mp4';
import videoICO from '../assets/services/ICO_deve.mp4';
import videoIT from '../assets/services/IT_servic.mp4';
import videoSoftwareDev from '../assets/services/Software dev.mp4';
import videoWeb3 from '../assets/services/WEB3 serv.mp4';
import videoWebDev from '../assets/services/Website_dev.mp4';
import videoCloud from '../assets/services/cloud_service.mp4';
import videoDataAnalytics from '../assets/services/data_analy.mp4';
import videoDatabase from '../assets/services/db_database.mp4';
import videoDex from '../assets/services/decentralized_exchange.mp4';
import videoDigital from '../assets/services/digital_market.mp4';
import videoExchange from '../assets/services/exchange-deve.mp4';
import videoIndustrial from '../assets/services/industrial auto.mp4';
import videoIOT from '../assets/services/iot_serv.mp4';
import videoMobileApp from '../assets/services/mobile app.mp4';
import videoOracle from '../assets/services/oracle serv.mp4';
import videoPayment from '../assets/services/payment_gateway_serv.mp4';
import videoStaffing from '../assets/services/payroll_staffing.mp4';
import videoSalesforce from '../assets/services/salesforce_serv.mp4';
import videoShopify from '../assets/services/shopify.mp4';
import videoSoftwareTesting from '../assets/services/soft_testing.mp4';
import videoToken from '../assets/services/token dev.mp4';
import videoDApp from '../assets/services/Dapp_decentralized appp.mp4';
import videoMLM from '../assets/services/MLM- servicee.mp4';
import videoWallet from '../assets/services/wallet-service.mp4';

const genericProcess = ['Consultation', 'Planning', 'Development', 'Testing', 'Deployment', 'Support'];

export const servicesData = {
  // FOUNDATION
  'it-services': {
    title: 'IT Services',
    description: 'We provide comprehensive IT services to help businesses optimize their technology infrastructure, ensuring seamless operations, security, and scalability in the digital age.',
    icon: gifIT,
    video: videoIT,
    features: [
      { title: 'IT Consulting', desc: 'Strategic guidance to align technology with business goals.' },
      { title: 'Cloud Solutions', desc: 'Secure and scalable cloud migration and management.' },
      { title: 'Cybersecurity', desc: 'Advanced protection against digital threats and data breaches.' },
      { title: 'Network Infrastructure', desc: 'Reliable and high-performance network setup.' }
    ],
    processSteps: genericProcess,
    technologies: ['Cloud Computing', 'Docker', 'Kubernetes', 'Linux', 'AWS', 'Cybersecurity']
  },
  'salesforce-services': {
    title: 'Salesforce Services',
    description: 'Our Salesforce experts help you maximize your CRM investment through custom development, integration, and strategic consulting to drive sales and customer engagement.',
    icon: gifSalesforce,
    video: videoSalesforce,
    features: [
      { title: 'Sales & Service Cloud', desc: 'Customized CRM workflows for sales and support teams.' },
      { title: 'Apex & Lightning Components', desc: 'Tailored backend logic and modern UI components.' },
      { title: 'Integration & Automation', desc: 'Connect Salesforce with ERP, marketing, and database tools.' },
      { title: 'Consulting & Training', desc: 'Maximize team adoption and ROI with expert guidance.' }
    ],
    processSteps: genericProcess,
    technologies: ['Salesforce', 'Apex', 'Lightning', 'SOQL', 'Sales Cloud']
  },
  'web-development': {
    title: 'Web Development',
    description: 'We build fast, responsive, and highly scalable web applications tailored to your specific business requirements with modern frontend and backend architectures.',
    icon: gifWebDev,
    video: videoWebDev,
    features: [
      { title: 'Full Stack Web Apps', desc: 'Custom web solutions engineered for speed and reliability.' },
      { title: 'Responsive UI/UX', desc: 'Pixel-perfect mobile and desktop user interfaces.' },
      { title: 'Progressive Web Apps (PWA)', desc: 'App-like web experiences with offline capabilities.' },
      { title: 'API Integration', desc: 'Seamless connection with third-party APIs and microservices.' }
    ],
    processSteps: genericProcess,
    technologies: ['React', 'NextJS', 'NodeJS', 'TypeScript', 'MongoDB']
  },
  'mobile-app': {
    title: 'Mobile App Development',
    description: 'Create engaging native and cross-platform mobile experiences for iOS and Android that delight users and drive long-term business growth.',
    icon: gifSoftwareDev,
    video: videoMobileApp,
    features: [
      { title: 'iOS & Android Native Apps', desc: 'High-performance native apps built with Swift and Kotlin.' },
      { title: 'Cross-Platform Frameworks', desc: 'Single codebase solutions powered by React Native & Flutter.' },
      { title: 'Intuitive Mobile UI', desc: 'User-centric designs built for high retention and engagement.' },
      { title: 'Push Sync & Offline Support', desc: 'Reliable offline storage and real-time push notifications.' }
    ],
    processSteps: genericProcess,
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'iOS / Android']
  },
  'digital-marketing': {
    title: 'Digital Marketing Services',
    description: 'Data-driven marketing strategies to increase your online visibility, drive targeted traffic, and convert qualified leads into loyal customers.',
    icon: gifDigital,
    video: videoDigital,
    features: [
      { title: 'Search Engine Optimization (SEO)', desc: 'Boost organic search rankings and domain authority.' },
      { title: 'Pay-Per-Click (PPC) Ads', desc: 'High ROI ad campaigns across Google and social platforms.' },
      { title: 'Social Media Strategy', desc: 'Engaging content campaigns tailored for your target audience.' },
      { title: 'Conversion Rate Optimization', desc: 'Turn web visitors into paying customers with analytics.' }
    ],
    processSteps: genericProcess,
    technologies: ['SEO', 'Google Ads', 'Meta Ads', 'Semrush', 'Analytics']
  },
  'software-development': {
    title: 'Software Development',
    description: 'Custom enterprise software engineering solutions tailored to automate your unique business processes and solve complex technical challenges.',
    icon: gifSoftwareDev,
    video: videoSoftwareDev,
    features: [
      { title: 'Custom Enterprise Software', desc: 'Tailor-made software built around your exact workflows.' },
      { title: 'Microservices Architecture', desc: 'Decoupled, high-availability cloud-native services.' },
      { title: 'Legacy Refactoring', desc: 'Modernize legacy codebases into modern tech stacks.' },
      { title: 'API & Database Integration', desc: 'Unify internal software tools into a single platform.' }
    ],
    processSteps: genericProcess,
    technologies: ['Java', 'Python', 'NodeJS', 'Docker', 'PostgreSQL']
  },

  // INNOVATION
  'ai-services': {
    title: 'Artificial Intelligence',
    description: 'Leverage the power of AI, Machine Learning, and LLMs to automate repetitive tasks, personalize customer experiences, and unlock new operational capabilities.',
    icon: gifAI,
    video: videoAI,
    features: [
      { title: 'Custom AI & ML Models', desc: 'Train algorithms on proprietary business datasets.' },
      { title: 'Generative AI & Chatbots', desc: 'Smart conversational assistants powered by OpenAI and LLMs.' },
      { title: 'Predictive Analytics', desc: 'Forecast sales trends, user behavior, and market shifts.' },
      { title: 'Natural Language Processing (NLP)', desc: 'Automate document parsing and sentiment analysis.' }
    ],
    processSteps: genericProcess,
    technologies: ['OpenAI', 'TensorFlow', 'PyTorch', 'Python', 'LangChain']
  },
  'iot': {
    title: 'Internet Of Things',
    description: 'Connect, monitor, and manage smart hardware devices to collect real-time data, automate industrial workflows, and build connected ecosystems.',
    icon: gifIOT,
    video: videoIOT,
    features: [
      { title: 'Smart Hardware Integration', desc: 'Connect sensors, microcontrollers, and edge hardware.' },
      { title: 'Real-Time Telemetry', desc: 'Monitor sensor data streams on live interactive dashboards.' },
      { title: 'IoT Cloud Architecture', desc: 'Scalable cloud backends powered by AWS IoT and MQTT.' },
      { title: 'Edge Computing', desc: 'Process device data locally for zero latency decisions.' }
    ],
    processSteps: genericProcess,
    technologies: ['MQTT', 'C++', 'AWS IoT', 'Raspberry Pi', 'Arduino']
  },
  'database-design': {
    title: 'Database Design',
    description: 'Architecting robust, scalable, high-availability relational and NoSQL databases engineered for lightning-fast queries and zero downtime.',
    icon: gifDatabase,
    video: videoDatabase,
    features: [
      { title: 'Relational & NoSQL Architecture', desc: 'Custom schema modeling for SQL and MongoDB databases.' },
      { title: 'High Availability & Replication', desc: 'Master-replica clustering for 99.99% uptime.' },
      { title: 'Indexing & Performance Tuning', desc: 'Optimize slow queries to execute in milliseconds.' },
      { title: 'Data Migration & Security', desc: 'Seamlessly migrate legacy data with zero data loss.' }
    ],
    processSteps: genericProcess,
    technologies: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'SQL']
  },
  'data-analytics': {
    title: 'Data Analytics',
    description: 'Transform raw organizational data into actionable business intelligence dashboards to drive informed strategic decision-making.',
    icon: gifDataAnalytics,
    video: videoDataAnalytics,
    features: [
      { title: 'Business Intelligence Dashboards', desc: 'Interactive visual reports built in Tableau & Power BI.' },
      { title: 'Real-Time Data Pipelines', desc: 'ETL processing to consolidate multi-source company data.' },
      { title: 'Statistical Modeling', desc: 'Discover hidden operational bottlenecks and growth insights.' },
      { title: 'Automated Executive Reports', desc: 'Scheduled metrics delivered automatically to stakeholders.' }
    ],
    processSteps: genericProcess,
    technologies: ['Tableau', 'PowerBI', 'Python', 'Pandas', 'SQL']
  },
  'industrial-automation': {
    title: 'Industrial Automation',
    description: 'Streamline manufacturing and industrial processes with advanced SCADA, PLC programming, and smart industrial robotics automation.',
    icon: gifIndustrial,
    video: videoIndustrial,
    features: [
      { title: 'PLC & HMI Programming', desc: 'Custom controller logic for industrial machinery.' },
      { title: 'SCADA System Design', desc: 'Centralized plant monitoring and control interfaces.' },
      { title: 'Robotic Automation', desc: 'Automate repetitive manufacturing assembly lines.' },
      { title: 'Factory Line Telemetry', desc: 'Track machine health and prevent unplanned downtime.' }
    ],
    processSteps: genericProcess,
    technologies: ['SCADA', 'PLC', 'Robotics', 'Industrial IoT', 'Modbus']
  },
  'software-testing': {
    title: 'Software Testing',
    description: 'Rigorous manual and automated QA testing to ensure your software applications are bug-free, secure, and perform flawlessly under heavy load.',
    icon: gifSoftwareTesting,
    video: videoSoftwareTesting,
    features: [
      { title: 'Automated E2E Testing', desc: 'Regression test suites powered by Cypress & Selenium.' },
      { title: 'Performance & Load Testing', desc: 'Simulate high traffic loads to test server boundaries.' },
      { title: 'Security Vulnerability Audits', desc: 'Penetration testing to eliminate security gaps.' },
      { title: 'API & Unit Testing', desc: 'Ensure 100% backend API contract validity.' }
    ],
    processSteps: genericProcess,
    technologies: ['Selenium', 'Jest', 'Cypress', 'Postman', 'JUnit']
  },

  // ENTERPRISE
  'staffing': {
    title: 'Staffing & Payroll',
    description: 'Comprehensive IT workforce staffing, talent acquisition, and automated payroll processing solutions for scaling enterprises.',
    icon: gifStaffing,
    video: videoStaffing,
    features: [
      { title: 'Technical Talent Acquisition', desc: 'Source top-tier developers, engineers, and designers.' },
      { title: 'Dedicated IT Staff Augmentation', desc: 'Scale your engineering team rapidly with pre-vetted devs.' },
      { title: 'End-to-End Payroll Management', desc: 'Automated salary calculations, tax filing, and direct deposits.' },
      { title: 'HR Compliance & Auditing', desc: 'Stay compliant with local labor laws and tax regulations.' }
    ],
    processSteps: genericProcess,
    technologies: ['HRMS', 'Payroll Systems', 'Talent Analytics']
  },
  'payment-gateway': {
    title: 'Payment Gateway Service',
    description: 'Secure, PCI-compliant multi-currency payment integration solutions allowing your platforms to accept global credit cards, UPI, and digital wallets.',
    icon: gifPayment,
    video: videoPayment,
    features: [
      { title: 'Multi-Currency Checkout', desc: 'Accept international payments seamlessly.' },
      { title: 'Recurring Subscription Billing', desc: 'Automated SaaS billing cycles and dunning management.' },
      { title: 'PCI-DSS Compliant Security', desc: 'Bank-grade tokenization for card numbers.' },
      { title: 'Fraud Detection & Webhooks', desc: 'Instant transaction webhooks and automated fraud shielding.' }
    ],
    processSteps: genericProcess,
    technologies: ['Stripe', 'PayPal', 'Razorpay', 'PCI-DSS', 'Webhooks']
  },
  'cloud-hosting': {
    title: 'Cloud & Hosting Service',
    description: 'High-performance cloud server architecture, automated DevOps pipelines, and managed hosting for maximum uptime and ultra-low latency.',
    icon: gifCloud,
    video: videoCloud,
    features: [
      { title: 'Cloud Migration (AWS/GCP/Azure)', desc: 'Seamlessly shift infrastructure to the cloud.' },
      { title: 'Kubernetes Container Orchestration', desc: 'Auto-scaling container clusters for peak traffic.' },
      { title: 'Managed Server Infrastructure', desc: '24/7 server monitoring, backups, and OS patching.' },
      { title: 'DDoS Shield & CDN Setup', desc: 'Global content delivery network for fast load times.' }
    ],
    processSteps: genericProcess,
    technologies: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Nginx']
  },
  'shopify-wordpress': {
    title: 'Shopify & Wordpress Development',
    description: 'Custom e-commerce storefronts and content management websites engineered for maximum conversion rates, SEO, and fast page speeds.',
    icon: gifWordpress,
    video: videoShopify,
    features: [
      { title: 'Custom Shopify Store Development', desc: 'Tailored Shopify Liquid themes and custom app extensions.' },
      { title: 'WordPress CMS Architecture', desc: 'Custom Gutenberg blocks and high-speed WP setups.' },
      { title: 'WooCommerce Integration', desc: 'Scalable e-commerce capabilities on WordPress.' },
      { title: 'Speed & SEO Optimization', desc: 'Achieve 90+ Google Lighthouse scores.' }
    ],
    processSteps: genericProcess,
    technologies: ['Shopify', 'WordPress', 'WooCommerce', 'PHP', 'Liquid']
  },
  'oracle': {
    title: 'Oracle Development & Consulting',
    description: 'Enterprise Oracle database development, PL/SQL optimization, Oracle ERP Cloud consulting, and seamless database migrations.',
    icon: gifOracle,
    video: videoOracle,
    features: [
      { title: 'Oracle ERP Cloud Implementation', desc: 'Streamline enterprise financial and operational workflows.' },
      { title: 'Advanced PL/SQL Engineering', desc: 'Write high-performance stored procedures and triggers.' },
      { title: 'Database Performance Tuning', desc: 'Optimize heavy enterprise Oracle query execution.' },
      { title: 'Data Warehouse Integration', desc: 'Consolidate enterprise data into Oracle Autonomous DB.' }
    ],
    processSteps: genericProcess,
    technologies: ['Oracle DB', 'PL/SQL', 'Oracle ERP Cloud', 'Apex']
  },

  // WEB3 SERVICES
  'ico': {
    title: 'ICO Development',
    description: 'Launch successful Initial Coin Offerings with audited smart contracts, investor tokenomics, and fundraising launchpad portals.',
    icon: gifICO,
    video: videoICO,
    features: [
      { title: 'Tokenomics Strategy', desc: 'Design balanced token distribution and vesting schedules.' },
      { title: 'Audited ICO Smart Contracts', desc: 'Bug-free crowdsale contracts on Ethereum & BNB Chain.' },
      { title: 'Investor Launchpad Portal', desc: 'Web3 dashboard for purchasing tokens during public/private sales.' },
      { title: 'KYC/AML Integration', desc: 'Automate investor identity verification.' }
    ],
    processSteps: genericProcess,
    technologies: ['Solidity', 'Ethereum', 'ERC20', 'Web3.js', 'Smart Contracts']
  },
  'token': {
    title: 'Token Development',
    description: 'Create secure custom utility, governance, NFT, or deflationary tokens across Ethereum, BNB Chain, Polygon, and Solana networks.',
    icon: gifToken,
    video: videoToken,
    features: [
      { title: 'ERC-20 & BEP-20 Standard Tokens', desc: 'Create custom crypto tokens for utility or governance.' },
      { title: 'NFT Smart Contracts (ERC-721 / 1155)', desc: 'Build mintable, tradeable digital asset collections.' },
      { title: 'Token Burn & Staking Mechanics', desc: 'Custom smart contract reward and staking pools.' },
      { title: 'Smart Contract Auditing', desc: 'Full security audit against reentrancy and vulnerabilities.' }
    ],
    processSteps: genericProcess,
    technologies: ['Solidity', 'BEP20', 'ERC20', 'OpenZeppelin', 'Hardhat']
  },
  'web3': {
    title: 'Web3 Development',
    description: 'Build next-generation decentralized ecosystems, Web3 protocols, and dApps powered by blockchain technology.',
    icon: gifWeb3,
    video: videoWeb3,
    features: [
      { title: 'Decentralized Architecture', desc: 'Architect tamper-proof Web3 protocols.' },
      { title: 'Smart Contract Engineering', desc: 'Write and deploy verified EVM smart contracts.' },
      { title: 'Web3 Wallet Connectivity', desc: 'Integrate Metamask, WalletConnect, and Coinbase Wallet.' },
      { title: 'IPFS Storage Integration', desc: 'Decentralized file hosting for NFTs and dApp assets.' }
    ],
    processSteps: genericProcess,
    technologies: ['Web3.js', 'Ethers.js', 'Solidity', 'IPFS', 'Metamask API']
  },
  'dapp': {
    title: 'DApp Development',
    description: 'End-to-end decentralized application development featuring intuitive Web3 interfaces, smart contract backends, and IPFS storage.',
    icon: gifDApp,
    video: videoDApp,
    features: [
      { title: 'Full-Stack Web3 DApp Building', desc: 'Responsive React frontend connected to Web3 smart contracts.' },
      { title: 'Decentralized Storage', desc: 'Store metadata and files on IPFS & Arweave.' },
      { title: 'Multi-Wallet Integration', desc: 'Seamlessly support browser extensions & mobile wallets.' },
      { title: 'Gas Optimization', desc: 'Write gas-efficient Solidity code to reduce transaction fees.' }
    ],
    processSteps: genericProcess,
    technologies: ['React', 'Solidity', 'Ethers.js', 'IPFS', 'Hardhat']
  },
  'wallet': {
    title: 'Wallet Development',
    description: 'Non-custodial and custodial crypto wallet solutions featuring multi-chain token support, biometric security, and seamless Web3 dApp browsing.',
    icon: gifWallet,
    video: videoWallet,
    features: [
      { title: 'Multi-Chain Crypto Support', desc: 'Store Bitcoin, Ethereum, Solana, and custom tokens.' },
      { title: 'Seed Phrase & Biometric Security', desc: 'BIP-39 mnemonic seed generation with biometrics.' },
      { title: 'In-App Token Swaps', desc: 'Trade crypto directly within the wallet UI.' },
      { title: 'dApp Browser Integration', desc: 'Connect to Web3 protocols directly via WalletConnect.' }
    ],
    processSteps: genericProcess,
    technologies: ['BIP-39', 'Cryptography', 'Ethers.js', 'React Native', 'Solidity']
  },
  'exchange': {
    title: 'Exchange Development',
    description: 'High-frequency cryptocurrency exchange platforms featuring institutional-grade security, ultra-fast order matching, and liquidity integration.',
    icon: gifExchange,
    video: videoExchange,
    features: [
      { title: 'Ultra-Fast Order Engine', desc: 'Execute millions of trade orders per second with zero latency.' },
      { title: 'Spot & Margin Trading', desc: 'Advanced candlestick charts and order book interfaces.' },
      { title: 'Liquidity Provider Integration', desc: 'Connect to external crypto liquidity pools.' },
      { title: 'Bank-Grade Cold/Hot Wallet Storage', desc: 'Multi-signature wallet security for user funds.' }
    ],
    processSteps: genericProcess,
    technologies: ['Order Engine', 'WebSocket', 'Solidity', 'PostgreSQL', 'Redis']
  },
  'mlm': {
    title: 'MLM Software Development',
    description: 'Decentralized, smart contract-driven Multi-Level Marketing software ensuring automated matrix payouts, transparency, and unalterable trust.',
    icon: gifMLM,
    video: videoMLM,
    features: [
      { title: 'Smart Contract Matrix Payouts', desc: 'Automate commission distributions directly on-chain.' },
      { title: 'Un-alterable Compensation Plan', desc: 'Transparent referral tracking stored on the blockchain.' },
      { title: 'Multi-Tier Genealogy Tree', desc: 'Visualize downlines and team earnings in real-time.' },
      { title: 'Instant Crypto Withdrawals', desc: 'Automated instant wallet deposits for members.' }
    ],
    processSteps: genericProcess,
    technologies: ['Smart Contracts', 'DeFi Protocols', 'Solidity', 'Web3.js']
  },
  'dex': {
    title: 'Dex Platform',
    description: 'Decentralized exchange (DEX) platforms featuring Automated Market Maker (AMM) protocols, yield farming, and peer-to-peer liquidity pools.',
    icon: gifDex,
    video: videoDex,
    features: [
      { title: 'AMM Swap Protocol', desc: 'Trade tokens peer-to-peer without central intermediaries.' },
      { title: 'Liquidity Pools & Yield Farming', desc: 'Allow users to stake token pairs and earn LP fees.' },
      { title: 'Custom DEX Aggregator', desc: 'Route trades across multiple DEXs for optimal pricing.' },
      { title: 'Slippage & Price Impact Protection', desc: 'Safeguard users against MEV bots and front-running.' }
    ],
    processSteps: genericProcess,
    technologies: ['AMM Protocols', 'Liquidity Pools', 'Solidity', 'Uniswap Protocol', 'Ethers.js']
  }
};
