"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ArrowBigLeft, ArrowBigRight, X } from "lucide-react";
import seventieth from "@/app/images/archive_70th.webp";
import jujitsu from "@/app/images/archive_jujitsu.webp";
import abel from "@/app/images/archive_abel.webp";
import kia from "@/app/images/archive_kia.webp";
import cricket from "@/app/images/archive_action_cricket.webp";
import kirstin from "@/app/images/archive_kirstin.webp";
import baby from "@/app/images/archive_baby_mom_dad.webp";
import len from "@/app/images/archive_len.webp";
import lunch from "@/app/images/archive_lunch.webp";
import bouwers from "@/app/images/archive_bouwers.webp";
import marais from "@/app/images/archive_marais.webp";
import jillian from "@/app/images/archive_jillian.webp";
import brighteyes from "@/app/images/archive_brighteyes.webp";
import marcel from "@/app/images/archive_marcel.webp";
import cake from "@/app/images/archive_cake.webp";
import durban from "@/app/images/archive_miss_durban.webp";
import cheeky from "@/app/images/archive_cheeky.webp";
import momOne from "@/app/images/archive_mom (1).webp";
import chess from "@/app/images/archive_chess.webp";
import momCass from "@/app/images/archive_mom_cass.webp";
import christmasSanta from "@/app/images/archive_christmas (1).webp";
import christmasYoung from "@/app/images/archive_christmas.webp";
import monique from "@/app/images/archive_monique.webp";
import cocktail from "@/app/images/archive_cocktail.webp";
import multichoiceOne from "@/app/images/archive_multichoice (1).webp";
import coinDeMire from "@/app/images/archive_coin_de_mire.webp";
import multichoiceTwo from "@/app/images/archive_multichoice_2.webp";
import covid from "@/app/images/archive_covid.webp";
import multichoiceThree from "@/app/images/archive_multichoice.webp";
import curiousCorner from "@/app/images/archive_curious_corner.webp";
import newFeeling from "@/app/images/archive_new_feeling.webp";
import dad from "@/app/images/archive_dad.webp";
import nicoli from "@/app/images/archive_nicoli.webp";
import danieRami from "@/app/images/archive_danie_rami.webp";
import nlp from "@/app/images/archive_nlp.webp";
import delia from "@/app/images/archive_delia.webp";
import oumie from "@/app/images/archive_oumie.webp";
import diving from "@/app/images/archive_diving.webp";
import pooches from "@/app/images/archive_pix_elbs.webp";
import drums from "@/app/images/archive_drums.webp";
import posters from "@/app/images/archive_posters.webp";
import egypt from "@/app/images/archive_egypt.webp";
import potplant from "@/app/images/archive_pot_plant.webp";
import eight from "@/app/images/archive_eight.webp";
import shirls from "@/app/images/archive_shirls.webp";
import elby from "@/app/images/archive_elby.webp";
import sisters from "@/app/images/archive_sisters.webp";
import fabrice from "@/app/images/archive_fabrice.webp";
import suits from "@/app/images/archive_suits_guy.webp";
import familyOne from "@/app/images/archive_family (1).webp";
import tamagotchi from "@/app/images/archive_tamagotchi.webp";
import familyGirlies from "@/app/images/archive_family_girlies.webp";
import three from "@/app/images/archive_three.webp";
import familyGoldReefCity from "@/app/images/archive_family_grc.webp";
import timmy from "@/app/images/archive_timmy.webp";
import family from "@/app/images/archive_family.webp";
import uno from "@/app/images/archive_uno.webp";
import geek from "@/app/images/archive_geek.webp";
import wayne from "@/app/images/archive_wayne.webp";
import googleOne from "@/app/images/archive_google.webp";
import googleTwo from "@/app/images/archive_google_2.webp";
import workSleep from "@/app/images/archive_work_sleep.webp";
import zilwa from "@/app/images/archive_zilwa.webp";
import guinness from "@/app/images/archive_guinness.webp";
import hands from "@/app/images/archive_hands.webp";
import newYears from "@/app/images/archive_new_years.webp";
import type { StaticImageData } from "next/image";

type Photo = {
  index?: number;
  id: string;
  title: string;
  description: string;
  image: StaticImageData;
};

