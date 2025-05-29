"use client";
import { motion } from "framer-motion";
import GallerySection from "@/components/gallery-section";

export default function RsvpPage() {
  return (
    <div className="container py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Memories Through The Years
        </h2>
        <div className="w-20 h-1 bg-chart-3 mx-auto mb-6"></div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Celebrating four decades of amazing moments, projects, and
          friendships.
        </p>
      </motion.div>
      <GallerySection />
    </div>
  );
}
