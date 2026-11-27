console.log("Bienvenue sur mon site de cours !");

document.addEventListener('DOMContentLoaded', () => {
        // Menu burger sur téléphone (uniquement sur les pages qui ont une navbar)
        const burger = document.querySelector('.menu-burger');
        const navbar = document.querySelector('.navbar');
        if (burger && navbar) {
            const fermerMenu = () => {
                navbar.classList.remove('menu-ouvert');
                burger.setAttribute('aria-expanded', 'false');
                burger.setAttribute('aria-label', 'Ouvrir le menu');
                burger.innerHTML = '<i class="fas fa-bars"></i>';
            };
            burger.addEventListener('click', () => {
                const ouvert = navbar.classList.toggle('menu-ouvert');
                burger.setAttribute('aria-expanded', String(ouvert));
                burger.setAttribute('aria-label', ouvert ? 'Fermer le menu' : 'Ouvrir le menu');
                burger.innerHTML = ouvert ? '<i class="fas fa-xmark"></i>' : '<i class="fas fa-bars"></i>';
            });
            // Un clic sur un lien referme le menu
            navbar.querySelectorAll('.nav-links a').forEach(lien => lien.addEventListener('click', fermerMenu));
        }

        // Le curseur vert n'a de sens qu'avec une souris : on ne le crée pas sur écran tactile
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: #00ff88;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
            transform: translate(-50%, -50%);
            box-shadow: 0 0 20px rgba(0, 255, 136, 0.6);
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Fait grossir le rond vert au survol des liens et boutons
        const links = document.querySelectorAll('a, button');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.6)';
            });
            link.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    });


const avisList = [
    {
        texte: "Grâce aux cours de Mithushan, j'ai complètement remonté ma moyenne en maths en fin de trimestre !",
        auteur: "- Thomas, Élève en Terminale"
    },
    {
        texte: "Explications super claires en physique, il prend le temps de s'adapter à nos difficultés. Je recommande à 100% !",
        auteur: "- Sarah, Élève en 1ère"
    },
    {
        texte: "Un prof patient et pédagogue. Les fiches de révision et les explications m'ont sauvé pour mes examens d'informatique.",
        auteur: "- Lucas, Étudiant en Supérieur"
    }
];

let currentIndex = 0;

const texteElem = document.getElementById('avis-texte');
const auteurElem = document.getElementById('avis-auteur');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

function mettreAJourAvis() {
    // Effet de fondu rapide
    texteElem.style.opacity = 0;
    auteurElem.style.opacity = 0;
    
    setTimeout(() => {
        texteElem.textContent = `"${avisList[currentIndex].texte}"`;
        auteurElem.textContent = avisList[currentIndex].auteur;
        texteElem.style.opacity = 1;
        auteurElem.style.opacity = 1;
    }, 200);
}

// Le carrousel n'existe que sur index.html : on ne l'active que si les éléments sont présents
if (texteElem && auteurElem && prevBtn && nextBtn) {
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % avisList.length;
        mettreAJourAvis();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + avisList.length) % avisList.length;
        mettreAJourAvis();
    });
}

// --- ANIMATION SCROLL REVEAL ---
document.addEventListener('DOMContentLoaded', () => {
    // On sélectionne tous les éléments qu'on veut animer (on utilisera la classe .reveal)
    const reveals = document.querySelectorAll('.reveal');

    // On configure l'observateur
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Si l'élément devient visible à l'écran
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optionnel : arrêter d'observer l'élément une fois qu'il est apparu
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1 // L'animation se déclenche quand 10% de l'élément est visible
    });

    // On applique l'observateur à chaque élément
    reveals.forEach(reveal => {
        observer.observe(reveal);
    });
});
// --- ESPACE ÉLÈVES : ACCÈS PAR CODE ---
// Associe chaque code à la page dédiée de l'élève (ajoutez une ligne par élève).
// Écrire les codes en minuscules : la saisie est convertie en minuscules,
// donc les majuscules tapées par l'élève ne comptent pas.
const codesEleves = {
    "amine42": "eleve-amine.html",
    "kajalvili2303": "eleve-kajalvili.html"
};

document.addEventListener('DOMContentLoaded', () => {
    const btnCode = document.getElementById('btn-code');
    const formCode = document.getElementById('form-code');
    const inputCode = document.getElementById('input-code');
    const erreurCode = document.getElementById('code-erreur');

    // Ces éléments n'existent que sur eleves.html
    if (!btnCode || !formCode || !inputCode || !erreurCode) return;

    btnCode.addEventListener('click', () => {
        formCode.hidden = false;
        btnCode.parentElement.hidden = true;
        inputCode.focus();
    });

    // Bouton œil : affiche ou masque le code saisi
    const oeil = document.getElementById('code-oeil');
    if (oeil) {
        oeil.addEventListener('click', () => {
            const visible = inputCode.type === 'password';
            inputCode.type = visible ? 'text' : 'password';
            oeil.setAttribute('aria-pressed', String(visible));
            oeil.setAttribute('aria-label', visible ? 'Masquer le code' : 'Afficher le code');
            oeil.innerHTML = visible ? '<i class="fas fa-eye-slash"></i>' : '<i class="fas fa-eye"></i>';
            inputCode.focus();
        });
    }

    formCode.addEventListener('submit', (e) => {
        e.preventDefault();
        const page = codesEleves[inputCode.value.trim().toLowerCase()];
        if (page) {
            window.location.href = page;
        } else {
            erreurCode.textContent = "Code incorrect, veuillez réessayer.";
            inputCode.value = '';
            inputCode.focus();
        }
    });
});
