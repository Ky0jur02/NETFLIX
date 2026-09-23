/* ==============================================================
   STREAMFLIX - script.js

   Contents
   1. Movie data
   2. Small helpers (storage, toast)
   3. Auth (log in / sign up / guest / sign out)
   4. Page navigation (Home, TV Shows, Movies, My List, Profile)
   5. My List (localStorage)
   6. Building movie cards and rows
   7. Home page (hero + rows) / TV Shows page / Movies page
   8. Search
   9. Modals (info + player)
   10. Navbar (scroll shadow, hamburger, profile dropdown)
   11. Startup
   ============================================================== */


/* ==============================================================
   1. MOVIE DATA
   Every title lives in one array. "type" is "movie" or "tv".
   "tags" says which category rows a title shows up in.
   "trendingRank" (1-10) is only set on the titles used in Top 10.
   "progress" (0-100) is only set on titles in Continue Watching.
   ============================================================== */
const MOVIES = [
  { id: 1,  title: "Crimson Horizon",      year: 2026, genre: "Action", rating: "8.7", type: "movie", tags: ["trending", "action", "popular"], trendingRank: 1,
    description: "A disgraced pilot is given one last chance to stop a hijacked satellite from falling on the city she swore to protect." },
  { id: 2,  title: "The Glass Orchard",    year: 2025, genre: "Drama", rating: "8.2", type: "movie", tags: ["trending", "popular"], trendingRank: 2,
    description: "Three estranged sisters return to their family's failing vineyard and uncover a secret that changes everything they believed about their mother." },
  { id: 3,  title: "Nightfall Protocol",   year: 2026, genre: "Sci-Fi", rating: "9.0", type: "movie", tags: ["trending", "scifi", "popular"], trendingRank: 3,
    description: "When the world's clocks stop at midnight, a systems engineer has six hours to find out why before the blackout becomes permanent." },
  { id: 4,  title: "Paper Lanterns",       year: 2024, genre: "Comedy", rating: "7.6", type: "movie", tags: ["trending", "comedy"], trendingRank: 4,
    description: "A wedding planner double-books two ceremonies on the same night at the same venue, and neither couple is willing to reschedule." },
  { id: 5,  title: "Hollow Creek",         year: 2025, genre: "Horror", rating: "8.0", type: "movie", tags: ["trending", "horror"], trendingRank: 5,
    description: "A small town's yearly fog rolls in three days early, and the people who go missing in it never remember where they've been." },
  { id: 6,  title: "The Long Static",      year: 2026, genre: "Sci-Fi", rating: "8.4", type: "tv", tags: ["trending", "tv", "scifi"], trendingRank: 6,
    description: "A radio operator on an abandoned research station starts receiving messages from a version of the crew that never evacuated." },
  { id: 7,  title: "Iron Ledger",          year: 2023, genre: "Drama", rating: "7.9", type: "movie", tags: ["trending", "popular"], trendingRank: 7,
    description: "A junior accountant discovers her firm has been laundering money through client trust funds, and blowing the whistle will cost her everything." },
  { id: 8,  title: "Skybound Racers",      year: 2025, genre: "Action", rating: "7.3", type: "movie", tags: ["trending", "action"], trendingRank: 8,
    description: "An underground league of anti-gravity racers competes across the ruins of a flooded coastal city for a prize no one has ever collected." },
  { id: 9,  title: "Marigold Ave",         year: 2024, genre: "Comedy", rating: "7.8", type: "tv", tags: ["trending", "tv", "comedy"], trendingRank: 9,
    description: "Four roommates try to keep their crumbling rent-controlled apartment a secret from a landlord who wants them gone." },
  { id: 10, title: "The Quiet Verdict",    year: 2026, genre: "Drama", rating: "8.6", type: "movie", tags: ["trending", "popular"], trendingRank: 10,
    description: "A retired judge is asked to reopen the one case of her career she has never been able to let go of." },

  { id: 11, title: "Copper Tide",          year: 2022, genre: "Action", rating: "7.1", type: "movie", tags: ["popular", "action"],
    description: "A salvage crew stumbles onto a sunken cargo ship carrying something far more dangerous than gold." },
  { id: 12, title: "Ember & Frost",        year: 2023, genre: "Drama", rating: "8.1", type: "movie", tags: ["popular"],
    description: "Two rival chefs are forced to run the same restaurant for a year after their grandfather's will splits ownership evenly." },
  { id: 13, title: "Static Bloom",         year: 2025, genre: "Sci-Fi", rating: "7.7", type: "movie", tags: ["popular", "scifi"],
    description: "Plants across the world begin growing in perfect geometric patterns, and a botanist realizes they're forming a message." },
  { id: 14, title: "Late Checkout",        year: 2024, genre: "Comedy", rating: "7.2", type: "movie", tags: ["popular", "comedy"],
    description: "A hotel manager has one night to hide a celebrity guest's disastrous secret from the press camped in the lobby." },
  { id: 15, title: "The Rust Choir",       year: 2021, genre: "Drama", rating: "8.3", type: "movie", tags: ["popular"],
    description: "Former factory workers form a choir to save their town hall from demolition, and rediscover why they stayed friends." },
  { id: 16, title: "Dead Reckoning Bay",   year: 2023, genre: "Horror", rating: "6.9", type: "movie", tags: ["popular", "horror"],
    description: "A lighthouse keeper's replacement finds the logbook full of warnings written in her own handwriting." },
  { id: 17, title: "Velvet Circuit",       year: 2026, genre: "Sci-Fi", rating: "8.5", type: "movie", tags: ["popular", "scifi"],
    description: "An android built to replace a missing musician starts writing songs the original never lived long enough to finish." },
  { id: 18, title: "Northbound",          year: 2022, genre: "Drama", rating: "7.5", type: "movie", tags: ["popular"],
    description: "A long-haul trucker takes on one last cross-country route to deliver a letter she's been avoiding reading for years." },

  { id: 19, title: "Blackout City",        year: 2025, genre: "Action", rating: "7.8", type: "movie", tags: ["action"],
    description: "When the power grid fails across an entire metro area, a transit cop has twelve hours to stop a heist hiding inside the chaos." },
  { id: 20, title: "Redline",             year: 2023, genre: "Action", rating: "7.0", type: "movie", tags: ["action"],
    description: "A disqualified stunt driver infiltrates an illegal circuit to clear her late brother's name." },
  { id: 21, title: "Steel Meridian",       year: 2024, genre: "Action", rating: "7.4", type: "movie", tags: ["action"],
    description: "A private security contractor is hired to protect a scientist whose invention every government wants." },
  { id: 22, title: "The Last Checkpoint",  year: 2026, genre: "Action", rating: "8.0", type: "movie", tags: ["action"],
    description: "Soldiers on opposite sides of a ceasefire have to work together when the border itself starts collapsing." },
  { id: 23, title: "Fault Line Five",      year: 2022, genre: "Action", rating: "6.8", type: "movie", tags: ["action"],
    description: "A search-and-rescue team races the clock after an earthquake traps a city council mid-vote on evacuation funding." },
  { id: 24, title: "Iron Harvest",         year: 2025, genre: "Action", rating: "7.6", type: "movie", tags: ["action"],
    description: "Farmers in a drought-stricken valley discover the only water source left is guarded by a private militia." },

  { id: 25, title: "Sunday Roast",         year: 2024, genre: "Comedy", rating: "7.4", type: "movie", tags: ["comedy"],
    description: "A family's weekly dinner turns chaotic when three exes show up uninvited on the same afternoon." },
  { id: 26, title: "The Understudy",       year: 2023, genre: "Comedy", rating: "7.1", type: "movie", tags: ["comedy"],
    description: "A community theater actor gets one real shot at Broadway, on the same night as her sister's wedding." },
  { id: 27, title: "Parallel Parking",     year: 2025, genre: "Comedy", rating: "6.9", type: "movie", tags: ["comedy"],
    description: "Two strangers keep getting matched as roommates by every app they use, in every city they move to." },
  { id: 28, title: "Return to Sender",     year: 2022, genre: "Comedy", rating: "7.3", type: "movie", tags: ["comedy"],
    description: "A postal worker accidentally delivers ten years of undelivered letters to their intended recipients all at once." },
  { id: 29, title: "The Group Chat",       year: 2026, genre: "Comedy", rating: "7.0", type: "movie", tags: ["comedy"],
    description: "A reunion trip spirals when the group's decade-old group chat resurfaces every secret they've kept from each other." },

  { id: 30, title: "Wraithwood",           year: 2024, genre: "Horror", rating: "7.9", type: "movie", tags: ["horror"],
    description: "A forestry surveyor keeps finding the same abandoned cabin no matter which direction she hikes." },
  { id: 31, title: "The Tenth Floor",      year: 2023, genre: "Horror", rating: "7.2", type: "movie", tags: ["horror"],
    description: "An office building's tenth floor doesn't appear on any blueprint, but the night cleaning crew keeps finding new doors to it." },
  { id: 32, title: "Salt & Bone",          year: 2025, genre: "Horror", rating: "7.5", type: "movie", tags: ["horror"],
    description: "A marine biologist's research vessel picks up something in its nets that the crew insists they've seen before." },
  { id: 33, title: "Widow's Frequency",    year: 2022, genre: "Horror", rating: "6.7", type: "movie", tags: ["horror"],
    description: "A true-crime podcaster's newest case starts leaving voicemails on her phone from numbers that don't exist." },

  { id: 34, title: "Halfmoon Prep",        year: 2025, genre: "Drama", rating: "8.0", type: "tv", tags: ["tv"],
    description: "A scholarship student navigates a boarding school built on generations of secrets that go back further than she knows." },
  { id: 35, title: "The Foghorn",          year: 2024, genre: "Drama", rating: "7.8", type: "tv", tags: ["tv"],
    description: "A coastal town's volunteer fire department is the last thing holding the community together as the harbor industry dies out." },
  { id: 36, title: "Counteroffer",         year: 2026, genre: "Drama", rating: "8.3", type: "tv", tags: ["tv"],
    description: "Rival startup founders are forced into a merger neither of them wants, and neither can afford to lose." },
  { id: 37, title: "Nightshift Diner",     year: 2023, genre: "Comedy", rating: "7.6", type: "tv", tags: ["tv", "comedy"],
    description: "The regulars at a 24-hour diner become an unlikely found family across a decade of graveyard shifts." },
  { id: 38, title: "The Understory",       year: 2025, genre: "Sci-Fi", rating: "8.2", type: "tv", tags: ["tv", "scifi"],
    description: "Park rangers in an old-growth forest discover the trees have been recording everything for a thousand years - and something wants that record erased." },
  { id: 39, title: "Case File Zero",       year: 2022, genre: "Drama", rating: "7.7", type: "tv", tags: ["tv"],
    description: "A cold-case unit reopens the first file the department ever refused to close." },
  { id: 40, title: "Borrowed Time",        year: 2026, genre: "Sci-Fi", rating: "8.6", type: "tv", tags: ["tv", "scifi"],
    description: "A hospice nurse discovers she can see exactly how much time each patient has left, down to the second." },

  { id: 41, title: "Crimson Horizon: Reignited", year: 2020, genre: "Action", rating: "7.0", type: "movie", tags: ["continue"], progress: 62,
    description: "Before the satellite crisis, a young pilot survives her first combat mission and earns a reputation she'll spend years living up to." },
  { id: 42, title: "The Glass Orchard",    year: 2025, genre: "Drama", rating: "8.2", type: "movie", tags: ["continue"], progress: 24,
    description: "Three estranged sisters return to their family's failing vineyard and uncover a secret that changes everything they believed about their mother." },
  { id: 43, title: "Halfmoon Prep",        year: 2025, genre: "Drama", rating: "8.0", type: "tv", tags: ["continue"], progress: 88,
    description: "A scholarship student navigates a boarding school built on generations of secrets that go back further than she knows." },
  { id: 44, title: "Nightshift Diner",     year: 2023, genre: "Comedy", rating: "7.6", type: "tv", tags: ["continue"], progress: 41,
    description: "The regulars at a 24-hour diner become an unlikely found family across a decade of graveyard shifts." },
];

