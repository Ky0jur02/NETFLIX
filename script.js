document.addEventListener("DOMContentLoaded", () => {
    // =========================================================
    // MOVIE DATA
    // =========================================================

    const movies = [
        {
            id: 1,
            title: "Shadow Protocol",
            year: 2025,
            rating: "8.7",
            genre: "Action",
            type: "Movie",
            description: "An elite operative must stop a secret organization before it launches a global attack.",
            image: "https://picsum.photos/seed/shadowprotocol/600/900",
            category: "Trending Now"
        },
        {
            id: 2,
            title: "Neon Horizon",
            year: 2025,
            rating: "8.5",
            genre: "Sci-Fi",
            type: "Movie",
            description: "A group of explorers discovers a mysterious world beyond the limits of known space.",
            image: "https://picsum.photos/seed/neonhorizon/600/900",
            category: "Trending Now"
        },
        {
            id: 3,
            title: "Midnight Run",
            year: 2024,
            rating: "8.2",
            genre: "Action",
            type: "Movie",
            description: "A dangerous night-time race turns into a fight for survival.",
            image: "https://picsum.photos/seed/midnightrun/600/900",
            category: "Trending Now"
        },
        {
            id: 4,
            title: "The Last Signal",
            year: 2025,
            rating: "9.0",
            genre: "Sci-Fi",
            type: "Movie",
            description: "A mysterious signal from deep space could change humanity forever.",
            image: "https://picsum.photos/seed/lastsignal/600/900",
            category: "Trending Now"
        },
        {
            id: 5,
            title: "Laugh Factory",
            year: 2024,
            rating: "7.9",
            genre: "Comedy",
            type: "Movie",
            description: "Three friends attempt to save their failing comedy club.",
            image: "https://picsum.photos/seed/laughfactory/600/900",
            category: "Popular Movies"
        },
        {
            id: 6,
            title: "Dark Waters",
            year: 2024,
            rating: "8.4",
            genre: "Horror",
            type: "Movie",
            description: "A family vacation takes a terrifying turn after they discover something beneath the water.",
            image: "https://picsum.photos/seed/darkwaters/600/900",
            category: "Popular Movies"
        },
        {
            id: 7,
            title: "Velocity",
            year: 2025,
            rating: "8.8",
            genre: "Action",
            type: "Movie",
            description: "A professional driver becomes involved in an international chase.",
            image: "https://picsum.photos/seed/velocity/600/900",
            category: "Popular Movies"
        },
        {
            id: 8,
            title: "Future City",
            year: 2026,
            rating: "8.6",
            genre: "Sci-Fi",
            type: "Movie",
            description: "In a futuristic city, one hacker discovers a secret that could destroy society.",
            image: "https://picsum.photos/seed/futurecity/600/900",
            category: "Popular Movies"
        },
        {
            id: 9,
            title: "Final Mission",
            year: 2025,
            rating: "8.3",
            genre: "Action",
            type: "Movie",
            description: "A retired soldier accepts one final mission.",
            image: "https://picsum.photos/seed/finalmission/600/900",
            category: "Action"
        },
        {
            id: 10,
            title: "Rapid Fire",
            year: 2024,
            rating: "8.1",
            genre: "Action",
            type: "Movie",
            description: "An undercover agent races against time to stop a criminal network.",
            image: "https://picsum.photos/seed/rapidfire/600/900",
            category: "Action"
        },
        {
            id: 11,
            title: "Comedy Night",
            year: 2025,
            rating: "7.8",
            genre: "Comedy",
            type: "Movie",
            description: "A group of friends compete in the biggest comedy contest of the year.",
            image: "https://picsum.photos/seed/comedynight/600/900",
            category: "Comedy"
        },
        {
            id: 12,
            title: "Roommates",
            year: 2024,
            rating: "8.0",
            genre: "Comedy",
            type: "TV Series",
            description: "Four completely different roommates try to survive college life together.",
            image: "https://picsum.photos/seed/roommates/600/900",
            category: "Comedy"
        },
        {
            id: 13,
            title: "Beyond Mars",
            year: 2026,
            rating: "9.1",
            genre: "Sci-Fi",
            type: "Movie",
            description: "Scientists travel beyond Mars and encounter something unexpected.",
            image: "https://picsum.photos/seed/beyondmars/600/900",
            category: "Sci-Fi"
        },
        {
            id: 14,
            title: "Quantum Zero",
            year: 2025,
            rating: "8.9",
            genre: "Sci-Fi",
            type: "Movie",
            description: "A scientist discovers a technology capable of changing reality.",
            image: "https://picsum.photos/seed/quantumzero/600/900",
            category: "Sci-Fi"
        },
        {
            id: 15,
            title: "The Haunted House",
            year: 2024,
            rating: "7.7",
            genre: "Horror",
            type: "Movie",
            description: "A group of friends enters an abandoned house with a dark history.",
            image: "https://picsum.photos/seed/hauntedhouse/600/900",
            category: "Horror"
        },
        {
            id: 16,
            title: "Silent Night",
            year: 2025,
            rating: "8.2",
            genre: "Horror",
            type: "Movie",
            description: "A quiet town faces a mysterious threat during one unforgettable night.",
            image: "https://picsum.photos/seed/silentnight/600/900",
            category: "Horror"
        },
        {
            id: 17,
            title: "City Lights",
            year: 2025,
            rating: "8.5",
            genre: "Drama",
            type: "TV Series",
            description: "Stories of people chasing their dreams in a massive city.",
            image: "https://picsum.photos/seed/citylights/600/900",
            category: "TV Shows"
        },
        {
            id: 18,
            title: "Code Breakers",
            year: 2026,
            rating: "8.8",
            genre: "Thriller",
            type: "TV Series",
            description: "A team of young cybersecurity experts discovers a worldwide conspiracy.",
            image: "https://picsum.photos/seed/codebreakers/600/900",
            category: "TV Shows"
        },
        {
            id: 19,
            title: "The Academy",
            year: 2024,
            rating: "8.0",
            genre: "Drama",
            type: "TV Series",
            description: "Students at an elite academy discover secrets hidden within their school.",
            image: "https://picsum.photos/seed/theacademy/600/900",
            category: "TV Shows"
        },
        {
            id: 20,
            title: "Wild Planet",
            year: 2025,
            rating: "9.2",
            genre: "Documentary",
            type: "TV Series",
            description: "Explore the most fascinating environments and animals on Earth.",
            image: "https://picsum.photos/seed/wildplanet/600/900",
            category: "TV Shows"
        }
    ];

    // =========================================================
    // ELEMENTS
    // =========================================================

    const navbar = document.getElementById("navbar");

    const heroBg = document.getElementById("hero-bg");
    const heroTitle = document.getElementById("hero-title");
    const heroYear = document.getElementById("hero-year");
    const heroRating = document.getElementById("hero-rating");
    const heroGenre = document.getElementById("hero-genre");
    const heroDesc = document.getElementById("hero-desc");
    const heroPlay = document.getElementById("hero-play");
    const heroInfo = document.getElementById("hero-info");

    const categoryRows = document.getElementById("category-rows");

    const myList = document.getElementById("my-list");
    const myListBody = document.getElementById("my-list-body");
    const myListTitle = document.getElementById("my-list-title");

    const searchBox = document.getElementById("search-box");
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");

    const searchResults = document.getElementById("search-results");
    const resultsTitle = document.getElementById("results-title");
    const resultsCount = document.getElementById("results-count");
    const resultsGrid = document.getElementById("results-grid");
    const noResults = document.getElementById("no-results");
    const noResultsText = document.getElementById("no-results-text");

    const infoModal = document.getElementById("info-modal");
    const infoBanner = document.getElementById("info-banner");
    const infoTitle = document.getElementById("info-title");
    const infoYear = document.getElementById("info-year");
    const infoRating = document.getElementById("info-rating");
    const infoGenre = document.getElementById("info-genre");
    const infoType = document.getElementById("info-type");
    const infoDescription = document.getElementById("info-description");
    const infoPlay = document.getElementById("info-play");
    const infoList = document.getElementById("info-list");

    const playerModal = document.getElementById("player-modal");
    const playerTitle = document.getElementById("player-title");
    const playerToggle = document.getElementById("player-toggle");
    const playerFill = document.getElementById("player-fill");

    const toast = document.getElementById("toast");

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    // =========================================================
    // VARIABLES
    // =========================================================

    let currentMovie = null;
    let toastTimeout = null;
    let progressInterval = null;

    let savedList = JSON.parse(localStorage.getItem("streamflixMyList")) || [];

    // =========================================================
    // HELPER FUNCTIONS
    // =========================================================

    function getMovieById(id) {
        return movies.find(movie => movie.id === Number(id));
    }

    function isInMyList(id) {
        return savedList.includes(Number(id));
    }

    function showToast(message) {
        if (!toast) return;

        toast.textContent = message;
        toast.classList.add("show");

        clearTimeout(toastTimeout);

        toastTimeout = setTimeout(() => {
            toast.classList.remove("show");
        }, 2500);
    }

    function saveMyList() {
        localStorage.setItem(
            "streamflixMyList",
            JSON.stringify(savedList)
        );
    }

    function toggleMyList(id) {
        id = Number(id);

        if (isInMyList(id)) {
            savedList = savedList.filter(movieId => movieId !== id);
            showToast("Removed from My List");
        } else {
            savedList.push(id);
            showToast("Added to My List");
        }

        saveMyList();

        renderMyList();

        if (currentMovie) {
            updateInfoListButton(currentMovie);
        }
    }

    // =========================================================
    // MOVIE CARD
    // =========================================================

    function createMovieCard(movie) {
        const card = document.createElement("article");

        card.className = "movie-card";
        card.dataset.id = movie.id;

        card.innerHTML = `
            <div class="movie-poster">
                <img
                    src="${movie.image}"
                    alt="${movie.title}"
                    loading="lazy"
                >

                <div class="movie-overlay">
                    <button
                        class="card-action"
                        data-action="play"
                        data-id="${movie.id}"
                        aria-label="Play ${movie.title}"
                    >
                        ▶
                    </button>

                    <button
                        class="card-action"
                        data-action="info"
                        data-id="${movie.id}"
                        aria-label="More information about ${movie.title}"
                    >
                        ⓘ
                    </button>

                    <button
                        class="card-action"
                        data-action="list"
                        data-id="${movie.id}"
                        aria-label="Add ${movie.title} to My List"
                    >
                        ${isInMyList(movie.id) ? "✓" : "+"}
                    </button>
                </div>
            </div>

            <div class="movie-info">
                <h3>${movie.title}</h3>

                <div class="movie-meta">
                    <span>${movie.year}</span>
                    <span>⭐ ${movie.rating}</span>
                    <span>${movie.genre}</span>
                </div>
            </div>
        `;

        return card;
    }

    // =========================================================
    // CATEGORY ROWS
    // =========================================================

    function renderCategories() {
        if (!categoryRows) return;

        categoryRows.innerHTML = "";

        const categories = [
            "Trending Now",
            "Popular Movies",
            "Action",
            "Comedy",
            "Sci-Fi",
            "Horror",
            "TV Shows"
        ];

        categories.forEach(category => {
            const categoryMovies = movies.filter(
                movie => movie.category === category
            );

            if (categoryMovies.length === 0) return;

            const section = document.createElement("section");

            section.className = "category-section";

            section.innerHTML = `
                <div class="section-header">
                    <h2>${category}</h2>

                    <div class="row-controls">
                        <button
                            class="row-arrow left"
                            aria-label="Scroll left"
                        >
                            ‹
                        </button>

                        <button
                            class="row-arrow right"
                            aria-label="Scroll right"
                        >
                            ›
                        </button>
                    </div>
                </div>

                <div class="movie-row"></div>
            `;

            const row = section.querySelector(".movie-row");

            categoryMovies.forEach(movie => {
                row.appendChild(createMovieCard(movie));
            });

            const leftButton = section.querySelector(".left");
            const rightButton = section.querySelector(".right");

            leftButton.addEventListener("click", () => {
                row.scrollBy({
                    left: -800,
                    behavior: "smooth"
                });
            });

            rightButton.addEventListener("click", () => {
                row.scrollBy({
                    left: 800,
                    behavior: "smooth"
                });
            });

            categoryRows.appendChild(section);
        });
    }

    // =========================================================
    // MY LIST
    // =========================================================

    function renderMyList() {
        if (!myListBody || !myList) return;

        myListBody.innerHTML = "";

        const listMovies = savedList
            .map(id => getMovieById(id))
            .filter(movie => movie);

        if (listMovies.length === 0) {
            myList.style.display = "none";
            return;
        }

        myList.style.display = "block";

        listMovies.forEach(movie => {
            myListBody.appendChild(createMovieCard(movie));
        });

        if (myListTitle) {
            myListTitle.textContent = "My List";
        }
    }

    // =========================================================
    // HERO
    // =========================================================

    function setHero(movie) {
        if (!movie) return;

        currentMovie = movie;

        if (heroBg) {
            heroBg.style.backgroundImage = `
                linear-gradient(
                    to right,
                    rgba(13, 13, 16, 0.95),
                    rgba(13, 13, 16, 0.55),
                    rgba(13, 13, 16, 0.15)
                ),
                url("${movie.image}")
            `;
        }

        if (heroTitle) heroTitle.textContent = movie.title;
        if (heroYear) heroYear.textContent = movie.year;
        if (heroRating) heroRating.textContent = `⭐ ${movie.rating}`;
        if (heroGenre) heroGenre.textContent = movie.genre;
        if (heroDesc) heroDesc.textContent = movie.description;
    }

    // =========================================================
    // INFO MODAL
    // =========================================================

    function openInfo(movie) {
        if (!movie || !infoModal) return;

        currentMovie = movie;

        if (infoBanner) {
            infoBanner.style.backgroundImage = `
                linear-gradient(
                    to top,
                    rgba(13, 13, 16, 1),
                    rgba(13, 13, 16, 0.15)
                ),
                url("${movie.image}")
            `;
        }

        if (infoTitle) infoTitle.textContent = movie.title;
        if (infoYear) infoYear.textContent = movie.year;
        if (infoRating) infoRating.textContent = `⭐ ${movie.rating}`;
        if (infoGenre) infoGenre.textContent = movie.genre;
        if (infoType) infoType.textContent = movie.type;
        if (infoDescription) infoDescription.textContent = movie.description;

        updateInfoListButton(movie);

        infoModal.classList.add("active");
        document.body.classList.add("modal-open");
    }

    function updateInfoListButton(movie) {
        if (!infoList || !movie) return;

        if (isInMyList(movie.id)) {
            infoList.textContent = "✓ In My List";
        } else {
            infoList.textContent = "+ My List";
        }
    }

    function closeInfo() {
        if (!infoModal) return;

        infoModal.classList.remove("active");
        document.body.classList.remove("modal-open");
    }

    // =========================================================
    // PLAYER
    // =========================================================

    function openPlayer(movie) {
        if (!movie || !playerModal) return;

        currentMovie = movie;

        if (playerTitle) {
            playerTitle.textContent = movie.title;
        }

        playerModal.classList.add("active");
        document.body.classList.add("modal-open");

        startFakePlayer();
    }

    function closePlayer() {
        if (!playerModal) return;

        playerModal.classList.remove("active");
        document.body.classList.remove("modal-open");

        clearInterval(progressInterval);

        if (playerFill) {
            playerFill.style.width = "0%";
        }

        if (playerToggle) {
            playerToggle.textContent = "▶";
        }
    }

    function startFakePlayer() {
        clearInterval(progressInterval);

        let progress = 0;

        if (playerFill) {
            playerFill.style.width = "0%";
        }

        if (playerToggle) {
            playerToggle.textContent = "❚❚";
        }

        progressInterval = setInterval(() => {
            progress += 1;

            if (playerFill) {
                playerFill.style.width = `${progress}%`;
            }

            if (progress >= 100) {
                clearInterval(progressInterval);

                if (playerToggle) {
                    playerToggle.textContent = "▶";
                }
            }
        }, 100);
    }

    // =========================================================
    // BUTTON ACTIONS
    // =========================================================

    document.addEventListener("click", event => {
        const button = event.target.closest("[data-action]");

        if (!button) return;

        const action = button.dataset.action;
        const id = Number(button.dataset.id);

        const movie = getMovieById(id);

        if (!movie) return;

        if (action === "play") {
            openPlayer(movie);
        }

        if (action === "info") {
            openInfo(movie);
        }

        if (action === "list") {
            toggleMyList(movie.id);

            button.textContent = isInMyList(movie.id) ? "✓" : "+";
        }
    });

    // =========================================================
    // HERO BUTTONS
    // =========================================================

    if (heroPlay) {
        heroPlay.addEventListener("click", () => {
            if (currentMovie) {
                openPlayer(currentMovie);
            }
        });
    }

    if (heroInfo) {
        heroInfo.addEventListener("click", () => {
            if (currentMovie) {
                openInfo(currentMovie);
            }
        });
    }

    // =========================================================
    // INFO MODAL BUTTONS
    // =========================================================

    if (infoPlay) {
        infoPlay.addEventListener("click", () => {
            if (currentMovie) {
                closeInfo();
                openPlayer(currentMovie);
            }
        });
    }

    if (infoList) {
        infoList.addEventListener("click", () => {
            if (currentMovie) {
                toggleMyList(currentMovie.id);
            }
        });
    }

    // =========================================================
    // CLOSE BUTTONS
    // =========================================================

    document.addEventListener("click", event => {
        const closeButton = event.target.closest("[data-close]");

        if (!closeButton) return;

        const target = closeButton.dataset.close;

        if (target === "info") {
            closeInfo();
        }

        if (target === "player") {
            closePlayer();
        }
    });

    // =========================================================
    // CLICK OUTSIDE MODAL
    // =========================================================

    if (infoModal) {
        infoModal.addEventListener("click", event => {
            if (event.target === infoModal) {
                closeInfo();
            }
        });
    }

    if (playerModal) {
        playerModal.addEventListener("click", event => {
            if (event.target === playerModal) {
                closePlayer();
            }
        });
    }

    // =========================================================
    // SEARCH
    // =========================================================

    function performSearch() {
        if (!searchInput) return;

        const query = searchInput.value.trim().toLowerCase();

        if (!query) {
            if (searchResults) {
                searchResults.style.display = "none";
            }

            if (categoryRows) {
                categoryRows.style.display = "block";
            }

            if (myList) {
                myList.style.display = savedList.length > 0 ? "block" : "none";
            }

            return;
        }

        const results = movies.filter(movie => {
            return (
                movie.title.toLowerCase().includes(query) ||
                movie.genre.toLowerCase().includes(query) ||
                movie.description.toLowerCase().includes(query) ||
                movie.type.toLowerCase().includes(query)
            );
        });

        if (categoryRows) {
            categoryRows.style.display = "none";
        }

        if (myList) {
            myList.style.display = "none";
        }

        if (searchResults) {
            searchResults.style.display = "block";
        }

        if (resultsTitle) {
            resultsTitle.textContent = `Search results for "${searchInput.value}"`;
        }

        if (resultsCount) {
            resultsCount.textContent =
                `${results.length} result${results.length === 1 ? "" : "s"}`;
        }

        if (resultsGrid) {
            resultsGrid.innerHTML = "";
        }

        if (results.length === 0) {
            if (noResults) {
                noResults.style.display = "block";
            }

            if (noResultsText) {
                noResultsText.textContent =
                    `No movies or shows found for "${searchInput.value}".`;
            }

            return;
        }

        if (noResults) {
            noResults.style.display = "none";
        }

        results.forEach(movie => {
            if (resultsGrid) {
                resultsGrid.appendChild(createMovieCard(movie));
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener("input", performSearch);

        searchInput.addEventListener("keydown", event => {
            if (event.key === "Enter") {
                performSearch();
            }
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener("click", () => {
            if (!searchBox) return;

            searchBox.classList.toggle("active");

            if (searchBox.classList.contains("active")) {
                searchInput.focus();
            } else {
                searchInput.value = "";
                performSearch();
            }
        });
    }

    // =========================================================
    // MOBILE MENU
    // =========================================================

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            menuToggle.classList.toggle("active");
        });

        navLinks.addEventListener("click", event => {
            if (event.target.tagName === "A") {
                navLinks.classList.remove("active");
                menuToggle.classList.remove("active");
            }
        });
    }

    // =========================================================
    // NAVIGATION
    // =========================================================

    document.querySelectorAll("[data-nav]").forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();

            const targetId = link.dataset.nav;
            const target = document.getElementById(targetId);

            if (target) {
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

    // =========================================================
    // NAVBAR SCROLL
    // =========================================================

    window.addEventListener("scroll", () => {
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // =========================================================
    // ESC KEY
    // =========================================================

    document.addEventListener("keydown", event => {
        if (event.key !== "Escape") return;

        closeInfo();
        closePlayer();

        if (navLinks && menuToggle) {
            navLinks.classList.remove("active");
            menuToggle.classList.remove("active");
        }
    });

    // =========================================================
    // PLAYER PLAY / PAUSE
    // =========================================================

    if (playerToggle) {
        playerToggle.addEventListener("click", () => {
            if (playerToggle.textContent === "❚❚") {
                playerToggle.textContent = "▶";
                clearInterval(progressInterval);
            } else {
                startFakePlayer();
            }
        });
    }

    // =========================================================
    // INITIALIZE WEBSITE
    // =========================================================

    setHero(movies[0]);
    renderCategories();
    renderMyList();

    console.log("STREAMFLIX loaded successfully.");
});