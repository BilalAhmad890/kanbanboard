import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { footerLinks } from '@/lib/Constant.ts';

export function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
      },
    },
  };

  return (
    <footer className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="relative z-10 py-16 px-4">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {Object.entries(footerLinks).map(([category, links]) => (
              <motion.div key={category} variants={itemVariants}>
                <h3 className="font-semibold text-lg mb-6">{category}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <Separator className="my-12 opacity-50" />
          <motion.div
            variants={itemVariants}
            className="text-center text-sm text-muted-foreground"
          >
            © 2024 Kanban Board. All rights reserved.
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}