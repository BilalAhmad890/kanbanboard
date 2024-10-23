import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { features } from '@/lib/Constant.ts';


export function FeatureGrid() {
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
      <div className="absolute inset-0 bg-muted/30 -skew-y-3 transform-gpu" />
      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16"
          variants={itemVariants}
        >
          Features that{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Empower
          </span>{' '}
          Your Workflow
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="glass border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center gap-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${feature.gradient}`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl mb-3">{feature.title}</CardTitle>
                      <CardDescription className="text-base">{feature.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}