// Turns a title into a URL-safe seed so every card gets a stable, unique placeholder photo
function seedFor(movie) {
  return "sf-" + movie.id + "-" + movie.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function posterUrl(movie) {
  return `https://picsum.photos/seed/${seedFor(movie)}/400/600`;
}

function bannerUrl(movie) {
  return `https://picsum.photos/seed/${seedFor(movie)}-wide/1280/720`;
}

// The rows shown on the Home page, in order
const HOME_CATEGORIES = [
  { id: "trending",   title: "Trending Now",       filter: (m) => m.tags.includes("trending") },
  { id: "continue",    title: "Continue Watching",  filter: (m) => m.tags.includes("continue") },
  { id: "popular",     title: "Popular on STREAMFLIX", filter: (m) => m.tags.includes("popular") },
  { id: "action",      title: "Action",             filter: (m) => m.tags.includes("action") },
  { id: "comedy",      title: "Comedy",             filter: (m) => m.tags.includes("comedy") },
  { id: "scifi",       title: "Sci-Fi",             filter: (m) => m.tags.includes("scifi") },
  { id: "horror",      title: "Horror",             filter: (m) => m.tags.includes("horror") },
  { id: "tv",          title: "TV Shows",           filter: (m) => m.tags.includes("tv") },
];


/* ==============================================================
   2. SMALL HELPERS
   ============================================================== */
function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    /* localStorage might be unavailable (e.g. private browsing) - fail quietly */
  }
}

