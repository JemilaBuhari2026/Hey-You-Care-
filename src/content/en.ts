/**
 * Central English-language content for Hey! You Care.
 *
 * Every user-facing string lives here under a stable key so validated
 * translations (e.g. Nigerian Pidgin) can be added later as sibling files
 * without rewriting the interface. Do not machine-translate: each locale
 * file must be reviewed before use.
 *
 * Keys are grouped by screen. Wording marked "REVIEW REQUIRED" must be
 * checked by a qualified professional before any real-user pilot.
 */

export const en = {
  brand: {
    name: "Hey! You Care",
    tagline: "Feel heard. Find support. Take your next step.",
  },
  nav: {
    home: "Home",
    settings: "Privacy and settings",
    skipToContent: "Skip to content",
    mainNavLabel: "Main",
  },
  common: {
    plannedBadge: "Planned",
    comingSoonBadge: "Coming soon",
    backToHome: "Back to home",
  },
  quickExit: {
    label: "Quick Exit",
    ariaLabel: "Quick exit: leave this page immediately",
    notErased:
      "Quick Exit cannot erase your browser history or other records on this device. If you share this device, you may also want to clear your browser history.",
  },
  welcome: {
    title: "Hey! You Care — You don't have to carry it all alone",
    description:
      "A supportive companion in development for pregnant women and new mothers. Feel heard, find support, take your next step.",
    headlineA: "You don't have to carry it all",
    headlineAccent: "alone.",
    intro:
      "Hey! You Care is a gentle companion for pregnancy and your baby's first year. Talk things through, find a manageable next step, and put into words the help you need from the people around you.",
    ctaPrimary: "Let's talk",
    ctaSecondary: "Explore how it works",
    goodToKnow:
      "Good to know: the companion uses AI. It is not a doctor, midwife, therapist or emergency service.",
    privacyLink: "How we handle your privacy",
  },
  onboarding: {
    title: "How Hey! You Care works",
    description:
      "What the Hey! You Care companion can and cannot do, and how you stay in control.",
    heading: "Before we begin",
    subheading: "A few honest things about how this works.",
    points: [
      ["It uses AI", "You'll be talking with an AI companion, not a person."],
      [
        "It offers support and next steps",
        "Supportive conversation and practical ideas you can choose to try.",
      ],
      [
        "It is not a professional",
        "It is not a doctor, midwife, therapist or mental health professional, and does not diagnose.",
      ],
      [
        "You control what you share",
        "Share only what feels right. You can stop at any time.",
      ],
      [
        "Not for emergencies",
        "If you or your baby are in danger, contact local emergency services or go to the nearest hospital.",
      ],
    ] as const,
    // REVIEW REQUIRED: placeholder until the privacy policy and consent flow are finalised.
    privacyNotice:
      "Privacy notice (placeholder): the full privacy policy and consent options will appear here once our data handling is finalised. Nothing you tick here is saved yet.",
    confirmLabel:
      "I understand the companion uses AI and is not a medical or emergency service.",
    continue: "Continue",
    continueHint: "Tick the box above to continue.",
  },
  home: {
    title: "Home — Hey! You Care",
    description: "Talk, lighten the load, ask for help, or find support.",
    heading: "How are you, really?",
    subheading: "Choose whatever feels right today. There's no wrong place to start.",
    options: {
      talk: { title: "Talk to me", desc: "Say what's on your mind." },
      littleLighter: {
        title: "Little Lighter",
        desc: "Short activities to ease the mental load.",
      },
      reachForMe: { title: "Reach for me", desc: "Find the words to ask for help." },
      findSupport: {
        title: "Find support",
        desc: "Verified human and professional support.",
      },
    },
  },
  talk: {
    title: "Talk to me — Hey! You Care",
    description: "A supportive conversation space with an AI companion.",
    heading: "Talk to me",
    endConversation: "End conversation",
    aiBanner:
      "You're talking with an AI companion — not a person or professional. Not for emergencies.",
    conversationLabel: "Conversation",
    emptyHeading: "What's on your mind?",
    emptyBody:
      "Big or small, say it however it comes out. This conversation isn't saved.",
    youSaid: "You said:",
    companionSaid: "Companion said:",
    sending: "Sending…",
    notConnected:
      "Development preview: the AI companion isn't connected yet, so there's no reply. Your message was not sent anywhere or stored.",
    sendError: "Something went wrong. Your message couldn't be sent. Please try again.",
    messageLabel: "Your message",
    messagePlaceholder: "Type your message…",
    voiceLabel: "Voice input, planned",
    voice: "Voice",
    send: "Send",
  },
  littleLighter: {
    title: "Little Lighter — Hey! You Care",
    description: "Short, optional activities to help lighten the mental load.",
    heading: "Little Lighter",
    subheading:
      "Small, optional moments to reflect, ground yourself, or simply smile. Do as much or as little as you like.",
    activities: [
      {
        title: "Worry-Eating Monster",
        desc: "Write down a worry and feed it to a friendly monster. Let it hold it for a while.",
        emoji: "👾",
      },
      {
        title: "Drama Queen Court",
        desc: "Put a nagging thought on trial and gently weigh the evidence for and against it.",
        emoji: "👑",
      },
    ] as const,
    notice: "These are wellbeing activities, not clinical treatments.",
  },
  reachForMe: {
    title: "Reach for me — Hey! You Care",
    description: "Find the words to ask for practical or emotional support.",
    heading: "Reach for me",
    subheading:
      "Asking for help is hard. Let's find the words together. What would help most?",
    notice:
      "Nothing is ever sent for you. You decide whether, when and to whom you share a message.",
    draft: {
      description: "Draft a message asking for support, in your own words.",
      backLink: "← All kinds of help",
      whoLabel: "Who might you ask?",
      whoOptional: "(optional)",
      whoPlaceholder: "e.g. my sister, a neighbour",
      whoHint: "Only choose someone you feel safe with.",
      messageLabel: "Your message",
      messagePlaceholder: "Write it in your own words…",
      aiHelpTitle: "AI help with wording",
      aiHelpBody:
        "Soon the companion will suggest gentle wording. For now, write it yourself — nothing here is saved or sent.",
      copy: "Copy message",
      copiedOk: "Copied. Paste it wherever you choose, when you're ready.",
      copiedFail: "Couldn't copy automatically. Please select the text and copy it.",
    },
  },
  findSupport: {
    title: "Find support — Hey! You Care",
    description: "A planned directory of verified human and professional support.",
    heading: "Find support",
    body: "We're working on a list of verified human and professional support. We'll only add services once they've been checked, so this section is empty for now.",
    dangerNotice:
      "If you or your baby are in immediate danger, contact local emergency services or go to the nearest hospital or health centre.",
    meantimeNotice:
      "In the meantime, your antenatal clinic, midwife, doctor or local primary health centre can help point you to support.",
  },
  settings: {
    title: "Privacy and settings — Hey! You Care",
    description:
      "How Hey! You Care handles your information, and the limits of the AI companion.",
    heading: "Privacy and settings",
    // REVIEW REQUIRED: the privacy policy, consent wording and data-retention
    // details below must be professionally reviewed before any real-user pilot.
    reviewNotice:
      "The privacy policy, consent wording and data-retention details on this page are drafts and must be reviewed before this app is used by real mothers.",
    privacy: {
      title: "Privacy",
      body: "This early version has no accounts and asks for no personal details. A full, reviewed privacy policy will be published before real use.",
    },
    aiLimits: {
      title: "What the AI can and can't do",
      body: "The companion uses AI. It can offer supportive conversation and practical ideas. It is not a doctor, midwife, therapist or emergency service, and it does not diagnose or treat any condition. AI can make mistakes.",
      notConnected:
        "The AI companion is not connected yet, so no message you type is sent anywhere or answered.",
    },
    conversations: {
      title: "Your conversations",
      body: "There is no permanent conversation history. What you type stays on this screen only and disappears when you end the conversation, use Quick Exit, or leave the page.",
      limits:
        "We cannot promise that all traces are removed everywhere: your browser, device or network may keep their own records (for example browser history), which are outside the app's control.",
    },
    accountControls: {
      title: "Account and data controls",
      body: "Planned, not yet built: options to manage consent, download or delete your data will appear here if accounts are introduced. The controls described here do not exist yet.",
    },
    language: {
      title: "Language",
      label: "Language",
      english: "English",
      note: "Nigerian Pidgin is planned for a later version.",
    },
    feedback: {
      title: "Feedback or report a problem",
      body: "A way to send feedback will be added soon.",
    },
  },
  exit: {
    // Deliberately generic: the exit page must not identify this app.
    // Keep in sync with public/exit.html (static fallback, no app bundle).
    title: "New Tab",
  },
  safety: {
    // REVIEW REQUIRED: every entry below is a placeholder. Verified Nigerian
    // resources and professionally reviewed response wording must be supplied
    // before any of this is shown to real users.
    placeholderNotice:
      "Placeholder guidance — not yet reviewed. Verified support resources will appear here before real use.",
    categories: {
      "emotional-distress": {
        label: "Emotional distress",
        guidance:
          "[Placeholder] Supportive wording for overwhelming feelings will be added here after professional review.",
      },
      "immediate-danger": {
        label: "Immediate danger",
        guidance:
          "[Placeholder] Guidance for situations of immediate physical danger will be added here after review. No emergency numbers are listed yet because they have not been verified.",
      },
      "self-harm": {
        label: "Self-harm concerns",
        guidance:
          "[Placeholder] Carefully reviewed wording for self-harm concerns will be added here. This must be written with qualified mental health professionals.",
      },
      "baby-safety": {
        label: "Concerns about a baby's safety",
        guidance:
          "[Placeholder] Guidance for worries about a baby's safety or wellbeing will be added here after review.",
      },
      "domestic-abuse": {
        label: "Domestic abuse",
        guidance:
          "[Placeholder] Guidance and verified support options for domestic abuse will be added here after review.",
      },
      "medical-emergency": {
        label: "Medical emergency",
        guidance:
          "[Placeholder] Guidance for medical emergencies will be added here after review. No emergency numbers are listed yet because they have not been verified.",
      },
    },
  },
} as const;

export type Content = typeof en;
