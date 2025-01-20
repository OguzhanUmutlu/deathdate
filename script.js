const calculateButton = document.querySelector(".calculate");
const popup = document.getElementById("countdown-popup");
const closePopup = document.querySelector(".close-popup");
const countdownTimer = document.getElementById("countdown-timer");

function getSeed(name, birth, field) {
    return name.toLowerCase().split("").map(i => {
        i = i.charCodeAt(0);
        return i > 96 && i < 123 ? (i - 96) / 26 : 1;
    }).reduce((a, b) => a * b, 1) * Math.min(birth.getFullYear(), 2023) / 2023 * Math.min(field.length, 10) / 10;
}

const fields = {
    "Çevre Mühendisliği": 100,
    "Kaldırım Mühendisliği": 90,
    "Bilgisayar Mühendisliği": 80,
    "Makine Mühendisliği": 23,
    "Diğer Mühendislikler": 90,
    "Diğer Mühendis Dışı Bölümler": 90
}

function getDeathDate(name, birth, field) {
    const difference = fields[field] * 365 * 24 * 60 * 60 * 1000 + getSeed(name, birth, field) * 5 * 365 * 24 * 60 * 60 * 1000;
    return new Date(birth * 1 + difference);
}

calculateButton.addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const birth = new Date(document.getElementById("date").value);
    const field = document.getElementById("field").value;

    if (!name || !birth || field === "Bölüm seçiniz...") {
        alert("Lütfen tüm alanları doldurunuz.");
        return;
    }

    const deathDate = getDeathDate(name, birth, field);

    function updateCountdown() {
        const now = new Date();
        const timeRemaining = deathDate - now;

        if (timeRemaining <= 0) {
            countdownTimer.innerHTML = "Süre doldu!";
            return;
        }

        const years = Math.floor(timeRemaining / (1000 * 60 * 60 * 24 * 365));
        const days = Math.floor((timeRemaining % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        countdownTimer.innerHTML = `
                <p>${years} yıl, ${days} gün, ${hours} saat, ${minutes} dakika, ${seconds} saniye kaldı</p>
            `;
    }

    updateCountdown();

    const countdownInterval = setInterval(updateCountdown, 1000);

    popup.style.display = "block";

    closePopup.onclick = () => {
        popup.style.display = "none";
        clearInterval(countdownInterval);
    };

    window.onclick = (event) => {
        if (event.target === popup) {
            popup.style.display = "none";
            clearInterval(countdownInterval);
        }
    };
});