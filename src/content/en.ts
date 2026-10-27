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
    back: "Back",
    skipToContent: "Skip to content",
    urgentHelp: "Need urgent help?",
    urgentStripLabel: "Urgent help",
  },
  common: {
    plannedBadge: "Planned",
    comingSoonBadge: "Coming soon",
    backToHome: "Back to home",
  },
  quickExit: {
    label: "Quick exit",
    ariaLabel: "Quick exit: leave this page immediately",
    notErased:
      "Quick exit cannot erase your browser history or other records on this device. If you share this device, you may also want to clear your browser history.",
  },
  welcome: {
    title: "Hey! You Care — A few quiet minutes, when you need them",
    description:
      "A supportive companion in development for pregnancy and the first year after birth.",
    headline: "A few quiet minutes, when you need them.",
    intro: "For pregnancy and the first year after birth.",
    beforeTitle: "Before you start",
    beforeAi:
      "You're talking with an AI, not a person. It isn't a doctor, midwife, therapist or emergency service.",
    // REVIEW REQUIRED: true only once the AI is connected; the second sentence says so.
    beforeData:
      "When the AI is connected, your words will be sent to an AI provider to write each reply. It isn't connected yet. This app keeps no chat history.",
    privacyLink: "How your data is handled",
    confirmLabel: "I understand this is an AI and can't replace professional or emergency help.",
    continue: "Continue",
    continueHint: "Tick the box above to continue.",
    notNow: "Not now",
  },
  home: {
    title: "Home — Hey! You Care",
    description: "Talk, ask someone for help, or take a short pause.",
    heading: "What would help right now?",
    subheading: "Pick one, or just start. You can leave any time.",
    footnote: "No account. Nothing is saved when you leave.",
    privacyLink: "Privacy and data",
    comingSoon: "Coming soon",
    logoAlt: "Hey You Care",
    options: {
      talk: { title: "Talk to me", desc: "Say what's on your mind. Short and private." },
      reachForMe: { title: "Reach for me", desc: "Find the words to ask someone for help." },
      littleLighter: { title: "Little Lighter", desc: "Short, gentle activities to pause with." },
      findSupport: { title: "Find support", desc: "Services we have checked." },
    },
  },
  talk: {
    title: "Talk to me — Hey! You Care",
    description: "A supportive conversation space with an AI companion.",
    heading: "Talk to me",
    endConversation: "End chat",
    aiBanner:
      "You're talking with an AI. It can't replace a doctor, midwife, therapist or emergency help.",
    conversationLabel: "Conversation",
    // Fixed app wording, not an AI reply.
    opener: "I'm here. You can tell me what's on your mind, or choose what would help.",
    choicesLabel: "Ways to start",
    choices: [
      "I just want to talk",
      "Help me make sense of it",
      "Work out a next step",
      "Help me ask someone for support",
    ] as const,
    appSaid: "Hey You Care says:",
    youSaid: "You said:",
    companionSaid: "Companion said:",
    sending: "Sending…",
    notConnected:
      "Development preview: the AI companion isn't connected yet, so there's no reply. Your message was not sent anywhere or stored.",
    sendError: "Something went wrong. Your message couldn't be sent. Please try again.",
    messageLabel: "Your message",
    messagePlaceholder: "Type here",
    send: "Send",
    notSaved: "Not saved. Leaving clears this chat.",
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
  comingSoon: {
    littleLighter: "Short, gentle activities to pause with. Not built yet.",
    findSupport: "A list of services we have checked ourselves. Nothing is listed until it has been verified.",
  },
  safetyGuidance: {
    title: "Safety guidance — Hey! You Care",
    description: "Layout placeholder for reviewed safety guidance.",
    heading: "Safety guidance",
    placeholderStrong: "Placeholder, not yet reviewed.",
    placeholderBody:
      "This screen shows the layout only. Wording and contacts must come from a qualified reviewer before any real user sees it.",
    reviewedTitle: "Reviewed message",
    reviewedBody:
      "[Calm, reviewed wording goes here. It encourages immediate human or emergency help and makes no promises.]",
    contactsTitle: "Verified contacts",
    contactName: "[Service name]",
    contactRoute: "[Verified number or official route]",
    contactSource: "Source: [source]. Last verified: [date].",
    contactsNote: "Only contacts that have been checked are ever shown here.",
    categoriesTitle: "Situations this will cover",
    endChat: "End chat",
  },
  reachForMe: {
    title: "Reach for me — Hey! You Care",
    description: "Find the words to ask for practical or emotional support.",
    heading: "Reach for me",
    subheading: "What kind of help would you like to ask for? Choosing is optional.",
    legend: "Kind of help",
    continue: "Continue",
    noteLabel: "Anything you want to add? (optional)",
    noteSuffix: "Here's a bit more:",
    templates: {
      listen: [
        "Hi, I've been carrying a lot lately and I'd really like someone to listen. Could we talk for a little while this week? You don't have to fix anything. I'd just like to be heard.",
        "Could we talk for a little while this week? I'd like you to listen without trying to fix anything.",
        "Hi, I need some time to be heard this week. Could you make time to listen before the weekend? I don't need solutions, just your attention.",
        "Could you listen while I talk about [what's on my mind] on [day] at [time] for [how long]? We could talk by [phone or in person].",
      ],
      children: [
        "Hi, I'm feeling stretched thin and could use some help with the baby or the children. Would you be able to look after them for a couple of hours this week so I can rest? It would mean a lot.",
        "Could you look after the baby or the children for a couple of hours this week?",
        "Hi, I need a couple of hours to rest this week. Could you look after the baby or the children before the weekend? I'd appreciate the help.",
        "Could you look after [the baby or children] at [place] on [day] from [start time] to [end time]? I need help for [how long].",
      ],
      meals: [
        "Hi, I'm finding it hard to keep up with cooking right now. Could you help with a meal or two this week, either by cooking or bringing something? Thank you.",
        "Could you help with a meal or two this week, either by cooking or bringing something?",
        "Hi, I need help with meals this week. Could you cook or bring a meal before the weekend? Thank you for considering it.",
        "Could you help with [meal] on [day] at [time] by [cooking here or bringing food]? I'd need help for [how long].",
      ],
      errands: [
        "Hi, there are a few errands I'm finding hard to get to. Could you help with one or two this week? I can tell you exactly what's needed.",
        "Could you help with one or two errands this week?",
        "Hi, I need help getting a few errands done before the weekend. Could you take care of one or two this week? I'd appreciate it.",
        "Could you help with [errand] at [place] on [day] by [time]? It should take [how long], and I'd need you to [what you need].",
      ],
      company: [
        "Hi, I'd love some company. Could you spend a little time with me this week, even just sitting together? It would help more than you know.",
        "Could you spend some time with me this week, even just sitting together?",
        "Hi, I need some company this week. Could you make time to sit with me before the weekend? A quiet visit would be welcome.",
        "Could you spend [how long] with me at [place] on [day] at [time]? I'd like to [sit together or what you need].",
      ],
      appointment: [
        "Hi, I have an appointment coming up and I'd like someone with me. Would you be able to come along or help me get there? I can share the date and time.",
        "Could you come with me to my upcoming appointment or help me get there?",
        "Hi, I need someone with me for my upcoming appointment. Could you let me know this week whether you can come along or help me get there? Thank you.",
        "Could you help me get to [appointment or place] on [day] at [time] by [coming along or arranging transport]? I'd need help for [how long].",
      ],
      professional: [
        "Hi, I think it would help to talk to a professional, but I'm not sure where to start. Could you help me look into options, or sit with me while I make the call?",
        "Could you help me look into professional support options or sit with me while I make a call?",
        "Hi, I need help looking into professional support this week. Could we make time before the weekend to look at options or sit together while I make a call?",
        "Could you help me look into [type of professional support] on [day] at [time] for [how long]? I'd like help with [finding options or sitting with me during a call].",
      ],
      other: [
        "Hi, I could use some help with something and I'd like to talk it through. Are you free to talk this week?",
        "Are you free to talk this week about some help I need?",
        "Hi, I need help with something this week. Could we talk before the weekend about what I need? I'd appreciate some time together.",
        "Could you help with [what you need] on [day] at [time] for [how long]? I'd need you to [how you can help].",
      ],
    },
    draft: {
      title: "Your draft — Reach for me",
      description: "Draft a message asking for support, in your own words.",
      heading: "Your draft",
      subheading: "Change it however you like. Nothing is sent from here.",
      toneLabel: "Tone",
      tones: ["Gentle and personal", "Short and direct", "Warm but firm", "Practical and specific"] as const,
      replacePrompt: "Replace your edits with a new version?",
      replace: "Replace",
      keepMine: "Keep mine",
      brackets: "There are still [brackets] to fill in.",
      messageLabel: "Message draft",
      messagePlaceholder: "Write it in your own words…",
      copy: "Copy message",
      copiedOk: "Copied",
      copiedFail: "Couldn't copy. Select the text and copy it yourself.",
      share: "Share message",
      shareUnavailable: "Sharing isn't available on this device. Use Copy message instead.",
      anotherVersion: "Another version",
      cancel: "Cancel",
      footnote: "You choose who gets this. It isn't saved or sent for you.",
    },
  },
  findSupport: {
    title: "Find support — Hey! You Care",
    description: "Verified human and professional support services.",
    heading: "Find support",
    body: "Only services we have checked. Cost, availability and waiting times can vary.",
    locationLabel: "Where are you? (you choose, we don't track it)",
    locationPlaceholder: "Choose your state",
    filtersLabel: "Type of support",
    filters: {
      emotional: "Emotional support",
      pregnancy: "Pregnancy and birth",
      practical: "Practical help",
    },
    source: "Source",
    lastVerified: "Last verified",
    reportProblem: "Report a problem with this listing",
    empty: "No checked services match yet.",
  },
  settings: {
    title: "Privacy and data — Hey! You Care",
    description: "What happens to what you write, in plain words.",
    heading: "Privacy and data",
    subheading: "What happens to what you write, in plain words.",
    // REVIEW REQUIRED: privacy policy, consent wording and data-retention
    // details must be professionally reviewed before any real-user pilot.
    draftStrong: "Draft wording, pending review.",
    draftBody: "It must match how the app is really built before anyone uses it.",
    keeps: {
      title: "What the app keeps",
      body: "No account and no chat history. When you leave, the chat is cleared.",
    },
    handles: {
      title: "Who handles your words",
      body: "The AI isn't connected yet, so your messages aren't sent anywhere. Once it is, your messages will go to an AI provider to write each reply: [provider, location and retention, to be confirmed in writing]. Hosting: [provider, to be confirmed].",
    },
    counts: {
      title: "What we count",
      body: "Nothing is counted at the moment. If counting is added, it will only be simple counts, like \"a chat started\". Never what you wrote.",
    },
    quickExit: {
      title: "Quick exit",
      body: "It clears the screen and leaves. It can't erase your browser history. On a shared phone, clear that yourself.",
    },
    deletion: {
      title: "Questions or deletion",
      body: "[Privacy contact]. [How to ask for deletion, to be confirmed.]",
    },
  },
  exit: {
    // Deliberately generic: the exit page must not identify this app.
    // Keep in sync with public/exit.html (static fallback, no app bundle).
    title: "New Tab",
  },
  error: {
    title: "This page didn't load",
    body: "Something went wrong. You can try again or leave.",
    tryAgain: "Try again",
    goHome: "Go home",
    exit: "Exit",
    // The static fallback page (src/lib/error-page.ts) serves the same purpose
    // without the app bundle, so its body wording is kept separately.
    fallbackBody: "Something went wrong on our end. You can try again or leave.",
  },
  notFound: {
    heading: "Page not found",
    body: "The page you're looking for doesn't exist or has been moved.",
    goHome: "Go home",
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
