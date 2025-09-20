const content = {
    en: {
        welcomeTitle: "Welcome to Ak Hotel!",
        welcomeText: "Experience comfort and luxury in the heart of the city. Book your stay with us today!",
    footerText: "© 2025 Ak Hotel. All rights reserved.",
        location: "Location: Alanya, Antalya",
        features: [
            "2 min walk to the beach",
            "Comfortable rooms",
            "Swimming pool",
            "Cafeteria & Bar",
            "Free Wi-Fi",
            "Family-friendly atmosphere"
        ],
        galleryTitle: "Photo Gallery"
    ,
    mapTitle: "Our location"
    },
    tr: {
        welcomeTitle: "Ak Hotel'e Hoşgeldiniz!",
        welcomeText: "Şehrin kalbinde konfor ve lüksü yaşayın. Hemen rezervasyon yapın!",
    footerText: "© 2025 Ak Hotel. Tüm hakları saklıdır.",
        location: "Konum: Alanya, Antalya",
        features: [
            "Plaja 2 dakika yürüme mesafesi",
            "Konforlu odalar",
            "Yüzme havuzu",
            "Kafeterya & Bar",
            "Ücretsiz Wi-Fi",
            "Aile dostu ortam"
        ],
        galleryTitle: "Fotoğraf Galerisi"
    ,
    mapTitle: "Konumumuz"
    }
};

function setLanguage(lang) {
    document.getElementById('welcome-title').textContent = content[lang].welcomeTitle;
    document.getElementById('welcome-text').textContent = content[lang].welcomeText;
    document.getElementById('footer-text').textContent = content[lang].footerText;
    document.getElementById('hotel-location').textContent = content[lang].location;
    const featuresList = document.getElementById('hotel-features');
    featuresList.innerHTML = '';
    content[lang].features.forEach(f => {
        const li = document.createElement('li');
        li.textContent = f;
        featuresList.appendChild(li);
    });
    document.getElementById('gallery-title').textContent = content[lang].galleryTitle;
    // map title
    const mapTitleEl = document.getElementById('map-title');
    if (mapTitleEl) mapTitleEl.textContent = content[lang].mapTitle || '';
    document.getElementById('lang-en').classList.toggle('active', lang === 'en');
    document.getElementById('lang-tr').classList.toggle('active', lang === 'tr');
}

document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));
document.getElementById('lang-tr').addEventListener('click', () => setLanguage('tr'));

// Set default language
setLanguage('en');

// --- Gallery captions + lightbox ---
const thumbs = Array.from(document.querySelectorAll('.thumb'));
let currentIndex = 0;

function updateCaptions(lang) {
    thumbs.forEach((fig, idx) => {
        const captionEl = fig.querySelector('.caption');
        const text = fig.dataset[`caption${lang === 'en' ? 'En' : 'Tr'}`];
        captionEl.textContent = text || '';
        // store index for navigation
        fig.dataset.index = idx;
    });
}

function openLightbox(index) {
    const fig = thumbs[index];
    const src = fig.dataset.src;
    const caption = fig.dataset[`caption${currentLang === 'en' ? 'En' : 'Tr'}`] || '';
    const lb = document.getElementById('lightbox');
    document.getElementById('lb-image').src = src;
    document.getElementById('lb-caption').textContent = caption;
    lb.classList.remove('hidden');
    lb.setAttribute('aria-hidden', 'false');
    currentIndex = index;
}

function closeLightbox() {
    const lb = document.getElementById('lightbox');
    document.getElementById('lb-image').src = '';
    lb.classList.add('hidden');
    lb.setAttribute('aria-hidden', 'true');
}

function showNext(dir = 1) {
    let next = (currentIndex + dir + thumbs.length) % thumbs.length;
    openLightbox(next);
}

// initial language state for captions
let currentLang = 'en';
updateCaptions(currentLang);

// re-run when language changes
document.getElementById('lang-en').addEventListener('click', () => { currentLang = 'en'; updateCaptions('en'); });
document.getElementById('lang-tr').addEventListener('click', () => { currentLang = 'tr'; updateCaptions('tr'); });

// thumbnail click
thumbs.forEach((fig, idx) => {
    fig.addEventListener('click', () => openLightbox(idx));
});

// lightbox controls
document.querySelector('.lb-close').addEventListener('click', closeLightbox);
document.querySelector('.lb-prev').addEventListener('click', () => showNext(-1));
document.querySelector('.lb-next').addEventListener('click', () => showNext(1));

// keyboard navigation
document.addEventListener('keydown', (e) => {
    const lb = document.getElementById('lightbox');
    if (lb.classList.contains('hidden')) return;
    if (e.key === 'ArrowRight') showNext(1);
    if (e.key === 'ArrowLeft') showNext(-1);
    if (e.key === 'Escape') closeLightbox();
});

// click outside image to close
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') closeLightbox();
});