let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function findMovie(id) {
  return MOVIES.find((m) => m.id === Number(id));
}


/* ==============================================================
   3. AUTH
   Accounts are stored as { username: { name, password } } in
   localStorage under "sf_users". The signed-in username is stored
   under "sf_session". None of this is secure - it's a classroom demo.
   ============================================================== */
const AVATAR_COLORS = ["#e5303f", "#f3c257", "#4f8cff", "#38c98f", "#b25cf0"];

function getUsers() {
  return readJSON("sf_users", {});
}

function currentUsername() {
  return localStorage.getItem("sf_session");
}

function currentUser() {
  const username = currentUsername();
  if (!username) return null;
  const users = getUsers();
  return users[username] ? { username, ...users[username] } : null;
}

function signIn(username) {
  localStorage.setItem("sf_session", username);
  enterApp();
}

function signOut() {
  localStorage.removeItem("sf_session");
  document.getElementById("profile-dropdown").classList.remove("open");
  document.body.classList.remove("authed");
  document.getElementById("login-form").reset();
  document.getElementById("login-form").hidden = false;
  document.getElementById("signup-form").hidden = true;
}

function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value;
  const errorEl = document.getElementById("login-error");
  const users = getUsers();

  const account = users[username.toLowerCase()];
  if (!account || account.password !== password) {
    errorEl.textContent = "That username and password don't match any account.";
    errorEl.hidden = false;
    return;
  }

  errorEl.hidden = true;
  signIn(username.toLowerCase());
}

