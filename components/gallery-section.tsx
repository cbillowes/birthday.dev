"use client"

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { Button } from './ui/button';

const photos = [
  {
    id: 1,
    src: "https://images.pexels.com/photos/3812743/pexels-photo-3812743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Woman coding on laptop"
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Tech team celebration"
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Hackathon team"
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/3182759/pexels-photo-3182759.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Engineers at whiteboard"
  },
  {
    id: 5,
    src: "https://images.pexels.com/photos/3277808/pexels-photo-3277808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Team celebration dinner"
  },
  {
    id: 6,
    src: "https://images.pexels.com/photos/2608516/pexels-photo-2608516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Birthday celebration"
  }
];

export default function GallerySection() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  
  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Memories Through The Years</h2>
          <div className="w-20 h-1 bg-chart-3 mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Celebrating four decades of amazing moments, projects, and friendships.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Card 
                    className="overflow-hidden cursor-pointer group"
                    onClick={() => setSelectedPhoto(photo.id)}
                  >
                    <div className="relative h-64 w-full">
                      <Image 
                        src={photo.src} 
                        alt={photo.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-3xl p-0 bg-transparent border-none">
                  <div className="relative w-full h-[80vh]">
                    <Image 
                      src={photo.src} 
                      alt={photo.alt}
                      fill
                      className="object-contain"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
                      onClick={() => setSelectedPhoto(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}