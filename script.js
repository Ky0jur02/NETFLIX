/* ==============================================================
   STREAMFLIX - script.js

    1. Reference data (languages, plans, FAQs)
    2. Title catalog + episode generator
    3. Small helpers (storage, toast, formatting)
    4. Auth (log in / sign up / guest / sign out)
    5. Profiles (who's watching, manage, add/edit/delete)
    6. Per-profile data (My List, Continue Watching, history)
    7. Subscription / plans / billing
    8. Notifications
    9. Language / i18n
   10. Card + row builders (with kids-profile filtering)
   11. Page renderers (Home, Movies, TV, New&Popular, My List, Plans,
       Account, Manage Profiles, Help)
   12. Search + filters
   13. Info modal (details, episodes, more like this)
   14. Video player
   15. Confirm modal helper
   16. Navbar wiring + startup
   ============================================================== */


/* ==============================================================
   1. REFERENCE DATA
   ============================================================== */
const LANGUAGES = [
  { code: "en",  label: "English" },
  { code: "fil", label: "Filipino" },
  { code: "es",  label: "Español" },
  { code: "fr",  label: "Français" },
  { code: "de",  label: "Deutsch" },
  { code: "ja",  label: "日本語" },
  { code: "ko",  label: "한국어" },
  { code: "zh",  label: "中文" },
];

// Interface translations. Only a handful of core labels are translated -
// more keys/languages can be added here without touching any other code.
const I18N = {
  en:  { navHome: "Home", navMovies: "Movies",        navTv: "TV Shows",      navNew: "New & Popular",       navMyList: "My List" },
  fil: { navHome: "Home", navMovies: "Mga Pelikula",   navTv: "Mga Palabas",   navNew: "Bago at Sikat",       navMyList: "Aking Listahan" },
  es:  { navHome: "Inicio", navMovies: "Películas",    navTv: "Series",        navNew: "Novedades",           navMyList: "Mi Lista" },
  fr:  { navHome: "Accueil", navMovies: "Films",       navTv: "Séries",        navNew: "Nouveautés",          navMyList: "Ma Liste" },
  de:  { navHome: "Start", navMovies: "Filme",         navTv: "Serien",        navNew: "Neu & Beliebt",       navMyList: "Meine Liste" },
  ja:  { navHome: "ホーム", navMovies: "映画",          navTv: "テレビ番組",     navNew: "新着・人気",           navMyList: "マイリスト" },
  ko:  { navHome: "홈",    navMovies: "영화",           navTv: "TV 프로그램",    navNew: "NEW! 요즘 대세",       navMyList: "내가 찜한 콘텐츠" },
  zh:  { navHome: "首页",  navMovies: "电影",           navTv: "电视剧",        navNew: "新品和热门",           navMyList: "我的片单" },
};

const AUDIO_LANGS = ["English", "Filipino", "Spanish", "French", "Japanese", "Korean"];
const SUB_LANGS = ["English", "Filipino", "Spanish", "French", "Japanese", "Korean"];

const PLANS = [
  { id: "basic",    name: "Basic",    price: 199, perks: ["1 device at a time", "HD available where offered", "Limited downloads", "Standard subtitles"] },
  { id: "standard", name: "Standard", price: 349, perks: ["2 devices at a time", "Full HD available where offered", "Downloads on 2 devices", "Multiple profiles", "Better audio"] },
  { id: "premium",  name: "Premium",  price: 549, perks: ["4 devices at a time", "4K + HDR available where offered", "Downloads on 4 devices", "Multiple profiles", "Premium spatial audio"] },
];

const FAQS = [
  { q: "How many profiles can one account have?", a: "Up to five - manage them anytime from the profile menu or the Manage Profiles page." },
  { q: "How does Continue Watching work?", a: "STREAMFLIX simulates your playback position and saves it to this browser, so paused titles pick up where you left off." },
  { q: "Can I change my plan?", a: "Yes. Open Plans & Subscription and choose Upgrade or Downgrade - the change applies immediately in this demo." },
  { q: "Is my payment information real?", a: "No. This is a school project - no real payments are ever processed and no real card numbers are stored." },
  { q: "How do Kids profiles work?", a: "A Kids profile only shows family-friendly titles and hides mature browsing, search filters, and account settings." },
  { q: "Where is my data stored?", a: "Everything - profiles, My List, progress, settings - lives only in this browser's local storage. Clearing your browser data resets STREAMFLIX." },
];


/* ==============================================================
   2. TITLE CATALOG
   All titles, cast, and posters below are entirely fictional.
   ============================================================== */
