// Buyer setup: replace the content here. No component changes are necessary.
// This file is public. Never put private API keys or tokens here.
export const portfolio = {
  brand: 'DK®',
  edition: 'PORTFOLIO / VOL. 01',
  firstName: 'Dipesh',
  lastName: 'Kumar',
  role: 'ML Engineer',
  specialties: 'Machine learning / Data science / Backend',
  location: 'Noida, India',
  availability: 'Open to opportunities',
  headline: 'Intelligence, engineered.',
  description: 'I turn complex data into dependable products. Building at the intersection of machine learning, thoughtful engineering, and a little curiosity.',
  email: 'dipeshkumar0853822@gmail.com',
  resume: 'https://presio.me/dipesh4000/resume',
  heroImage: './assets/hero-cutout.png',
  portrait: './assets/dipesh.jpg',
  accent: '#ed080d',
  socials: [
    { label: 'GitHub', url: 'https://github.com/dipesh4000' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/dipesh4000' }
  ],
  sections: { projects: true, about: true, experience: true, contact: true },
  projects: [
    { id: '01', title: 'Spacestation Detection', category: 'Machine learning', type: 'vision', description: 'Finding structure in the unknown. Multi-class object detection on space imagery, powered by YOLOv8.', stack: ['YOLOv8', 'Python', 'Computer Vision'], url: 'https://github.com/dipesh4000/Spacestation_objects_detection_duality', label: 'OBJECT DETECTION / ORBITAL SYSTEMS' },
    { id: '02', title: 'SQL Data Warehouse', category: 'Data engineering', type: 'data', description: 'From raw data to a clear picture. A Bronze–Silver–Gold pipeline with an analytics-ready star schema.', stack: ['SQL', 'ETL', 'Star Schema'], url: 'https://github.com/dipesh4000/Database_Projects/tree/main/sql-data-warehouse', label: 'DATA ARCHITECTURE / THREE LAYERS' },
    { id: '03', title: 'FastAPI CRUD App', category: 'Backend', type: 'api', description: 'A dependable foundation. A RESTful API with PostgreSQL persistence and Pydantic validation.', stack: ['FastAPI', 'PostgreSQL', 'Pydantic'], url: 'https://github.com/dipesh4000/Database_Projects/tree/main/fastapi-crud-app', label: 'BACKEND SYSTEMS / REQUEST → RESPONSE' },
    { id: '04', title: 'Reddit-like REST API', category: 'Backend', type: 'network', description: 'Built for conversation. Authentication, role-based access, and ownership controls for a social API.', stack: ['FastAPI', 'JWT', 'PostgreSQL'], url: 'https://github.com/dipesh4000/redditAPI', label: 'SOCIAL INFRASTRUCTURE / CONNECTED' }
  ],
  skills: [
    { name: 'Languages', items: ['Python', 'SQL', 'JavaScript', 'C++'] },
    { name: 'Machine learning', items: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'YOLOv8', 'OpenCV'] },
    { name: 'Backend & data', items: ['FastAPI', 'Flask', 'PostgreSQL', 'Pandas', 'NumPy'] },
    { name: 'Tools', items: ['Git', 'Docker', 'Matplotlib'] }
  ],
  experience: [
    { period: 'JUN — AUG 2026', company: 'AndGate Informatics', role: 'Summer Trainee · AI & Data Engineering', text: 'Optimised Django APIs, built data validation pipelines for 10,000+ hardware components, and delivered two generative AI prototypes.' },
    { period: 'APR — DEC 2025', company: 'LearnQ.ai', role: 'Product Quality & Implementation Intern', text: 'Validated 2,000+ question records for ML-assisted workflows and worked with engineering to improve product quality.' }
  ],
  education: ['B.S. Data Science & Applications · IIT Madras', 'B.Tech Computer Science · MSIT'],
  // Optional public JSON endpoint; null keeps the template completely offline-ready.
  // Expected shape: { "metrics": [{ "value": "42", "label": "Repositories" }] }
  // Private provider calls belong in YOUR server endpoint, never this browser code.
  metricsEndpoint: null,
  metrics: [
    { value: '04', label: 'Selected builds' },
    { value: '03', label: 'Core disciplines' },
    { value: '02', label: 'Industry experiences' }
  ]
};
