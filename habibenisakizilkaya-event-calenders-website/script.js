console.log("script.js yüklendi");
if (window.location.pathname.includes("index.html")) {
    localStorage.removeItem("filterCategory");
}

/***********************
 * EVENT VERİLERİ
 ***********************/

let events = JSON.parse(localStorage.getItem("events"));

if (!events || events.length < 12) {
    events = [
        {
            id: 1,
            title: "Canlı Müzik Gecesi",
            date: "10 Nisan",
            time: "20:00",
            location: "Adana",
            address: "Merkez Park Amfi Tiyatro, Seyhan/Adana",
            category: "Müzik",
            image: "images/music.jpg"
        },
        {
            id: 2,
            title: "Açık Hava Sineması",
            date: "11 Nisan",
            time: "20:00",
            location: "Adana",
            address: "Merkez Park Amfi Tiyatro, Seyhan/Adana",
            category: "Kültür",
            image: "images/cinema.jpg"
        },
        {
            id: 3,
            title: "Sabah Yogası",
            date: "12 Mayıs",
            time: "08:00",
            location: "Adana",
            address: "Atatürk Parkı, Seyhan/Adana",
            category: "Spor",
            image: "images/yoga.jpg"
        },
        {
            id: 4,
            title: "Aromaterapi Atölyesi",
            date: "13 Haziran",
            time: "16:00",
            location: "Adana",
            address: "Lena coffe , Seyhan/Adana",
            category: "Eğitim",
            image: "images/aromaterapi.jpg"
        },
        {
            id: 5,
            title: "Adana Lezzet Festivali",
            date: "9-10-11 Ekim",
            time: "12:00 - 22:00",
            location: "Adana",
            address: "Merkez Park, Seyhan/Adana",
            category: "Yeme-İçme",
            image: "images/food.jpg"
        },
        {
            id: 6,
            title: "Koşu Etkinliği",
            date: "15 Ekim",
            time: "09:00",
            location: "Adana",
            address: "Menderes Sahil Yolu, Seyhan/Adana",
            category: "Spor",
            image: "images/run.jpg"
        },
        {
            id: 7,
            title: "Kitap Okuma Buluşması",
            date: "20 Ekim",
            time: "18:00",
            location: "Adana",
            address: "Ziyapaşa Bulvarı No:45, Seyhan/Adana",
            category: "Kültür",
            image: "images/book.jpg"
        },
        {
            id: 8,
            title: "Resim Sergisi",
            date: "17 Kasım",
            time: "10:00 - 18:00",
            location: "Adana",
            address: "İstiklal Caddesi No:22, Adana Çağdaş Sanatlar Fuarı, Seyhan/Adana",
            category: "Sanat",
            image: "images/art.jpg"
        },
        {
            id: 9,
            title: "Teknoloji Summiti",
            date: "18 Kasım",
            time: "09:00 - 17:00",
            location: "Adana",
            address: "Teknopark Adana, Sarıçam/Adana",
            category: "Eğitim",
            image: "images/tech.jpg"
        },
        {
            id: 10,
            title: "Bisiklet Turu",
            date: "19 Mayıs",
            time: "10:00",
            location: "Adana",
            address: "Atatürk Parkı, Seyhan/Adana",
            category: "Spor",
            image: "images/bike.jpg"
        },
        {
            id: 11,
            title: "İçimizdeki Şeytan",
            date: "20 Haziran",
            time: "20:00",
            location: "Adana",
            address: "Adana Devlet Tiyatrosu, Seyhan/Adana",
            category: "Sanat",
            image: "images/theatre.jpg"
        },
        {
            id: 12,
            title: "Girişimcilik Meet-up",
            date: "21 Haziran",
            time: "12:00 - 17:00",
            location: "Adana",
            address: "Ziyapaşa Bulvarı No:78, Seyhan/Adana",
            category: "Eğitim",
            image: "images/meetup.jpg"
        }
    ];

    localStorage.setItem("events", JSON.stringify(events));
}

/***********************
 * ANA SAYFA – EVENT LİSTESİ
 ***********************/
