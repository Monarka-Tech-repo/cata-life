import type { Dictionary } from "@/lib/i18n/dictionaries/es";
import type { LegalSection, ShowcaseSlideKey } from "@/lib/i18n/types";

const SUPPORT_EMAIL = "cata.support@monarka.tech";

const privacySections: LegalSection[] = [
  {
    title: "1. Introduction",
    paragraphs: [
      `MONARKA TECH LLC ("we", "our") develops CATA, a social food journal for logging dishes, discovering restaurants and sharing experiences with other users. This Privacy Policy explains what information we collect through the CATA app (iOS and Android) and this website, how we use it and what rights you have over it.`,
      "By using CATA you agree to the practices described in this policy. If you do not agree, please do not use the app.",
    ],
  },
  {
    title: "2. Information we collect",
    subsections: [
      {
        h3: "Account information",
        list: [
          "Name, email address and password when you create an account (securely managed through Firebase Authentication)",
          "If you sign in with Google or Apple, we receive the name and email address those providers share with us",
        ],
      },
      {
        h3: "Profile information and content",
        list: [
          "Profile photo, bio and preferences you set in the app",
          "Dish logs (Log Dish) with photos, ratings and notes",
          "Collections in My Menu, Food Journeys, Badges and your position on the Leaderboard",
          "Feed posts, comments, likes and the users you follow",
          "Restaurants marked as visited, reviews and, where applicable, claimed restaurant pages and Restaurant Mode content",
        ],
      },
      {
        h3: "Location",
        paragraphs: [
          "When you use nearby restaurant search features we ask for your approximate location, which is used at that moment to return relevant results and is not stored.",
          'If you turn on "Travel alerts" (optional, off by default), the app detects when you change cities so it can notify you. In that case we store only the name of the last detected city with your account — never exact coordinates or a location history. You can turn this feature off at any time in Settings.',
        ],
      },
      {
        h3: "Usage and device data",
        list: [
          "Basic interaction with the app (screens visited, features used) to improve CATA",
          "Device model, operating system version and app version, used for support and compatibility",
          "Push notification token, linked to your account, used only to send you in-app notifications",
        ],
      },
      {
        h3: "Tools on cata.life that don't require an account",
        paragraphs: [
          "You can use the Trip Planner and the Taste Quiz on our website without creating a CATA account. For these tools to work, we create an anonymous sign-in session — we do not collect your name or identity unless you provide it directly.",
        ],
        list: [
          "Trip Planner: if you save a trip without signing in, we ask for your email address so we can save it and notify you about it",
          "Taste Quiz: your favorite restaurants, your flavor preferences and, if you provide it, your email address. We use these answers, together with those of other users, to build a general taste profile that we will use in the future to recommend personalized food trips to you",
          'Community page: your flavor preferences (without your email or any other personal information) are added to aggregated, public community statistics. If you answer "Which restaurant would you recommend right now?" or add favorite restaurants in the Taste Quiz, the restaurant name is shown publicly on this page as a community recommendation — your identity is never shown with it',
        ],
      },
    ],
  },
  {
    title: "3. How we use your information",
    list: [
      "Create and maintain your CATA account",
      "Show your profile and content to other users according to your privacy settings",
      "Support social features: following, likes, comments, notifications",
      "Find restaurants and dishes near you",
      "Send in-app notifications about activity related to your content",
      "Improve the app based on aggregated usage patterns",
      "Save and notify you about trips created in the Planner without an account, and develop future personalized recommendations from Taste Quiz answers",
      "Comply with applicable legal obligations",
    ],
    paragraphs: [
      "We do not sell your personal information, we do not use it to build advertising profiles, and CATA does not include any third-party advertising or tracking SDKs.",
    ],
  },
  {
    title: "4. Third-party services",
    paragraphs: ["CATA uses the following third-party services, each with its own privacy policy:"],
    list: [
      "Firebase (Google) — authentication, database and photo storage: https://firebase.google.com/support/privacy",
      "Google Maps Platform — restaurant search and maps: https://policies.google.com/privacy",
      "Google Sign-In — optional social sign-in: https://policies.google.com/privacy",
      "Apple Sign-In — optional social sign-in (iOS): https://www.apple.com/legal/privacy/",
    ],
  },
  {
    title: "5. Sharing information",
    paragraphs: ["We do not sell, rent or trade your personal information. We only share it in these cases:"],
    list: [
      "With the service providers listed in the previous section, who help us operate CATA",
      "Public content from your profile (Feed, reviews, dishes) visible to other users according to your privacy settings",
      "If required by law, a court order or a government authority",
      "To protect the rights, safety or property of CATA, our users or the public",
    ],
  },
  {
    title: "6. Data retention and deletion",
    paragraphs: [
      "We keep your information while your account is active. You can delete your account at any time, directly in the app, under Settings → Account → Delete account. Deletion is permanent and immediate: your profile, dishes, posts, comments, likes, followers/following and all other content associated with your account are erased.",
      `You can also request deletion of your account by writing to ${SUPPORT_EMAIL}.`,
    ],
  },
  {
    title: "7. Your rights",
    paragraphs: ["Depending on where you live, you may have the right to:"],
    list: [
      "Access the personal data we hold about you",
      "Request correction of inaccurate data",
      "Request deletion of your account and data",
      "Object to or restrict the processing of your data",
      "Request portability of your data",
    ],
  },
  {
    title: "8. Children's privacy",
    paragraphs: [
      `CATA is not directed at children under 13 and we do not knowingly collect information from children under 13. If we learn that a child under 13 has provided us with personal data, we will delete it promptly. If you believe this has happened, write to us at ${SUPPORT_EMAIL}.`,
    ],
  },
  {
    title: "9. Security",
    paragraphs: [
      "We use industry-standard security measures, including encrypted transmission (HTTPS), Firebase's built-in security and Firestore rules that prevent unauthorized access to user data. No method of transmission over the internet is 100% secure.",
    ],
  },
  {
    title: "10. Changes to this policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time. We will announce significant changes by updating the date at the top of this page. Continued use of CATA after a change means you accept the updated policy.",
    ],
  },
  {
    title: "11. Contact",
    paragraphs: ["If you have questions about this Privacy Policy, contact us:"],
    list: ["Company: MONARKA TECH LLC", `Email: ${SUPPORT_EMAIL}`, "Website: cata.life"],
  },
];

