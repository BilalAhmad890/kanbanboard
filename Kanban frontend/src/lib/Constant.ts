
import { KanbanSquare, Users, LineChart, Zap } from 'lucide-react';

export const footerLinks = {
    Product: ['Features', 'Pricing', 'Roadmap', 'Updates'],
    Company: ['About', 'Blog', 'Careers', 'Contact'],
    Resources: ['Documentation', 'Help Center', 'API', 'Status'],
    Legal: ['Privacy', 'Terms', 'Security', 'Cookies'],
  };


  export const features = [
    {
      title: 'Organize Projects',
      description: 'Create and manage tasks with our intuitive drag-and-drop interface',
      icon: KanbanSquare,
      gradient: 'from-primary to-secondary',
    },
    {
      title: 'Team Collaboration',
      description: 'Work together seamlessly with real-time updates and sharing',
      icon: Users,
      gradient: 'from-secondary to-primary',
    },
    {
      title: 'Track Progress',
      description: 'Monitor project advancement with visual progress tracking',
      icon: LineChart,
      gradient: 'from-primary to-secondary',
    },
    {
      title: 'Boost Productivity',
      description: 'Streamline your workflow with automated task management',
      icon: Zap,
      gradient: 'from-secondary to-primary',
    },
  ];


  export const testimonials = [
    {
      text: "This Kanban board has transformed how our team manages projects. It's intuitive and powerful!",
      author: "Sarah Johnson",
      role: "Product Manager",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    },
    {
      text: "The best project management tool we've used. The interface is clean and the features are exactly what we need.",
      author: "Michael Chen",
      role: "Tech Lead",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    },
    {
      text: "Incredible tool for keeping our remote team organized and on track. Highly recommended!",
      author: "Emily Rodriguez",
      role: "Team Lead",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    },
  ];