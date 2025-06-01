import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Code, Gift, Music, Wine } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const EventDetails = () => (
  <Tabs defaultValue="about" className="w-full">
    <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto">
      <TabsTrigger value="about" className="py-3 font-bold text-white">
        About the Party
      </TabsTrigger>
      <TabsTrigger value="menu" className="py-3 font-bold text-white">
        Menu
      </TabsTrigger>
      <TabsTrigger value="faq" className="py-3 font-bold text-white">
        FAQ
      </TabsTrigger>
    </TabsList>

    <TabsContent value="about" className="mt-6">
      <Card className="border-border/50">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 font-mono">
                <Code /> About the Celebration
              </h3>
              <p className="text-muted-foreground mb-4">
                Join us for an unforgettable evening celebrating Clarice’s 40th
                birthday! The party will feature:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Code className="h-5 w-5 text-chart-1 mr-2 mt-0.5" />
                  <span>Theme to be decided, so far it is tech-themed.</span>
                </li>
                <li className="flex items-start">
                  <Music className="h-5 w-5 text-chart-2 mr-2 mt-0.5" />
                  <span>Light live music to set the mood.</span>
                </li>
                <li className="flex items-start">
                  <Gift className="h-5 w-5 text-chart-4 mr-2 mt-0.5" />
                  <span>Food, wine & cake are on the house.</span>
                </li>
                <li className="flex items-start">
                  <Wine className="h-5 w-5 text-chart-3 mr-2 mt-0.5" />
                  <span>
                    There will be an open bar which will be capped until the
                    budget is reached.
                  </span>
                </li>
              </ul>
            </div>
            <div className="relative h-64 md:h-full min-h-[200px] rounded-lg overflow-hidden">
              <Image
                src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/d6/8e/e7/caption.jpg?w=1000&h=-1&s=1"
                alt="Party celebration"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>

    <TabsContent value="menu" className="mt-6">
      <Card className="border-border/50">
        <CardContent className="pt-6">
          <h3 className="text-xl font-bold mb-4 font-mono">
            <Code /> Menu
          </h3>
          <p className="text-muted-foreground mb-4">
            A full menu will be made available on the website when the owners
            get back from their vacation.
          </p>
        </CardContent>
      </Card>
    </TabsContent>

    <TabsContent value="faq" className="mt-6">
      <Card className="border-border/50">
        <CardContent className="pt-6">
          <h3 className="text-xl font-bold mb-4 font-mono">
            <Code /> Frequently Asked Questions
          </h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-bold mb-2">When is the big day?</h4>
              <p className="text-muted-foreground">
                My birthday is on Thursday, 30 October. I am celebrating with a
                party while my mom is in Mauritius.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2">Is there parking available?</h4>
              <p className="text-muted-foreground">
                Yes, there is free parking available behind the restaurant. It
                is encouraged to carpool or use a taxi service if you are going
                to be drinking alcohol.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2">Can I bring a plus one?</h4>
              <p className="text-muted-foreground">
                Yes, you’re welcome to bring a guest or few. Please make sure to
                include them in your booking or share this website with them.
                Space is limited but I will try my best to accommodate everyone.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2">Are children welcome?</h4>
              <p className="text-muted-foreground">
                This is an adults-only celebration. 18+ only.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2">
                What if I have dietary restrictions?
              </h4>
              <p className="text-muted-foreground">
                A full menu will be made available including starters, mains and
                desserts. Selected wine, cocktails and other beverages are
                included, until the budget has been reached. You can buy drinks
                at the bar after that.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
);
