/* ==========================================
   EVA Élégance
   script.js
========================================== */

const mainImage = document.getElementById("mainImage");
const thumbnails = document.querySelectorAll(".thumb");

thumbnails.forEach((thumb) => {

    thumb.addEventListener("click", () => {

        mainImage.src = thumb.src;

        thumbnails.forEach((img) => {
            img.classList.remove("active");
        });

        thumb.classList.add("active");

    });

});

/* ===============================
LIGHTBOX
=============================== */

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.querySelector(".close-lightbox");

mainImage.addEventListener("click", () => {

    lightbox.style.display = "flex";

    lightboxImage.src = mainImage.src;

});

closeLightbox.addEventListener("click", () => {

    lightbox.style.display = "none";

});

lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {

        lightbox.style.display = "none";

    }

});
/* ===============================
ORDER FORM
=============================== */

const orderForm = document.getElementById("orderForm");
const successPopup = document.getElementById("successPopup");
const closePopup = document.getElementById("closePopup");

orderForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const wilaya = document.getElementById("wilaya").value.trim();
    const address = document.getElementById("address").value.trim();
    const color = document.getElementById("color").value;

    if (name === "" || phone === "") {

        alert("Veuillez remplir les champs obligatoires.");
        return;

    }

    try{

        const response = await fetch("https://script.google.com/macros/s/AKfycbyrvxXSD_NxZKnFwxUxnVaAv70VvIoZHd5kpzCCv3K1VzOFwSscgFdOvml4EP_yLeY/exec", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name,
        phone,
        wilaya,
        address,
        color
    })
});

if (!response.ok) {
    throw new Error("Erreur serveur");
}

        alert("Le code est arrivé ici");
successPopup.style.display = "flex";

        orderForm.reset();

    }

    catch(error){

        alert("Erreur lors de l'envoi de la commande.");

        console.log(error);

    }

});

closePopup.addEventListener("click", function () {

    successPopup.style.display = "none";

});

successPopup.addEventListener("click", function (e) {

    if (e.target === successPopup) {

        successPopup.style.display = "none";

    }

});

/* ===============================
SMOOTH IMAGE TRANSITION
=============================== */

mainImage.style.transition = "0.3s";

thumbnails.forEach((thumb) => {

    thumb.addEventListener("click", () => {

        mainImage.style.opacity = "0";

        setTimeout(() => {

            mainImage.src = thumb.src;

            mainImage.style.opacity = "1";

        }, 150);

    });

});
/* ===============================
ANIMATIONS
=============================== */

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

}, {
    threshold: 0.15
});

const sections = document.querySelectorAll(
".features, .description, .colors, .delivery, .order-section"
);

sections.forEach((section) => {

    section.style.opacity = "0";
    section.style.transform = "translateY(40px)";
    section.style.transition = "all .8s ease";

    observer.observe(section);

});

/* ===============================
ACTIVE THUMBNAIL
=============================== */

if (thumbnails.length > 0) {
    thumbnails[0].classList.add("active");
}

/* ===============================
CURRENT YEAR
=============================== */

const copyright = document.querySelector(".copyright");

if (copyright) {

    const year = new Date().getFullYear();

    copyright.innerHTML =
        "© " + year + " EVA Élégance. Tous droits réservés.";

}
