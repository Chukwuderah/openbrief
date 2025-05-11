"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Clock, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const features = [
  {
    icon: FileText,
    title: "Choose Brief Type",
    description:
      "Select from multiple templates designed for different freelance projects",
  },
  {
    icon: Clock,
    title: "Input Details",
    description: "Fill in the key project details using our smart form",
  },
  {
    icon: Sparkles,
    title: "Get Your Brief",
    description: "Instantly generate a professional brief ready to share",
  },
];

const year = new Date().getFullYear();

const LandingPage = () => {
  return (
    <div className="min-h-screen min-w-full bg-gradient-to-br from-white via-purple-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero */}
      <section className="container mx-auto px-4 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
            Generate professional client briefs in seconds
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Powered by AI. Built for freelancers.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/brief" prefetch>
              <Button
                size="lg"
                className="group bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600 cursor-pointer"
              >
                Start Generating
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white"
          >
            How It Works
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {features.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center space-y-4 group hover:scale-105 transition-transform p-6 rounded-xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-md hover:shadow-lg"
              >
                <div className="bg-indigo-100 dark:bg-indigo-900/40 w-16 h-16 rounded-full flex items-center justify-center mx-auto group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/60 transition-colors">
                  <item.icon className="h-8 w-8 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-semibold text-xl text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400"
        >
          <p>© {year} OpenBrief. Made for freelancers.</p>
        </motion.div>
      </footer>
    </div>
  );
};

export default LandingPage;
