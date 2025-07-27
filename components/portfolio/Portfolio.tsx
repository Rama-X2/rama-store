'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  Code, 
  Palette, 
  Smartphone, 
  Globe, 
  Database,
  ExternalLink,
  Github,
  Mail,
  Phone,
  MapPin,
  Download,
  Star,
  Award,
  Zap,
  Heart,
  Coffee,
  Calendar,
  Eye,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react'

// Portfolio data
const portfolioData = {
  personal: {
    name: "Rama Developer",
    title: "Full Stack Developer & UI/UX Designer",
    bio: "Passionate developer with 5+ years of experience creating digital solutions that matter. I love turning complex problems into simple, beautiful, and intuitive designs.",
    avatar: "/images/portfolio/avatar.jpg",
    location: "Jakarta, Indonesia",
    email: "rama@server.my.id",
    phone: "+62 812-3456-7890",
    website: "https://rama.server.my.id",
    github: "https://github.com/rama-developer",
    linkedin: "https://linkedin.com/in/rama-developer"
  },
  
  skills: [
    { name: "React/Next.js", level: 95, icon: Code, color: "#61DAFB" },
    { name: "TypeScript", level: 90, icon: Code, color: "#3178C6" },
    { name: "Node.js", level: 88, icon: Database, color: "#339933" },
    { name: "UI/UX Design", level: 92, icon: Palette, color: "#FF6B6B" },
    { name: "Mobile Development", level: 85, icon: Smartphone, color: "#A855F7" },
    { name: "Database Design", level: 87, icon: Database, color: "#336791" },
    { name: "Web APIs", level: 89, icon: Globe, color: "#FF9500" },
    { name: "DevOps", level: 82, icon: Zap, color: "#F59E0B" }
  ],

  projects: [
    {
      id: 1,
      title: "Rama Store - Gaming Topup Platform",
      description: "Modern gaming top-up platform with real-time transaction processing, multi-game support, and beautiful animations. Built with Next.js, TypeScript, and Framer Motion.",
      image: "/images/portfolio/project1.jpg",
      technologies: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS", "Node.js"],
      liveUrl: "https://rama-store.vercel.app",
      githubUrl: "https://github.com/rama/gaming-topup",
      category: "Web Development",
      featured: true,
      stats: {
        users: "10K+",
        transactions: "50K+",
        uptime: "99.9%"
      }
    },
    {
      id: 2,
      title: "E-Commerce Dashboard",
      description: "Comprehensive admin dashboard for e-commerce management with real-time analytics, inventory management, and customer insights.",
      image: "/images/portfolio/project2.jpg",
      technologies: ["React", "Chart.js", "Material-UI", "Express.js", "MongoDB"],
      liveUrl: "https://ecommerce-dashboard.demo",
      githubUrl: "https://github.com/rama/ecommerce-dashboard",
      category: "Dashboard",
      featured: true,
      stats: {
        performance: "98%",
        loadTime: "1.2s",
        satisfaction: "4.8/5"
      }
    },
    {
      id: 3,
      title: "Mobile Banking App UI",
      description: "Modern and secure mobile banking interface design with intuitive user experience and comprehensive financial features.",
      image: "/images/portfolio/project3.jpg",
      technologies: ["Figma", "React Native", "Redux", "Firebase"],
      liveUrl: "https://banking-app.demo",
      githubUrl: "https://github.com/rama/banking-app",
      category: "Mobile Design",
      featured: false,
      stats: {
        downloads: "25K+",
        rating: "4.9/5",
        retention: "85%"
      }
    },
    {
      id: 4,
      title: "AI-Powered Chat Bot",
      description: "Intelligent customer service chatbot with natural language processing and machine learning capabilities.",
      image: "/images/portfolio/project4.jpg",
      technologies: ["Python", "TensorFlow", "NLP", "Flask", "React"],
      liveUrl: "https://ai-chatbot.demo",
      githubUrl: "https://github.com/rama/ai-chatbot",
      category: "AI/ML",
      featured: true,
      stats: {
        accuracy: "94%",
        responses: "100K+",
        satisfaction: "4.7/5"
      }
    },
    {
      id: 5,
      title: "Portfolio Website",
      description: "Personal portfolio website showcasing creative projects and professional experience with stunning animations.",
      image: "/images/portfolio/project5.jpg",
      technologies: ["Next.js", "Three.js", "GSAP", "Tailwind CSS"],
      liveUrl: "https://rama-portfolio.vercel.app",
      githubUrl: "https://github.com/rama/portfolio",
      category: "Web Development",
      featured: false,
      stats: {
        visitors: "5K+",
        bounceRate: "25%",
        engagement: "3.5min"
      }
    },
    {
      id: 6,
      title: "Social Media Analytics",
      description: "Comprehensive social media analytics platform with real-time data visualization and performance insights.",
      image: "/images/portfolio/project6.jpg",
      technologies: ["Vue.js", "D3.js", "Node.js", "PostgreSQL", "Docker"],
      liveUrl: "https://social-analytics.demo",
      githubUrl: "https://github.com/rama/social-analytics",
      category: "Analytics",
      featured: false,
      stats: {
        dataPoints: "1M+",
        clients: "500+",
        accuracy: "96%"
      }
    }
  ],

  experience: [
    {
      company: "Tech Solutions Inc.",
      position: "Senior Full Stack Developer",
      period: "2022 - Present",
      description: "Lead developer for multiple high-traffic web applications, managing team of 5 developers and implementing modern development practices.",
      achievements: [
        "Increased application performance by 40%",
        "Led migration to microservices architecture",
        "Mentored 3 junior developers"
      ]
    },
    {
      company: "Digital Agency Co.",
      position: "Frontend Developer",
      period: "2020 - 2022",
      description: "Developed responsive web applications and mobile-first designs for various clients across different industries.",
      achievements: [
        "Delivered 20+ client projects on time",
        "Improved user engagement by 60%",
        "Implemented accessibility standards"
      ]
    },
    {
      company: "Startup Ventures",
      position: "Junior Developer",
      period: "2019 - 2020",
      description: "Started career building MVPs and prototypes for early-stage startups, gaining experience in rapid development cycles.",
      achievements: [
        "Built 5 MVP applications",
        "Learned 8 new technologies",
        "Contributed to 3 successful launches"
      ]
    }
  ],

  testimonials: [
    {
      name: "Sarah Johnson",
      position: "CEO, Tech Solutions Inc.",
      content: "Rama is an exceptional developer who consistently delivers high-quality work. His attention to detail and innovative solutions have been invaluable to our team.",
      rating: 5
    },
    {
      name: "Mike Chen",
      position: "Product Manager, Digital Agency Co.",
      content: "Working with Rama was a pleasure. He understood our requirements perfectly and delivered a solution that exceeded our expectations.",
      rating: 5
    },
    {
      name: "Lisa Rodriguez",
      position: "UX Designer, Startup Ventures",
      content: "Rama's ability to bridge the gap between design and development is remarkable. He brings designs to life with pixel-perfect precision.",
      rating: 5
    }
  ],

  stats: {
    projectsCompleted: 50,
    happyClients: 35,
    yearsExperience: 5,
    linesOfCode: 100000,
    coffeeConsumed: 2500,
    githubCommits: 3000
  }
}

interface PortfolioProps {
  onClose: () => void
}

