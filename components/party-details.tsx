import { Card, CardContent } from "@/components/ui/card";
import { CalendarCheck, MapPin, PartyPopper } from "lucide-react";
import { GhostLinkButton } from "@/components/link-button";

export const PartyDetails = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 p-3 rounded-full bg-chart-1/20">
            <CalendarCheck className="h-8 w-8 text-chart-1" />
          </div>
          <h3 className="text-xl font-bold mb-2">Date & Time</h3>
          <p className="text-muted-foreground mb-2">Saturday, July 19, 2025</p>
          <p className="text-muted-foreground">4:30 PM to late</p>
          <GhostLinkButton
            to="/calendar.ics"
            size="lg"
            className="mt-4 border-chart-1 text-chart-1 hover:bg-chart-1/10"
            as="save-the-date-clarice.ics"
            target="_blank"
          >
            Save the Date
          </GhostLinkButton>
        </div>
      </CardContent>
    </Card>

    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 p-3 rounded-full bg-chart-2/20">
            <MapPin className="h-8 w-8 text-chart-2" />
          </div>
          <h3 className="text-xl font-bold mb-2">Venue</h3>
          <p className="text-muted-foreground mb-2">
            Kalatua Garden Restaurant
          </p>
          <p className="text-muted-foreground">
            Twenty-Foot Rd, Pereybere, Mauritius
          </p>
          <div className="flex items-center justify-center gap-4">
            <GhostLinkButton
              to="https://maps.google.com"
              size="lg"
              className="mt-4 border-chart-2 text-chart-2 hover:bg-chart-2/10"
              target="_blank"
            >
              View Map
            </GhostLinkButton>
            <GhostLinkButton
              to="https://www.google.com/maps?rlz=1C5CHFA_enMU1093MU1093&gs_lcrp=EgZjaHJvbWUqDggAEEUYJxg7GIAEGIoFMg4IABBFGCcYOxiABBiKBTIGCAEQRRhAMgYIAhBFGDkyEAgDEAAYkQIYsQMYgAQYigUyDQgEEAAYkQIYgAQYigUyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQgxMDM0ajBqMagCALACAA&um=1&ie=UTF-8&fb=1&gl=mu&sa=X&geocode=KcEzzdrQq30hMfEazFrUBR_x&daddr=MU,+Twenty-Foot+Rd,+Pereybere+30546"
              size="lg"
              className="mt-4 border-chart-2 text-chart-2 hover:bg-chart-2/10"
              target="_blank"
            >
              Get Directions
            </GhostLinkButton>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 p-3 rounded-full bg-chart-4/20">
            <PartyPopper className="h-8 w-8 text-chart-4" />
          </div>
          <h3 className="text-xl font-bold mb-2">Dress Code</h3>
          <p className="text-muted-foreground">
            Wear whatever makes you comfortable and is socially acceptable.
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
);