function handleSignup(event) {
  event.preventDefault();
  const name = document.getElementById("signup-name").value.trim();
  const username = document.getElementById("signup-username").value.trim().toLowerCase();
  const password = document.getElementById("signup-password").value;
  const errorEl = document.getElementById("signup-error");
  const users = getUsers();

  if (!name || !username || password.length < 4) {
    errorEl.textContent = "Please fill in every field (password needs 4+ characters).";
    errorEl.hidden = false;
    return;
  }
  if (users[username]) {
    errorEl.textContent = "That username is already taken - try another one.";
    errorEl.hidden = false;
    return;
  }

  users[username] = { name, password, color: AVATAR_COLORS[0] };
  writeJSON("sf_users", users);
  errorEl.hidden = true;
  signIn(username);
}

function handleGuest() {
  const users = getUsers();
  let guestName = "guest";
  let n = 1;
  while (users[guestName + n]) n++;
  guestName = guestName + n;
  users[guestName] = { name: "Guest", password: "", color: AVATAR_COLORS[1] };
  writeJSON("sf_users", users);
  signIn(guestName);
}

function enterApp() {
  document.body.classList.add("authed");
  refreshProfileUI();
  renderHome();
  renderTvShowsPage();
  renderMoviesPage();
  renderMyListPage();
  navigateTo("home");
}


/* ==============================================================
   4. PAGE NAVIGATION
   ============================================================== */
function navigateTo(pageId) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.toggle("active", page.id === "page-" + pageId);
  });
  document.querySelectorAll("[data-page]").forEach((link) => {
    link.classList.toggle("active", link.dataset.page === pageId);
  });

  // Leaving search mode whenever we navigate to a page
  document.body.classList.remove("is-searching");
  document.getElementById("search-input").value = "";

  document.getElementById("nav-links").classList.remove("open");
  document.getElementById("menu-toggle").setAttribute("aria-expanded", "false");
  document.getElementById("navbar").classList.remove("menu-open");
  document.getElementById("profile-dropdown").classList.remove("open");

  if (pageId === "profile") fillProfileForm();
  if (pageId === "my-list") renderMyListPage();

  window.scrollTo({ top: 0, behavior: "instant" in window.scrollTo ? "instant" : "auto" });
}