function loadEvents() {
  const eventList = document.getElementById("eventList");
  eventList.innerHTML = "";

  const selectedCategory = localStorage.getItem("filterCategory");

  const filteredEvents = selectedCategory
    ? events.filter(e => e.category === selectedCategory)
    : events;

  filteredEvents.forEach(event => {
    eventList.innerHTML += `
      <div class="event-card">
        <img src="${event.image}" class="event-image">
        <div class="event-content">
          <h3>${event.title}</h3>
          <p>📅 ${event.date}</p>
          <p>📍 ${event.location}</p>
          <p>⏰ ${event.time}</p>
          <p>🏠 ${event.address}</p>

          <button onclick="goToDetail(${event.id})">Detay</button>
        </div>
      </div>
    `;
  });
}


/***********************
 * DETAY SAYFASI
 ***********************/
function loadEventDetail() {
    const title = document.getElementById("eventName");
    if (!title) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    let events = JSON.parse(localStorage.getItem("events")) || [];
    let event = events.find(e => e.id == id);

    if (event) {
        title.innerText = event.name;
        document.getElementById("eventDate").innerText = "📅 " + event.date;
        document.getElementById("eventTime").innerText = "⏰ " + event.time;
        document.getElementById("eventLocation").innerText = "📍 " + event.location;
        document.getElementById("eventAddress").innerText = "🏠 " + event.address;
        document.getElementById("mapLocation").innerText = event.location;
      
        window.currentEvent = event;
        
    }

}

/***********************
 * FAVORİLER
 ***********************/
function addCurrentToFavorite() {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (!favorites.find(e => e.id === currentEvent.id)) {
        favorites.push(currentEvent);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        alert("Favorilerinize eklendi ❤️");
    } else {
        alert("Favorilerinize Eklendi! ❤️");
    }
}

function loadFavorites() {
    const list = document.getElementById("favoriteList");
    if (!list) return;

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    list.innerHTML = "";

    favorites.forEach(event => {
        let li = document.createElement("li");
        li.innerText = `${event.name} - ${event.location}`;
        list.appendChild(li);
    });
}

/***********************
 * ETKİNLİK EKLEME
 ***********************/
function addEvent() {
    let events = JSON.parse(localStorage.getItem("events")) || [];

    let newEvent = {
        id: Date.now(),
        name: document.getElementById("eventName").value,
        category: document.getElementById("eventCategory").value,
        date: document.getElementById("eventDate").value,
        location: document.getElementById("eventLocation").value
    };

    events.push(newEvent);
    localStorage.setItem("events", JSON.stringify(events));

    alert("Etkinlik eklendi!");
    window.location.href = "index.html";
}

/***********************
 * FİLTRELEME
 ***********************/
function applyFilter() {
    let category = document.getElementById("filterCategory").value;
    localStorage.setItem("filterCategory", category);
    window.location.href = "index.html";
}

/***********************
 * SAYFA YÜKLENDİĞİNDE
 ***********************/
document.addEventListener("DOMContentLoaded", function () {
    loadEvents();
    loadEventDetail();
    loadFavorites();
});
function addEvent() {
    const name = document.getElementById("eventName").value;
    const category = document.getElementById("eventCategory").value;
    const date = document.getElementById("eventDate").value;
    const location = document.getElementById("eventLocation").value;

    if (!name || !category || !date || !location) {
        alert("Lütfen tüm alanları doldurun");
        return;
    }

    let events = JSON.parse(localStorage.getItem("events")) || [];

    const newEvent = {
        id: Date.now(),
        name,
        category,
        date,
        location
    };

    events.push(newEvent);
    localStorage.setItem("events", JSON.stringify(events));

    alert("Etkinlik başarıyla eklendi ✅");
    window.location.href = "index.html";
}

function goToDetail(id) {
    localStorage.setItem("selectedEventId", id);
    window.location.href = "detail.html";
}

