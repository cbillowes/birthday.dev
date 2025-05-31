"use client";

import { useState } from "react";

export function PrivacyPolicy() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  return (
    <div>
      <div
        className="flex items-center justify-center gap-2 cursor-pointer bg-black/60 hover:bg-black/80 transition-colors rounded-md py-3 w-full mx-auto"
        onClick={() => setShowPrivacy(!showPrivacy)}
      >
        <span className="text-xl">💁</span>
        {showPrivacy ? "Hide" : "Display"} privacy policy
      </div>
      {showPrivacy && (
        <div className="mt-1 text-sm text-white/60 leading-relaxed bg-black/60 p-4 rounded-md mb-4 flex flex-col gap-2">
          <p>
            Your information is stored in Google Firebase Firestore and will be
            deleted after the event. Information captured is recorded so I know
            who’s I need to cater for and who to contact if needed before or
            during the event.
          </p>
          <p>
            Only your names and surnames are shared with the venue for your
            booking.
          </p>
          <p>
            You’ll only be added to a WhatsApp group if you give permission to
            receive updates there. Your number will be visible to everyone in
            the WhatsApp group.
          </p>
          <p>
            You won’t be spammed or receive any marketing emails or messages
            from me.
          </p>
        </div>
      )}
    </div>
  );
}