/* ==============================================================
   5. MY LIST
   ============================================================== */
function getMyList() {
  return readJSON("sf_mylist", []);
}

function isInMyList(id) {
  return getMyList().includes(Number(id));
}

function toggleMyList(id) {
  id = Number(id);
  let list = getMyList();
  const added = !list.includes(id);

  list = added ? [...list, id] : list.filter((x) => x !== id);
  writeJSON("sf_mylist", list);

  const movie = findMovie(id);
  showToast(added ? `Added "${movie.title}" to My List` : `Removed "${movie.title}" from My List`);

  // Refresh every place a "My List" button for this movie could be visible
  document.querySelectorAll(`[data-list-id="${id}"]`).forEach((btn) => updateListButton(btn, added));
  if (document.getElementById("info-title").dataset.movieId === String(id)) {
    updateListButton(document.getElementById("info-list"), added);
  }
  if (!document.getElementById("page-my-list").classList.contains("active")) return;
  renderMyListPage();
}

function updateListButton(button, added) {
  button.classList.toggle("added", added);
  if (button.classList.contains("icon-btn")) {
    button.textContent = added ? "\u2713" : "+";
    button.setAttribute("aria-label", added ? "Remove from My List" : "Add to My List");
  } else {
    button.textContent = added ? "\u2713 In My List" : "+ My List";
  }
}


/* ==============================================================
   6. BUILDING CARDS AND ROWS
   ============================================================== */
function createCard(movie) {
  const card = document.createElement("div");
  card.className = "card";
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.dataset.movieId = movie.id;
  card.setAttribute("aria-label", `${movie.title}, open details`);

  const inList = isInMyList(movie.id);
  const progressBar = movie.progress
    ? `<div class="card-progress"><span style="width:${movie.progress}%"></span></div>`
    : "";

  card.innerHTML = `
    <div class="card-poster">
      <div class="poster-fallback">${movie.title}</div>
      <img src="${posterUrl(movie)}" alt="${movie.title} poster" loading="lazy">
      <span class="card-badge">${movie.type === "tv" ? "TV" : "Movie"}</span>
      ${progressBar}
      <div class="card-overlay">
        <span class="card-genre">${movie.genre}</span>
        <p class="card-desc">${movie.description}</p>
        <div class="card-actions">
          <button class="icon-btn icon-btn-play" data-action="play" aria-label="Play ${movie.title}">
            <svg viewBox="0 0 24 24" width="14" height="14"><path d="M7 4l13 8-13 8z" fill="currentColor"></path></svg>
          </button>
          <button class="icon-btn ${inList ? "added" : ""}" data-action="list" data-list-id="${movie.id}"
            aria-label="${inList ? "Remove from My List" : "Add to My List"}">${inList ? "\u2713" : "+"}</button>
          <button class="icon-btn" data-action="info" aria-label="More info about ${movie.title}">i</button>
        </div>
      </div>
    </div>
    <div class="card-meta">
      <p class="card-title">${movie.title}</p>
      <p class="card-sub"><span>${movie.year}</span><span class="rating">\u2605 ${movie.rating}</span></p>
    </div>
  `;

  card.addEventListener("click", (event) => {
    const actionBtn = event.target.closest("[data-action]");
    if (actionBtn) {
      event.stopPropagation();
      runCardAction(actionBtn.dataset.action, movie, actionBtn);
    } else {
      openInfoModal(movie);
    }
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openInfoModal(movie);
    }
  });

  return card;
}

function runCardAction(action, movie, button) {
  if (action === "play") openPlayerModal(movie);
  if (action === "info") openInfoModal(movie);
  if (action === "list") toggleMyList(movie.id);
}