const TITLES = [
  { id: 1, title: "Crimson Horizon", year: 2026, genre: ["Action"], type: "movie", maturity: "PG-13", runtime: 118, rating: "8.7",
    description: "A disgraced pilot is given one last chance to stop a hijacked satellite from falling on the city she swore to protect.",
    cast: ["Talia Vance", "Marcus Odell", "Priya Nandan"], director: "Renata Cole",
    audioLangs: ["English", "Filipino", "Spanish"], subLangs: ["English", "Filipino", "Spanish", "French"],
    tags: ["trending", "action", "popular", "featured"], featured: true, trendingRank: 1, addedDate: "2026-09-10" },
  { id: 2, title: "The Glass Orchard", year: 2025, genre: ["Drama"], type: "movie", maturity: "PG-13", runtime: 124, rating: "8.2",
    description: "Three estranged sisters return to their family's failing vineyard and uncover a secret that changes everything they believed about their mother.",
    cast: ["Ines Baptiste", "Carmen Ruiz", "Hana Ostrowski"], director: "Felix Moreau",
    audioLangs: ["English", "French"], subLangs: ["English", "Filipino", "French"],
    tags: ["trending", "popular", "drama"], featured: false, trendingRank: 2, addedDate: "2025-11-02" },
  { id: 3, title: "Nightfall Protocol", year: 2026, genre: ["Sci-Fi"], type: "movie", maturity: "PG-13", runtime: 131, rating: "9.0",
    description: "When the world's clocks stop at midnight, a systems engineer has six hours to find out why before the blackout becomes permanent.",
    cast: ["Delano Frost", "Yuna Baek", "Oscar Lindqvist"], director: "Mireille Tan",
    audioLangs: ["English", "Korean", "Japanese"], subLangs: ["English", "Filipino", "Korean", "Japanese"],
    tags: ["trending", "scifi", "popular", "featured"], featured: true, trendingRank: 3, addedDate: "2026-08-20" },
  { id: 4, title: "Paper Lanterns", year: 2024, genre: ["Comedy"], type: "movie", maturity: "PG", runtime: 101, rating: "7.6",
    description: "A wedding planner double-books two ceremonies on the same night at the same venue, and neither couple is willing to reschedule.",
    cast: ["Joy Villaverde", "Ben Okafor", "Ana Reyes"], director: "Sam Whitfield",
    audioLangs: ["English", "Filipino"], subLangs: ["English", "Filipino"],
    tags: ["trending", "comedy"], featured: false, trendingRank: 4, addedDate: "2024-05-14" },
  { id: 5, title: "Hollow Creek", year: 2025, genre: ["Horror"], type: "movie", maturity: "R", runtime: 109, rating: "8.0",
    description: "A small town's yearly fog rolls in three days early, and the people who go missing in it never remember where they've been.",
    cast: ["Nadia Voss", "Colton Reyes", "Priyanka Shah"], director: "Ola Bergman",
    audioLangs: ["English"], subLangs: ["English", "Spanish", "French"],
    tags: ["trending", "horror"], featured: false, trendingRank: 5, addedDate: "2025-10-01" },
  { id: 6, title: "The Long Static", year: 2026, genre: ["Sci-Fi"], type: "tv", maturity: "TV-14", seasonCount: 2, rating: "8.4",
    description: "A radio operator on an abandoned research station starts receiving messages from a version of the crew that never evacuated.",
    cast: ["Mika Sorensen", "Diego Fuentes", "Wren Abara"], director: "Showrunner Iris Kwan",
    audioLangs: ["English", "Korean"], subLangs: ["English", "Filipino", "Korean"],
    tags: ["trending", "tv", "scifi", "featured"], featured: true, trendingRank: 6, addedDate: "2026-07-18" },
  { id: 7, title: "Iron Ledger", year: 2023, genre: ["Drama"], type: "movie", maturity: "PG-13", runtime: 112, rating: "7.9",
    description: "A junior accountant discovers her firm has been laundering money through client trust funds, and blowing the whistle will cost her everything.",
    cast: ["Grace Alcantara", "Tomasz Nowak", "Leilani Cruz"], director: "Renata Cole",
    audioLangs: ["English"], subLangs: ["English", "Filipino"],
    tags: ["trending", "popular", "drama"], featured: false, trendingRank: 7, addedDate: "2023-11-09" },
  { id: 8, title: "Skybound Racers", year: 2025, genre: ["Action"], type: "movie", maturity: "PG-13", runtime: 104, rating: "7.3",
    description: "An underground league of anti-gravity racers competes across the ruins of a flooded coastal city for a prize no one has ever collected.",
    cast: ["Kofi Mensah", "Rin Tanaka", "Ella Whitmore"], director: "Devon Marsh",
    audioLangs: ["English", "Japanese"], subLangs: ["English", "Filipino", "Japanese"],
    tags: ["trending", "action"], featured: false, trendingRank: 8, addedDate: "2025-06-27" },
  { id: 9, title: "Marigold Ave", year: 2024, genre: ["Comedy"], type: "tv", maturity: "TV-14", seasonCount: 3, rating: "7.8",
    description: "Four roommates try to keep their crumbling rent-controlled apartment a secret from a landlord who wants them gone.",
    cast: ["Ravi Deshmukh", "Carla Jimenez", "Noor Haddad"], director: "Showrunner Patty Lin",
    audioLangs: ["English", "Filipino"], subLangs: ["English", "Filipino", "Spanish"],
    tags: ["trending", "tv", "comedy"], featured: false, trendingRank: 9, addedDate: "2024-02-11" },
  { id: 10, title: "The Quiet Verdict", year: 2026, genre: ["Drama"], type: "movie", maturity: "PG-13", runtime: 128, rating: "8.6",
    description: "A retired judge is asked to reopen the one case of her career she has never been able to let go of.",
    cast: ["Helena Marsh", "Adewale Bello", "Junko Ishida"], director: "Felix Moreau",
    audioLangs: ["English"], subLangs: ["English", "Filipino", "French"],
    tags: ["trending", "popular", "drama", "featured"], featured: true, trendingRank: 10, addedDate: "2026-06-05" },

  { id: 11, title: "Copper Tide", year: 2022, genre: ["Action"], type: "movie", maturity: "PG-13", runtime: 106, rating: "7.1",
    description: "A salvage crew stumbles onto a sunken cargo ship carrying something far more dangerous than gold.",
    cast: ["Levi Sorenson", "Ama Boateng", "Chris Villareal"], director: "Devon Marsh",
    audioLangs: ["English"], subLangs: ["English", "Spanish"], tags: ["popular", "action"], addedDate: "2022-08-19" },
  { id: 12, title: "Ember & Frost", year: 2023, genre: ["Drama"], type: "movie", maturity: "PG-13", runtime: 115, rating: "8.1",
    description: "Two rival chefs are forced to run the same restaurant for a year after their grandfather's will splits ownership evenly.",
    cast: ["Marisol Vega", "Theo Lindgren", "Aiko Fujimori"], director: "Mireille Tan",
    audioLangs: ["English"], subLangs: ["English", "Filipino"], tags: ["popular", "drama"], addedDate: "2023-04-02" },
  { id: 13, title: "Static Bloom", year: 2025, genre: ["Sci-Fi"], type: "movie", maturity: "PG-13", runtime: 118, rating: "7.7",
    description: "Plants across the world begin growing in perfect geometric patterns, and a botanist realizes they're forming a message.",
    cast: ["Ingrid Solheim", "Marcus Odell", "Farrah Jalil"], director: "Ola Bergman",
    audioLangs: ["English"], subLangs: ["English", "Filipino"], tags: ["popular", "scifi"], addedDate: "2025-03-15" },
  { id: 14, title: "Late Checkout", year: 2024, genre: ["Comedy"], type: "movie", maturity: "PG", runtime: 97, rating: "7.2",
    description: "A hotel manager has one night to hide a celebrity guest's disastrous secret from the press camped in the lobby.",
    cast: ["Ben Okafor", "Lucia Ferretti", "Sam Whitfield"], director: "Sam Whitfield",
    audioLangs: ["English"], subLangs: ["English", "French"], tags: ["popular", "comedy"], addedDate: "2024-09-08" },
  { id: 15, title: "The Rust Choir", year: 2021, genre: ["Drama"], type: "movie", maturity: "PG", runtime: 109, rating: "8.3",
    description: "Former factory workers form a choir to save their town hall from demolition, and rediscover why they stayed friends.",
    cast: ["Walter Nkemelu", "Jean Cadieux", "Rosa Delgado"], director: "Felix Moreau",
    audioLangs: ["English", "French"], subLangs: ["English", "French"], tags: ["popular", "drama"], addedDate: "2021-12-03" },
  { id: 16, title: "Dead Reckoning Bay", year: 2023, genre: ["Horror"], type: "movie", maturity: "R", runtime: 101, rating: "6.9",
    description: "A lighthouse keeper's replacement finds the logbook full of warnings written in her own handwriting.",
    cast: ["Petra Vance", "Isaiah Cole", "Meryem Aksoy"], director: "Ola Bergman",
    audioLangs: ["English"], subLangs: ["English"], tags: ["popular", "horror"], addedDate: "2023-10-22" },
  { id: 17, title: "Velvet Circuit", year: 2026, genre: ["Sci-Fi"], type: "movie", maturity: "PG-13", runtime: 122, rating: "8.5",
    description: "An android built to replace a missing musician starts writing songs the original never lived long enough to finish.",
    cast: ["Rin Tanaka", "Bastian Hoffer", "Simone Okonkwo"], director: "Mireille Tan",
    audioLangs: ["English", "Japanese"], subLangs: ["English", "Filipino", "Japanese"], tags: ["popular", "scifi", "newRelease"], addedDate: "2026-09-01" },
  { id: 18, title: "Northbound", year: 2022, genre: ["Drama"], type: "movie", maturity: "PG-13", runtime: 111, rating: "7.5",
    description: "A long-haul trucker takes on one last cross-country route to deliver a letter she's been avoiding reading for years.",
    cast: ["Dolores Pham", "Grant Okafor", "Vera Lindqvist"], director: "Renata Cole",
    audioLangs: ["English"], subLangs: ["English", "Filipino"], tags: ["popular", "drama"], addedDate: "2022-05-30" },

  { id: 19, title: "Blackout City", year: 2025, genre: ["Action"], type: "movie", maturity: "PG-13", runtime: 114, rating: "7.8",
    description: "When the power grid fails across an entire metro area, a transit cop has twelve hours to stop a heist hiding inside the chaos.",
    cast: ["Camille Duarte", "Nate Ferreira", "Yuki Amano"], director: "Devon Marsh",
    audioLangs: ["English"], subLangs: ["English", "Spanish"], tags: ["action"], addedDate: "2025-01-17" },
  { id: 20, title: "Redline", year: 2023, genre: ["Action"], type: "movie", maturity: "PG-13", runtime: 103, rating: "7.0",
    description: "A disqualified stunt driver infiltrates an illegal circuit to clear her late brother's name.",
    cast: ["Selin Kaya", "Marcus Odell", "DeShawn Price"], director: "Devon Marsh",
    audioLangs: ["English"], subLangs: ["English"], tags: ["action"], addedDate: "2023-07-04" },
  { id: 21, title: "Steel Meridian", year: 2024, genre: ["Action"], type: "movie", maturity: "PG-13", runtime: 108, rating: "7.4",
    description: "A private security contractor is hired to protect a scientist whose invention every government wants.",
    cast: ["Talia Vance", "Otis Brandt", "Nina Pavlic"], director: "Renata Cole",
    audioLangs: ["English"], subLangs: ["English", "Filipino"], tags: ["action"], addedDate: "2024-04-19" },
  { id: 22, title: "The Last Checkpoint", year: 2026, genre: ["Action"], type: "movie", maturity: "PG-13", runtime: 121, rating: "8.0",
    description: "Soldiers on opposite sides of a ceasefire have to work together when the border itself starts collapsing.",
    cast: ["Idris Okonjo", "Mateus Leal", "Priya Nandan"], director: "Mireille Tan",
    audioLangs: ["English"], subLangs: ["English", "French"], tags: ["action", "newRelease"], addedDate: "2026-09-12" },

  { id: 23, title: "Sunday Roast", year: 2024, genre: ["Comedy"], type: "movie", maturity: "PG", runtime: 96, rating: "7.4",
    description: "A family's weekly dinner turns chaotic when three exes show up uninvited on the same afternoon.",
    cast: ["Ana Reyes", "Liam Okafor", "Beatriz Nunes"], director: "Sam Whitfield",
    audioLangs: ["English", "Filipino"], subLangs: ["English", "Filipino"], tags: ["comedy"], addedDate: "2024-06-21" },
  { id: 24, title: "The Understudy", year: 2023, genre: ["Comedy"], type: "movie", maturity: "PG", runtime: 99, rating: "7.1",
    description: "A community theater actor gets one real shot at Broadway, on the same night as her sister's wedding.",
    cast: ["Joy Villaverde", "Karim Aziz", "Petra Holm"], director: "Sam Whitfield",
    audioLangs: ["English"], subLangs: ["English"], tags: ["comedy"], addedDate: "2023-02-14" },
  { id: 25, title: "Parallel Parking", year: 2025, genre: ["Comedy"], type: "movie", maturity: "PG-13", runtime: 94, rating: "6.9",
    description: "Two strangers keep getting matched as roommates by every app they use, in every city they move to.",
    cast: ["Noor Haddad", "Jonas Kessler", "Michelle Uy"], director: "Devon Marsh",
    audioLangs: ["English"], subLangs: ["English", "Filipino"], tags: ["comedy", "newRelease"], addedDate: "2025-11-19" },

  { id: 26, title: "Wraithwood", year: 2024, genre: ["Horror"], type: "movie", maturity: "R", runtime: 106, rating: "7.9",
    description: "A forestry surveyor keeps finding the same abandoned cabin no matter which direction she hikes.",
    cast: ["Freya Halvorsen", "Marcus Odell", "Dalisay Santos"], director: "Ola Bergman",
    audioLangs: ["English"], subLangs: ["English"], tags: ["horror"], addedDate: "2024-10-11" },
  { id: 27, title: "The Tenth Floor", year: 2023, genre: ["Horror"], type: "movie", maturity: "R", runtime: 98, rating: "7.2",
    description: "An office building's tenth floor doesn't appear on any blueprint, but the night cleaning crew keeps finding new doors to it.",
    cast: ["Isaiah Cole", "Henrike Voss", "Diego Fuentes"], director: "Ola Bergman",
    audioLangs: ["English"], subLangs: ["English"], tags: ["horror"], addedDate: "2023-09-06" },

  { id: 28, title: "Halfmoon Prep", year: 2025, genre: ["Drama"], type: "tv", maturity: "TV-14", seasonCount: 2, rating: "8.0",
    description: "A scholarship student navigates a boarding school built on generations of secrets that go back further than she knows.",
    cast: ["Bianca Holloway", "Femi Adeyemi", "Charlotte Reyes"], director: "Showrunner Grace Iwu",
    audioLangs: ["English"], subLangs: ["English", "Filipino"], tags: ["tv", "drama", "featured"], featured: true, addedDate: "2025-08-14" },
  { id: 29, title: "Counteroffer", year: 2026, genre: ["Drama"], type: "tv", maturity: "TV-14", seasonCount: 1, rating: "8.3",
    description: "Rival startup founders are forced into a merger neither of them wants, and neither can afford to lose.",
    cast: ["Priyanka Shah", "Aldo Marchetti", "Sena Park"], director: "Showrunner Marcus Abbot",
    audioLangs: ["English", "Korean"], subLangs: ["English", "Filipino", "Korean"], tags: ["tv", "drama", "newRelease"], addedDate: "2026-08-02" },
  { id: 30, title: "Nightshift Diner", year: 2023, genre: ["Comedy"], type: "tv", maturity: "TV-14", seasonCount: 3, rating: "7.6",
    description: "The regulars at a 24-hour diner become an unlikely found family across a decade of graveyard shifts.",
    cast: ["Carla Jimenez", "Otis Brandt", "Miho Kondo"], director: "Showrunner Patty Lin",
    audioLangs: ["English"], subLangs: ["English", "Filipino"], tags: ["tv", "comedy"], addedDate: "2023-05-09" },
  { id: 31, title: "The Understory", year: 2025, genre: ["Sci-Fi"], type: "tv", maturity: "TV-14", seasonCount: 1, rating: "8.2",
    description: "Park rangers in an old-growth forest discover the trees have been recording everything for a thousand years - and something wants that record erased.",
    cast: ["Wren Abara", "Soledad Rivas", "Lukas Reinholt"], director: "Showrunner Iris Kwan",
    audioLangs: ["English"], subLangs: ["English", "Filipino"], tags: ["tv", "scifi"], addedDate: "2025-04-27" },
  { id: 32, title: "Borrowed Time", year: 2026, genre: ["Sci-Fi"], type: "tv", maturity: "TV-14", seasonCount: 2, rating: "8.6",
    description: "A hospice nurse discovers she can see exactly how much time each patient has left, down to the second.",
    cast: ["Helena Marsh", "DeShawn Price", "Yuna Baek"], director: "Showrunner Iris Kwan",
    audioLangs: ["English"], subLangs: ["English", "Filipino", "Spanish"], tags: ["tv", "scifi", "topPicks"], addedDate: "2026-07-30" },

  { id: 33, title: "Glimmerworks", year: 2025, genre: ["Animation", "Adventure"], type: "tv", maturity: "PG-13", seasonCount: 2, rating: "8.4",
    description: "Two rival lantern-makers in a floating city discover their newest inventions are quietly rewriting the laws of gravity.",
    cast: ["Voice: Aiko Fujimori", "Voice: Tomasz Nowak"], director: "Showrunner Rei Nakashima",
    audioLangs: ["Japanese", "English"], subLangs: ["English", "Filipino", "Japanese"], tags: ["tv", "anime", "animation"], addedDate: "2025-02-20" },
  { id: 34, title: "Sundown Racers", year: 2024, genre: ["Animation", "Action"], type: "tv", maturity: "PG-13", seasonCount: 1, rating: "7.9",
    description: "A disbanded team of teenage hover-bike racers reunites to stop a corporate takeover of their home track.",
    cast: ["Voice: Rin Tanaka", "Voice: Kofi Mensah"], director: "Showrunner Rei Nakashima",
    audioLangs: ["Japanese", "English"], subLangs: ["English", "Filipino", "Japanese"], tags: ["tv", "anime"], addedDate: "2024-08-08" },

  { id: 35, title: "Pip & the Paper Moon", year: 2024, genre: ["Animation", "Adventure"], type: "movie", maturity: "G", runtime: 88, rating: "7.8",
    description: "A paper crane comes to life and helps a lonely kid fold an entire moon out of origami to bring back her grandmother's stories.",
    cast: ["Voice: Michelle Uy", "Voice: Karim Aziz"], director: "Lotte Andersen",
    audioLangs: ["English", "Filipino"], subLangs: ["English", "Filipino", "Spanish"],
    tags: ["animation", "adventure", "kids", "featured"], kidsFriendly: true, featured: true, addedDate: "2024-07-12" },
  { id: 36, title: "Barnaby's Backyard", year: 2023, genre: ["Animation"], type: "tv", maturity: "G", seasonCount: 2, rating: "7.5",
    description: "A curious basset hound and the bugs living in his backyard solve a gentle little mystery every episode.",
    cast: ["Voice: Sam Whitfield"], director: "Showrunner Lotte Andersen",
    audioLangs: ["English", "Filipino"], subLangs: ["English", "Filipino"], tags: ["tv", "animation", "kids"], kidsFriendly: true, addedDate: "2023-03-03" },
  { id: 37, title: "The Marble Kingdom", year: 2025, genre: ["Animation", "Adventure"], type: "movie", maturity: "PG", runtime: 92, rating: "8.0",
    description: "A shy marble rolls out of her orderly kingdom and has to team up with a chaotic rubber ball to find her way home.",
    cast: ["Voice: Beatriz Nunes", "Voice: Jonas Kessler"], director: "Lotte Andersen",
    audioLangs: ["English", "Filipino"], subLangs: ["English", "Filipino"], tags: ["animation", "adventure", "kids", "newRelease"], kidsFriendly: true, addedDate: "2025-12-05" },
  { id: 38, title: "Sprocket & Nell", year: 2022, genre: ["Animation"], type: "tv", maturity: "G", seasonCount: 3, rating: "7.6",
    description: "A tiny robot and a curious raccoon fix up the forgotten machines of an overgrown junkyard, one gadget at a time.",
    cast: ["Voice: Noor Haddad", "Voice: Otis Brandt"], director: "Showrunner Lotte Andersen",
    audioLangs: ["English", "Filipino"], subLangs: ["English", "Filipino"], tags: ["tv", "animation", "kids"], kidsFriendly: true, addedDate: "2022-11-27" },

  { id: 39, title: "The Ember Line", year: 2026, genre: ["Action"], type: "movie", maturity: "PG-13", runtime: 0, rating: "-",
    description: "A decommissioned train conductor is called back for one impossible run through a city on fire.",
    cast: ["Talia Vance", "Idris Okonjo"], director: "Renata Cole",
    audioLangs: ["English"], subLangs: ["English", "Filipino"], tags: ["comingSoon"], comingSoon: true, releaseLabel: "Coming November 2026", addedDate: "2026-09-20" },
  { id: 40, title: "Second Sun", year: 2026, genre: ["Sci-Fi"], type: "tv", maturity: "TV-14", seasonCount: 0, rating: "-",
    description: "When a second sun appears in the sky overnight, an astronomer has to figure out if it's a miracle or a countdown.",
    cast: ["Mika Sorensen", "Sena Park"], director: "Showrunner Iris Kwan",
    audioLangs: ["English"], subLangs: ["English", "Filipino"], tags: ["comingSoon"], comingSoon: true, releaseLabel: "Coming December 2026", addedDate: "2026-09-22" },
  { id: 41, title: "Puddlejump", year: 2026, genre: ["Animation", "Adventure"], type: "movie", maturity: "G", runtime: 0, rating: "-",
    description: "A rain boot named Puddlejump sets off to reunite a lost umbrella with a little kid before the storm ends.",
    cast: ["Voice: Ana Reyes"], director: "Lotte Andersen",
    audioLangs: ["English", "Filipino"], subLangs: ["English", "Filipino"], tags: ["comingSoon", "kids"], comingSoon: true, kidsFriendly: true, releaseLabel: "Coming Spring 2027", addedDate: "2026-09-24" },
];

