import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Quote } from 'lucide-react';

const testimonials = [
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

export function TestimonialSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          What Our{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Users
          </span>{' '}
          Say
        </h2>
        <div className="relative h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute w-full"
            >
              <Card className="glass border-0 shadow-xl">
                <CardContent className="pt-12 pb-8 px-8">
                  <div className="text-center space-y-8">
                    <Quote className="w-12 h-12 mx-auto text-primary opacity-50" />
                    <p className="text-2xl md:text-3xl font-medium leading-relaxed text-foreground">
                      "{testimonials[current].text}"
                    </p>
                    <div className="flex flex-col items-center gap-3 pt-4">
                      <Avatar className="w-20 h-20 ring-4 ring-primary/20">
                        <AvatarImage src={testimonials[current].avatar} alt={testimonials[current].author} />
                        <AvatarFallback>{testimonials[current].author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="text-center">
                        <p className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                          {testimonials[current].author}
                        </p>
                        <p className="text-muted-foreground">{testimonials[current].role}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}