// Builds one horizontal row (title + left/right arrows + scrollable track) and drops it into "container"
function buildRow(container, { id, title, movies, numbered = false }) {
  if (!movies.length) return;

  const section = document.createElement("section");
  section.className = "row";
  section.id = "row-" + id;

  const heading = document.createElement("h2");
  heading.className = "row-title";
  heading.textContent = title;
  section.appendChild(heading);

  const wrap = document.createElement("div");
  wrap.className = "row-wrap";

  const leftArrow = document.createElement("button");
  leftArrow.className = "row-arrow left";
  leftArrow.setAttribute("aria-label", `Scroll ${title} left`);
  leftArrow.innerHTML = "&#8249;";

  const rightArrow = document.createElement("button");
  rightArrow.className = "row-arrow right";
  rightArrow.setAttribute("aria-label", `Scroll ${title} right`);
  rightArrow.innerHTML = "&#8250;";

  const track = document.createElement("div");
  track.className = "row-track" + (numbered ? " top10-track" : "");

  movies.forEach((movie, index) => {
    if (numbered) {
      const item = document.createElement("div");
      item.className = "top10-item";
      const rank = document.createElement("span");
      rank.className = "top10-rank";
      rank.textContent = String(index + 1);
      rank.setAttribute("aria-hidden", "true");
      item.appendChild(rank);
      item.appendChild(createCard(movie));
      track.appendChild(item);
    } else {
      track.appendChild(createCard(movie));
    }
  });

  leftArrow.addEventListener("click", () => track.scrollBy({ left: -track.clientWidth * 0.9, behavior: "smooth" }));
  rightArrow.addEventListener("click", () => track.scrollBy({ left: track.clientWidth * 0.9, behavior: "smooth" }));

  wrap.append(leftArrow, track, rightArrow);
  section.appendChild(wrap);
  container.appendChild(section);
}


/* ==============================================================
   7. HOME / TV SHOWS / MOVIES PAGES
   ============================================================== */
function renderHome() {
  // Hero: feature the #1 trending title
  const hero = MOVIES.find((m) => m.trendingRank === 1) || MOVIES[0];
  document.getElementById("hero-bg").style.backgroundImage = `url(${bannerUrl(hero)})`;
  document.getElementById("hero-title").textContent = hero.title;
  document.getElementById("hero-year").textContent = hero.year;
  document.getElementById("hero-rating").textContent = `\u2605 ${hero.rating}`;
  document.getElementById("hero-genre").textContent = hero.genre;
  document.getElementById("hero-desc").textContent = hero.description;
  document.getElementById("hero-play").onclick = () => openPlayerModal(hero);
  document.getElementById("hero-info").onclick = () => openInfoModal(hero);

  const container = document.getElementById("home-rows");
  container.innerHTML = "";

  // Top 10 row, ranked
  const top10 = MOVIES.filter((m) => m.trendingRank).sort((a, b) => a.trendingRank - b.trendingRank);
  buildRow(container, { id: "top10", title: "Top 10 This Week", movies: top10, numbered: true });

  HOME_CATEGORIES.forEach((cat) => {
    const movies = MOVIES.filter(cat.filter);
    buildRow(container, { id: cat.id, title: cat.title, movies });
  });
}

function renderTvShowsPage() {
  const container = document.getElementById("tv-rows");
  container.innerHTML = "";
  const shows = MOVIES.filter((m) => m.type === "tv");

  buildRow(container, { id: "tv-all", title: "All TV Shows", movies: shows });
  ["Drama", "Comedy", "Sci-Fi"].forEach((genre) => {
    const byGenre = shows.filter((m) => m.genre === genre);
    if (byGenre.length) buildRow(container, { id: "tv-" + genre, title: genre, movies: byGenre });
  });
}

function renderMoviesPage() {
  const container = document.getElementById("movies-rows");
  container.innerHTML = "";
  const films = MOVIES.filter((m) => m.type === "movie");

  buildRow(container, { id: "movies-all", title: "All Movies", movies: films });
  ["Action", "Comedy", "Drama", "Horror", "Sci-Fi"].forEach((genre) => {
    const byGenre = films.filter((m) => m.genre === genre);
    if (byGenre.length) buildRow(container, { id: "movies-" + genre, title: genre, movies: byGenre });
  });
}

function renderMyListPage() {
  const grid = document.getElementById("my-list-grid");
  const empty = document.getElementById("my-list-empty");
  const ids = getMyList();
  const movies = MOVIES.filter((m) => ids.includes(m.id));

  grid.innerHTML = "";
  movies.forEach((movie) => grid.appendChild(createCard(movie)));
  empty.hidden = movies.length > 0;
  grid.hidden = movies.length === 0;
}


/* ==============================================================
   8. SEARCH
   ============================================================== */