// Procedurally builds season/episode data for TV shows so we don't have to
// hand-write dozens of episodes. Titles/descriptions are generic on purpose.
const EPISODE_NAME_BANK = ["Pilot", "Static", "Crossing Over", "The Long Way Round", "Aftershock", "Undertow", "Borrowed Time", "Fault Lines", "Daybreak", "The Reckoning", "Afterglow", "Home Stretch"];
function buildSeasons(show) {
  const seasons = [];
  for (let s = 1; s <= show.seasonCount; s++) {
    const episodes = [];
    for (let e = 1; e <= 5; e++) {
      episodes.push({
        id: `${show.id}-s${s}e${e}`,
        number: e,
        title: EPISODE_NAME_BANK[(e - 1 + s) % EPISODE_NAME_BANK.length],
        description: show.description,
        runtime: 36 + ((show.id * 7 + s * 11 + e * 5) % 20),
      });
    }
    seasons.push({ seasonNumber: s, episodes });
  }
  return seasons;
}
TITLES.filter((t) => t.type === "tv" && t.seasonCount > 0).forEach((t) => { t.seasons = buildSeasons(t); });

function findTitle(id) { return TITLES.find((t) => t.id === Number(id)); }
function seedFor(t) { return "sf-" + t.id + "-" + t.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"); }
function posterUrl(t) { return `https://picsum.photos/seed/${seedFor(t)}/400/600`; }
function backdropUrl(t) { return `https://picsum.photos/seed/${seedFor(t)}-wide/1280/720`; }
function formatRuntime(t) {
  if (t.comingSoon) return t.releaseLabel;
  if (t.type === "tv") return `${t.seasonCount} Season${t.seasonCount === 1 ? "" : "s"}`;
  const h = Math.floor(t.runtime / 60), m = t.runtime % 60;
  return `${h}h ${m}m`;
}
function formatClock(totalSeconds) {
  totalSeconds = Math.max(0, Math.round(totalSeconds));
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const mm = h > 0 ? String(m).padStart(2, "0") : m;
  const ss = String(s).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}


/* ==============================================================
   3. SMALL HELPERS
   ============================================================== */
function readJSON(key, fallback) { try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch (e) { return fallback; } }
function writeJSON(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage unavailable - fail quietly */ } }

let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}


/* ==============================================================
   4. AUTH
   ============================================================== */
const AVATAR_COLORS = ["#e5303f", "#f3c257", "#4f8cff", "#38c98f", "#b25cf0", "#ff8a3d"];

function getUsers() { return readJSON("sf_users", {}); }
function currentUsername() { return localStorage.getItem("sf_session"); }
function currentAccount() {
  const username = currentUsername();
  if (!username) return null;
  const users = getUsers();
  return users[username] ? { username, ...users[username] } : null;
}

function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById("login-username").value.trim().toLowerCase();
  const password = document.getElementById("login-password").value;
  const errorEl = document.getElementById("login-error");
  const account = getUsers()[username];
  if (!account || account.password !== password) {
    errorEl.textContent = "That username and password don't match any account.";
    errorEl.hidden = false;
    return;
  }
  errorEl.hidden = true;
  localStorage.setItem("sf_session", username);
  afterSignIn();
}

function handleSignup(event) {
  event.preventDefault();
  const email = document.getElementById("signup-email").value.trim();
  const username = document.getElementById("signup-username").value.trim().toLowerCase();
  const password = document.getElementById("signup-password").value;
  const errorEl = document.getElementById("signup-error");
  const users = getUsers();

  if (!email || !username || password.length < 4) {
    errorEl.textContent = "Please fill in every field (password needs 4+ characters).";
    errorEl.hidden = false;
    return;
  }
  if (users[username]) {
    errorEl.textContent = "That username is already taken - try another one.";
    errorEl.hidden = false;
    return;
  }
  users[username] = { email, password, phone: "" };
  writeJSON("sf_users", users);
  writeJSON("sf_profiles_" + username, [{ id: username + "-main", name: "Main Profile", color: AVATAR_COLORS[0], kids: false, language: "en", maturity: "all", autoplay: true, subtitlesDefault: false }]);
  writeJSON("sf_subscription_" + username, { planId: "standard", status: "active", nextBilling: addDays(30) });
  seedNotifications(username);
  errorEl.hidden = true;
  localStorage.setItem("sf_session", username);
  afterSignIn();
}

function handleGuest() {
  const users = getUsers();
  let n = 1;
  while (users["guest" + n]) n++;
  const username = "guest" + n;
  users[username] = { email: "", password: "", phone: "" };
  writeJSON("sf_users", users);
  writeJSON("sf_profiles_" + username, [{ id: username + "-main", name: "Guest", color: AVATAR_COLORS[1], kids: false, language: "en", maturity: "all", autoplay: true, subtitlesDefault: false }]);
  writeJSON("sf_subscription_" + username, { planId: "basic", status: "active", nextBilling: addDays(30) });
  seedNotifications(username);
  localStorage.setItem("sf_session", username);
  afterSignIn();
}

function signOut() {
  localStorage.removeItem("sf_session");
  localStorage.removeItem("sf_current_profile");
  document.body.classList.remove("authed", "profile-selected");
  document.getElementById("login-form").reset();
  document.getElementById("login-form").hidden = false;
  document.getElementById("signup-form").hidden = true;
  closeAllDropdowns();
}

function afterSignIn() {
  document.body.classList.add("authed");
  document.body.classList.remove("profile-selected");
  renderWhoGrid();
}


/* ==============================================================
   5. PROFILES
   ============================================================== */
function getProfiles() { return readJSON("sf_profiles_" + currentUsername(), []); }
function saveProfiles(list) { writeJSON("sf_profiles_" + currentUsername(), list); }
function currentProfileId() { return localStorage.getItem("sf_current_profile"); }
function currentProfile() { return getProfiles().find((p) => p.id === currentProfileId()) || null; }

function selectProfile(id) {
  localStorage.setItem("sf_current_profile", id);
  document.body.classList.add("profile-selected");
  applyLanguage(currentProfile().language || "en");
  refreshProfileChrome();
  renderNotifications();
  buildAllPages();
  navigateTo("home");
}