function loadEventDetail() {
    const eventId = localStorage.getItem("selectedEventId");
    if (!eventId) return;

    const event = events.find(e => e.id == eventId);
    if (!event) return;

   document.getElementById("detailImage").src = event.image;
    document.getElementById("detailTitle").innerText = event.title;
    document.getElementById("detailDate").innerText = event.date ? "📅 " + event.date : "";
    document.getElementById("detailTime").innerText = event.time ? "⏰ " + event.time : "";
    document.getElementById("detailLocation").innerText = event.location ? "📍 " + event.location : "";
    document.getElementById("detailAddress").innerText = event.address ? "🏠 " + event.address : "";
    document.getElementById("detailCategory").innerText = event.category ? "🏷️ " + event.category : "";
}


// DETAIL PAGE LOGIC
if (window.location.pathname.includes("detail.html")) {

    events = JSON.parse(localStorage.getItem("events"));
    const selectedId = localStorage.getItem("selectedEventId");

    if (!events || !selectedId) {
        alert("Etkinlik bulunamadı");
    } else {
        const event = events.find(e => e.id == selectedId);

        if (!event) {
            alert("Etkinlik bulunamadı");
        } else {
            document.getElementById("detailImage").src = event.image;
            document.getElementById("detailTitle").textContent = event.title;
            document.getElementById("detailDate").textContent = "📅 Tarih: " + event.date;
            document.getElementById("detailTime").textContent = "⏰ Saat: " + event.time;
            document.getElementById("detailLocation").textContent = "📍 Mekan: " + event.location;
            document.getElementById("detailAddress").textContent = "🏠 Adres: " + event.address;
            // Google Maps embed
            const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(event.address)}&output=embed`;
            document.getElementById("mapFrame").src = mapUrl;

            document.getElementById("detailCategory").textContent = "🎭 Kategori: " + event.category;
        }
        // FAVORI SISTEMI
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

const favBtn = document.getElementById("favoriteBtn");

// Sayfa açıldığında kontrol et
if (favorites.includes(event.id)) {
    favBtn.classList.add("active");
    favBtn.textContent = "❤️ Favorilerden Çıkar";
}

// Tıklama
favBtn.addEventListener("click", () => {
    if (favorites.includes(event.id)) {
        favorites = favorites.filter(id => id !== event.id);
        favBtn.classList.remove("active");
        favBtn.textContent = "🤍 Favoriye Ekle";
    } else {
        favorites.push(event.id);
        favBtn.classList.add("active");
        favBtn.textContent = "❤️ Favorilerden Çıkar";
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
});

    }
}
// FAVORITES PAGE
if (window.location.pathname.includes("favorites.html")) {

    const events = JSON.parse(localStorage.getItem("events")) || [];
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const favList = document.getElementById("favoritesList");
    const emptyText = document.getElementById("emptyFav");

    const favoriteEvents = events.filter(event =>
        favorites.includes(event.id)
    );

    if (favoriteEvents.length === 0) {
        emptyText.style.display = "block";
    } else {
        favoriteEvents.forEach(event => {
            favList.innerHTML += `
                <div class="event-card">
                    <img src="${event.image}" class="event-image">
                    <div class="event-content">
                        <h3>${event.title}</h3>
                        <p>📅 ${event.date}</p>
                        <p>📍 ${event.location}</p>
                        <button onclick="goToDetail(${event.id})">
                            Detay
                        </button>
                    </div>
                </div>
            `;
        });
    }
}

function getLocationEvents() {
    if (!navigator.geolocation) {
        alert("Tarayıcınız konum desteği sunmuyor");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // Basit mock: Türkiye'de ise Adana kabul ediyoruz
            // (Prototip için yeterli)
            filterByLocation("Adana");
        },
        () => {
            alert("Konum izni verilmedi");
        }
    );
}

//  etkinlikleri filtrele
function filterByLocation(city) {
    const eventList = document.getElementById("eventList");
    eventList.innerHTML = "";

    const filtered = events.filter(event =>
        event.address.toLowerCase().includes(city.toLowerCase())
    );

    if (filtered.length === 0) {
        eventList.innerHTML = "<p>Bu konumda etkinlik bulunamadı.</p>";
        return;
    }

    filtered.forEach(event => {
        eventList.innerHTML += `
            <div class="event-card">
                <img src="${event.image}" class="event-image">
                <div class="event-content">
                    <h3>${event.title}</h3>
                    <p>📅 ${event.date}</p>
                    <p>📍 ${event.location}</p>
                    <button onclick="goToDetail(${event.id})">Detay</button>
                </div>
            </div>
        `;
    });
}

function applyFilters() {
    const searchText = document.getElementById("searchInput").value.toLowerCase();
    const locationText = document.getElementById("locationInput").value.toLowerCase();
    const selectedCategory = document.getElementById("categorySelect").value;

    const filteredEvents = events.filter(event => {
        const matchesSearch =
            event.title.toLowerCase().includes(searchText);

        const matchesLocation =
            event.location.toLowerCase().includes(locationText);

        const matchesCategory =
            selectedCategory === "" || event.category === selectedCategory;

        return matchesSearch && matchesLocation && matchesCategory;
    });

    renderEvents(filteredEvents);
}

function renderEvents(eventList) {
    const container = document.getElementById("eventsContainer");
    container.innerHTML = "";

    eventList.forEach(event => {
        container.innerHTML += `
            <div class="event-card">
                <img src="${event.image}">
                <h3>${event.title}</h3>
                <p>📍${event.location}</p>
                <p>📅${event.date}</p>
                <p>⏰${event.time}</p>
                <button onclick="goToDetail(${event.id})">Detay</button>
            </div>
        `;
    });
}
//renderEvents(events);

// Google Calendar'a ekle
function addToCalendar(event) {
    const startDate = "20250410T200000"; // mock
    const endDate = "20250410T220000";

    const url = `https://www.google.com/calendar/render?action=TEMPLATE
        &text=${encodeURIComponent(event.title)}
        &dates=${startDate}/${endDate}
        &details=${encodeURIComponent(event.category)}
        &location=${encodeURIComponent(event.address)}
        &sf=true&output=xml`;

    window.open(url, "_blank");
}

// Bildirim izni iste
function requestNotificationPermission() {
    if ("Notification" in window) {
        Notification.requestPermission();
    }
}

requestNotificationPermission();
// Etkinlik hatırlatması
function scheduleEventReminder(event) {
    if (Notification.permission === "granted") {
        const eventDate = new Date(event.date + " " + event.time.split(" - ")[0]);
        const now = new Date();
        const timeUntilEvent = eventDate - now - 3600000; // 1 saat öncesi  
        if (timeUntilEvent > 0) {
            setTimeout(() => {
                new Notification("Etkinlik Hatırlatması", {
                    body: `${event.title} etkinliği 1 saat içinde başlayacak!`,
                    icon: event.image
                });
            }, timeUntilEvent);
        }
    }
}
events.forEach(event => {
    scheduleEventReminder(event);
});

// Bildirim butonu
function notifyEvent(event) {
    if (Notification.permission === "granted") {
        new Notification("Etkinlik Bildirimi", {
            body: `${event.title} etkinliği hakkında bildirim almayı seçtiniz!`,
            icon: event.image
        });
    } else {
        alert("Bildirim izni verilmedi");
    }
}
function saveReminder() {
    const minutesBefore = document.getElementById("reminderSelect").value;
    if (!minutesBefore) return alert("Lütfen bir hatırlatma seçin.");

    const eventId = localStorage.getItem("selectedEventId");
    let reminders = JSON.parse(localStorage.getItem("reminders")) || [];

    reminders.push({
        eventId: Number(eventId),
        minutesBefore: Number(minutesBefore)
    });

    localStorage.setItem("reminders", JSON.stringify(reminders));
    alert("Hatırlatıcı kaydedildi ✅");
}
function loadReminders() {
    const eventId = localStorage.getItem("selectedEventId");
    const reminders = JSON.parse(localStorage.getItem("reminders")) || [];
    const eventReminders = reminders.filter(r => r.eventId == eventId);
    const list = document.getElementById("reminderList");
    list.innerHTML = "";
    eventReminders.forEach(r => {
        const li = document.createElement("li");
        li.innerText = `Etkinlikten ${r.minutesBefore} dakika önce`;
        list.appendChild(li);
    });
}
document.addEventListener("DOMContentLoaded", function () {
    loadReminders();
}
);
//aktif hatırlatıcıyı göster
function loadReminderInfo() {
    const eventId = Number(localStorage.getItem("selectedEventId"));
    const reminders = JSON.parse(localStorage.getItem("reminders")) || [];

    const reminder = reminders.find(r => r.eventId === eventId);
    if (!reminder) return;

    const text =
        reminder.minutesBefore === 1440 ? "1 gün önce" :
        reminder.minutesBefore === 60 ? "1 saat önce" :
        `${reminder.minutesBefore} dk önce`;

    document.getElementById("activeReminder").innerText =
        `⏰ Aktif hatırlatıcı: ${text}`;

    document.getElementById("deleteReminderBtn").style.display = "inline-block";
}
loadReminderInfo();

//hatırlatıcı silme
function clearReminders() {
    const eventId = localStorage.getItem("selectedEventId");
    let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
    reminders = reminders.filter(r => r.eventId != eventId);
    localStorage.setItem("reminders", JSON.stringify(reminders));
    loadReminders();
    alert("Tüm hatırlatıcılar silindi 🗑️");
}
// butona tıklama
document.getElementById("clearRemindersBtn").addEventListener("click", clearReminders);
function scheduleEventReminder(event) {
    if (Notification.permission === "granted") {
        const reminders = JSON.parse(localStorage.getItem("reminders")) || [];
        const eventReminders = reminders.filter(r => r.eventId == event.id);
        eventReminders.forEach(r => {
            const eventDate = new Date(event.date + " " + event.time.split(" - ")[0]);
            const now = new Date();
            const timeUntilReminder = eventDate - now - r.minutesBefore * 60000; // dakika cinsinden
            if (timeUntilReminder > 0) {
                setTimeout(() => {
                    new Notification("Etkinlik Hatırlatması", {
                        body: `${event.title} etkinliği ${r.minutesBefore} dakika içinde başlayacak!`,
                        icon: event.image
                    });
                }, timeUntilReminder);
            }   
        });
    }
}
// profilde favorileri görüntüle
events = JSON.parse(localStorage.getItem("events")) || [];
const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

const container = document.getElementById("favoriteList");

if (favorites.length === 0) {
  container.innerHTML = "<p>Henüz favori etkinliğin yok.</p>";
} else {
  favorites.forEach(id => {
    const event = events.find(e => e.id === id);
    if (!event) return;

    container.innerHTML += `
      <div class="card">
        <h3>${event.title}</h3>
        <p>📅 ${event.date} ⏰ ${event.time}</p>
        <p>📍 ${event.location}</p>
      </div>
    `;
  });
}
function toggleFavorite(eventId) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.includes(eventId)) {
    favorites = favorites.filter(id => id !== eventId);
  } else {
    favorites.push(eventId);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
}
document.getElementById("favoriteBtn").addEventListener("click", () => {
    const eventId = Number(localStorage.getItem("selectedEventId"));
    toggleFavorite(eventId);
    alert("Favori durumu değiştirildi ❤️");
});
// profil sayfası kontrolü 
if (window.location.pathname.includes("profile.html")) {
    loadFavoriteEvents();
}
function loadProfile() {
    const user = JSON.parse(localStorage.getItem("userProfile"));
    if (!user) return;

    document.getElementById("profileName").value = user.name;
    document.getElementById("profileEmail").value = user.email;
    document.getElementById("profileCity").value = user.city;
}
if (window.location.pathname.includes("profile.html")) {
    loadProfile();
}

function saveProfile() {
    const updatedUser = {
        name: document.getElementById("profileName").value,
        email: document.getElementById("profileEmail").value,
        city: document.getElementById("profileCity").value
    };

    localStorage.setItem("userProfile", JSON.stringify(updatedUser));
    alert("Profil güncellendi ✅");
}
