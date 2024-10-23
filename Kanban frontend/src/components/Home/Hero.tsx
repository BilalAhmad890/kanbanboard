import { motion, useScroll, useSpring } from "framer-motion";
import { KanbanSquare, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const isAuthenticated = true;

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren",
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
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const buttonHoverVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <motion.div className="progress-bar" style={{ scaleX }} />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 -left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl" />
          </div>

          <motion.div
            className="max-w-3xl w-full text-center space-y-8 relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <motion.div
                className="flex justify-center mb-6 relative"
                variants={itemVariants}
              >
                <motion.div
                  className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <KanbanSquare className="w-20 h-20 text-primary relative animate-float" />
              </motion.div>

              <div className="relative">
                <motion.h1
                  className="text-5xl md:text-7xl font-bold"
                  variants={itemVariants}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary">
                    Organize Your Tasks
                  </span>
                  <br />
                  <span className="text-foreground">Effortlessly</span>
                </motion.h1>
                <motion.div
                  className="absolute -top-6 -right-6 text-primary"
                  animate={{
                    rotate: [0, 15, -15, 0],
                    scale: [1, 1.1, 0.9, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="w-12 h-12" />
                </motion.div>
              </div>

              <motion.p
                className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                variants={itemVariants}
              >
                Transform your workflow with our intuitive Kanban board.
                Visualize progress, manage tasks, and boost productivity.
              </motion.p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={itemVariants}
            >
              <motion.div variants={buttonHoverVariants} whileHover="hover">
                <Button
                  size="lg"
                  className="text-lg px-10 py-7 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity rounded-2xl shadow-lg shadow-primary/25"
                  onClick={() => {
                    if (isAuthenticated) {
                      console.log("Navigate to board");
                    } else {
                      console.log("Open sign in");
                    }
                  }}
                >
                  {isAuthenticated ? "Go to Kanban Board" : "Sign In"}
                </Button>
              </motion.div>

              <motion.div variants={buttonHoverVariants} whileHover="hover">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-10 py-7 rounded-2xl border-2 border-muted glass hover:bg-muted/20 transition-colors"
                  onClick={() => {
                    console.log("Navigate to features");
                  }}
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="pt-12 text-base text-muted-foreground font-medium"
            >
              Join thousands of teams already using our Kanban board
            </motion.div>
          </motion.div>
        </main>
      </div>
    </>
  );
}