function switchProfile() {
  document.body.classList.remove("profile-selected");
  closeAllDropdowns();
  renderWhoGrid();
}

function renderWhoGrid() {
  const grid = document.getElementById("who-grid");
  if (!grid) return;
  const profiles = getProfiles();
  grid.innerHTML = "";
  profiles.forEach((p) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "profile-card";
    card.innerHTML = `<div class="avatar-big" style="background:${p.color}">${p.name.charAt(0).toUpperCase()}</div>
      <p class="profile-card-name">${p.name}</p>${p.kids ? '<span class="kids-tag">KIDS</span>' : ""}`;
    card.addEventListener("click", () => selectProfile(p.id));
    grid.appendChild(card);
  });
  if (profiles.length < 5) {
    const addCard = document.createElement("button");
    addCard.type = "button";
    addCard.className = "profile-card add-card";
    addCard.innerHTML = `<div class="avatar-big">+</div><p class="profile-card-name">Add Profile</p>`;
    addCard.addEventListener("click", () => openProfileModal(null));
    grid.appendChild(addCard);
  }
}

function renderManageProfiles() {
  const grid = document.getElementById("manage-profiles-grid");
  if (!grid) return;
  const profiles = getProfiles();
  grid.innerHTML = "";
  profiles.forEach((p) => {
    const card = document.createElement("div");
    card.className = "profile-card";
    card.innerHTML = `<div class="avatar-big" style="background:${p.color}">${p.name.charAt(0).toUpperCase()}</div>
      <p class="profile-card-name">${p.name}</p>${p.kids ? '<span class="kids-tag">KIDS</span>' : ""}
      <button type="button" class="profile-edit-btn">Edit</button>`;
    card.querySelector(".profile-edit-btn").addEventListener("click", () => openProfileModal(p));
    grid.appendChild(card);
  });
  if (profiles.length < 5) {
    const addCard = document.createElement("div");
    addCard.className = "profile-card add-card";
    addCard.innerHTML = `<button type="button" style="width:100%"><div class="avatar-big">+</div><p class="profile-card-name">Add Profile</p></button>`;
    addCard.querySelector("button").addEventListener("click", () => openProfileModal(null));
    grid.appendChild(addCard);
  }
}

let editingProfileId = null;
function openProfileModal(profile) {
  editingProfileId = profile ? profile.id : null;
  document.getElementById("profile-modal-title").textContent = profile ? "Edit Profile" : "Add Profile";
  document.getElementById("profile-name-field").value = profile ? profile.name : "";
  document.getElementById("profile-kids-field").checked = profile ? !!profile.kids : false;
  document.getElementById("profile-autoplay-field").checked = profile ? profile.autoplay !== false : true;
  document.getElementById("profile-subtitles-field").checked = profile ? !!profile.subtitlesDefault : false;
  document.getElementById("profile-maturity-field").value = profile ? profile.maturity || "all" : "all";

  const langSelect = document.getElementById("profile-language-field");
  langSelect.innerHTML = LANGUAGES.map((l) => `<option value="${l.code}">${l.label}</option>`).join("");
  langSelect.value = profile ? profile.language || "en" : "en";

  const chosenColor = profile ? profile.color : AVATAR_COLORS[getProfiles().length % AVATAR_COLORS.length];
  const avatarBig = document.getElementById("profile-modal-avatar");
  avatarBig.style.background = chosenColor;
  avatarBig.textContent = (profile ? profile.name : "?").charAt(0).toUpperCase() || "?";

  const colorsWrap = document.getElementById("profile-modal-colors");
  colorsWrap.innerHTML = "";
  AVATAR_COLORS.forEach((color) => {
    const swatch = document.createElement("button");
    swatch.type = "button";
    swatch.style.background = color;
    swatch.className = color === chosenColor ? "selected" : "";
    swatch.addEventListener("click", () => {
      colorsWrap.querySelectorAll("button").forEach((b) => b.classList.remove("selected"));
      swatch.classList.add("selected");
      avatarBig.style.background = color;
    });
    colorsWrap.appendChild(swatch);
  });

  const nameField = document.getElementById("profile-name-field");
  nameField.oninput = () => { avatarBig.textContent = (nameField.value.trim().charAt(0) || "?").toUpperCase(); };

  document.getElementById("profile-delete-btn").hidden = !profile || getProfiles().length <= 1;
  openModal(document.getElementById("profile-modal"));
}

function saveProfileForm(event) {
  event.preventDefault();
  const profiles = getProfiles();
  const name = document.getElementById("profile-name-field").value.trim();
  if (!name) return;
  const color = document.getElementById("profile-modal-colors").querySelector(".selected").style.background;
  const data = {
    name,
    color: rgbToHexIfNeeded(color),
    kids: document.getElementById("profile-kids-field").checked,
    language: document.getElementById("profile-language-field").value,
    maturity: document.getElementById("profile-maturity-field").value,
    autoplay: document.getElementById("profile-autoplay-field").checked,
    subtitlesDefault: document.getElementById("profile-subtitles-field").checked,
  };

  if (editingProfileId) {
    const idx = profiles.findIndex((p) => p.id === editingProfileId);
    profiles[idx] = { ...profiles[idx], ...data };
  } else {
    if (profiles.length >= 5) { showToast("You can have up to 5 profiles"); return; }
    profiles.push({ id: "p" + Date.now(), ...data });
  }
  saveProfiles(profiles);
  closeModal(document.getElementById("profile-modal"));
  renderWhoGrid();
  renderManageProfiles();
  if (editingProfileId === currentProfileId()) { refreshProfileChrome(); applyLanguage(data.language); buildAllPages(); }
  showToast(editingProfileId ? "Profile updated" : "Profile added");
}

// Some browsers report computed background as rgb(); keep it as-is (CSS accepts rgb strings fine)
function rgbToHexIfNeeded(color) { return color; }

function deleteProfile() {
  if (!editingProfileId) return;
  openConfirm("Delete this profile?", "This removes the profile, its My List, and its watch history from this browser.", () => {
    let profiles = getProfiles().filter((p) => p.id !== editingProfileId);
    saveProfiles(profiles);
    localStorage.removeItem("sf_profile_data_" + editingProfileId);
    if (currentProfileId() === editingProfileId) { localStorage.removeItem("sf_current_profile"); document.body.classList.remove("profile-selected"); }
    closeModal(document.getElementById("profile-modal"));
    renderWhoGrid();
    renderManageProfiles();
    showToast("Profile deleted");
  });
}


/* ==============================================================
   6. PER-PROFILE DATA (My List, Continue Watching, history)
   ============================================================== */
function getProfileData() {
  const id = currentProfileId();
  return readJSON("sf_profile_data_" + id, { myList: [], continueWatching: {}, history: [] });
}
function saveProfileData(data) { writeJSON("sf_profile_data_" + currentProfileId(), data); }

function isInMyList(id) { return getProfileData().myList.includes(Number(id)); }
function toggleMyList(id) {
  id = Number(id);
  const data = getProfileData();
  const added = !data.myList.includes(id);
  data.myList = added ? [...data.myList, id] : data.myList.filter((x) => x !== id);
  saveProfileData(data);
  const t = findTitle(id);
  showToast(added ? `Added to My List` : `Removed from My List`);
  document.querySelectorAll(`[data-list-id="${id}"]`).forEach((btn) => updateListButton(btn, added));
  if (document.getElementById("info-title").dataset.titleId === String(id)) updateListButton(document.getElementById("info-list"), added);
  if (document.getElementById("page-my-list").classList.contains("active")) renderMyListPage();
}
function updateListButton(button, added) {
  button.classList.toggle("added", added);
  if (button.classList.contains("icon-btn")) { button.textContent = added ? "\u2713" : "+"; }
  else { button.textContent = added ? "\u2713 In My List" : "+ My List"; }
}

function getProgress(id) { return (getProfileData().continueWatching || {})[id] || null; }
function saveProgress(title, episode, percent) {
  const data = getProfileData();
  if (percent >= 96) {
    delete data.continueWatching[title.id];
    data.history = [{ id: title.id, title: title.title, date: todayLabel() }, ...(data.history || [])].slice(0, 25);
  } else if (percent > 1) {
    data.continueWatching[title.id] = { percent: Math.round(percent), episodeId: episode ? episode.id : null };
  }
  saveProfileData(data);
}
function clearHistory() {
  openConfirm("Clear viewing history?", "This clears Continue Watching and your recent activity for this profile.", () => {
    const data = getProfileData();
    data.continueWatching = {};
    data.history = [];
    saveProfileData(data);
    buildAllPages();
    fillAccountForm();
    showToast("Viewing history cleared");
  });
}


/* ==============================================================
   7. SUBSCRIPTION / PLANS / BILLING
   ============================================================== */
function addDays(n) { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); }
function todayLabel() { return new Date().toISOString().slice(0, 10); }
function getSubscription() { return readJSON("sf_subscription_" + currentUsername(), { planId: "standard", status: "active", nextBilling: addDays(30) }); }
function saveSubscription(sub) { writeJSON("sf_subscription_" + currentUsername(), sub); }
function getBilling() { return readJSON("sf_billing_" + currentUsername(), { card: "visa-4242", name: "", address: "" }); }
function saveBilling(b) { writeJSON("sf_billing_" + currentUsername(), b); }

function renderPlansPage() {
  const sub = getSubscription();
  const grid = document.getElementById("plans-grid");
  grid.innerHTML = "";
  PLANS.forEach((plan) => {
    const isCurrent = plan.id === sub.planId && sub.status === "active";
    const card = document.createElement("div");
    card.className = "plan-card" + (isCurrent ? " current" : "");
    const planIndex = PLANS.findIndex((p) => p.id === plan.id);
    const currentIndex = PLANS.findIndex((p) => p.id === sub.planId);
    const actionLabel = isCurrent ? "Current Plan" : planIndex > currentIndex ? "Upgrade" : "Downgrade";
    card.innerHTML = `
      ${isCurrent ? '<span class="plan-current-badge">Current Plan</span>' : ""}
      <p class="plan-name">${plan.name}</p>
      <p class="plan-price">\u20B1${plan.price}<span>/month</span></p>
      <ul class="plan-features">${plan.perks.map((f) => `<li>${f}</li>`).join("")}</ul>
      <button class="btn ${isCurrent ? "btn-secondary" : "btn-primary"}" ${isCurrent ? "disabled" : ""}>${actionLabel}</button>
    `;
    if (!isCurrent) {
      card.querySelector("button").addEventListener("click", () => {
        openConfirm(`Switch to ${plan.name}?`, `Your plan will change to ${plan.name} (\u20B1${plan.price}/month) immediately in this demo.`, () => {
          saveSubscription({ planId: plan.id, status: "active", nextBilling: addDays(30) });
          renderPlansPage();
          fillAccountForm();
          showToast(`Plan changed to ${plan.name}`);
        });
      });
    }
    grid.appendChild(card);
  });

  const billing = getBilling();
  document.getElementById("billing-card-select").value = billing.card;
  document.getElementById("billing-name").value = billing.name;
  document.getElementById("billing-address").value = billing.address;
  document.getElementById("billing-status").textContent = sub.status === "active" ? "Active" : "Canceled";
  document.getElementById("billing-date").textContent = sub.status === "active" ? sub.nextBilling : "-";
  document.getElementById("cancel-sub-btn").textContent = sub.status === "active" ? "Cancel Subscription" : "Reactivate Subscription";
}