export default function Portfolio({ onClose }: PortfolioProps) {
  const [activeSection, setActiveSection] = useState('about')
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedProject) {
          setSelectedProject(null)
        } else {
          onClose()
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, selectedProject])

  const sections = [
    { id: 'about', name: 'About', icon: User },
    { id: 'skills', name: 'Skills', icon: Code },
    { id: 'projects', name: 'Projects', icon: Globe },
    { id: 'experience', name: 'Experience', icon: Award },
    { id: 'testimonials', name: 'Testimonials', icon: Star },
    { id: 'contact', name: 'Contact', icon: Mail }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse" 
             style={{ animationDelay: '1s' }} />
        
        {/* Cursor follower */}
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x - 192,
            y: mousePosition.y - 192,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
        />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            animate={{
              x: [Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920), Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920)],
              y: [Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080), Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080)],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="relative z-10 p-6 flex justify-between items-center glass-effect"
      >
        <motion.h1 
          className="text-2xl font-bold glow-text"
          whileHover={{ scale: 1.05 }}
        >
          Portfolio - {portfolioData.personal.name}
        </motion.h1>
        
        <motion.button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-white transition-colors"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-6 h-6" />
        </motion.button>
      </motion.header>

      <div className="flex h-full">
        {/* Sidebar Navigation */}
        <motion.nav
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="w-64 p-6 glass-effect m-4 mr-0 rounded-l-2xl"
        >
          <div className="space-y-2">
            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-glow'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 10 }}
              >
                <section.icon className="w-5 h-5" />
                <span className="font-medium">{section.name}</span>
              </motion.button>
            ))}
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 p-4 bg-dark-light/50 rounded-lg"
          >
            <h3 className="text-sm font-semibold text-gray-400 mb-3">Quick Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Projects</span>
                <span className="text-primary font-semibold">{portfolioData.stats.projectsCompleted}+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Clients</span>
                <span className="text-green-400 font-semibold">{portfolioData.stats.happyClients}+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Experience</span>
                <span className="text-yellow-400 font-semibold">{portfolioData.stats.yearsExperience} years</span>
              </div>
            </div>
          </motion.div>
        </motion.nav>

        {/* Main Content */}
        <motion.main
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 p-6 overflow-y-auto custom-scrollbar"
        >
          <AnimatePresence mode="wait">
            {/* About Section */}
            {activeSection === 'about' && (
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Hero Section */}
                <div className="text-center space-y-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="relative mx-auto w-32 h-32"
                  >
                    <div className="w-full h-full rounded-full bg-gradient-to-r from-primary to-secondary p-1">
                      <div className="w-full h-full rounded-full bg-dark-light flex items-center justify-center">
                        <User className="w-16 h-16 text-primary" />
                      </div>
                    </div>
                    <motion.div
                      className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ delay: index * 0.2 }}
                      className="glass-effect p-6 rounded-xl hover:shadow-glow transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-primary/20 rounded-lg">
                          <Building2 className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                            <h3 className="text-xl font-bold text-white">{exp.position}</h3>
                            <span className="text-sm text-primary font-medium">{exp.period}</span>
                          </div>
                          <p className="text-gray-400 font-medium mb-3">{exp.company}</p>
                          <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>
                          
                          {/* Achievements */}
                          <div>
                            <h4 className="text-sm font-semibold text-white mb-2">Key Achievements:</h4>
                            <ul className="space-y-1">
                              {exp.achievements.map((achievement, i) => (
                                <li key={i} className="text-sm text-gray-300 flex items-start space-x-2">
                                  <span className="text-green-400 mt-1">✓</span>
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Testimonials Section */}
            {activeSection === 'testimonials' && (
              <motion.div
                key="testimonials"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-3xl font-bold glow-text mb-4">Work Experience</h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    My professional journey and the experiences that shaped my skills
                  </p>
                </div>

                <div className="space-y-6">
                  {portfolioData.experience.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="glass-effect p-6 rounded-xl hover:shadow-glow transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-primary/20 rounded-lg">
                          <Building2 className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                            <h3 className="text-xl font-bold text-white">{exp.position}</h3>
                            <span className="text-sm text-primary font-medium">{exp.period}</span>
                          </div>
                          <p className="text-gray-400 font-medium mb-3">{exp.company}</p>
                          <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>
                          
                          {/* Achievements */}
                          <div>
                            <h4 className="text-sm font-semibold text-white mb-2">Key Achievements:</h4>
                            <ul className="space-y-1">
                              {exp.achievements.map((achievement, i) => (
                                <li key={i} className="text-sm text-gray-300 flex items-start space-x-2">
                                  <span className="text-green-400 mt-1">✓</span>
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Testimonials Section */}
            {activeSection === 'testimonials' && (
              <motion.div
                key="testimonials"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-3xl font-bold glow-text mb-4">Client Testimonials</h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    What clients and colleagues say about working with me
                  </p>
                </div>

                <div className="relative">
                  {/* Testimonial Carousel */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTestimonial}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="glass-effect p-8 rounded-xl text-center max-w-4xl mx-auto"
                    >
                      <div className="mb-6">
                        {/* Stars */}
                        <div className="flex justify-center space-x-1 mb-4">
                          {[...Array(portfolioData.testimonials[currentTestimonial].rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        
                        <blockquote className="text-lg text-gray-300 leading-relaxed mb-6 italic">
                          "{portfolioData.testimonials[currentTestimonial].content}"
                        </blockquote>
                        
                        <div className="flex items-center justify-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-left">
                            <p className="font-semibold text-white">{portfolioData.testimonials[currentTestimonial].name}</p>
                            <p className="text-sm text-gray-400">{portfolioData.testimonials[currentTestimonial].position}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex justify-center space-x-4 mt-6">
                    <motion.button
                      onClick={() => setCurrentTestimonial(prev => prev === 0 ? portfolioData.testimonials.length - 1 : prev - 1)}
                      className="p-2 glass-effect rounded-full text-gray-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </motion.button>
                    
                    <div className="flex space-x-2">
                      {portfolioData.testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentTestimonial(index)}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            index === currentTestimonial ? 'bg-primary' : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    
                    <motion.button
                      onClick={() => setCurrentTestimonial(prev => prev === portfolioData.testimonials.length - 1 ? 0 : prev + 1)}
                      className="p-2 glass-effect rounded-full text-gray-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Contact Section */}
            {activeSection === 'contact' && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-3xl font-bold glow-text mb-4">Get In Touch</h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    Ready to work together? Let's discuss your project and bring your ideas to life
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Contact Info */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
                      <div className="space-y-4">
                        {[
                          { icon: Mail, label: 'Email', value: portfolioData.personal.email, href: `mailto:${portfolioData.personal.email}` },
                          { icon: Phone, label: 'Phone', value: portfolioData.personal.phone, href: `tel:${portfolioData.personal.phone}` },
                          { icon: MapPin, label: 'Location', value: portfolioData.personal.location, href: '#' }
                        ].map((contact, index) => (
                          <motion.div
                            key={contact.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="flex items-center space-x-4 p-4 glass-effect rounded-lg hover:shadow-glow transition-all duration-300"
                          >
                            <div>
                              <p className="text-sm text-gray-400">{contact.label}</p>
                              <p className="text-white font-medium">{contact.value}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Social Links */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Follow Me</h3>
                      <div className="flex space-x-4">
                        {[
                          { icon: Github, href: portfolioData.personal.github, label: 'GitHub' },
                          { icon: Linkedin, href: portfolioData.personal.linkedin, label: 'LinkedIn' },
                          { icon: Twitter, href: '#', label: 'Twitter' },
                          { icon: Instagram, href: '#', label: 'Instagram' }
                        ].map((social, index) => (
                          <motion.a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 glass-effect rounded-full text-gray-400 hover:text-white transition-all duration-300"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            title={social.label}
                          >
                            <social.icon className="w-5 h-5" />
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Contact Form */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass-effect p-6 rounded-xl"
                  >
                    <h3 className="text-xl font-bold text-white mb-6">Send Message</h3>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Your Name"
                          className="px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                        <input
                          type="email"
                          placeholder="Your Email"
                          className="px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Subject"
                        className="w-full px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                      <textarea
                        rows={5}
                        placeholder="Your Message"
                        className="w-full px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      />
                      <motion.button
                        type="submit"
                        className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium text-white shadow-glow hover:shadow-glow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </motion.button>
                    </form>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.main>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="glass-effect rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold glow-text mb-2">{selectedProject.title}</h2>
                  <p className="text-gray-400">{selectedProject.category}</p>
                </div>
                <motion.button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Project Image */}
              <div className="relative h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl mb-6 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Globe className="w-24 h-24 text-primary/50" />
                </div>
                {selectedProject.featured && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium">
                    Featured Project
                  </div>
                )}
              </div>

              {/* Project Details */}
              <div className="space-y-6">
                <p className="text-gray-300 leading-relaxed text-lg">{selectedProject.description}</p>

                {/* Technologies */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.technologies.map((tech: string, index: number) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Stats */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Project Statistics</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(selectedProject.stats).map(([key, value]) => (
                      <div key={key} className="glass-effect p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-primary mb-1">{value}</div>
                        <div className="text-sm text-gray-400 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-6">
                  <motion.a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium text-white shadow-glow hover:shadow-glow-lg transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>View Live</span>
                  </motion.a>
                  <motion.a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 glass-effect rounded-lg font-medium text-white hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Github className="w-5 h-5" />
                    <span>View Code</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
                            <div>
                              <p className="text-sm text-gray-400">{contact.label}</p>
                              <p className="text-white font-medium">{contact.value}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Social Links */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Follow Me</h3>
                      <div className="flex space-x-4">
                        {[
                          { icon: Github, href: portfolioData.personal.github, label: 'GitHub' },
                          { icon: Linkedin, href: portfolioData.personal.linkedin, label: 'LinkedIn' },
                          { icon: Twitter, href: '#', label: 'Twitter' },
                          { icon: Instagram, href: '#', label: 'Instagram' }
                        ].map((social, index) => (
                          <motion.a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 glass-effect rounded-full text-gray-400 hover:text-white transition-all duration-300"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            title={social.label}
                          >
                            <social.icon className="w-5 h-5" />
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Contact Form */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass-effect p-6 rounded-xl"
                  >
                    <h3 className="text-xl font-bold text-white mb-6">Send Message</h3>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Your Name"
                          className="px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                        <input
                          type="email"
                          placeholder="Your Email"
                          className="px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Subject"
                        className="w-full px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                      <textarea
                        rows={5}
                        placeholder="Your Message"
                        className="w-full px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      />
                      <motion.button
                        type="submit"
                        className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium text-white shadow-glow hover:shadow-glow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </motion.button>
                    </form>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.main>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="glass-effect rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold glow-text mb-2">{selectedProject.title}</h2>
                  <p className="text-gray-400">{selectedProject.category}</p>
                </div>
                <motion.button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Project Image */}
              <div className="relative h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl mb-6 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Globe className="w-24 h-24 text-primary/50" />
                </div>
                {selectedProject.featured && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium">
                    Featured Project
                  </div>
                )}
              </div>

              {/* Project Details */}
              <div className="space-y-6">
                <p className="text-gray-300 leading-relaxed text-lg">{selectedProject.description}</p>

                {/* Technologies */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.technologies.map((tech: string, index: number) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Stats */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Project Statistics</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(selectedProject.stats).map(([key, value]) => (
                      <div key={key} className="glass-effect p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-primary mb-1">{value}</div>
                        <div className="text-sm text-gray-400 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-6">
                  <motion.a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium text-white shadow-glow hover:shadow-glow-lg transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>View Live</span>
                  </motion.a>
                  <motion.a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 glass-effect rounded-lg font-medium text-white hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Github className="w-5 h-5" />
                    <span>View Code</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
                  <h2 className="text-3xl font-bold glow-text mb-4">Client Testimonials</h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    What clients and colleagues say about working with me
                  </p>
                </div>

                <div className="relative">
                  {/* Testimonial Carousel */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTestimonial}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="glass-effect p-8 rounded-xl text-center max-w-4xl mx-auto"
                    >
                      <div className="mb-6">
                        {/* Stars */}
                        <div className="flex justify-center space-x-1 mb-4">
                          {[...Array(portfolioData.testimonials[currentTestimonial].rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        
                        <blockquote className="text-lg text-gray-300 leading-relaxed mb-6 italic">
                          "{portfolioData.testimonials[currentTestimonial].content}"
                        </blockquote>
                        
                        <div className="flex items-center justify-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-left">
                            <p className="font-semibold text-white">{portfolioData.testimonials[currentTestimonial].name}</p>
                            <p className="text-sm text-gray-400">{portfolioData.testimonials[currentTestimonial].position}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex justify-center space-x-4 mt-6">
                    <motion.button
                      onClick={() => setCurrentTestimonial(prev => prev === 0 ? portfolioData.testimonials.length - 1 : prev - 1)}
                      className="p-2 glass-effect rounded-full text-gray-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </motion.button>
                    
                    <div className="flex space-x-2">
                      {portfolioData.testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentTestimonial(index)}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            index === currentTestimonial ? 'bg-primary' : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    
                    <motion.button
                      onClick={() => setCurrentTestimonial(prev => prev === portfolioData.testimonials.length - 1 ? 0 : prev + 1)}
                      className="p-2 glass-effect rounded-full text-gray-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Contact Section */}
            {activeSection === 'contact' && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-3xl font-bold glow-text mb-4">Get In Touch</h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    Ready to work together? Let's discuss your project and bring your ideas to life
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Contact Info */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
                      <div className="space-y-4">
                        {[
                          { icon: Mail, label: 'Email', value: portfolioData.personal.email, href: `mailto:${portfolioData.personal.email}` },
                          { icon: Phone, label: 'Phone', value: portfolioData.personal.phone, href: `tel:${portfolioData.personal.phone}` },
                          { icon: MapPin, label: 'Location', value: portfolioData.personal.location, href: '#' }
                        ].map((contact, index) => (
                          <motion.div
                            key={contact.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="flex items-center space-x-4 p-4 glass-effect rounded-lg hover:shadow-glow transition-all duration-300"
                          >
                              <contact.icon className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-400">{contact.label}</p>
                              <p className="text-white font-medium">{contact.value}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Social Links */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Follow Me</h3>
                      <div className="flex space-x-4">
                        {[
                          { icon: Github, href: portfolioData.personal.github, label: 'GitHub' },
                          { icon: Linkedin, href: portfolioData.personal.linkedin, label: 'LinkedIn' },
                          { icon: Twitter, href: '#', label: 'Twitter' },
                          { icon: Instagram, href: '#', label: 'Instagram' }
                        ].map((social, index) => (
                          <motion.a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 glass-effect rounded-full text-gray-400 hover:text-white transition-all duration-300"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            title={social.label}
                          >
                            <social.icon className="w-5 h-5" />
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Contact Form */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass-effect p-6 rounded-xl"
                  >
                    <h3 className="text-xl font-bold text-white mb-6">Send Message</h3>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Your Name"
                          className="px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                        <input
                          type="email"
                          placeholder="Your Email"
                          className="px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Subject"
                        className="w-full px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                      <textarea
                        rows={5}
                        placeholder="Your Message"
                        className="w-full px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      />
                      <motion.button
                        type="submit"
                        className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium text-white shadow-glow hover:shadow-glow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </motion.button>
                    </form>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.main>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="glass-effect rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold glow-text mb-2">{selectedProject.title}</h2>
                  <p className="text-gray-400">{selectedProject.category}</p>
                </div>
                <motion.button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Project Image */}
              <div className="relative h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl mb-6 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Globe className="w-24 h-24 text-primary/50" />
                </div>
                {selectedProject.featured && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium">
                    Featured Project
                  </div>
                )}
              </div>

              {/* Project Details */}
              <div className="space-y-6">
                <p className="text-gray-300 leading-relaxed text-lg">{selectedProject.description}</p>

                {/* Technologies */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.technologies.map((tech: string, index: number) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Stats */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Project Statistics</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(selectedProject.stats).map(([key, value]) => (
                      <div key={key} className="glass-effect p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-primary mb-1">{value}</div>
                        <div className="text-sm text-gray-400 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-6">
                  <motion.a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium text-white shadow-glow hover:shadow-glow-lg transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>View Live</span>
                  </motion.a>
                  <motion.a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 glass-effect rounded-lg font-medium text-white hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Github className="w-5 h-5" />
                    <span>View Code</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
                              <contact.icon className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-400">{contact.label}</p>
                              <p className="text-white font-medium">{contact.value}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Social Links */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Follow Me</h3>
                      <div className="flex space-x-4">
                        {[
                          { icon: Github, href: portfolioData.personal.github, label: 'GitHub' },
                          { icon: Linkedin, href: portfolioData.personal.linkedin, label: 'LinkedIn' },
                          { icon: Twitter, href: '#', label: 'Twitter' },
                          { icon: Instagram, href: '#', label: 'Instagram' }
                        ].map((social, index) => (
                          <motion.a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 glass-effect rounded-full text-gray-400 hover:text-white transition-all duration-300"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            title={social.label}
                          >
                            <social.icon className="w-5 h-5" />
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Contact Form */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass-effect p-6 rounded-xl"
                  >
                    <h3 className="text-xl font-bold text-white mb-6">Send Message</h3>
                    <form className="space-y-4">
                        ">
                        <input
                          type="text"
                          placeholder="Your Name"
                          className="px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                        <input
                          type="email"
                          placeholder="Your Email"
                          className="px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Subject"
                        className="w-full px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                      <textarea
                        rows={5}
                        placeholder="Your Message"
                        className="w-full px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      />
                      <motion.button
                        type="submit"
                        className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium text-white shadow-glow hover:shadow-glow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </motion.button>
                    </form>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.main>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="glass-effect rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold glow-text mb-2">{selectedProject.title}</h2>
                  <p className="text-gray-400">{selectedProject.category}</p>
                </div>
                <motion.button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Project Image */}
              <div className="relative h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl mb-6 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Globe className="w-24 h-24 text-primary/50" />
                </div>
                {selectedProject.featured && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium">
                    Featured Project
                  </div>
                )}
              </div>

              {/* Project Details */}
              <div className="space-y-6">
                <p className="text-gray-300 leading-relaxed text-lg">{selectedProject.description}</p>

                {/* Technologies */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.technologies.map((tech: string, index: number) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Stats */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Project Statistics</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(selectedProject.stats).map(([key, value]) => (
                      <div key={key} className="glass-effect p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-primary mb-1">{value}</div>
                        <div className="text-sm text-gray-400 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-6">
                  <motion.a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium text-white shadow-glow hover:shadow-glow-lg transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>View Live</span>
                  </motion.a>
                  <motion.a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 glass-effect rounded-lg font-medium text-white hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Github className="w-5 h-5" />
                    <span>View Code</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}">
                        <input
                          type="text"
                          placeholder="Your Name"
                          className="px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                        <input
                          type="email"
                          placeholder="Your Email"
                          className="px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Subject"
                        className="w-full px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                      <textarea
                        rows={5}
                        placeholder="Your Message"
                        className="w-full px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      />
                      <motion.button
                        type="submit"
                        className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium text-white shadow-glow hover:shadow-glow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </motion.button>
                    </form>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.main>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="glass-effect rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold glow-text mb-2">{selectedProject.title}</h2>
                  <p className="text-gray-400">{selectedProject.category}</p>
                </div>
                <motion.button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Project Image */}
              <div className="relative h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl mb-6 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Globe className="w-24 h-24 text-primary/50" />
                </div>
                {selectedProject.featured && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium">
                    Featured Project
                  </div>
                )}
              </div>

              {/* Project Details */}
              <div className="space-y-6">
                <p className="text-gray-300 leading-relaxed text-lg">{selectedProject.description}</p>

                {/* Technologies */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.technologies.map((tech: string, index: number) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Stats */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Project Statistics</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(selectedProject.stats).map(([key, value]) => (
                      <div key={key} className="glass-effect p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-primary mb-1">{value}</div>
                        <div className="text-sm text-gray-400 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-6">
                  <motion.a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium text-white shadow-glow hover:shadow-glow-lg transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>View Live</span>
                  </motion.a>
                  <motion.a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 glass-effect rounded-lg font-medium text-white hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Github className="w-5 h-5" />
                    <span>View Code</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}={{ repeat: Infinity, duration: 2 }}
                    >
                      <span className="text-xs font-bold">👋</span>
                    </motion.div>
            )}

            {/* Testimonials Section */}
            {activeSection === 'testimonials' && (
              <motion.div
                key="testimonials"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-3xl font-bold glow-text mb-4">Client Testimonials</h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    What clients and colleagues say about working with me
                  </p>
                </div>

                <div className="relative">
                  {/* Testimonial Carousel */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTestimonial}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="glass-effect p-8 rounded-xl text-center max-w-4xl mx-auto"
                    >
                      <div className="mb-6">
                        {/* Stars */}
                        <div className="flex justify-center space-x-1 mb-4">
                          {[...Array(portfolioData.testimonials[currentTestimonial].rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        
                        <blockquote className="text-lg text-gray-300 leading-relaxed mb-6 italic">
                          "{portfolioData.testimonials[currentTestimonial].content}"
                        </blockquote>
                        
                        <div className="flex items-center justify-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-left">
                            <p className="font-semibold text-white">{portfolioData.testimonials[currentTestimonial].name}</p>
                            <p className="text-sm text-gray-400">{portfolioData.testimonials[currentTestimonial].position}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex justify-center space-x-4 mt-6">
                    <motion.button
                      onClick={() => setCurrentTestimonial(prev => prev === 0 ? portfolioData.testimonials.length - 1 : prev - 1)}
                      className="p-2 glass-effect rounded-full text-gray-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </motion.button>
                    
                    <div className="flex space-x-2">
                      {portfolioData.testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentTestimonial(index)}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            index === currentTestimonial ? 'bg-primary' : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    
                    <motion.button
                      onClick={() => setCurrentTestimonial(prev => prev === portfolioData.testimonials.length - 1 ? 0 : prev + 1)}
                      className="p-2 glass-effect rounded-full text-gray-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Contact Section */}
            {activeSection === 'contact' && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-3xl font-bold glow-text mb-4">Get In Touch</h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    Ready to work together? Let's discuss your project and bring your ideas to life
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Contact Info */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
                      <div className="space-y-4">
                        {[
                          { icon: Mail, label: 'Email', value: portfolioData.personal.email, href: `mailto:${portfolioData.personal.email}` },
                          { icon: Phone, label: 'Phone', value: portfolioData.personal.phone, href: `tel:${portfolioData.personal.phone}` },
                          { icon: MapPin, label: 'Location', value: portfolioData.personal.location, href: '#' }
                        ].map((contact, index) => (
                          <motion.div
                            key={contact.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="flex items-center space-x-4 p-4 glass-effect rounded-lg hover:shadow-glow transition-all duration-300"
                          >
                            <div className="p-2 bg-primary/20 rounded-lg">
                              <contact.icon className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-400">{contact.label}</p>
                              <p className="text-white font-medium">{contact.value}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Social Links */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Follow Me</h3>
                      <div className="flex space-x-4">
                        {[
                          { icon: Github, href: portfolioData.personal.github, label: 'GitHub' },
                          { icon: Linkedin, href: portfolioData.personal.linkedin, label: 'LinkedIn' },
                          { icon: Twitter, href: '#', label: 'Twitter' },
                          { icon: Instagram, href: '#', label: 'Instagram' }
                        ].map((social, index) => (
                          <motion.a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 glass-effect rounded-full text-gray-400 hover:text-white transition-all duration-300"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            title={social.label}
                          >
                            <social.icon className="w-5 h-5" />
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Contact Form */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass-effect p-6 rounded-xl"
                  >
                    <h3 className="text-xl font-bold text-white mb-6">Send Message</h3>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Your Name"
                          className="px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                        <input
                          type="email"
                          placeholder="Your Email"
                          className="px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Subject"
                        className="w-full px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                      <textarea
                        rows={5}
                        placeholder="Your Message"
                        className="w-full px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      />
                      <motion.button
                        type="submit"
                        className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium text-white shadow-glow hover:shadow-glow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </motion.button>
                    </form>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.main>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="glass-effect rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold glow-text mb-2">{selectedProject.title}</h2>
                  <p className="text-gray-400">{selectedProject.category}</p>
                </div>
                <motion.button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Project Image */}
              <div className="relative h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl mb-6 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Globe className="w-24 h-24 text-primary/50" />
                </div>
                {selectedProject.featured && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium">
                    Featured Project
                  </div>
                )}
              </div>

              {/* Project Details */}
              <div className="space-y-6">
                <p className="text-gray-300 leading-relaxed text-lg">{selectedProject.description}</p>

                {/* Technologies */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.technologies.map((tech: string, index: number) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Stats */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Project Statistics</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(selectedProject.stats).map(([key, value]) => (
                      <div key={key} className="glass-effect p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-primary mb-1">{value}</div>
                        <div className="text-sm text-gray-400 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-6">
                  <motion.a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium text-white shadow-glow hover:shadow-glow-lg transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>View Live</span>
                  </motion.a>
                  <motion.a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 glass-effect rounded-lg font-medium text-white hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Github className="w-5 h-5" />
                    <span>View Code</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
                  </motion.div>

                  <div>
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-4xl font-bold glow-text mb-2"
                    >
                      {portfolioData.personal.name}
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-xl text-gray-400 mb-4"
                    >
                      {portfolioData.personal.title}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-gray-300 max-w-2xl mx-auto leading-relaxed"
                    >
                      {portfolioData.personal.bio}
                    </motion.p>
                  </div>

                  {/* Contact Links */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-center space-x-4"
                  >
                    {[
                      { icon: Mail, href: `mailto:${portfolioData.personal.email}`, label: "Email" },
                      { icon: Github, href: portfolioData.personal.github, label: "GitHub" },
                      { icon: Globe, href: portfolioData.personal.website, label: "Website" }
                    ].map((link, index) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        className="p-3 bg-dark-light/50 rounded-full text-gray-400 hover:text-white hover:bg-primary/20 transition-all duration-300"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        title={link.label}
                      >
                        <link.icon className="w-5 h-5" />
                      </motion.a>
                    ))}
                  </motion.div>
                </div>

                {/* Stats Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="grid grid-cols-2 md:grid-cols-3 gap-6"
                >
                  {[
                    { label: "Projects Completed", value: portfolioData.stats.projectsCompleted, icon: Globe, color: "text-primary" },
                    { label: "Happy Clients", value: portfolioData.stats.happyClients, icon: Heart, color: "text-red-400" },
                    { label: "Years Experience", value: portfolioData.stats.yearsExperience, icon: Award, color: "text-yellow-400" },
                    { label: "Lines of Code", value: "100K+", icon: Code, color: "text-green-400" },
                    { label: "Cups of Coffee", value: "2.5K+", icon: Coffee, color: "text-orange-400" },
                    { label: "GitHub Commits", value: "3K+", icon: Github, color: "text-purple-400" }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="glass-effect p-6 rounded-xl text-center hover:shadow-glow transition-all duration-300"
                      whileHover={{ y: -5, scale: 1.02 }}
                    >
                      <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                      <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Contact Section */}
            {activeSection === 'contact' && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-3xl font-bold glow-text mb-4">Get In Touch</h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    Ready to work together? Let's discuss your project and bring your ideas to life
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Contact Info */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
                      <div className="space-y-4">
                        {[
                          { icon: Mail, label: 'Email', value: portfolioData.personal.email, href: `mailto:${portfolioData.personal.email}` },
                          { icon: Phone, label: 'Phone', value: portfolioData.personal.phone, href: `tel:${portfolioData.personal.phone}` },
                          { icon: MapPin, label: 'Location', value: portfolioData.personal.location, href: '#' }
                        ].map((contact, index) => (
                          <motion.div
                            key={contact.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="flex items-center space-x-4 p-4 glass-effect rounded-lg hover:shadow-glow transition-all duration-300"
                          >
                            <div className="p-2 bg-primary/20 rounded-lg">
                              <contact.icon className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-400">{contact.label}</p>
                              <p className="text-white font-medium">{contact.value}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Social Links */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Follow Me</h3>
                      <div className="flex space-x-4">
                        {[
                          { icon: Github, href: portfolioData.personal.github, label: 'GitHub' },
                          { icon: Linkedin, href: portfolioData.personal.linkedin, label: 'LinkedIn' },
                          { icon: Twitter, href: '#', label: 'Twitter' },
                          { icon: Instagram, href: '#', label: 'Instagram' }
                        ].map((social, index) => (
                          <motion.a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 glass-effect rounded-full text-gray-400 hover:text-white transition-all duration-300"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            title={social.label}
                          >
                            <social.icon className="w-5 h-5" />
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Contact Form */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass-effect p-6 rounded-xl"
                  >
                    <h3 className="text-xl font-bold text-white mb-6">Send Message</h3>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Your Name"
                          className="px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                        <input
                          type="email"
                          placeholder="Your Email"
                          className="px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Subject"
                        className="w-full px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                      <textarea
                        rows={5}
                        placeholder="Your Message"
                        className="w-full px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      />
                      <motion.button
                        type="submit"
                        className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium text-white shadow-glow hover:shadow-glow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </motion.button>
                    </form>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.main>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="glass-effect rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold glow-text mb-2">{selectedProject.title}</h2>
                  <p className="text-gray-400">{selectedProject.category}</p>
                </div>
                <motion.button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Project Image */}
              <div className="relative h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl mb-6 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Globe className="w-24 h-24 text-primary/50" />
                </div>
                {selectedProject.featured && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium">
                    Featured Project
                  </div>
                )}
              </div>

              {/* Project Details */}
              <div className="space-y-6">
                <p className="text-gray-300 leading-relaxed text-lg">{selectedProject.description}</p>

                {/* Technologies */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.technologies.map((tech: string, index: number) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Stats */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Project Statistics</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(selectedProject.stats).map(([key, value]) => (
                      <div key={key} className="glass-effect p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-primary mb-1">{value}</div>
                        <div className="text-sm text-gray-400 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-6">
                  <motion.a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium text-white shadow-glow hover:shadow-glow-lg transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>View Live</span>
                  </motion.a>
                  <motion.a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 glass-effect rounded-lg font-medium text-white hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Github className="w-5 h-5" />
                    <span>View Code</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
} Ventures",
      position: "Junior Developer",
      period: "2019 - 2020",
      description: "Started career building MVPs and prototypes for early-stage startups, gaining experience in rapid development cycles.",
      achievements: [
        "Built 5 MVP applications",
        "Learned 8 new technologies",
        "Contributed to 3 successful launches"
      ]
    }
  ],

  testimonials: [
    {
      name: "Sarah Johnson",
      position: "CEO, Tech Solutions Inc.",
      content: "Rama is an exceptional developer who consistently delivers high-quality work. His attention to detail and innovative solutions have been invaluable to our team.",
      avatar: "/images/testimonials/sarah.jpg",
      rating: 5
    },
    {
      name: "Mike Chen",
      position: "Product Manager, Digital Agency Co.",
      content: "Working with Rama was a pleasure. He understood our requirements perfectly and delivered a solution that exceeded our expectations.",
      avatar: "/images/testimonials/mike.jpg",
      rating: 5
    },
    {
      name: "Lisa Rodriguez",
      position: "UX Designer, Startup Ventures",
      content: "Rama's ability to bridge the gap between design and development is remarkable. He brings designs to life with pixel-perfect precision.",
      avatar: "/images/testimonials/lisa.jpg",
      rating: 5
    }
  ],

  stats: {
    projectsCompleted: 50,
    happyClients: 35,
    yearsExperience: 5,
    linesOfCode: 100000,
    coffeeConsumed: 2500,
    githubCommits: 3000
  }
}

interface PortfolioProps {
  onClose: () => void
}

export default function Portfolio({ onClose }: PortfolioProps) {
  const [activeSection, setActiveSection] = useState('about')
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const sections = [
    { id: 'about', name: 'About', icon: User },
    { id: 'skills', name: 'Skills', icon: Code },
    { id: 'projects', name: 'Projects', icon: Globe },
    { id: 'experience', name: 'Experience', icon: Award },
    { id: 'testimonials', name: 'Testimonials', icon: Star },
    { id: 'contact', name: 'Contact', icon: Mail }
  ]

  const featuredProjects = portfolioData.projects.filter(p => p.featured)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse" 
             style={{ animationDelay: '1s' }} />
        
        {/* Cursor follower */}
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x - 192,
            y: mousePosition.y - 192,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="relative z-10 p-6 flex justify-between items-center glass-effect"
      >
        <motion.h1 
          className="text-2xl font-bold glow-text"
          whileHover={{ scale: 1.05 }}
        >
          Portfolio - {portfolioData.personal.name}
        </motion.h1>
        
        <motion.button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-white transition-colors"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-6 h-6" />
        </motion.button>
      </motion.header>

      <div className="flex h-full">
        {/* Sidebar Navigation */}
        <motion.nav
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="w-64 p-6 glass-effect m-4 mr-0 rounded-l-2xl"
        >
          <div className="space-y-2">
            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-glow'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 10 }}
              >
                <section.icon className="w-5 h-5" />
                <span className="font-medium">{section.name}</span>
              </motion.button>
            ))}
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 p-4 bg-dark-light/50 rounded-lg"
          >
            <h3 className="text-sm font-semibold text-gray-400 mb-3">Quick Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Projects</span>
                <span className="text-primary font-semibold">{portfolioData.stats.projectsCompleted}+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Clients</span>
                <span className="text-green-400 font-semibold">{portfolioData.stats.happyClients}+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Experience</span>
                <span className="text-yellow-400 font-semibold">{portfolioData.stats.yearsExperience} years</span>
              </div>
            </div>
          </motion.div>
        </motion.nav>

        {/* Main Content */}
        <motion.main
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 p-6 overflow-y-auto custom-scrollbar"
        >
          <AnimatePresence mode="wait">
            {/* About Section */}
            {activeSection === 'about' && (
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Hero Section */}
                <div className="text-center space-y-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="relative mx-auto w-32 h-32"
                  >
                    <div className="w-full h-full rounded-full bg-gradient-to-r from-primary to-secondary p-1">
                      <div className="w-full h-full rounded-full bg-dark-light flex items-center justify-center">
                        <User className="w-16 h-16 text-primary" />
                      </div>
                    </div>
                    <motion.div
                      className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <span className="text-xs font-bold">👋</span>
                    </motion.div>
                  </motion.div>

                  <div>
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-4xl font-bold glow-text mb-2"
                    >
                      {portfolioData.personal.name}
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-xl text-gray-400 mb-4"
                    >
                      {portfolioData.personal.title}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-gray-300 max-w-2xl mx-auto leading-relaxed"
                    >
                      {portfolioData.personal.bio}
                    </motion.p>
                  </div>

                  {/* Contact Links */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-center space-x-4"
                  >
                    {[
                      { icon: Mail, href: `mailto:${portfolioData.personal.email}`, label: "Email" },
                      { icon: Github, href: portfolioData.personal.github, label: "GitHub" },
                      { icon: Globe, href: portfolioData.personal.website, label: "Website" }
                    ].map((link, index) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        className="p-3 bg-dark-light/50 rounded-full text-gray-400 hover:text-white hover:bg-primary/20 transition-all duration-300"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        title={link.label}
                      >
                        <link.icon className="w-5 h-5" />
                      </motion.a>
                    ))}
                  </motion.div>
                </div>

                {/* Stats Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="grid grid-cols-2 md:grid-cols-3 gap-6"
                >
                  {[
                    { label: "Projects Completed", value: portfolioData.stats.projectsCompleted, icon: Globe, color: "text-primary" },
                    { label: "Happy Clients", value: portfolioData.stats.happyClients, icon: Heart, color: "text-red-400" },
                    { label: "Years Experience", value: portfolioData.stats.yearsExperience, icon: Award, color: "text-yellow-400" },
                    { label: "Lines of Code", value: "100K+", icon: Code, color: "text-green-400" },
                    { label: "Cups of Coffee", value: "2.5K+", icon: Coffee, color: "text-orange-400" },
                    { label: "GitHub Commits", value: "3K+", icon: Github, color: "text-purple-400" }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="glass-effect p-6 rounded-xl text-center hover:shadow-glow transition-all duration-300"
                      whileHover={{ y: -5, scale: 1.02 }}
                    >
                      <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                      <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Skills Section */}
            {activeSection === 'skills' && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-3xl font-bold glow-text mb-4">Work Experience</h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    My professional journey and the experiences that shaped my skills
                  </p>
                </div>

                <div className="space-y-6">
                  {portfolioData.experience.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="glass-effect p-6 rounded-xl hover:shadow-glow transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-primary/20 rounded-lg">
                          <Building2 className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                            <h3 className="text-xl font-bold text-white">{exp.position}</h3>
                            <span className="text-sm text-primary font-medium">{exp.period}</span>
                          </div>
                          <p className="text-gray-400 font-medium mb-3">{exp.company}</p>
                          <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>
                          
                          {/* Achievements */}
                          <div>
                            <h4 className="text-sm font-semibold text-white mb-2">Key Achievements:</h4>
                            <ul className="space-y-1">
                              {exp.achievements.map((achievement, i) => (
                                <li key={i} className="text-sm text-gray-300 flex items-start space-x-2">
                                  <span className="text-green-400 mt-1">✓</span>
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Testimonials Section */}
            {activeSection === 'testimonials' && (
              <motion.div
                key="testimonials"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-3xl font-bold glow-text mb-4">Client Testimonials</h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    What clients and colleagues say about working with me
                  </p>
                </div>

                <div className="relative">
                  {/* Testimonial Carousel */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTestimonial}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="glass-effect p-8 rounded-xl text-center max-w-4xl mx-auto"
                    >
                      <div className="mb-6">
                        {/* Stars */}
                        <div className="flex justify-center space-x-1 mb-4">
                          {[...Array(portfolioData.testimonials[currentTestimonial].rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        
                        <blockquote className="text-lg text-gray-300 leading-relaxed mb-6 italic">
                          "{portfolioData.testimonials[currentTestimonial].content}"
                        </blockquote>
                        
                        <div className="flex items-center justify-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-left">
                            <p className="font-semibold text-white">{portfolioData.testimonials[currentTestimonial].name}</p>
                            <p className="text-sm text-gray-400">{portfolioData.testimonials[currentTestimonial].position}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex justify-center space-x-4 mt-6">
                    <motion.button
                      onClick={() => setCurrentTestimonial(prev => prev === 0 ? portfolioData.testimonials.length - 1 : prev - 1)}
                      className="p-2 glass-effect rounded-full text-gray-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </motion.button>
                    
                    <div className="flex space-x-2">
                      {portfolioData.testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentTestimonial(index)}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            index === currentTestimonial ? 'bg-primary' : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    
                    <motion.button
                      onClick={() => setCurrentTestimonial(prev => prev === portfolioData.testimonials.length - 1 ? 0 : prev + 1)}
                      className="p-2 glass-effect rounded-full text-gray-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Contact Section */}
            {activeSection === 'contact' && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-3xl font-bold glow-text mb-4">Get In Touch</h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    Ready to work together? Let's discuss your project and bring your ideas to life
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Contact Info */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
                      <div className="space-y-4">
                        {[
                          { icon: Mail, label: 'Email', value: portfolioData.personal.email, href: `mailto:${portfolioData.personal.email}` },
                          { icon: Phone, label: 'Phone', value: portfolioData.personal.phone, href: `tel:${portfolioData.personal.phone}` },
                          { icon: MapPin, label: 'Location', value: portfolioData.personal.location, href: '#' }
                        ].map((contact, index) => (
                          <motion.div
                            key={contact.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="flex items-center space-x-4 p-4 glass-effect rounded-lg hover:shadow-glow transition-all duration-300"
                          >
                            <div className="p-2 bg-primary/20 rounded-lg">
                              <contact.icon className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-400">{contact.label}</p>
                              <p className="text-white font-medium">{contact.value}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Social Links */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Follow Me</h3>
                      <div className="flex space-x-4">
                        {[
                          { icon: Github, href: portfolioData.personal.github, label: 'GitHub' },
                          { icon: Linkedin, href: portfolioData.personal.linkedin, label: 'LinkedIn' },
                          { icon: Twitter, href: '#', label: 'Twitter' },
                          { icon: Instagram, href: '#', label: 'Instagram' }
                        ].map((social, index) => (
                          <motion.a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 glass-effect rounded-full text-gray-400 hover:text-white transition-all duration-300"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            title={social.label}
                          >
                            <social.icon className="w-5 h-5" />
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Contact Form */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass-effect p-6 rounded-xl"
                  >
                    <h3 className="text-xl font-bold text-white mb-6">Send Message</h3>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Your Name"
                          className="px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                        <input
                          type="email"
                          placeholder="Your Email"
                          className="px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Subject"
                        className="w-full px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                      <textarea
                        rows={5}
                        placeholder="Your Message"
                        className="w-full px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      />
                      <motion.button
                        type="submit"
                        className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium text-white shadow-glow hover:shadow-glow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </motion.button>
                    </form>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.main>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="glass-effect rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold glow-text mb-2">{selectedProject.title}</h2>
                  <p className="text-gray-400">{selectedProject.category}</p>
                </div>
                <motion.button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Project Image */}
              <div className="relative h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl mb-6 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Globe className="w-24 h-24 text-primary/50" />
                </div>
                {selectedProject.featured && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium">
                    Featured Project
                  </div>
                )}
              </div>

              {/* Project Details */}
              <div className="space-y-6">
                <p className="text-gray-300 leading-relaxed text-lg">{selectedProject.description}</p>

                {/* Technologies */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.technologies.map((tech: string, index: number) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Stats */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Project Statistics</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(selectedProject.stats).map(([key, value]) => (
                      <div key={key} className="glass-effect p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-primary mb-1">{value}</div>
                        <div className="text-sm text-gray-400 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-6">
                  <motion.a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium text-white shadow-glow hover:shadow-glow-lg transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>View Live</span>
                  </motion.a>
                  <motion.a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 glass-effect rounded-lg font-medium text-white hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Github className="w-5 h-5" />
                    <span>View Code</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
                    My professional journey and the experiences that shaped my skills
                  </p>
                </div>

                <div className="space-y-6">
                  {portfolioData.experience.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="glass-effect p-6 rounded-xl hover:shadow-glow transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-primary/20 rounded-lg">
                          <Building2 className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                            <h3 className="text-xl font-bold text-white">{exp.position}</h3>
                            <span className="text-sm text-primary font-medium">{exp.period}</span>
                          </div>
                          <p className="text-gray-400 font-medium mb-3">{exp.company}</p>
                          <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>
                          
                          {/* Achievements */}
                          <div>
                            <h4 className="text-sm font-semibold text-white mb-2">Key Achievements:</h4>
                            <ul className="space-y-1">
                              {exp.achievements.map((achievement, i) => (
                                <li key={i} className="text-sm text-gray-300 flex items-start space-x-2">
                                  <span className="text-green-400 mt-1">✓</span>
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Testimonials Section */}
            {activeSection === 'testimonials' && (
              <motion.div
                key="testimonials"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-3xl font-bold glow-text mb-4">Client Testimonials</h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    What clients and colleagues say about working with me
                  </p>
                </div>

                <div className="relative">
                  {/* Testimonial Carousel */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTestimonial}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="glass-effect p-8 rounded-xl text-center max-w-4xl mx-auto"
                    >
                      <div className="mb-6">
                        {/* Stars */}
                        <div className="flex justify-center space-x-1 mb-4">
                          {[...Array(portfolioData.testimonials[currentTestimonial].rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        
                        <blockquote className="text-lg text-gray-300 leading-relaxed mb-6 italic">
                          "{portfolioData.testimonials[currentTestimonial].content}"
                        </blockquote>
                        
                        <div className="flex items-center justify-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-left">
                            <p className="font-semibold text-white">{portfolioData.testimonials[currentTestimonial].name}</p>
                            <p className="text-sm text-gray-400">{portfolioData.testimonials[currentTestimonial].position}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex justify-center space-x-4 mt-6">
                    <motion.button
                      onClick={() => setCurrentTestimonial(prev => prev === 0 ? portfolioData.testimonials.length - 1 : prev - 1)}
                      className="p-2 glass-effect rounded-full text-gray-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </motion.button>
                    
                    <div className="flex space-x-2">
                      {portfolioData.testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentTestimonial(index)}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            index === currentTestimonial ? 'bg-primary' : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    
                    <motion.button
                      onClick={() => setCurrentTestimonial(prev => prev === portfolioData.testimonials.length - 1 ? 0 : prev + 1)}
                      className="p-2 glass-effect rounded-full text-gray-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Contact Section */}
            {activeSection === 'contact' && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-3xl font-bold glow-text mb-4">Get In Touch</h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    Ready to work together? Let's discuss your project and bring your ideas to life
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Contact Info */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
                      <div className="space-y-4">
                        {[
                          { icon: Mail, label: 'Email', value: portfolioData.personal.email, href: `mailto:${portfolioData.personal.email}` },
                          { icon: Phone, label: 'Phone', value: portfolioData.personal.phone, href: `tel:${portfolioData.personal.phone}` },
                          { icon: MapPin, label: 'Location', value: portfolioData.personal.location, href: '#' }
                        ].map((contact, index) => (
                          <motion.div
                            key={contact.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="flex items-center space-x-4 p-4 glass-effect rounded-lg hover:shadow-glow transition-all duration-300"
                          >
                            <div className="p-2 bg-primary/20 rounded-lg">
                              <contact.icon className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-400">{contact.label}</p>
                              <p className="text-white font-medium">{contact.value}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Social Links */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Follow Me</h3>
                      <div className="flex space-x-4">
                        {[
                          { icon: Github, href: portfolioData.personal.github, label: 'GitHub' },
                          { icon: Linkedin, href: portfolioData.personal.linkedin, label: 'LinkedIn' },
                          { icon: Twitter, href: '#', label: 'Twitter' },
                          { icon: Instagram, href: '#', label: 'Instagram' }
                        ].map((social, index) => (
                          <motion.a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 glass-effect rounded-full text-gray-400 hover:text-white transition-all duration-300"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            title={social.label}
                          >
                            <social.icon className="w-5 h-5" />
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Contact Form */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass-effect p-6 rounded-xl"
                  >
                    <h3 className="text-xl font-bold text-white mb-6">Send Message</h3>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Your Name"
                          className="px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                        <input
                          type="email"
                          placeholder="Your Email"
                          className="px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Subject"
                        className="w-full px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                      <textarea
                        rows={5}
                        placeholder="Your Message"
                        className="w-full px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      />
                      <motion.button
                        type="submit"
                        className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium text-white shadow-glow hover:shadow-glow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </motion.button>
                    </form>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.main>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="glass-effect rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold glow-text mb-2">{selectedProject.title}</h2>
                  <p className="text-gray-400">{selectedProject.category}</p>
                </div>
                <motion.button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Project Image */}
              <div className="relative h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl mb-6 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Globe className="w-24 h-24 text-primary/50" />
                </div>
                {selectedProject.featured && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium">
                    Featured Project
                  </div>
                )}
              </div>

              {/* Project Details */}
              <div className="space-y-6">
                <p className="text-gray-300 leading-relaxed text-lg">{selectedProject.description}</p>

                {/* Technologies */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.technologies.map((tech: string, index: number) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Stats */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Project Statistics</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(selectedProject.stats).map(([key, value]) => (
                      <div key={key} className="glass-effect p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-primary mb-1">{value}</div>
                        <div className="text-sm text-gray-400 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-6">
                  <motion.a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium text-white shadow-glow hover:shadow-glow-lg transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>View Live</span>
                  </motion.a>
                  <motion.a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 glass-effect rounded-lg font-medium text-white hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Github className="w-5 h-5" />
                    <span>View Code</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
                            <span className="text-sm text-primary font-medium">{exp.period}</span>
                          </div>
                          <p className="text-gray-400 font-medium mb-3">{exp.company}</p>
                          <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>
                          
                          {/* Achievements */}
                          <div>
                            <h4 className="text-sm font-semibold text-white mb-2">Key Achievements:</h4>
                            <ul className="space-y-1">
                              {exp.achievements.map((achievement, i) => (
                                <li key={i} className="text-sm text-gray-300 flex items-start space-x-2">
                                  <span className="text-green-400 mt-1">✓</span>
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Testimonials Section */}
            {activeSection === 'testimonials' && (
              <motion.div
                key="testimonials"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-3xl font-bold glow-text mb-4">Client Testimonials</h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    What clients and colleagues say about working with me
                  </p>
                </div>

                <div className="relative">
                  {/* Testimonial Carousel */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTestimonial}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="glass-effect p-8 rounded-xl text-center max-w-4xl mx-auto"
                    >
                      <div className="mb-6">
                        {/* Stars */}
                        <div className="flex justify-center space-x-1 mb-4">
                          {[...Array(portfolioData.testimonials[currentTestimonial].rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        
                        <blockquote className="text-lg text-gray-300 leading-relaxed mb-6 italic">
                          "{portfolioData.testimonials[currentTestimonial].content}"
                        </blockquote>
                        
                        <div className="flex items-center justify-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-left">
                            <p className="font-semibold text-white">{portfolioData.testimonials[currentTestimonial].name}</p>
                            <p className="text-sm text-gray-400">{portfolioData.testimonials[currentTestimonial].position}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex justify-center space-x-4 mt-6">
                    <motion.button
                      onClick={() => setCurrentTestimonial(prev => prev === 0 ? portfolioData.testimonials.length - 1 : prev - 1)}
                      className="p-2 glass-effect rounded-full text-gray-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </motion.button>
                    
                    <div className="flex space-x-2">
                      {portfolioData.testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentTestimonial(index)}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            index === currentTestimonial ? 'bg-primary' : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    
                    <motion.button
                      onClick={() => setCurrentTestimonial(prev => prev === portfolioData.testimonials.length - 1 ? 0 : prev + 1)}
                      className="p-2 glass-effect rounded-full text-gray-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Contact Section */}
            {activeSection === 'contact' && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-3xl font-bold glow-text mb-4">Get In Touch</h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    Ready to work together? Let's discuss your project and bring your ideas to life
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Contact Info */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
                      <div className="space-y-4">
                        {[
                          { icon: Mail, label: 'Email', value: portfolioData.personal.email, href: `mailto:${portfolioData.personal.email}` },
                          { icon: Phone, label: 'Phone', value: portfolioData.personal.phone, href: `tel:${portfolioData.personal.phone}` },
                          { icon: MapPin, label: 'Location', value: portfolioData.personal.location, href: '#' }
                        ].map((contact, index) => (
                          <motion.div
                            key={contact.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="flex items-center space-x-4 p-4 glass-effect rounded-lg hover:shadow-glow transition-all duration-300"
                          >
                            <div className="p-2 bg-primary/20 rounded-lg">
                              <contact.icon className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-400">{contact.label}</p>
                              <p className="text-white font-medium">{contact.value}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Social Links */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Follow Me</h3>
                      <div className="flex space-x-4">
                        {[
                          { icon: Github, href: portfolioData.personal.github, label: 'GitHub' },
                          { icon: Linkedin, href: portfolioData.personal.linkedin, label: 'LinkedIn' },
                          { icon: Twitter, href: '#', label: 'Twitter' },
                          { icon: Instagram, href: '#', label: 'Instagram' }
                        ].map((social, index) => (
                          <motion.a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 glass-effect rounded-full text-gray-400 hover:text-white transition-all duration-300"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            title={social.label}
                          >
                            <social.icon className="w-5 h-5" />
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Contact Form */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass-effect p-6 rounded-xl"
                  >
                    <h3 className="text-xl font-bold text-white mb-6">Send Message</h3>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Your Name"
                          className="px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                        <input
                          type="email"
                          placeholder="Your Email"
                          className="px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Subject"
                        className="w-full px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                      <textarea
                        rows={5}
                        placeholder="Your Message"
                        className="w-full px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      />
                      <motion.button
                        type="submit"
                        className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium text-white shadow-glow hover:shadow-glow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </motion.button>
                    </form>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.main>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="glass-effect rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold glow-text mb-2">{selectedProject.title}</h2>
                  <p className="text-gray-400">{selectedProject.category}</p>
                </div>
                <motion.button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Project Image */}
              <div className="relative h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl mb-6 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Globe className="w-24 h-24 text-primary/50" />
                </div>
                {selectedProject.featured && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium">
                    Featured Project
                  </div>
                )}
              </div>

              {/* Project Details */}
              <div className="space-y-6">
                <p className="text-gray-300 leading-relaxed text-lg">{selectedProject.description}</p>

                {/* Technologies */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.technologies.map((tech: string, index: number) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Stats */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Project Statistics</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(selectedProject.stats).map(([key, value]) => (
                      <div key={key} className="glass-effect p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-primary mb-1">{value}</div>
                        <div className="text-sm text-gray-400 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-6">
                  <motion.a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium text-white shadow-glow hover:shadow-glow-lg transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>View Live</span>
                  </motion.a>
                  <motion.a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 glass-effect rounded-lg font-medium text-white hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Github className="w-5 h-5" />
                    <span>View Code</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

                <div className="space-y-6">
                  {portfolioData.experience.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="glass-effect p-6 rounded-xl hover:shadow-glow transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-primary/20 rounded-lg">
                          <Building2 className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                            <h3 className="text-xl font-bold text-white">{exp.position}</h3>
                            <span className="text-sm text-primary font-medium">{exp.period}</span>
                          </div>
                          <p className="text-gray-400 font-medium mb-3">{exp.company}</p>
                          <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>
                          
                          {/* Achievements */}
                          <div>
                            <h4 className="text-sm font-semibold text-white mb-2">Key Achievements:</h4>
                            <ul className="space-y-1">
                              {exp.achievements.map((achievement, i) => (
                                <li key={i} className="text-sm text-gray-300 flex items-start space-x-2">
                                  <span className="text-green-400 mt-1">✓</span>
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Testimonials Section */}
            {activeSection === 'testimonials' && (
              <motion.div
                key="testimonials"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-3xl font-bold glow-text mb-4">Client Testimonials</h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    What clients and colleagues say about working with me
                  </p>
                </div>

                <div className="relative">
                  {/* Testimonial Carousel */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTestimonial}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="glass-effect p-8 rounded-xl text-center max-w-4xl mx-auto"
                    >
                      <div className="mb-6">
                        {/* Stars */}
                        <div className="flex justify-center space-x-1 mb-4">
                          {[...Array(portfolioData.testimonials[currentTestimonial].rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        
                        <blockquote className="text-lg text-gray-300 leading-relaxed mb-6 italic">
                          "{portfolioData.testimonials[currentTestimonial].content}"
                        </blockquote>
                        
                        <div className="flex items-center justify-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-left">
                            <p className="font-semibold text-white">{portfolioData.testimonials[currentTestimonial].name}</p>
                            <p className="text-sm text-gray-400">{portfolioData.testimonials[currentTestimonial].position}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex justify-center space-x-4 mt-6">
                    <motion.button
                      onClick={() => setCurrentTestimonial(prev => prev === 0 ? portfolioData.testimonials.length - 1 : prev - 1)}
                      className="p-2 glass-effect rounded-full text-gray-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </motion.button>
                    
                    <div className="flex space-x-2">
                      {portfolioData.testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentTestimonial(index)}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            index === currentTestimonial ? 'bg-primary' : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    
                    <motion.button
                      onClick={() => setCurrentTestimonial(prev => prev === portfolioData.testimonials.length - 1 ? 0 : prev + 1)}
                      className="p-2 glass-effect rounded-full text-gray-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Contact Section */}
            {activeSection === 'contact' && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-3xl font-bold glow-text mb-4">Get In Touch</h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    Ready to work together? Let's discuss your project and bring your ideas to life
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Contact Info */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
                      <div className="space-y-4">
                        {[
                          { icon: Mail, label: 'Email', value: portfolioData.personal.email, href: `mailto:${portfolioData.personal.email}` },
                          { icon: Phone, label: 'Phone', value: portfolioData.personal.phone, href: `tel:${portfolioData.personal.phone}` },
                          { icon: MapPinIcon, label: 'Location', value: portfolioData.personal.location, href: '#' }
                        ].map((contact, index) => (
                          <motion.div
                            key={contact.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="flex items-center space-x-4 p-4 glass-effect rounded-lg hover:shadow-glow transition-all duration-300"
                          >
                            <div className="p-2 bg-primary/20 rounded-lg">
                              <contact.icon className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-400">{contact.label}</p>
                              <p className="text-white font-medium">{contact.value}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Social Links */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Follow Me</h3>
                      <div className="flex space-x-4">
                        {[
                          { icon: Github, href: portfolioData.personal.github, label: 'GitHub' },
                          { icon: Linkedin, href: portfolioData.personal.linkedin, label: 'LinkedIn' },
                          { icon: Twitter, href: '#', label: 'Twitter' },
                          { icon: Instagram, href: '#', label: 'Instagram' }
                        ].map((social, index) => (
                          <motion.a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 glass-effect rounded-full text-gray-400 hover:text-white transition-all duration-300"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            title={social.label}
                          >
                            <social.icon className="w-5 h-5" />
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Contact Form */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass-effect p-6 rounded-xl"
                  >
                    <h3 className="text-xl font-bold text-white mb-6">Send Message</h3>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Your Name"
                          className="px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                        <input
                          type="email"
                          placeholder="Your Email"
                          className="px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Subject"
                        className="w-full px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                      <textarea
                        rows={5}
                        placeholder="Your Message"
                        className="w-full px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      />
                      <motion.button
                        type="submit"
                        className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium text-white shadow-glow hover:shadow-glow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </motion.button>
                    </form>
                  </motion.div>
                </div>
              </motion.div>
            )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {portfolioData.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                    className="glass-effect p-6 rounded-xl"
                  >
                    <h3 className="text-xl font-bold text-white mb-6">Send Message</h3>
                    <form className="space-y-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Your Name"
                          className="w-full px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          placeholder="Your Email"
                          className="w-full px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Subject"
                          className="w-full px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                      <div>
                        <textarea
                          rows={5}
                          placeholder="Your Message"
                          className="w-full px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                        />
                      </div>
                      <motion.button
                        type="submit"
                        className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium text-white shadow-glow hover:shadow-glow-lg transition-all duration-300"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Send Message
                      </motion.button>
                    </form>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.main>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="glass-effect rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold glow-text mb-2">{selectedProject.title}</h2>
                  <p className="text-gray-400">{selectedProject.category}</p>
                </div>
                <motion.button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Project Image */}
              <div className="relative h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl mb-6 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Globe className="w-24 h-24 text-primary/50" />
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-6">
                <p className="text-gray-300 leading-relaxed text-lg">{selectedProject.description}</p>

                {/* Technologies */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.technologies.map((tech: string, index: number) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Stats */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Project Statistics</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(selectedProject.stats).map(([key, value]) => (
                      <div key={key} className="glass-effect p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-primary mb-1">{value}</div>
                        <div className="text-sm text-gray-400 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-6">
                  <motion.a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium text-white shadow-glow hover:shadow-glow-lg transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>View Live</span>
                  </motion.a>
                  <motion.a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 glass-effect rounded-lg font-medium text-white hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Github className="w-5 h-5" />
                    <span>View Code</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
                      transition={{ delay: index * 0.1 }}
                      className="glass-effect p-6 rounded-xl hover:shadow-glow transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="p-2 rounded-lg"
                            style={{ backgroundColor: `${skill.color}20` }}
                          >
                            <skill.icon className="w-6 h-6" style={{ color: skill.color }} />
                          </div>
                          <span className="font-semibold text-white">{skill.name}</span>
                        </div>
                        <span className="text-sm font-bold" style={{ color: skill.color }}>
                          {skill.level}%
                        </span>
                      </div>
                      
                      <div className="relative">
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ delay: index * 0.1 + 0.5, duration: 1, ease: "easeOut" }}
                            className="h-2 rounded-full"
                            style={{ backgroundColor: skill.color }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Continue with other sections... */}
          </AnimatePresence>
        </motion.main>
      </div>
    </motion.div>
  )
}