function runSearch(query) {
  const grid = document.getElementById("results-grid");
  const noResults = document.getElementById("no-results");
  const noResultsText = document.getElementById("no-results-text");
  const trimmed = query.trim();

  document.body.classList.toggle("is-searching", trimmed.length > 0);
  if (!trimmed) return;

  document.querySelectorAll("[data-page]").forEach((link) => link.classList.remove("active"));

  const matches = MOVIES.filter((m) => m.title.toLowerCase().includes(trimmed.toLowerCase()));
  document.getElementById("results-title").textContent = `Results for "${trimmed}"`;
  document.getElementById("results-count").textContent = `${matches.length} title${matches.length === 1 ? "" : "s"} found`;

  grid.innerHTML = "";
  matches.forEach((movie) => grid.appendChild(createCard(movie)));

  noResults.hidden = matches.length > 0;
  grid.hidden = matches.length === 0;
  if (!matches.length) noResultsText.textContent = `We couldn't find anything called "${trimmed}". Try a different title.`;
}


/* ==============================================================
   9. MODALS
   ============================================================== */
function openModal(modal) {
  modal.classList.add("open");
  document.body.classList.add("modal-open");
}

function closeModal(modal) {
  modal.classList.remove("open");
  if (!document.querySelector(".modal.open")) document.body.classList.remove("modal-open");
  if (modal.id === "player-modal") stopPlayer();
}

function openInfoModal(movie) {
  const modal = document.getElementById("info-modal");
  document.getElementById("info-banner").style.backgroundImage = `url(${bannerUrl(movie)})`;
  document.getElementById("info-title").textContent = movie.title;
  document.getElementById("info-title").dataset.movieId = movie.id;
  document.getElementById("info-year").textContent = movie.year;
  document.getElementById("info-rating").textContent = `\u2605 ${movie.rating}`;
  document.getElementById("info-genre").textContent = movie.genre;
  document.getElementById("info-type").textContent = movie.type === "tv" ? "TV Series" : "Movie";
  document.getElementById("info-description").textContent = movie.description;

  const playBtn = document.getElementById("info-play");
  playBtn.onclick = () => openPlayerModal(movie);

  const listBtn = document.getElementById("info-list");
  updateListButton(listBtn, isInMyList(movie.id));
  listBtn.onclick = () => toggleMyList(movie.id);

  openModal(modal);
}

let playTimer = null;
function openPlayerModal(movie) {
  const modal = document.getElementById("player-modal");
  const player = document.getElementById("player");
  document.getElementById("player-screen").style.backgroundImage = `url(${bannerUrl(movie)})`;
  document.getElementById("player-title").textContent = `Now playing: ${movie.title}`;
  document.getElementById("player-toggle").textContent = "Pause";
  player.classList.remove("paused");
  player.classList.add("playing");
  document.querySelector(".player-fill").style.animation = "none";
  // Restart the CSS progress animation from zero every time a new title opens
  requestAnimationFrame(() => {
    document.querySelector(".player-fill").style.animation = "";
  });
  openModal(modal);
}

function stopPlayer() {
  const player = document.getElementById("player");
  player.classList.remove("playing", "paused");
}

function togglePlayer() {
  const player = document.getElementById("player");
  const btn = document.getElementById("player-toggle");
  const playing = player.classList.contains("playing");
  player.classList.toggle("playing", !playing);
  player.classList.toggle("paused", playing);
  btn.textContent = playing ? "Play" : "Pause";
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.querySelectorAll(".modal.open").forEach(closeModal);
  }
});


/* ==============================================================
   10. NAVBAR (scroll shadow, hamburger, search, profile dropdown)
   ============================================================== */
function refreshProfileUI() {
  const user = currentUser();
  if (!user) return;
  const initial = (user.name || user.username || "?").trim().charAt(0).toUpperCase();
  const color = user.color || AVATAR_COLORS[0];

  document.querySelectorAll("#profile-avatar, #profile-avatar-big").forEach((el) => (el.textContent = initial));
  document.getElementById("profile-btn").style.background = color;
  document.getElementById("dropdown-name").textContent = user.name || user.username;
}