const termsSections: LegalSection[] = [
  {
    title: "1. Acceptance of the terms",
    paragraphs: [
      `These Terms of Service ("Terms") govern the use of the CATA app (iOS and Android) and the cata.life website, operated by MONARKA TECH LLC ("we", "our"). By creating an account or using CATA you accept these Terms. If you do not agree, do not use the app or the website.`,
    ],
  },
  {
    title: "2. Eligibility",
    paragraphs: [
      "You must be at least 13 years old to create a CATA account. If you are between 13 and the age of majority in your jurisdiction, you confirm that you have permission from a parent or legal guardian to use the app.",
    ],
  },
  {
    title: "3. Your account",
    list: [
      "You are responsible for keeping your password confidential and for all activity that occurs in your account",
      "The information you provide (name, email, profile content) must be accurate and must not impersonate another person or entity",
      "You can delete your account at any time from Settings → Account → Delete account; deletion is immediate and permanent",
    ],
  },
  {
    title: "4. User content",
    paragraphs: [
      'CATA lets you post photos, ratings, reviews, comments and other content ("User Content"). You keep ownership of your User Content.',
      "By posting content on CATA, you grant us a worldwide, non-exclusive, royalty-free license to store, display, reproduce and distribute that content within the app and the website, solely to operate and promote CATA (for example, showing your review to other users or featuring recommendations on the Community page). This license ends when you delete the content or your account, except for copies already shared with other users or retained due to a legal obligation.",
      "You are solely responsible for the content you post. You must not post content that is false, defamatory, infringes the rights of others or violates applicable law.",
    ],
  },
  {
    title: "5. Conduct and community guidelines",
    paragraphs: ["By using CATA you agree not to:"],
    list: [
      "Post illegal, defamatory, harassing, discriminatory or sexually explicit content",
      "Impersonate another person, restaurant or entity, or create fake reviews",
      "Claim a restaurant's page without authorization to represent it",
      "Use bots, scraping or other automated means to access CATA without our consent",
      "Interfere with the normal operation of the app or attempt to access other users' accounts",
    ],
  },
  {
    title: "6. Restaurants and third-party content",
    paragraphs: [
      "Restaurant information (location, hours, menus) comes in part from Google Maps Platform and may contain inaccuracies. CATA does not guarantee the accuracy of this information or the quality of the restaurants listed.",
      "Restaurant owners can claim and manage their business page (Restaurant Mode). We reserve the right to verify such ownership and to remove content we consider fraudulent.",
    ],
  },
  {
    title: "7. Intellectual property",
    paragraphs: [
      "CATA, its logo, design and interface are the property of MONARKA TECH LLC and are protected by intellectual property laws. You may not copy, modify or distribute any part of the app or the website without our prior written consent.",
    ],
  },
  {
    title: "8. Termination",
    paragraphs: [
      "We may suspend or delete your account if you violate these Terms, if your use poses a security or legal risk to CATA or other users, or at your request. You may also stop using CATA and delete your account at any time.",
    ],
  },
  {
    title: "9. Disclaimer of warranties",
    paragraphs: [
      'CATA is provided "as is" and "as available", without warranties of any kind, express or implied. We do not guarantee that the app will be error-free, uninterrupted or available at all times.',
    ],
  },
  {
    title: "10. Limitation of liability",
    paragraphs: [
      "To the extent permitted by law, MONARKA TECH LLC will not be liable for indirect, incidental or consequential damages resulting from the use of CATA, including decisions made based on restaurant information posted by other users.",
    ],
  },
  {
    title: "11. Governing law and jurisdiction",
    paragraphs: [
      "These Terms are governed by the laws of the State of Arizona, United States, without giving effect to its conflict-of-laws provisions. Any dispute relating to these Terms or to the use of CATA will be subject to the exclusive jurisdiction of the state or federal courts located in Arizona.",
    ],
  },
  {
    title: "12. Changes to these Terms",
    paragraphs: [
      "We may update these Terms from time to time. We will announce significant changes by updating the date at the top of this page. Continued use of CATA after a change means you accept the updated Terms.",
    ],
  },
  {
    title: "13. Contact",
    paragraphs: ["If you have questions about these Terms of Service, contact us:"],
    list: ["Company: MONARKA TECH LLC", `Email: ${SUPPORT_EMAIL}`, "Website: cata.life"],
  },
];