function saveBillingForm() {
  saveBilling({
    card: document.getElementById("billing-card-select").value,
    name: document.getElementById("billing-name").value.trim(),
    address: document.getElementById("billing-address").value.trim(),
  });
  showToast("Billing info saved");
}

function toggleSubscription() {
  const sub = getSubscription();
  if (sub.status === "active") {
    openConfirm("Cancel your subscription?", "You'll keep access until the end of this demo billing period.", () => {
      saveSubscription({ ...sub, status: "canceled" });
      renderPlansPage();
      fillAccountForm();
      showToast("Subscription canceled");
    });
  } else {
    saveSubscription({ ...sub, status: "active", nextBilling: addDays(30) });
    renderPlansPage();
    fillAccountForm();
    showToast("Subscription reactivated");
  }
}


/* ==============================================================
   8. NOTIFICATIONS
   ============================================================== */
function seedNotifications(username) {
  writeJSON("sf_notifications_" + username, [
    { id: 1, title: "New episode available", body: "A new episode of Borrowed Time just dropped.", time: "2h ago", read: false },
    { id: 2, title: "New movie added", body: "Nightfall Protocol is now streaming.", time: "1d ago", read: false },
    { id: 3, title: "Your subscription renews soon", body: "Your plan renews in 5 days.", time: "2d ago", read: false },
    { id: 4, title: "Continue watching", body: "Pick up The Glass Orchard where you left off.", time: "3d ago", read: true },
    { id: 5, title: "Leaving soon", body: "Hollow Creek leaves STREAMFLIX at the end of the month.", time: "5d ago", read: true },
  ]);
}
function getNotifications() { return readJSON("sf_notifications_" + currentUsername(), []); }
function saveNotifications(list) { writeJSON("sf_notifications_" + currentUsername(), list); }

function renderNotifications() {
  const list = getNotifications();
  const wrap = document.getElementById("notif-list");
  const badge = document.getElementById("notif-badge");
  wrap.innerHTML = "";
  if (!list.length) { wrap.innerHTML = '<p class="notif-empty">No notifications yet.</p>'; }
  list.forEach((n) => {
    const item = document.createElement("div");
    item.className = "notif-item" + (n.read ? "" : " unread");
    item.innerHTML = `<p class="notif-title">${n.read ? "" : '<span class="notif-dot"></span>'}${n.title}</p><p>${n.body}</p><p class="notif-time">${n.time}</p>`;
    item.addEventListener("click", () => { n.read = true; saveNotifications(list); renderNotifications(); });
    wrap.appendChild(item);
  });
  const unread = list.filter((n) => !n.read).length;
  badge.hidden = unread === 0;
  badge.textContent = unread;
}
function markAllNotificationsRead() {
  const list = getNotifications().map((n) => ({ ...n, read: true }));
  saveNotifications(list);
  renderNotifications();
}


/* ==============================================================
   9. LANGUAGE / I18N
   ============================================================== */
function getLanguage() { return localStorage.getItem("sf_language") || (currentProfile() ? currentProfile().language : "en") || "en"; }
function applyLanguage(code) {
  localStorage.setItem("sf_language", code);
  const dict = I18N[code] || I18N.en;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (dict[key]) el.textContent = dict[key];
  });
  renderLangDropdown();
}
function renderLangDropdown() {
  const wrap = document.getElementById("lang-dropdown");
  const current = getLanguage();
  wrap.innerHTML = "";
  LANGUAGES.forEach((l) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = l.code === current ? "active" : "";
    btn.innerHTML = `<span>${l.label}</span>${l.code === current ? "\u2713" : ""}`;
    btn.addEventListener("click", () => {
      applyLanguage(l.code);
      const profile = currentProfile();
      if (profile) { const profiles = getProfiles(); const idx = profiles.findIndex((p) => p.id === profile.id); profiles[idx].language = l.code; saveProfiles(profiles); }
      closeAllDropdowns();
      showToast(`Language set to ${l.label}`);
    });
    wrap.appendChild(btn);
  });
}


/* ==============================================================
   10. CARD + ROW BUILDERS
   ============================================================== */
function visibleTitles() {
  const profile = currentProfile();
  if (!profile) return TITLES;
  return TITLES.filter((t) => {
    if (profile.kids) return t.kidsFriendly === true;
    if (profile.maturity === "teen") return !["R", "TV-MA"].includes(t.maturity);
    if (profile.maturity === "kids") return t.kidsFriendly === true;
    return true;
  });
}

function createCard(t) {
  const card = document.createElement("div");
  card.className = "card";
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.dataset.titleId = t.id;
  card.setAttribute("aria-label", `${t.title}, open details`);

  const inList = isInMyList(t.id);
  const progress = getProgress(t.id);
  const progressBar = progress ? `<div class="card-progress"><span style="width:${progress.percent}%"></span></div>` : "";
  const leftBadge = t.comingSoon ? `<span class="card-badge soon">${t.releaseLabel}</span>` : `<span class="card-badge">${t.type === "tv" ? "TV" : "Movie"}</span>`;
  const rightBadge = !t.comingSoon && t.tags.includes("newRelease") ? `<span class="card-badge new">New</span>` : "";

  const playBtn = t.comingSoon ? "" : `<button class="icon-btn icon-btn-play" data-action="play" aria-label="Play ${t.title}"><svg viewBox="0 0 24 24" width="13" height="13"><path d="M7 4l13 8-13 8z" fill="currentColor"></path></svg></button>`;

  card.innerHTML = `
    <div class="card-poster">
      <div class="poster-fallback">${t.title}</div>
      <img src="${posterUrl(t)}" alt="${t.title} poster" loading="lazy">
      <div class="card-badge-row">${leftBadge}${rightBadge}</div>
      ${progressBar}
      <div class="card-overlay">
        <span class="card-genre">${t.genre.join(" / ")}</span>
        <p class="card-desc">${t.description}</p>
        <div class="card-actions">
          ${playBtn}
          <button class="icon-btn ${inList ? "added" : ""}" data-action="list" data-list-id="${t.id}" aria-label="${inList ? "Remove from My List" : "Add to My List"}">${inList ? "\u2713" : "+"}</button>
          <button class="icon-btn" data-action="info" aria-label="More info about ${t.title}">i</button>
        </div>
      </div>
    </div>
    <div class="card-meta">
      <p class="card-title">${t.title}</p>
      <p class="card-sub"><span>${t.year}</span><span>${formatRuntime(t)}</span>${t.comingSoon ? "" : `<span class="rating">\u2605 ${t.rating}</span>`}</p>
    </div>`;

  card.addEventListener("click", (event) => {
    const actionBtn = event.target.closest("[data-action]");
    if (actionBtn) { event.stopPropagation(); runCardAction(actionBtn.dataset.action, t); }
    else openInfoModal(t);
  });
  card.addEventListener("keydown", (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openInfoModal(t); } });
  return card;
}
function runCardAction(action, t) {
  if (action === "play" && !t.comingSoon) openPlayerModal(t);
  if (action === "info") openInfoModal(t);
  if (action === "list") toggleMyList(t.id);
}

function buildRow(container, { id, title, titles, numbered = false }) {
  if (!titles.length) return;
  const section = document.createElement("section");
  section.className = "row";
  section.id = "row-" + id;
  section.innerHTML = `<h2 class="row-title">${title}</h2>`;

  const wrap = document.createElement("div");
  wrap.className = "row-wrap";
  const leftArrow = document.createElement("button");
  leftArrow.className = "row-arrow left"; leftArrow.setAttribute("aria-label", `Scroll ${title} left`); leftArrow.innerHTML = "&#8249;";
  const rightArrow = document.createElement("button");
  rightArrow.className = "row-arrow right"; rightArrow.setAttribute("aria-label", `Scroll ${title} right`); rightArrow.innerHTML = "&#8250;";
  const track = document.createElement("div");
  track.className = "row-track" + (numbered ? " top10-track" : "");

  titles.forEach((t, index) => {
    if (numbered) {
      const item = document.createElement("div");
      item.className = "top10-item";
      item.innerHTML = `<span class="top10-rank" aria-hidden="true">${index + 1}</span>`;
      item.appendChild(createCard(t));
      track.appendChild(item);
    } else {
      track.appendChild(createCard(t));
    }
  });

  leftArrow.addEventListener("click", () => track.scrollBy({ left: -track.clientWidth * 0.9, behavior: "smooth" }));
  rightArrow.addEventListener("click", () => track.scrollBy({ left: track.clientWidth * 0.9, behavior: "smooth" }));
  wrap.append(leftArrow, track, rightArrow);
  section.appendChild(wrap);
  container.appendChild(section);
}


/* ==============================================================
   11. PAGE RENDERERS
   ============================================================== */
let heroTimer = null;
function renderHome() {
  const pool = visibleTitles().filter((t) => t.featured && !t.comingSoon);
  const featured = pool.length ? pool : visibleTitles().filter((t) => !t.comingSoon).slice(0, 3);
  renderHeroDots(featured);
  showHeroSlide(featured, 0);
  clearInterval(heroTimer);
  let heroIndex = 0;
  heroTimer = setInterval(() => { heroIndex = (heroIndex + 1) % featured.length; showHeroSlide(featured, heroIndex); }, 7000);
  document.getElementById("hero").addEventListener("mouseenter", () => clearInterval(heroTimer));
  document.getElementById("hero").addEventListener("mouseleave", () => { heroTimer = setInterval(() => { heroIndex = (heroIndex + 1) % featured.length; showHeroSlide(featured, heroIndex); }, 7000); });

  const container = document.getElementById("home-rows");
  container.innerHTML = "";
  const all = visibleTitles();
  const data = getProfileData();

  const continueList = Object.keys(data.continueWatching || {}).map((id) => findTitle(id)).filter(Boolean).filter((t) => all.includes(t));
  buildRow(container, { id: "continue", title: "Continue Watching", titles: continueList });

  const seedTitle = continueList[0] || findTitle((data.myList || [])[0]) || null;
  if (seedTitle) {
    const similar = all.filter((t) => t.id !== seedTitle.id && !t.comingSoon && t.genre.some((g) => seedTitle.genre.includes(g))).slice(0, 12);
    buildRow(container, { id: "because", title: `Because You Watched ${seedTitle.title}`, titles: similar });
  }

  buildRow(container, { id: "toppicks", title: "Top Picks For You", titles: all.filter((t) => t.tags.includes("topPicks") || t.tags.includes("popular")).slice(0, 12) });

  const top10 = all.filter((t) => t.trendingRank).sort((a, b) => a.trendingRank - b.trendingRank);
  buildRow(container, { id: "top10", title: "Top 10 This Week", titles: top10, numbered: true });

  const recent = [...all].filter((t) => !t.comingSoon).sort((a, b) => (a.addedDate < b.addedDate ? 1 : -1)).slice(0, 12);
  buildRow(container, { id: "recent", title: "Recently Added", titles: recent });

  buildRow(container, { id: "pop-movies", title: "Popular Movies", titles: all.filter((t) => t.tags.includes("popular") && t.type === "movie") });
  buildRow(container, { id: "pop-tv", title: "Popular Series", titles: all.filter((t) => t.tags.includes("popular") && t.type === "tv") });

  ["Action", "Comedy", "Sci-Fi", "Drama", "Horror", "Animation", "Adventure"].forEach((g) => {
    const list = all.filter((t) => t.genre.includes(g) && !t.comingSoon);
    if (list.length) buildRow(container, { id: "genre-" + g, title: g, titles: list });
  });

  const comingSoon = all.filter((t) => t.comingSoon);
  buildRow(container, { id: "soon", title: "Coming Soon", titles: comingSoon });
}