function fillProfileForm() {
  const user = currentUser();
  if (!user) return;
  document.getElementById("profile-name-input").value = user.name || "";
  document.getElementById("profile-username-input").value = user.username;
  document.getElementById("save-note").hidden = true;

  const avatarColorsWrap = document.getElementById("avatar-colors");
  avatarColorsWrap.innerHTML = "";
  AVATAR_COLORS.forEach((color) => {
    const swatch = document.createElement("button");
    swatch.type = "button";
    swatch.style.background = color;
    swatch.className = color === (user.color || AVATAR_COLORS[0]) ? "selected" : "";
    swatch.setAttribute("aria-label", "Use this avatar color");
    swatch.addEventListener("click", () => {
      const users = getUsers();
      users[user.username].color = color;
      writeJSON("sf_users", users);
      refreshProfileUI();
      fillProfileForm();
    });
    avatarColorsWrap.appendChild(swatch);
  });

  document.getElementById("stat-mylist").textContent = getMyList().length;
  document.getElementById("stat-continue").textContent = MOVIES.filter((m) => m.tags.includes("continue")).length;
}

function saveProfile(event) {
  event.preventDefault();
  const user = currentUser();
  const users = getUsers();
  users[user.username].name = document.getElementById("profile-name-input").value.trim() || user.username;
  writeJSON("sf_users", users);
  refreshProfileUI();
  document.getElementById("save-note").hidden = false;
  showToast("Profile updated");
}


/* ==============================================================
   11. STARTUP
   ============================================================== */
document.addEventListener("DOMContentLoaded", () => {

  /* ---- Auth screen ---- */
  document.getElementById("login-form").addEventListener("submit", handleLogin);
  document.getElementById("signup-form").addEventListener("submit", handleSignup);
  document.getElementById("guest-btn").addEventListener("click", handleGuest);

  document.getElementById("show-signup").addEventListener("click", () => {
    document.getElementById("login-form").hidden = true;
    document.getElementById("signup-form").hidden = false;
  });
  document.getElementById("show-login").addEventListener("click", () => {
    document.getElementById("signup-form").hidden = true;
    document.getElementById("login-form").hidden = false;
  });

  document.getElementById("signout-btn").addEventListener("click", signOut);
  document.getElementById("profile-signout").addEventListener("click", signOut);
  document.getElementById("profile-form").addEventListener("submit", saveProfile);

  /* ---- Page navigation (nav links, logo, dropdown items) ---- */
  document.querySelectorAll("[data-page]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      navigateTo(link.dataset.page);
    });
  });

  /* ---- Navbar scroll shadow ---- */
  window.addEventListener("scroll", () => {
    document.getElementById("navbar").classList.toggle("scrolled", window.scrollY > 10);
  });

  /* ---- Hamburger menu ---- */
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  menuToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    document.getElementById("navbar").classList.toggle("menu-open", open);
  });

  /* ---- Search box open/close + live filtering ---- */
  const searchBox = document.getElementById("search-box");
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");

  searchBtn.addEventListener("click", () => {
    const opening = !searchBox.classList.contains("open");
    searchBox.classList.toggle("open", opening);
    document.getElementById("navbar").classList.toggle("search-open", opening);
    searchBtn.setAttribute("aria-expanded", String(opening));
    if (opening) {
      searchInput.focus();
    } else {
      searchInput.value = "";
      runSearch("");
    }
  });

  searchInput.addEventListener("input", (event) => runSearch(event.target.value));
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      searchInput.value = "";
      runSearch("");
      searchBox.classList.remove("open");
      document.getElementById("navbar").classList.remove("search-open");
    }
  });

  /* ---- Profile dropdown ---- */
  const profileBtn = document.getElementById("profile-btn");
  const profileDropdown = document.getElementById("profile-dropdown");
  profileBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    const open = profileDropdown.classList.toggle("open");
    profileBtn.setAttribute("aria-expanded", String(open));
  });
  document.addEventListener("click", (event) => {
    if (!profileDropdown.contains(event.target) && event.target !== profileBtn) {
      profileDropdown.classList.remove("open");
    }
  });

  /* ---- Modals: close on backdrop click or the "x" button ---- */
  document.querySelectorAll("[data-close]").forEach((el) => {
    el.addEventListener("click", () => closeModal(el.closest(".modal")));
  });
  document.getElementById("player-toggle").addEventListener("click", togglePlayer);

  /* ---- If someone already signed in during a previous visit, skip straight to the app ---- */
  if (currentUser()) {
    enterApp();
  }
});