const showcaseCaptions: Record<ShowcaseSlideKey, { title: string; text: string }> = {
  profile: { title: "Your taste profile", text: "CATA learns your style: favorite flavors, badges and stories from your meals." },
  explore: { title: "Explore around you", text: "Search dishes, restaurants and people, and find places near you that match your taste." },
  shuffle: { title: "Can't decide where to eat?", text: "Pick a cuisine and let CATA shuffle a spot near you." },
  restaurant: { title: "Get to know every restaurant", text: "Photos, ratings and address. Save it, mark it as visited or add it to your trip." },
  newEntry: { title: "Log every dish", text: "Add a photo, the date, the restaurant and who you shared it with." },
  rateTaste: { title: "Rate what you tasted", text: "Tag ingredients, flavors and aromas with an intensity from 1 to 5." },
  publish: { title: "Review and publish", text: "Confirm your review and choose who can see it." },
  radar: { title: "Your taste radar", text: "See which intensities define your palate: buttery, warm, sweet and more." },
  diary: { title: "Your food diary", text: "Keep every trip as a collection: Italy, Mexico City, Copenhagen and more." },
  route: { title: "Plan your route", text: "See your stops in order on the map, with one tap to get to each one." },
  addStop: { title: "Add stops to your trip", text: "Restaurant, dish, date, rating and notes for every stop." },
  lists: { title: "Lists worth discovering", text: "Save curated lists, request to join and share them with friends." },
  recipes: { title: "Create your own recipes", text: "Import from a link, photo or text, with ingredients and steps." },
};

