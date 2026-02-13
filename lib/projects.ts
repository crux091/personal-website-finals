export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  tech: string[]
  link: string
  github?: string
  image?: string
  category?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Student Portal',
    description: 'A comprehensive system for managing student information and progress with real-time updates.',
    longDescription: 'Full-featured student management portal built with Flask, enabling teachers and administrators to track student progress, manage assignments, and monitor academic performance. Features include role-based access control, grade management, and analytics dashboard.',
    tech: ['Flask', 'Python', 'SQLAlchemy', 'Bootstrap'],
    link: 'https://student-monitor-admin-teacher-portal.onrender.com/',
    image: '/projects/student-portal.jpg',
    category: 'Web Application',
    featured: true
  },
  {
    id: 'p2',
    title: 'Gym Log',
    description: 'A comprehensive fitness tracking system that helps users monitor workouts and visualize progress over time.',
    longDescription: 'Modern fitness tracking application with workout logging, progress visualization, and personal record tracking. Built with Flask backend and responsive Tailwind UI for seamless mobile and desktop experience.',
    tech: ['Flask', 'Python', 'Tailwind CSS', 'Chart.js'],
    link: 'https://github.com/gelolaus/gymlogv2',
    github: 'https://github.com/gelolaus/gymlogv2',
    image: '/projects/gym-log.jpg',
    category: 'Health & Fitness',
    featured: true
  },
  {
    id: 'p3',
    title: 'JYPTIC - Cinema Ticketing System',
    description: 'An intelligent cinema ticketing platform with integrated AI agent for customer support and recommendations.',
    longDescription: 'Modern cinema ticketing system featuring real-time seat selection, payment processing, and an AI-powered chatbot for movie recommendations and customer inquiries. Built with React for a smooth user experience.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'AI Integration'],
    link: 'https://jypsis-cinema-ticketing-system-pi.vercel.app/',
    github: 'https://github.com/crux091/jyptic',
    image: '/projects/jyptic.jpg',
    category: 'E-Commerce',
    featured: true
  }
]
