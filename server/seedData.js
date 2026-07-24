const Service = require('./models/Service');
const Portfolio = require('./models/Portfolio');
const Career = require('./models/Career');
const Testimonial = require('./models/Testimonial');
const TeamMember = require('./models/TeamMember');
const SiteSettings = require('./models/SiteSettings');
const Admin = require('./models/Admin');
const Contact = require('./models/Contact');
const Application = require('./models/Application');
const bcrypt = require('bcryptjs');

const initialServices = [
  {
    id: 'it-services',
    title: 'IT Services',
    description: 'We provide comprehensive IT services to help businesses optimize their technology infrastructure, ensuring seamless operations, security, and scalability in the digital age.',
    icon: '',
    features: [
      { title: 'IT Consulting', desc: 'Strategic guidance to align technology with business goals.' },
      { title: 'Cloud Solutions', desc: 'Secure and scalable cloud migration and management.' },
      { title: 'Cybersecurity', desc: 'Advanced protection against digital threats.' },
      { title: 'Network Infrastructure', desc: 'Reliable and high-performance network setup.' }
    ],
    processSteps: ['Consultation', 'Planning', 'Development', 'Testing', 'Deployment', 'Support'],
    technologies: ['React', 'NodeJS', 'AWS', 'Docker']
  },
  {
    id: 'salesforce-services',
    title: 'Salesforce Services',
    description: 'Our Salesforce experts help you maximize your CRM investment through custom development, integration, and strategic consulting to drive sales.',
    icon: '',
    features: [
      { title: 'Custom Strategy', desc: 'Tailored solutions to meet your specific business requirements.' },
      { title: 'Expert Implementation', desc: 'Flawless execution by our team of seasoned professionals.' }
    ],
    processSteps: ['Consultation', 'Planning', 'Development', 'Testing', 'Deployment', 'Support'],
    technologies: ['Salesforce', 'Apex', 'Lightning']
  },
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'We build fast, responsive, and highly scalable web applications tailored to your specific business requirements.',
    icon: '',
    features: [
      { title: 'Custom Strategy', desc: 'Tailored solutions to meet your specific business requirements.' },
      { title: 'Scalable Architecture', desc: 'Built to grow seamlessly alongside your business.' }
    ],
    processSteps: ['Consultation', 'Planning', 'Development', 'Testing', 'Deployment', 'Support'],
    technologies: ['React', 'NextJS', 'NodeJS']
  },
  {
    id: 'mobile-app',
    title: 'Mobile App Development',
    description: 'Create engaging native and cross-platform mobile experiences that delight users and drive business growth.',
    icon: '',
    features: [
      { title: 'Custom Strategy', desc: 'Tailored solutions to meet your specific business requirements.' }
    ],
    processSteps: ['Consultation', 'Planning', 'Development', 'Testing', 'Deployment', 'Support'],
    technologies: ['React Native', 'Flutter', 'Swift']
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Services',
    description: 'Data-driven marketing strategies to increase your online visibility, drive traffic, and convert leads into loyal customers.',
    icon: '',
    features: [
      { title: 'Custom Strategy', desc: 'Tailored solutions to meet your specific business requirements.' }
    ],
    processSteps: ['Consultation', 'Planning', 'Development', 'Testing', 'Deployment', 'Support'],
    technologies: ['SEO', 'Google Ads', 'Meta Ads']
  },
  {
    id: 'software-development',
    title: 'Software Development',
    description: 'Custom software engineering solutions tailored to automate your unique business processes and solve complex challenges.',
    icon: '',
    features: [
      { title: 'Custom Strategy', desc: 'Tailored solutions to meet your specific business requirements.' }
    ],
    processSteps: ['Consultation', 'Planning', 'Development', 'Testing', 'Deployment', 'Support'],
    technologies: ['Java', 'Python', 'Docker']
  },
  {
    id: 'ai-services',
    title: 'Artificial Intelligence',
    description: 'Leverage the power of AI to automate tasks, personalize customer experiences, and unlock new capabilities.',
    icon: '',
    features: [
      { title: 'Custom Strategy', desc: 'Tailored solutions to meet your specific business requirements.' }
    ],
    processSteps: ['Consultation', 'Planning', 'Development', 'Testing', 'Deployment', 'Support'],
    technologies: ['OpenAI', 'TensorFlow', 'Python']
  },
  {
    id: 'iot',
    title: 'Internet Of Things',
    description: 'Connect and manage smart devices to collect data, automate processes, and build intelligent environments.',
    icon: '',
    features: [
      { title: 'Custom Strategy', desc: 'Tailored solutions to meet your specific business requirements.' }
    ],
    processSteps: ['Consultation', 'Planning', 'Development', 'Testing', 'Deployment', 'Support'],
    technologies: ['MQTT', 'C++', 'AWS IoT']
  },
  {
    id: 'database-design',
    title: 'Database Design',
    description: 'Architecting robust, scalable, and secure databases for high-performance applications.',
    icon: '',
    features: [
      { title: 'Custom Strategy', desc: 'Tailored solutions to meet your specific business requirements.' }
    ],
    processSteps: ['Consultation', 'Planning', 'Development', 'Testing', 'Deployment', 'Support'],
    technologies: ['PostgreSQL', 'MongoDB', 'Redis']
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    description: 'Transform raw data into actionable insights to drive informed business decisions.',
    icon: '',
    features: [
      { title: 'Custom Strategy', desc: 'Tailored solutions to meet your specific business requirements.' }
    ],
    processSteps: ['Consultation', 'Planning', 'Development', 'Testing', 'Deployment', 'Support'],
    technologies: ['Tableau', 'PowerBI', 'Python']
  },
  {
    id: 'staffing',
    title: 'Staffing & Payroll',
    description: 'Comprehensive workforce management and payroll processing solutions for modern enterprises.',
    icon: '',
    features: [
      { title: 'Custom Strategy', desc: 'Tailored solutions to meet your specific business requirements.' }
    ],
    processSteps: ['Consultation', 'Planning', 'Development', 'Testing', 'Deployment', 'Support'],
    technologies: ['HRMS', 'Payroll Systems']
  },
  {
    id: 'web3',
    title: 'Web3 Development',
    description: 'Build the next generation of decentralized applications and blockchain infrastructure.',
    icon: '',
    features: [
      { title: 'Custom Strategy', desc: 'Tailored solutions to meet your specific business requirements.' }
    ],
    processSteps: ['Consultation', 'Planning', 'Development', 'Testing', 'Deployment', 'Support'],
    technologies: ['Web3.js', 'Ethers.js', 'Solidity']
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
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      const formattedServices = initialServices.map(svc => ({
        ...svc,
        processSteps: svc.processSteps.map(step => (typeof step === 'string' ? { title: step } : step))
      }));
      await Service.insertMany(formattedServices);
      console.log('✅ Initial Services seeded into MongoDB');
    }

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
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

module.exports = seedDatabase;