const photos = [
  {
    id: "cake",
    title: "Christening",
    description: "Oooooh, look. A cake with my name on it.",
    image: cake,
  },
  {
    id: "baby",
    title: "Baby me",
    description: "Mom & Dad with me at one year old.",
    image: baby,
  },
  {
    id: "three",
    title: "At three",
    description: "Three years old with my first ice-cream cake.",
    image: three,
  },
  {
    id: "eight",
    title: "At eight",
    description: "Eight years old with some more cake.",
    image: eight,
  },
  {
    id: "christmasYoung",
    title: "Christmas",
    description: "Christmas as a kid. I wonder what I got!",
    image: christmasYoung,
  },
  {
    id: "tamagotchi",
    title: "Cassandra",
    description: "Cassandra and I with Ginger and my tamagotchi.",
    image: tamagotchi,
  },
  {
    id: "durban",
    title: "Miss Durban 1993",
    description: "I made it to the finals. Miss Durban of 1993. Booya.",
    image: durban,
  },
  {
    id: "posters",
    title: "Posters",
    description: "Because back streets back, come on!",
    image: posters,
  },
  {
    id: "brighteyes",
    title: "Brighteyes",
    description: "Chilling with Brighteyes and our budgie George.",
    image: brighteyes,
  },
  {
    id: "cheeky",
    title: "Cheeky",
    description: "After my pony, we got a bull, Cheeky was it's name.",
    image: cheeky,
  },
  {
    id: "sisters",
    title: "Sisters",
    description:
      "First day of high school for me. First day of primary school for Cassandra.",
    image: sisters,
  },
  {
    id: "chess",
    title: "Sisters",
    description: "Playing chess with my sister in Durban. I wonder who won?",
    image: chess,
  },
  {
    id: "familyOne",
    title: "Family",
    description: "Mom, Dad, Cassandra and I, in Durban with my grandparents.",
    image: familyOne,
  },
  {
    id: "familyGirlies",
    title: "Family",
    description: "The ladies of the family. What a lot of attitude I got.",
    image: familyGirlies,
  },
  {
    id: "familyGoldReefCity",
    title: "Family",
    description: "Family photo at Gold Reef City.",
    image: familyGoldReefCity,
  },
  {
    id: "family",
    title: "Family",
    description:
      "Family photo on the plot with Gerry's TV chilling in the background.",
    image: family,
  },
  {
    id: "christmasSanta",
    title: "Christmas",
    description: "Christmas with Santa, because weird.",
    image: christmasSanta,
  },
  {
    id: "momOne",
    title: "Mom",
    description:
      "Mom and I in Mauritius. She loved it. She's coming back for thirds.",
    image: momOne,
  },
  {
    id: "momCass",
    title: "Mom & Cassandra",
    description:
      "Mom, Cassandra and I on the way back from a Catamaran trip in Mauritius.",
    image: momCass,
  },
  {
    id: "dad",
    title: "Dad",
    description: "Dad and I at LUX* Grand Baie, because fun and spoils.",
    image: dad,
  },
  {
    id: "delia",
    title: "Delia",
    description:
      "My auntie Delia who graced as with Hilton and her's presence.",
    image: delia,
  },
  {
    id: "oumie",
    title: "Oumie",
    description: "My Oumie and I at her apartment in Nigel (I think).",
    image: oumie,
  },
  {
    id: "pooches",
    title: "Elby & Pixie",
    description: "Elby and Pixie, dapper and full of joy. I miss you Pix.",
    image: pooches,
  },
  {
    id: "elby",
    title: "Elby",
    description: "Nap time with Elby. But she doesn't know how to nap.",
    image: elby,
  },
  {
    id: "workSleep",
    title: "Hard at work",
    description:
      "I probably passed out because I was working at an event, on fumes I was.",
    image: workSleep,
  },
  {
    id: "geek",
    title: "Geek",
    description: "Geeking it out, because fun.",
    image: geek,
  },
  {
    id: "cocktail",
    title: "Cocktail",
    description: "That is one big ass cocktail. Chill and Grill is awesome.",
    image: cocktail,
  },
  {
    id: "covid",
    title: "Covid",
    description:
      "Remember Covid? Well, here's a reminder of the back then fashionable masks.",
    image: covid,
  },
  {
    id: "potplant",
    title: "Pot plant",
    description:
      "Oh look, a random pot plant in the middle of the road. We stopped for some pictures.",
    image: potplant,
  },
  {
    id: "zilwa",
    title: "Mauritius",
    description:
      "My very first trip to Mauritius in 2016 at Zilwa hotel in Calodyne.",
    image: zilwa,
  },
  {
    id: "guinness",
    title: "Ireland",
    description:
      "Trip to Ireland and drinking Guinness while chilling with Len. Thanks for hosting me buddy.",
    image: guinness,
  },
  {
    id: "hands",
    title: "Christmas",
    description:
      "A Christmas photo taken at a lunch where I was trying to be photogenic.",
    image: hands,
  },
  {
    id: "jujitsu",
    title: "Jujitsu",
    description:
      "Don't mess with my stress. I did a little bit of Jujitsu but had to stop shortly after starting. Bummer.",
    image: jujitsu,
  },
  {
    id: "uno",
    title: "First car",
    description:
      "My very first, official car, a Fiat Uno. It got me places but it also stopped while trying to get to the destination.",
    image: uno,
  },
  {
    id: "kia",
    title: "Birthday Kia",
    description:
      "My birthday present to myself. A Kia Picanto bought in Mauritius.",
    image: kia,
  },
  {
    id: "fabrice",
    title: "Fabrice",
    description:
      "Fabrice and I at the waterfalls at 7 Coloured Earth during a visit with Delia (my aunt).",
    image: fabrice,
  },
  {
    id: "marais",
    title: "Marais",
    description:
      "Marais and I on a trip with my sister, Tommy and my mommy, living the island dream.",
    image: marais,
  },
  {
    id: "jillian",
    title: "Jillian",
    description:
      "Always great to hang out with Jillian, this time on new year's eve at Moods, Mauritius.",
    image: jillian,
  },
  {
    id: "kirstin",
    title: "Kirstin",
    description:
      "Kirstin and I at LUX* Grand Gaube partying on a school night.",
    image: kirstin,
  },
  {
    id: "marcel",
    title: "Wind Dancer II",
    description:
      "Cassandra and I on the Wind Dancer II with Marcel, the skipper, bombing the photo which I thought was awesome.",
    image: marcel,
  },
  {
    id: "abel",
    title: "Abel",
    description: "Abel and I on my trip back to South Africa some time ago.",
    image: abel,
  },
  {
    id: "len",
    title: "Len",
    description: "Len and I in Ireland at his house, looking thug-like.",
    image: len,
  },
  {
    id: "nicoli",
    title: "Nicoli & Family",
    description:
      "Nicoli, her mom, mom-in-law and I at a party in Pretoria just before I left for Mauritius.",
    image: nicoli,
  },
  {
    id: "danieRami",
    title: "Rami & Danie",
    description: "Rami, Danie and I chilling after a delicious supper.",
    image: danieRami,
  },
  {
    id: "seventieth",
    title: "Friends",
    description: "An awesome bunch of friends at a 70th birthday party.",
    image: seventieth,
  },
  {
    id: "cricket",
    title: "Friends",
    description: "Friends at an action cricket party.",
    image: cricket,
  },
  {
    id: "lunch",
    title: "Friends",
    description: "Lunch and Learn friends after a successful event.",
    image: lunch,
  },
  {
    id: "bouwers",
    title: "Bouwers",
    description: "The Bouwer ladies at a museum day out in Pretoria.",
    image: bouwers,
  },
  {
    id: "monique",
    title: "Friends",
    description: "Monique and friends at her bridal shower.",
    image: monique,
  },
  {
    id: "coinDeMire",
    title: "Coin de Mire",
    description:
      "My favourite photo I've ever taken in Mauritius with Coin de Mire in the background.",
    image: coinDeMire,
  },
  {
    id: "curiousCorner",
    title: "Curious Corner",
    description:
      "Me chilling on the ceiling at the Curious Corner of Chamarel in Mauritius.",
    image: curiousCorner,
  },
  {
    id: "newFeeling",
    title: "New Feeling",
    description:
      "A new feeling, a tattoo and lip ring later, I emerge feeling stronger than ever.",
    image: newFeeling,
  },
  {
    id: "nlp",
    title: "NLP course",
    description:
      "I did a Neuro-Linguistic Programming course with Sedrick and amazing people. I actually got a certificate.",
    image: nlp,
  },
  {
    id: "newYears",
    title: "New Year's Eve",
    description:
      "New Year's Eve with friends in Mauritius at Moods, Grand Baie, Mauritius.",
    image: newYears,
  },
  {
    id: "diving",
    title: "Sodwana",
    description: "My first scuba-diving trip in Sodwana in the mid 2000's. ",
    image: diving,
  },
  {
    id: "egypt",
    title: "Egypt",
    description: "My first trip to Egypt where I dove in the Red Sea in 2010.",
    image: egypt,
  },
  {
    id: "drums",
    title: "Drums",
    description:
      "An embarrassing photo of me getting frustrated while trying to play drums out of time.",
    image: drums,
  },
  {
    id: "shirls",
    title: "Friends",
    description: "Friends and I at a blue scarf ladies day party.",
    image: shirls,
  },
  {
    id: "timmy",
    title: "Timmy",
    description: "Timmy and I at a medieval party.",
    image: timmy,
  },
  {
    id: "wayne",
    title: "Family",
    description: "Family photo at Lady Luck in Boing-Boing town, Springs.",
    image: wayne,
  },
  {
    id: "googleOne",
    title: "Ireland: Google entry",
    description: "My guest admission tag to enter the Google office in Dublin.",
    image: googleOne,
  },
  {
    id: "googleTwo",
    title: "Ireland: Google office",
    description: "A Google white board at the Google office in Dublin.",
    image: googleTwo,
  },
  {
    id: "suits",
    title: "MultiChoice: Gabriel Macht",
    description:
      "So Gabriel Macht (Harvey Specter) from Suits came to visit MultiChoice as the ambassador of the brand. So close.",
    image: suits,
  },

  {
    id: "multichoiceOne",
    title: "MultiChoice: Moustaches",
    description:
      "Colleagues and I wearing silly moustaches because work is fun.",
    image: multichoiceOne,
  },
  {
    id: "multichoiceTwo",
    title: "MultiChoice: Coffee time",
    description:
      "A quick trip to the coffee shot at MultiChoice with extra time to take a crazy photo.",
    image: multichoiceTwo,
  },
  {
    id: "multichoiceThree",
    title: "MultiChoice",
    description:
      "The red fancy chair I sat in at a MultiChoice event. I wasn't really live nor on air. Thankfully.",
    image: multichoiceThree,
  },
] as Photo[];