function renderHeroDots(featured) {
  const dots = document.getElementById("hero-dots");
  dots.innerHTML = "";
  featured.forEach((t, i) => {
    const dot = document.createElement("button");
    dot.setAttribute("aria-label", `Show ${t.title}`);
    dot.addEventListener("click", () => showHeroSlide(featured, i));
    dots.appendChild(dot);
  });
}
function showHeroSlide(featured, index) {
  const t = featured[index];
  if (!t) return;
  document.querySelectorAll("#hero-dots button").forEach((d, i) => d.classList.toggle("active", i === index));
  const slideA = document.getElementById("hero-slide-a");
  const slideB = document.getElementById("hero-slide-b");
  const showingA = slideA.classList.contains("active");
  const nextSlide = showingA ? slideB : slideA;
  const prevSlide = showingA ? slideA : slideB;
  nextSlide.querySelector(".hero-bg").style.backgroundImage = `url(${backdropUrl(t)})`;
  nextSlide.classList.add("active");
  prevSlide.classList.remove("active");

  document.getElementById("hero-badge").textContent = t.type === "tv" ? "Featured Series" : "Featured Movie";
  document.getElementById("hero-title").textContent = t.title;
  document.getElementById("hero-maturity").textContent = t.maturity;
  document.getElementById("hero-year").textContent = t.year;
  document.getElementById("hero-runtime").textContent = formatRuntime(t);
  document.getElementById("hero-rating").textContent = `\u2605 ${t.rating}`;
  document.getElementById("hero-genre").textContent = t.genre.join(" / ");
  document.getElementById("hero-desc").textContent = t.description;
  document.getElementById("hero-play").onclick = () => openPlayerModal(t);
  document.getElementById("hero-info").onclick = () => openInfoModal(t);
}

function renderMoviesPage() {
  const container = document.getElementById("movies-rows");
  container.innerHTML = "";
  const films = visibleTitles().filter((t) => t.type === "movie" && !t.comingSoon);
  buildRow(container, { id: "movies-all", title: "All Movies", titles: films });
  buildRow(container, { id: "movies-new", title: "New Releases", titles: films.filter((t) => t.tags.includes("newRelease")) });
  ["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Animation", "Adventure"].forEach((g) => {
    const list = films.filter((t) => t.genre.includes(g));
    if (list.length) buildRow(container, { id: "movies-" + g, title: g, titles: list });
  });
}
function renderTvPage() {
  const container = document.getElementById("tv-rows");
  container.innerHTML = "";
  const shows = visibleTitles().filter((t) => t.type === "tv" && !t.comingSoon);
  buildRow(container, { id: "tv-all", title: "All TV Shows", titles: shows });
  buildRow(container, { id: "tv-new", title: "New Series", titles: shows.filter((t) => t.tags.includes("newRelease")) });
  buildRow(container, { id: "tv-anime", title: "Anime", titles: shows.filter((t) => t.tags.includes("anime")) });
  ["Action", "Comedy", "Drama", "Sci-Fi"].forEach((g) => {
    const list = shows.filter((t) => t.genre.includes(g));
    if (list.length) buildRow(container, { id: "tv-" + g, title: g + " Series", titles: list });
  });
}
function renderNewPopularPage() {
  const container = document.getElementById("new-popular-rows");
  container.innerHTML = "";
  const all = visibleTitles();
  buildRow(container, { id: "np-movies", title: "New Releases", titles: all.filter((t) => t.type === "movie" && t.tags.includes("newRelease")) });
  buildRow(container, { id: "np-tv", title: "New Series", titles: all.filter((t) => t.type === "tv" && t.tags.includes("newRelease")) });
  buildRow(container, { id: "np-soon", title: "Coming Soon", titles: all.filter((t) => t.comingSoon) });
  buildRow(container, { id: "np-pop-movies", title: "Popular Movies", titles: all.filter((t) => t.tags.includes("popular") && t.type === "movie") });
  buildRow(container, { id: "np-pop-tv", title: "Popular Series", titles: all.filter((t) => t.tags.includes("popular") && t.type === "tv") });
}
function renderMyListPage() {
  const grid = document.getElementById("my-list-grid");
  const empty = document.getElementById("my-list-empty");
  const ids = getProfileData().myList;
  const titles = visibleTitles().filter((t) => ids.includes(t.id));
  grid.innerHTML = "";
  titles.forEach((t) => grid.appendChild(createCard(t)));
  empty.hidden = titles.length > 0;
  grid.hidden = titles.length === 0;
}
function renderFaqs() {
  const wrap = document.getElementById("faq-list");
  wrap.innerHTML = "";
  FAQS.forEach((f) => {
    const item = document.createElement("div");
    item.className = "faq-item";
    item.innerHTML = `<button type="button" class="faq-question">${f.q}</button><div class="faq-answer"><p>${f.a}</p></div>`;
    item.querySelector(".faq-question").addEventListener("click", () => item.classList.toggle("open"));
    wrap.appendChild(item);
  });
}

function buildAllPages() {
  renderHome();
  renderMoviesPage();
  renderTvPage();
  renderNewPopularPage();
  renderMyListPage();
  renderManageProfiles();
}


/* ==============================================================
   12. SEARCH + FILTERS
   ============================================================== */
const searchState = { query: "", type: "all", genre: "all", year: "all" };
const SEARCH_GENRES = ["Action", "Comedy", "Drama", "Sci-Fi", "Horror", "Animation", "Adventure"];
const SEARCH_YEARS = [2026, 2025, 2024, 2023, 2022, 2021, 2020];

function renderFilterBar() {
  const typeWrap = document.getElementById("filter-type");
  const genreWrap = document.getElementById("filter-genre");
  const yearWrap = document.getElementById("filter-year");

  function chip(label, active, onClick) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "filter-chip" + (active ? " active" : "");
    btn.textContent = label;
    btn.addEventListener("click", onClick);
    return btn;
  }

  typeWrap.innerHTML = "";
  [["all", "All"], ["movie", "Movies"], ["tv", "TV Shows"]].forEach(([value, label]) => {
    typeWrap.appendChild(chip(label, searchState.type === value, () => { searchState.type = value; runSearch(); }));
  });

  genreWrap.innerHTML = "";
  genreWrap.appendChild(chip("All Genres", searchState.genre === "all", () => { searchState.genre = "all"; runSearch(); }));
  SEARCH_GENRES.forEach((g) => genreWrap.appendChild(chip(g, searchState.genre === g, () => { searchState.genre = g; runSearch(); })));

  yearWrap.innerHTML = "";
  yearWrap.appendChild(chip("All Years", searchState.year === "all", () => { searchState.year = "all"; runSearch(); }));
  SEARCH_YEARS.forEach((y) => yearWrap.appendChild(chip(String(y), searchState.year === String(y), () => { searchState.year = String(y); runSearch(); })));
}

function runSearch(newQuery) {
  if (typeof newQuery === "string") searchState.query = newQuery;
  const q = searchState.query.trim().toLowerCase();
  document.body.classList.toggle("is-searching", q.length > 0);
  if (!q) return;

  document.querySelectorAll("[data-page]").forEach((link) => link.classList.remove("active"));
  renderFilterBar();

  const matches = visibleTitles().filter((t) => {
    const haystack = [t.title, t.genre.join(" "), (t.cast || []).join(" "), t.description, String(t.year)].join(" ").toLowerCase();
    if (!haystack.includes(q)) return false;
    if (searchState.type !== "all" && t.type !== searchState.type) return false;
    if (searchState.genre !== "all" && !t.genre.includes(searchState.genre)) return false;
    if (searchState.year !== "all" && String(t.year) !== searchState.year) return false;
    return true;
  });

  document.getElementById("results-title").textContent = `Results for "${searchState.query.trim()}"`;
  document.getElementById("results-count").textContent = `${matches.length} title${matches.length === 1 ? "" : "s"} found`;
  const grid = document.getElementById("results-grid");
  grid.innerHTML = "";
  matches.forEach((t) => grid.appendChild(createCard(t)));
  document.getElementById("no-results").hidden = matches.length > 0;
  grid.hidden = matches.length === 0;
  if (!matches.length) document.getElementById("no-results-text").textContent = `We couldn't find anything for "${searchState.query.trim()}". Try a different search or filter.`;
}


/* ==============================================================
   13. INFO MODAL
   ============================================================== */
let currentEpisodeContext = null; // { title, episode, seasonNumber } while a TV episode is queued/playing
function openInfoModal(t) {
  document.getElementById("info-banner").style.backgroundImage = `url(${backdropUrl(t)})`;
  document.getElementById("info-poster").src = posterUrl(t);
  document.getElementById("info-title").textContent = t.title;
  document.getElementById("info-title").dataset.titleId = t.id;
  document.getElementById("info-maturity").textContent = t.maturity;
  document.getElementById("info-year").textContent = t.year;
  document.getElementById("info-runtime").textContent = formatRuntime(t);
  document.getElementById("info-rating").textContent = t.comingSoon ? "" : `\u2605 ${t.rating}`;
  document.getElementById("info-genres").textContent = t.genre.join(" \u2022 ");
  document.getElementById("info-description").textContent = t.description;
  document.getElementById("info-cast").textContent = (t.cast || []).join(", ");
  document.getElementById("info-director").textContent = t.director || "-";
  document.getElementById("info-audio").textContent = (t.audioLangs || []).join(", ");
  document.getElementById("info-subs").textContent = (t.subLangs || []).join(", ");

  const playBtn = document.getElementById("info-play");
  playBtn.hidden = !!t.comingSoon;
  playBtn.onclick = () => openPlayerModal(t);

  const listBtn = document.getElementById("info-list");
  updateListButton(listBtn, isInMyList(t.id));
  listBtn.onclick = () => toggleMyList(t.id);

  document.getElementById("info-trailer").onclick = () => openPlayerModal(t, null, true);

  const episodesBlock = document.getElementById("episodes-block");
  if (t.type === "tv" && t.seasons && t.seasons.length) {
    episodesBlock.hidden = false;
    const seasonSelect = document.getElementById("season-select");
    seasonSelect.innerHTML = t.seasons.map((s) => `<option value="${s.seasonNumber}">Season ${s.seasonNumber}</option>`).join("");
    seasonSelect.onchange = () => renderEpisodes(t, Number(seasonSelect.value));
    renderEpisodes(t, 1);
  } else {
    episodesBlock.hidden = true;
  }

  const moreTrack = document.getElementById("more-like-track");
  moreTrack.innerHTML = "";
  visibleTitles().filter((x) => x.id !== t.id && !x.comingSoon && x.genre.some((g) => t.genre.includes(g))).slice(0, 10).forEach((x) => moreTrack.appendChild(createCard(x)));

  openModal(document.getElementById("info-modal"));
}
function renderEpisodes(t, seasonNumber) {
  const season = t.seasons.find((s) => s.seasonNumber === seasonNumber);
  const list = document.getElementById("episodes-list");
  list.innerHTML = "";
  season.episodes.forEach((ep) => {
    const row = document.createElement("div");
    row.className = "episode-row";
    row.innerHTML = `<span class="episode-num">${ep.number}</span>
      <div class="episode-info"><p class="episode-title">${ep.title}</p><p class="episode-desc">${ep.description}</p><p class="episode-runtime">${ep.runtime}m</p></div>
      <button class="episode-play" aria-label="Play ${ep.title}"><svg viewBox="0 0 24 24" width="13" height="13"><path d="M7 4l13 8-13 8z" fill="currentColor"></path></svg></button>`;
    row.querySelector(".episode-play").addEventListener("click", () => openPlayerModal(t, { ...ep, seasonNumber }));
    list.appendChild(row);
  });
}


