"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowBigLeft, ArrowBigRight, X } from "lucide-react";
import type { StaticImageData } from "next/image";
import { Tabs, TabsContent, TabsTrigger } from "./ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { Spinner } from "@/components/spinner";

type Photo = {
  index?: number;
  id: string;
  category: string;
  title: string;
  description: string;
  image: StaticImageData;
};

const photoRepository = [] as Photo[];

export default function GallerySection() {
  const { user, loading } = useAuth();
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("archives");

  if (loading)
    return (
      <div className="max-w-2xl h-screen mx-auto mt-8 justify-center items-center flex">
        <Spinner />
      </div>
    );

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto mt-8 text-center">
        <p className="text-lg mb-4">
          Please log in to view the gallery. There are some awesome memories I
          want to share with you! Feel free to send me more so I can add
          them to the gallery.
        </p>
        <p className="text-sm text-white">
          If you don’t have an account, you can{" "}
          <a
            href="/register"
            className="text-chart-3 hover:underline font-bold focus:underline"
          >
            register here
          </a>
          .
        </p>
      </div>
    );
  }

  const categories = photoRepository
    .map((photo) => photo.category)
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    })
    .sort();
  const photos = photoRepository
    .filter((p) => {
      return p.category === selectedCategory;
    })
    .map((photo, index) => {
      return { ...photo, index };
    });
  return (
    <Tabs defaultValue={selectedCategory}>
      <TabsList className="flex flex-wrap gap-4 justify-center items-center h-auto bg-background rounded-md p-1 mb-6">
        {categories.map((category) => (
          <TabsTrigger
            key={category}
            value={category}
            className={cn(
              "text-sm font-medium px-4 py-2 rounded-md",
              category === selectedCategory && "data-[state=active]:bg-chart-5"
            )}
            onClick={() => setSelectedCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </TabsTrigger>
        ))}
      </TabsList>
      {categories.map((category, index) => {
        return (
          <TabsContent
            key={category}
            value={category}
            aria-describedby={category}
          >
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            >
              <Dialog>
                {photos.map((photo) => {
                  return (
                    <DialogTrigger key={photo.index} asChild>
                      <Card
                        className="overflow-hidden cursor-pointer group"
                        onClick={() => setSelectedPhoto(photo)}
                      >
                        <div className="relative h-64 w-full">
                          <Image
                            src={photo.image}
                            alt={photo.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105 sepia-[80%] group-hover:sepia-0"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                          <div className="absolute bg-black/80 text-white first-letter:uppercase bottom-0 left-0 right-0 px-4 py-2 text-sm">
                            <h3 className="font-normal">
                              #{photo.index + 1}: {photo.title}
                            </h3>
                          </div>
                        </div>
                      </Card>
                    </DialogTrigger>
                  );
                })}
                {selectedPhoto && (
                  <DialogContent className="max-w-3xl p-0 bg-transparent border-none">
                    <DialogTitle
                      className="sr-only"
                      aria-describedby={selectedPhoto.description}
                    >
                      {selectedPhoto.title}
                    </DialogTitle>
                    <div className="relative max-w-[800px] md:h-[450px] w-full h-[250px]">
                      <Image
                        src={selectedPhoto.image}
                        alt={selectedPhoto.title}
                        className="object-cover transition-transform duration-500"
                        fill
                      />
                      <div className="absolute bg-black/80 text-white first-letter:uppercase bottom-0 left-0 right-0 px-4 py-2 text-sm">
                        <h3 className="font-normal">
                          #{(selectedPhoto.index || 0) + 1}:{" "}
                          {selectedPhoto.description}
                        </h3>
                      </div>
                      <div
                        onClick={() => {
                          const i = selectedPhoto?.index || 0;
                          let previous = photos[i - 1];
                          if (!previous) previous = photos[photos.length - 1];
                          setSelectedPhoto(previous);
                        }}
                        className="absolute cursor-pointer top-1/2 left-0 -translate-y-1/2 border-black/60 p-3 bg-black/90 hover:bg-black/70 text-white rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                      >
                        <ArrowBigLeft className="h-4 w-4" />
                        <span className="sr-only">Previous</span>
                      </div>
                      <div
                        onClick={() => {
                          const i = selectedPhoto?.index || 0;
                          let next = photos[i + 1];
                          if (!next) next = photos[0];
                          setSelectedPhoto(next);
                        }}
                        className="absolute cursor-pointer top-1/2 right-0 -translate-y-1/2 border-black/60 p-3 bg-black/90 hover:bg-black/70 text-white rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                      >
                        <ArrowBigRight className="h-4 w-4" />
                        <span className="sr-only">Next</span>
                      </div>
                    </div>
                  </DialogContent>
                )}
              </Dialog>
            </motion.div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
