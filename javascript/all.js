function showTabContent(tabId) {
    // Skry všetky sekcie obsahu
    document.querySelectorAll('.tab-content').forEach((section) => {
        section.style.display = 'none';
    });

    // Zobraz vybranú sekciu
    document.getElementById(tabId).style.display = 'block';

    // Odstráň triedu 'active' zo všetkých odkazov v navigácii
    document.querySelectorAll('nav ul li a').forEach((link) => {
        link.classList.remove('active');
    });

    // Nastav 'active' pre aktuálne kliknutý odkaz
    const activeLink = document.querySelector(`nav ul li a[href="#${tabId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

function showAdvanceDetail(detailId) {
    // Skryjeme všetky popisy
    document.querySelectorAll('.advance-detail').forEach((detail) => {
        detail.style.display = 'none';
    });
    // Zobrazíme zvolený popis
    document.getElementById(detailId).style.display = 'block';
    // Posunieme obrazovku na začiatok obsahu
    document.getElementById('advance').scrollIntoView({ behavior: 'smooth' });
}

function showHowtoDetail(detailId) {
    // Skryjeme všetky popisy
    document.querySelectorAll('.howto-detail').forEach((detail) => {
        detail.style.display = 'none';
    });
    // Zobrazíme zvolený popis
    document.getElementById(detailId).style.display = 'block';
    // Posunieme obrazovku na začiatok obsahu
    document.getElementById('howto').scrollIntoView({ behavior: 'smooth' });
}

function showDetailFromHash() {
    const hash = window.location.hash.substring(1); // odstráni '#'
    if (!hash) {
        showTabContent('basic'); // Predvolená záložka, ak URL neobsahuje hash
        return;
    }

    // Najprv sa pokúsime nájsť prvok s daným ID v celej stránke
    const targetElement = document.getElementById(hash);

    if (targetElement) {
        // Skontrolujeme, v ktorej záložke sa cieľový prvok nachádza
        const parentTab = targetElement.closest('.tab-content');
        if (parentTab) {
            showTabContent(parentTab.id); // Zobrazíme príslušnú záložku
            // Skryjeme všetky detaily len ak je to záložka advance (ak treba skryť obsah)
            if (parentTab.id === 'advance') {
                document.querySelectorAll('.advance-detail').forEach((detail) => {
                    detail.style.display = 'none';
                });
            }
            // Skryjeme všetky detaily len ak je to záložka advance (ak treba skryť obsah)
            if (parentTab.id === 'howto') {
                document.querySelectorAll('.howto-detail').forEach((detail) => {
                    detail.style.display = 'none';
                });
            }
            targetElement.style.display = 'block'; // Zobrazíme cieľový blok
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        showTabContent('basic'); // Predvolená záložka, ak hash nezodpovedá žiadnemu elementu
    }
}

// Načítame obsah pre záložku #basic pri prvom načítaní
document.addEventListener('DOMContentLoaded', showDetailFromHash);
window.addEventListener('hashchange', showDetailFromHash); // Aktualizácia obsahu pri zmene hash