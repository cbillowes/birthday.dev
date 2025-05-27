"use client"

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-5">
      <TimeCard label="Days" value={timeLeft.days} />
      <TimeCard label="Hours" value={timeLeft.hours} />
      <TimeCard label="Minutes" value={timeLeft.minutes} />
      <TimeCard label="Seconds" value={timeLeft.seconds} />
    </div>
  );
}

function TimeCard({ label, value }: { label: string; value: number }) {
  return (
    <Card className="bg-card/30 backdrop-blur-lg border-border/80 w-20 md:w-24 p-3 flex flex-col items-center">
      <motion.div
        key={value}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-mono text-2xl md:text-3xl font-bold text-chart-5"
      >
        {value.toString().padStart(2, '0')}
      </motion.div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </Card>
  );
}