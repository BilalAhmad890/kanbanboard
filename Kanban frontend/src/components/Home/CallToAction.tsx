import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function CallToAction() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="py-32 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <motion.div
        className="max-w-4xl mx-auto text-center space-y-8 relative"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={itemVariants} className="relative inline-block">
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to Transform Your{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Workflow
            </span>
            ?
          </h2>
          <motion.div
            className="absolute -top-8 -right-8"
            animate={{
              rotate: [0, 15, -15, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Sparkles className="w-12 h-12 text-primary" />
          </motion.div>
        </motion.div>

        <motion.p
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Join thousands of teams who have already improved their productivity
        </motion.p>

        <motion.div variants={itemVariants}>
          <Button
            size="lg"
            className="text-lg px-10 py-7 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity rounded-2xl shadow-lg shadow-primary/25 group"
          >
            Get Started Now
            <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}