/* ==============================================================
   14. VIDEO PLAYER
   ============================================================== */
const PLAYER = { title: null, episode: null, isTrailer: false, duration: 1, currentTime: 0, speed: 1, playing: false, muted: false, timer: null };

function openPlayerModal(t, episode, isTrailer) {
  clearInterval(PLAYER.timer);
  PLAYER.title = t;
  PLAYER.episode = episode || null;
  PLAYER.isTrailer = !!isTrailer;
  PLAYER.speed = 1;
  PLAYER.muted = false;

  const durationSeconds = isTrailer ? 30 : t.type === "movie" ? t.runtime * 60 : (episode ? episode.runtime : 42) * 60;
  PLAYER.duration = durationSeconds;

  const saved = !isTrailer ? getProgress(t.id) : null;
  PLAYER.currentTime = saved && (!episode || saved.episodeId === episode.id) ? (saved.percent / 100) * durationSeconds : 0;

  document.getElementById("player-screen").style.backgroundImage = `url(${backdropUrl(t)})`;
  document.getElementById("player-flag").textContent = isTrailer ? "Trailer" : "Now Playing";
  document.getElementById("player-title").textContent = episode ? `${t.title} - S${episode.seasonNumber}E${episode.number} ${episode.title}` : t.title;
  document.getElementById("player-duration").textContent = formatClock(durationSeconds);
  document.getElementById("player-current-time").textContent = formatClock(PLAYER.currentTime);
  document.getElementById("player-fill").style.width = (PLAYER.currentTime / durationSeconds * 100) + "%";

  document.getElementById("player-prev-ep").hidden = !episode;
  document.getElementById("player-next-ep").hidden = !episode;

  const audioSelect = document.getElementById("player-audio-select");
  audioSelect.innerHTML = (t.audioLangs || ["English"]).map((a) => `<option>${a}</option>`).join("");
  const subsSelect = document.getElementById("player-subs-select");
  subsSelect.innerHTML = '<option value="off">Off</option>' + (t.subLangs || []).map((s) => `<option>${s}</option>`).join("");
  subsSelect.value = currentProfile() && currentProfile().subtitlesDefault ? (t.subLangs || ["off"])[0] : "off";

  document.getElementById("player-settings-menu").hidden = true;
  renderSpeedOptions();

  document.getElementById("player").classList.remove("paused");
  document.getElementById("player").classList.add("playing");
  document.getElementById("icon-play").hidden = true;
  document.getElementById("icon-pause").hidden = false;
  PLAYER.playing = true;

  openModal(document.getElementById("player-modal"));
  startPlayerTick();
}

function renderSpeedOptions() {
  const wrap = document.getElementById("speed-options");
  wrap.innerHTML = "";
  [0.5, 0.75, 1, 1.25, 1.5, 2].forEach((speed) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = speed === PLAYER.speed ? "active" : "";
    btn.textContent = speed + "x";
    btn.addEventListener("click", () => { PLAYER.speed = speed; renderSpeedOptions(); });
    wrap.appendChild(btn);
  });
}

function startPlayerTick() {
  clearInterval(PLAYER.timer);
  const demoRate = Math.max(PLAYER.duration / 75, 1); // full playback finishes in ~75 real seconds
  PLAYER.timer = setInterval(() => {
    if (!PLAYER.playing) return;
    PLAYER.currentTime += 0.25 * demoRate * PLAYER.speed;
    if (PLAYER.currentTime >= PLAYER.duration) {
      PLAYER.currentTime = PLAYER.duration;
      finishPlayback();
    }
    updatePlayerUI();
  }, 250);
}
function updatePlayerUI() {
  document.getElementById("player-fill").style.width = (PLAYER.currentTime / PLAYER.duration * 100) + "%";
  document.getElementById("player-current-time").textContent = formatClock(PLAYER.currentTime);
}
function finishPlayback() {
  PLAYER.playing = false;
  clearInterval(PLAYER.timer);
  if (!PLAYER.isTrailer) saveProgress(PLAYER.title, PLAYER.episode, 100);
  showToast(`Finished: ${PLAYER.title.title}`);
  const profile = currentProfile();
  if (!PLAYER.isTrailer && PLAYER.episode && profile && profile.autoplay) {
    const next = findNextEpisode();
    if (next) { setTimeout(() => openPlayerModal(PLAYER.title, next), 900); return; }
  }
  buildAllPages();
}
function findNextEpisode() {
  const t = PLAYER.title, ep = PLAYER.episode;
  if (!t || !ep) return null;
  const season = t.seasons.find((s) => s.seasonNumber === ep.seasonNumber);
  const idx = season.episodes.findIndex((e) => e.id === ep.id);
  if (idx < season.episodes.length - 1) return { ...season.episodes[idx + 1], seasonNumber: ep.seasonNumber };
  const nextSeason = t.seasons.find((s) => s.seasonNumber === ep.seasonNumber + 1);
  return nextSeason ? { ...nextSeason.episodes[0], seasonNumber: nextSeason.seasonNumber } : null;
}
function findPrevEpisode() {
  const t = PLAYER.title, ep = PLAYER.episode;
  if (!t || !ep) return null;
  const season = t.seasons.find((s) => s.seasonNumber === ep.seasonNumber);
  const idx = season.episodes.findIndex((e) => e.id === ep.id);
  if (idx > 0) return { ...season.episodes[idx - 1], seasonNumber: ep.seasonNumber };
  const prevSeason = t.seasons.find((s) => s.seasonNumber === ep.seasonNumber - 1);
  return prevSeason ? { ...prevSeason.episodes[prevSeason.episodes.length - 1], seasonNumber: prevSeason.seasonNumber } : null;
}
function togglePlayerPlaying() {
  PLAYER.playing = !PLAYER.playing;
  document.getElementById("player").classList.toggle("playing", PLAYER.playing);
  document.getElementById("player").classList.toggle("paused", !PLAYER.playing);
  document.getElementById("icon-play").hidden = PLAYER.playing;
  document.getElementById("icon-pause").hidden = !PLAYER.playing;
}
function seekPlayer(clientX) {
  const bar = document.getElementById("player-bar");
  const rect = bar.getBoundingClientRect();
  const fraction = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
  PLAYER.currentTime = fraction * PLAYER.duration;
  updatePlayerUI();
}
function stopAndSavePlayer() {
  clearInterval(PLAYER.timer);
  if (!PLAYER.isTrailer && PLAYER.title && PLAYER.currentTime > 0) {
    saveProgress(PLAYER.title, PLAYER.episode, (PLAYER.currentTime / PLAYER.duration) * 100);
    buildAllPages();
  }
  PLAYER.title = null;
}


/* ==============================================================
   15. CONFIRM MODAL
   ============================================================== */
let pendingConfirmAction = null;
function openConfirm(title, message, onConfirm) {
  document.getElementById("confirm-title").textContent = title;
  document.getElementById("confirm-message").textContent = message;
  pendingConfirmAction = onConfirm;
  openModal(document.getElementById("confirm-modal"));
}


/* ==============================================================
   MODAL OPEN/CLOSE (shared)
   ============================================================== */
function openModal(modal) { modal.classList.add("open"); document.body.classList.add("modal-open"); }
function closeModal(modal) {
  modal.classList.remove("open");
  if (!document.querySelector(".modal.open")) document.body.classList.remove("modal-open");
  if (modal.id === "player-modal") stopAndSavePlayer();
}
document.addEventListener("keydown", (e) => { if (e.key === "Escape") document.querySelectorAll(".modal.open").forEach(closeModal); });


/* ==============================================================
   NAVIGATION
   ============================================================== */
function navigateTo(pageId) {
  document.querySelectorAll(".page").forEach((p) => p.classList.toggle("active", p.id === "page-" + pageId));
  document.querySelectorAll("[data-page]").forEach((el) => el.classList.toggle("active", el.dataset.page === pageId));
  document.body.classList.remove("is-searching");
  document.getElementById("search-input").value = "";
  document.getElementById("nav-links").classList.remove("open");
  document.getElementById("menu-toggle").setAttribute("aria-expanded", "false");
  document.getElementById("navbar").classList.remove("menu-open");
  closeAllDropdowns();

  if (pageId === "account") fillAccountForm();
  if (pageId === "plans") renderPlansPage();
  if (pageId === "manage-profiles") renderManageProfiles();
  if (pageId === "help") renderFaqs();
  if (pageId === "my-list") renderMyListPage();

  window.scrollTo({ top: 0 });
}
function scrollToSection(sectionId) {
  navigateTo("account");
  setTimeout(() => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 60);
}


/* ==============================================================
   PROFILE CHROME (avatar, kids badge, acct-only items)
   ============================================================== */
function refreshProfileChrome() {
  const profile = currentProfile();
  if (!profile) return;
  const initial = profile.name.charAt(0).toUpperCase();
  document.getElementById("profile-avatar").textContent = initial;
  document.getElementById("profile-btn").style.background = profile.color;
  document.getElementById("profile-kids-badge").hidden = !profile.kids;
  document.getElementById("dropdown-name").textContent = profile.name;
  document.querySelectorAll(".acct-only").forEach((el) => { el.hidden = !!profile.kids; });
}


/* ==============================================================
   ACCOUNT PAGE FORMS
   ============================================================== */