export default function GallerySection() {
  const [selectedPhoto, setSelectedPhoto] = useState<{
    index: number;
    id: string;
    title: string;
    description: string;
    image: string;
  } | null>(null);

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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Memories Through The Years
          </h2>
          <div className="w-20 h-1 bg-chart-3 mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Celebrating four decades of amazing moments, projects, and
            friendships.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {photos.map((photo, index) => {
            photo.index = index;
            return (
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
                      onClick={() =>
                        setSelectedPhoto({
                          index,
                          id: photo.id,
                          title: photo.title,
                          description: photo.description,
                          image:
                            typeof photo.image === "string"
                              ? photo.image
                              : photo.image.src,
                        })
                      }
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
                          <h3 className="font-normal">{photo.title}</h3>
                        </div>
                      </div>
                    </Card>
                  </DialogTrigger>
                  {selectedPhoto && (
                    <DialogContent className="max-w-3xl p-0 bg-transparent border-none">
                      <div className="relative w-[800px] h-[450px]">
                        <Image
                          src={selectedPhoto.image}
                          alt={selectedPhoto.title}
                          fill
                        />
                        <div className="absolute bg-black/80 text-white first-letter:uppercase bottom-0 left-0 right-0 px-4 py-2 text-sm">
                          <h3 className="font-normal">
                            {selectedPhoto.description}
                          </h3>
                        </div>
                        <div
                          onClick={() => {
                            const previous = selectedPhoto.index - 1;
                            setSelectedPhoto(photos[previous]);
                          }}
                          className="absolute cursor-pointer top-1/2 left-0 -translate-y-1/2 border-black/60 p-3 bg-black/60 hover:bg-black/70 text-white rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                        >
                          <ArrowBigLeft className="h-4 w-4" />
                          <span className="sr-only">Previous</span>
                        </div>
                        <div
                          onClick={() => {
                            const next = selectedPhoto.index + 1;
                            setSelectedPhoto(photos[next]);
                          }}
                          className="absolute cursor-pointer top-1/2 right-0 -translate-y-1/2 border-black/60 p-3 bg-black/60 hover:bg-black/70 text-white rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                        >
                          <ArrowBigRight className="h-4 w-4" />
                          <span className="sr-only">Next</span>
                        </div>
                      </div>
                    </DialogContent>
                  )}
                </Dialog>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