const en: Dictionary = {
  meta: {
    siteDescription: "CATA — the social food journal by MONARKA TECH.",
    homeTitle: "CATA — Your social food journal",
    homeDescription:
      "Save your dishes, discover your taste profile and share the table with your friends. Download the CATA beta for iPhone.",
    homeShareDescription: "Remember what you ate, discover your taste and share the table.",
    ogLocale: "en_US",
  },
  common: {
    backHome: "← Back to home",
    homeAria: "Go to the CATA home page",
    lastUpdated: "Last updated",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    support: "Support",
    remove: "Remove",
    retry: "Try again",
    supportPersist: "If the problem continues, email us at",
  },
  nav: {
    taste: "My Taste Profile",
    planner: "Planner",
    community: "Community",
    signIn: "Sign in",
    signOut: "Sign out",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageLabel: "Language",
  },
  home: {
    badge: "Open beta for iPhone",
    heroTitle: "Your food journal,",
    heroHighlight: "shared.",
    heroBody:
      "Save the dishes you love, discover what defines your taste and share the table with the people who make every meal memorable.",
    testFlightCta: "Download on TestFlight",
    howItWorksLink: "See how it works",
    availability: "Available for iPhone · Limited spots · Free beta",
    benefitsEyebrow: "Everything you taste, in one place",
    benefitsTitle: "More than a list of restaurants",
    benefitsBody: "CATA connects your memories, your taste and your table so every outing leaves you with more than the check.",
    benefits: {
      diary: {
        title: "Your food journal",
        body: "Save every dish with photos, ratings and notes to remember what was truly worth it.",
      },
      share: {
        title: "Share the table",
        body: "Invite your friends, build everyone's order and split the check without losing the flavor of the moment.",
      },
      discover: {
        title: "Discover your taste",
        body: "Turn your logs into a living profile of cuisines, flavors and places that tell your story.",
      },
    },
    stepsEyebrow: "One meal. Three steps.",
    stepsTitle: "How your CATA story begins",
    steps: {
      try: { title: "Try something", body: "Visit a restaurant and snap a photo of the dish you want to remember." },
      story: {
        title: "Make it part of your story",
        body: "Rate it, tag its flavors and save the details that made the experience special.",
      },
      share: {
        title: "Share it",
        body: "Invite friends to your table, recommend the best and see what your friends are enjoying.",
      },
    },
    betaEyebrow: "Bring CATA to your next table",
    betaTitle: "Try the beta and help us serve something extraordinary.",
    betaBody:
      "We're building CATA with people who love discovering, remembering and sharing what they eat. Your experience can shape what comes next.",
    betaBenefits: ["Early access to new features", "Help shape the future of CATA", "Direct feedback through TestFlight"],
    qrAlt: "QR code to download the CATA beta on TestFlight",
    qrTitle: "Scan with your iPhone",
    qrBody: "Open the camera, point it at the code and join the beta on TestFlight.",
  },
  showcase: {
    imageAlt: "Screenshot of the CATA app",
    captions: showcaseCaptions,
  },
  support: {
    title: "Support",
    subtitle: "How can we help?",
    contactTitle: "Contact us",
    contactBody: "Have a question, a problem or an idea? Write to us directly and we'll get back to you as soon as possible.",
    faqTitle: "Frequently asked questions",
    faqs: [
      {
        question: "How do I report a bug or technical issue?",
        answer: `Email us at ${SUPPORT_EMAIL} telling us what happened and on which screen and, if you can, include a screenshot. We answer most emails within 48 hours.`,
      },
      {
        question: "How do I suggest a new feature?",
        answer: `We love hearing ideas. Send your suggestion to ${SUPPORT_EMAIL} — many of CATA's features came from TestFlight user feedback.`,
      },
      {
        question: "How do I delete my account and my data?",
        answer:
          "In the app, go to Settings → Account → Delete account. Deletion is immediate and permanent: your profile, dishes, posts, comments and all other associated content are erased. You can also request it by email.",
      },
      {
        question: "Does CATA cost anything?",
        answer:
          "No. CATA is free and is currently available as a public beta through TestFlight while we keep polishing the experience before the official launch.",
      },
      {
        question: "How do I get into the TestFlight beta?",
        answer:
          "Download Apple's TestFlight app and use the invitation link on the cata.life home page. If the beta is full, email us and we'll let you know when more spots open up.",
      },
      {
        question: "Where can I see what information CATA collects?",
        answer: "Everything about what data we use and how we protect it is in our Privacy Policy.",
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    lastUpdated: "August 2, 2026",
    sections: privacySections,
  },
  terms: {
    title: "Terms of Service",
    lastUpdated: "September 5, 2026",
    sections: termsSections,
  },
  notFound: {
    title: "We couldn't find this page",
    body: "The link may be mistyped, or the page may no longer exist.",
    home: "Go to home",
  },
  login: {
    metaTitle: "Sign in",
    title: "Your CATA account",
    subtitle: "The same account you use in the app.",
    signIn: "Sign in",
    signUp: "Create account",
    name: "Name",
    email: "Email",
    password: "Password",
    forgotPassword: "Forgot my password",
    forgotNeedsEmail: "Enter your email above and tap “Forgot my password” again.",
    resetSent: "We sent you an email to reset your password.",
    wait: "One moment…",
    or: "or",
    google: "Continue with Google",
    logoAlt: "CATA Dining Journal",
  },
  authErrors: {
    fallback: "Something went wrong. Please try again.",
    codes: {
      "auth/wrong-password": "Incorrect password.",
      "auth/invalid-credential": "Incorrect email or password.",
      "auth/user-not-found": "There's no account with that email.",
      "auth/email-already-in-use": "An account with that email already exists.",
      "auth/invalid-email": "That email isn't valid.",
      "auth/weak-password": "Your password must be at least 6 characters.",
      "auth/popup-closed-by-user": "The window was closed before sign-in finished. Please try again.",
      "auth/popup-blocked": "Your browser blocked the Google window. Allow pop-ups for this site and try again.",
      "auth/cancelled-popup-request": "The previous attempt was cancelled. Please try again.",
      "auth/unauthorized-domain": "This site isn't authorized for Google sign-in yet. Please contact support.",
      "auth/operation-not-allowed": "Google sign-in isn't available yet. Please contact support.",
      "auth/too-many-requests": "Too many attempts. Please try again in a few minutes.",
    },
  },
  joinTable: {
    metaTitle: "Join the table",
    metaDescription: "Accept an invitation and join a shared table on CATA.",
    loading: "Getting your seat ready…",
    unavailableTitle: "This invitation isn't available",
    unavailableBody: "The link may have expired or be incorrect, or the host may have closed invitations.",
    connectionTitle: "We couldn't open the invitation",
    connectionBody: "Check your connection and try again.",
    closedTitle: "This table is no longer accepting guests",
    closedBody: "Ask the host for a new invitation or check that the table is still open.",
    beFirst: "Be the first person to join.",
    peopleAtTable: (count: number) => `${count} people are already at the table`,
    peopleHere: (count: number) => (count === 1 ? "1 person is already here" : `${count} people are already here`),
    goToCata: "Go to CATA",
    joinedEyebrow: "You're at the table!",
    placeSaved: (name: string) => `${name}, your seat is saved.`,
    placeAlreadySaved: "Your seat was already saved.",
    openAppNote:
      "Open CATA to split the check, order and join in with the group. Those features are only available in the app.",
    downloadAndroid: "Download for Android",
    iphoneSoon: "iPhone version: coming soon to the App Store.",
    invitedEyebrow: "You've been invited to share the table",
    nameLabel: "What's your name?",
    namePlaceholder: "Your name",
    saving: "Saving your seat…",
    join: "Join the table",
    temporaryAccess: "Continuing creates secure temporary access to add you to this table.",
    defaultTableName: "CATA table",
    defaultRestaurant: "Restaurant to be confirmed",
    defaultGuest: "Guest",
  },
  taste: {
    title: "My Taste Profile",
    subtitle: "Based on the dishes you've logged in CATA.",
    loadError: "We couldn't load your taste profile. Please try again later.",
    empty: "You haven't logged any dishes yet — open the CATA app to log your first one and your taste profile will appear here.",
    haveAccount: "Already have a CATA account?",
    signInLink: "Sign in",
    haveAccountRest: "to see your real profile based on the dishes you've logged. If not, try this quick quiz:",
    vesselLabel: "Breakdown of your taste profile",
    modes: { type: "FOOD TYPE", taste: "FLAVOR", cuisine: "CUISINE", ratings: "RATINGS" },
    emptyHints: {
      type: "Log dishes in the app to see your breakdown by food type",
      taste: "Log dishes with flavor tags to see your flavor profile",
      cuisine: "Log dishes at different restaurants to see your breakdown by cuisine",
      ratings: "Rate tagged dishes to see what you rate highest",
    },
    entries: (count: number) => `${count} ${count === 1 ? "entry" : "entries"}`,
  },
  quiz: {
    saveError: "We couldn't save your answers. Please try again.",
    doneEyebrow: "All set!",
    doneTitle: "Your first taste profile",
    doneBody: "We saved your answers — soon we'll use them to recommend personalized food trips to you.",
    flavorsQuestion: "Which flavors do you like most?",
    favoriteRestaurants: "Your favorite restaurants",
    emailLabel: "Email (optional)",
    emailPlaceholder: "So we can let you know when we have recommendations for you",
    saving: "Saving…",
    submit: "See my taste profile",
  },
  flavors: {
    Sweet: "Sweet",
    Sour: "Sour",
    Salty: "Salty",
    Bitter: "Bitter",
    Spicy: "Spicy",
    Umami: "Umami",
    Smoky: "Smoky",
  },
  planner: {
    title: "Trip Planner",
    subtitle: "Save restaurants for your next trip — synced with the CATA app.",
    loadError: "We couldn't load your trips. Please try again later.",
    yourTrips: "Your trips",
    newTrip: "New trip",
    emptyList: "You haven't created any trips yet. Create one to start saving restaurants you want to visit.",
    noCity: "No city",
    restaurantCount: (count: number) => `${count} ${count === 1 ? "restaurant" : "restaurants"}`,
    allTrips: "← All your trips",
    noRestaurants: "There are no restaurants in this trip yet.",
    tripTitle: "Trip title",
    tripTitlePlaceholder: "E.g. Weekend in Austin",
    city: "City",
    cityPlaceholder: "Optional — detected from the first restaurant",
    email: "Email",
    emailPlaceholder: "To save your trip and send you updates about it",
    createError: "We couldn't create your trip. Please try again.",
    creating: "Creating…",
    create: "Create trip",
    cancel: "Cancel",
  },
  picker: {
    loadError: "We couldn't load restaurant search. Please try again later.",
    label: "Add a restaurant",
    loading: "Loading search…",
    placeholder: "Search for a restaurant",
  },
  community: {
    title: "Community",
    subtitle: "Tastes and recommendations from everyone who has used CATA — no account needed.",
    worldTitle: "Tastes around the world",
    worldSubtitle: "Filter by city to see how people eat there.",
    communityTitle: "How the community tastes",
    pollEyebrow: "One quick question",
    pollTitle: "Which restaurant would you recommend right now?",
    pollSubtitle: "No account, no long forms — just type the name.",
    pollError: "We couldn't save your recommendation. Please try again.",
    pollThanksBefore: "Thanks! We added",
    pollThanksAfter: "to the community's recommendations.",
    recentlyRecommended: "Recently recommended",
    statsError: "We couldn't load the community stats.",
    statsEmpty: "There aren't enough answers yet — be one of the first to take the taste quiz.",
    basedOn: (count: number) => `Based on ${count} ${count === 1 ? "person" : "people"} who took the taste quiz.`,
    topRestaurants: "Most recommended restaurants",
    recommendationCount: (count: number) => `${count} ${count === 1 ? "recommendation" : "recommendations"}`,
    googleRating: (rating: string) => `★ ${rating} on Google`,
    googleReviews: (count: number) => ` · ${count} reviews`,
    viewOnMaps: "View on Google Maps",
    worldError: "We couldn't load tastes from around the world.",
    worldEmpty: "There aren't enough dishes logged in CATA to show this yet.",
    cityEmpty: "We couldn't find any dishes logged in that city.",
    citySearch: "Search for a city",
    citySearchPlaceholder: "E.g. Chicago or New York",
  },
};

export default en;