function fillAccountForm() {
  const account = currentAccount();
  const profile = currentProfile();
  const sub = getSubscription();
  if (!account || !profile) return;

  document.getElementById("account-name").value = profile.name;
  document.getElementById("account-email").value = account.email || "";
  document.getElementById("account-phone").value = account.phone || "";
  document.getElementById("account-password").value = "";

  const plan = PLANS.find((p) => p.id === sub.planId);
  document.getElementById("membership-plan-name").textContent = plan ? `${plan.name} (\u20B1${plan.price}/mo)` : "-";
  document.getElementById("membership-renew-date").textContent = sub.status === "active" ? sub.nextBilling : "Canceled";

  document.getElementById("playback-autoplay").checked = profile.autoplay !== false;
  document.getElementById("playback-quality").value = readJSON("sf_playback_" + currentUsername(), { quality: "auto" }).quality || "auto";
  document.getElementById("playback-data").value = readJSON("sf_playback_" + currentUsername(), { data: "high" }).data || "high";

  const interfaceSelect = document.getElementById("language-interface");
  const audioSelect = document.getElementById("language-audio");
  const subSelect = document.getElementById("language-subtitle");
  interfaceSelect.innerHTML = LANGUAGES.map((l) => `<option value="${l.code}">${l.label}</option>`).join("");
  audioSelect.innerHTML = AUDIO_LANGS.map((a) => `<option>${a}</option>`).join("");
  subSelect.innerHTML = '<option value="off">Off</option>' + SUB_LANGS.map((s) => `<option>${s}</option>`).join("");
  interfaceSelect.value = getLanguage();
  const prefs = readJSON("sf_langprefs_" + currentProfileId(), { audio: "English", subtitle: "off" });
  audioSelect.value = prefs.audio;
  subSelect.value = prefs.subtitle;

  const activityList = document.getElementById("activity-list");
  const history = (getProfileData().history || []);
  activityList.innerHTML = history.length ? history.map((h) => `<li><span>${h.title}</span><span>${h.date}</span></li>`).join("") : '<li><span>No viewing activity yet.</span></li>';
}

function saveAccountForm(event) {
  event.preventDefault();
  const users = getUsers();
  const username = currentUsername();
  users[username].email = document.getElementById("account-email").value.trim();
  users[username].phone = document.getElementById("account-phone").value.trim();
  const newPassword = document.getElementById("account-password").value;
  if (newPassword) users[username].password = newPassword;
  writeJSON("sf_users", users);

  const profiles = getProfiles();
  const idx = profiles.findIndex((p) => p.id === currentProfileId());
  profiles[idx].name = document.getElementById("account-name").value.trim() || profiles[idx].name;
  saveProfiles(profiles);
  refreshProfileChrome();
  document.getElementById("account-password").value = "";
  showToast("Account info saved");
}
function savePlaybackForm(event) {
  event.preventDefault();
  const profiles = getProfiles();
  const idx = profiles.findIndex((p) => p.id === currentProfileId());
  profiles[idx].autoplay = document.getElementById("playback-autoplay").checked;
  saveProfiles(profiles);
  writeJSON("sf_playback_" + currentUsername(), { quality: document.getElementById("playback-quality").value, data: document.getElementById("playback-data").value });
  showToast("Playback settings saved");
}
function saveLanguageForm(event) {
  event.preventDefault();
  applyLanguage(document.getElementById("language-interface").value);
  writeJSON("sf_langprefs_" + currentProfileId(), { audio: document.getElementById("language-audio").value, subtitle: document.getElementById("language-subtitle").value });
  const profiles = getProfiles();
  const idx = profiles.findIndex((p) => p.id === currentProfileId());
  profiles[idx].language = document.getElementById("language-interface").value;
  saveProfiles(profiles);
  showToast("Language settings saved");
}


/* ==============================================================
   16. NAVBAR WIRING + STARTUP
   ============================================================== */
function closeAllDropdowns() {
  document.querySelectorAll(".dropdown-panel.open").forEach((d) => d.classList.remove("open"));
}

document.addEventListener("DOMContentLoaded", () => {
  /* Auth */
  document.getElementById("login-form").addEventListener("submit", handleLogin);
  document.getElementById("signup-form").addEventListener("submit", handleSignup);
  document.getElementById("guest-btn").addEventListener("click", handleGuest);
  document.getElementById("show-signup").addEventListener("click", () => { document.getElementById("login-form").hidden = true; document.getElementById("signup-form").hidden = false; });
  document.getElementById("show-login").addEventListener("click", () => { document.getElementById("signup-form").hidden = true; document.getElementById("login-form").hidden = false; });
  document.getElementById("signout-btn").addEventListener("click", signOut);

  /* Who's watching */
  document.getElementById("manage-profiles-link").addEventListener("click", () => { document.body.classList.add("profile-selected"); if (!currentProfileId()) { const first = getProfiles()[0]; if (first) localStorage.setItem("sf_current_profile", first.id); } buildAllPages(); applyLanguage(getLanguage()); refreshProfileChrome(); navigateTo("manage-profiles"); });

  /* Profile modal */
  document.getElementById("profile-form").addEventListener("submit", saveProfileForm);
  document.getElementById("profile-delete-btn").addEventListener("click", deleteProfile);

  /* Confirm modal */
  document.getElementById("confirm-yes").addEventListener("click", () => { const action = pendingConfirmAction; closeModal(document.getElementById("confirm-modal")); if (action) action(); });

  /* Page + action navigation */
  document.querySelectorAll("[data-page]").forEach((link) => link.addEventListener("click", (e) => { e.preventDefault(); navigateTo(link.dataset.page); }));
  document.querySelectorAll("[data-action]").forEach((el) => {
    const action = el.dataset.action;
    if (action === "switch-profile") el.addEventListener("click", switchProfile);
    if (action === "open-lang") el.addEventListener("click", (e) => { e.stopPropagation(); closeAllDropdowns(); document.getElementById("lang-dropdown").classList.add("open"); });
    if (action === "open-subtitles") el.addEventListener("click", () => scrollToSection("language-section"));
    if (action === "open-playback") el.addEventListener("click", () => scrollToSection("playback-section"));
  });

  /* Account / plans / manage-profiles page forms */
  document.getElementById("account-form").addEventListener("submit", saveAccountForm);
  document.getElementById("playback-form").addEventListener("submit", savePlaybackForm);
  document.getElementById("language-form").addEventListener("submit", saveLanguageForm);
  document.getElementById("clear-history-btn").addEventListener("click", clearHistory);
  document.getElementById("signout-all-btn").addEventListener("click", () => openConfirm("Sign out of all devices?", "This clears your local session on this browser.", signOut));
  document.getElementById("billing-save").addEventListener("click", saveBillingForm);
  document.getElementById("cancel-sub-btn").addEventListener("click", toggleSubscription);

  /* Navbar scroll shadow */
  window.addEventListener("scroll", () => document.getElementById("navbar").classList.toggle("scrolled", window.scrollY > 10));

  /* Hamburger */
  document.getElementById("menu-toggle").addEventListener("click", () => {
    const open = document.getElementById("nav-links").classList.toggle("open");
    document.getElementById("menu-toggle").setAttribute("aria-expanded", String(open));
    document.getElementById("navbar").classList.toggle("menu-open", open);
  });

  /* Search */
  const searchBox = document.getElementById("search-box"), searchInput = document.getElementById("search-input"), searchBtn = document.getElementById("search-btn");
  searchBtn.addEventListener("click", () => {
    const opening = !searchBox.classList.contains("open");
    searchBox.classList.toggle("open", opening);
    searchBtn.setAttribute("aria-expanded", String(opening));
    if (opening) searchInput.focus(); else { searchInput.value = ""; runSearch(""); }
  });
  searchInput.addEventListener("input", (e) => runSearch(e.target.value));
  searchInput.addEventListener("keydown", (e) => { if (e.key === "Escape") { searchInput.value = ""; runSearch(""); searchBox.classList.remove("open"); } });

  /* Language / notifications / profile dropdowns */
  function wireDropdown(btnId, panelId) {
    const btn = document.getElementById(btnId), panel = document.getElementById(panelId);
    btn.addEventListener("click", (e) => { e.stopPropagation(); const opening = !panel.classList.contains("open"); closeAllDropdowns(); panel.classList.toggle("open", opening); btn.setAttribute("aria-expanded", String(opening)); });
  }
  wireDropdown("lang-btn", "lang-dropdown");
  wireDropdown("notif-btn", "notif-dropdown");
  wireDropdown("profile-btn", "profile-dropdown");
  document.getElementById("notif-mark-all").addEventListener("click", markAllNotificationsRead);
  document.addEventListener("click", (e) => { if (!e.target.closest(".icon-menu-wrap")) closeAllDropdowns(); });

  /* Modals: close buttons */
  document.querySelectorAll("[data-close]").forEach((el) => el.addEventListener("click", () => closeModal(el.closest(".modal"))));

  /* Player controls */
  document.getElementById("player-toggle").addEventListener("click", togglePlayerPlaying);
  document.getElementById("player-big-play").addEventListener("click", togglePlayerPlaying);
  document.getElementById("player-bar").addEventListener("click", (e) => seekPlayer(e.clientX));
  document.getElementById("player-skip-back").addEventListener("click", () => { PLAYER.currentTime = Math.max(0, PLAYER.currentTime - 10); updatePlayerUI(); });
  document.getElementById("player-skip-fwd").addEventListener("click", () => { PLAYER.currentTime = Math.min(PLAYER.duration, PLAYER.currentTime + 10); updatePlayerUI(); });
  document.getElementById("player-next-ep").addEventListener("click", () => { const next = findNextEpisode(); if (next) openPlayerModal(PLAYER.title, next); else showToast("No next episode"); });
  document.getElementById("player-prev-ep").addEventListener("click", () => { const prev = findPrevEpisode(); if (prev) openPlayerModal(PLAYER.title, prev); else showToast("No previous episode"); });
  document.getElementById("player-mute").addEventListener("click", (e) => { PLAYER.muted = !PLAYER.muted; e.currentTarget.textContent = PLAYER.muted ? "\u{1F507}" : "\u{1F50A}"; document.getElementById("player-volume").disabled = PLAYER.muted; });
  document.getElementById("player-settings-btn").addEventListener("click", () => { document.getElementById("player-settings-menu").hidden = !document.getElementById("player-settings-menu").hidden; });
  document.getElementById("player-fullscreen").addEventListener("click", () => {
    const box = document.querySelector("#player-modal .modal-box");
    if (document.fullscreenElement) document.exitFullscreen();
    else if (box.requestFullscreen) box.requestFullscreen().catch(() => showToast("Fullscreen isn't available here"));
    else showToast("Fullscreen isn't available here");
  });
  document.getElementById("player-audio-select").addEventListener("change", (e) => showToast(`Audio set to ${e.target.value}`));
  document.getElementById("player-subs-select").addEventListener("change", (e) => showToast(`Subtitles: ${e.target.value}`));

  /* Resume session if already signed in / profile already chosen */
  if (currentAccount()) {
    document.body.classList.add("authed");
    renderWhoGrid();
    if (currentProfileId() && getProfiles().some((p) => p.id === currentProfileId())) {
      document.body.classList.add("profile-selected");
      applyLanguage(getLanguage());
      refreshProfileChrome();
      renderNotifications();
      buildAllPages();
      navigateTo("home");
    }
  } else {
    applyLanguage("en");
  }
});
