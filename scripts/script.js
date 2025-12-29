const players = {
  west: [
    {
      firstName: "Nikola",
      lastName: "Jokic",
      team: "den",
      number: 15,
    },
    {
      firstName: "Shai",
      lastName: "Gilgeous-Alexander",
      team: "okc",
      number: 2,
    },
    {
      firstName: "Victor",
      lastName: "Wembanyama",
      team: "sas",
      number: 1,
    },
    {
      firstName: "Alperen",
      lastName: "Sengun",
      team: "hou",
      number: 28,
    },
    {
      firstName: "Stephen",
      lastName: "Curry",
      team: "gsw",
      number: 30,
    },
  ],
  east: [
    {
      firstName: "Giannis",
      lastName: "Antetokounmpo",
      team: "mil",
      number: 34,
    },
    {
      firstName: "Cade",
      lastName: "Cunningham",
      team: "det",
      number: 2,
    },
    {
      firstName: "Jalen",
      lastName: "Johnson",
      team: "atl",
      number: 1,
    },
    {
      firstName: "Jaylen",
      lastName: "Brown",
      team: "bos",
      number: 7,
    },
    {
      firstName: "Jalen",
      lastName: "Brunson",
      team: "nyk",
      number: 11,
    },
  ],
};

const basicLink = "https://shoneal.github.io/nba-all-star/images/"; // Главная ссылка

Object.values(players).forEach(
  (arr) => arr.sort((a, b) => a.lastName.localeCompare(b.lastName)) // Сортировка игроков по фамилии
);

function setupSections() {
  const container = document.querySelector(".conferences-container");
  const template = document.querySelector(".conference");

  container.innerHTML = "";

  Object.keys(players).forEach((conference) => {
    const clone = template.cloneNode(true);
    clone.querySelector(".title").textContent = conference;
    clone.querySelector(".cards-container").classList.add(conference);
    container.appendChild(clone);
  });
} // Отрисовка секций конференций

function renderPlayers() {
  const template = document.getElementById("player-template").content;

  document.querySelectorAll(".cards-container").forEach((container) => {
    const region = Object.keys(players).find((key) =>
      container.classList.contains(key)
    );

    players[region].forEach((player) => {
      const clone = template.cloneNode(true);

      clone.querySelector(".conference-tag").textContent = region;

      const [team, number] = clone.querySelectorAll(".team-data p");
      team.textContent = player.team;
      number.textContent = `#${player.number}`;

      const [firstName, lastName] = clone.querySelectorAll(".player-name p");
      firstName.textContent = player.firstName;
      lastName.textContent = player.lastName;

      clone.querySelector(".player-text").textContent = player.firstName;

      const logo = clone.querySelector(".team-logo");
      logo.src = `${basicLink}team-logos/${player.team}.svg`;
      logo.alt = `${player.team.toUpperCase()} logo`;

      const shot = clone.querySelector(".headshot");
      shot.src = `${basicLink}players/${player.firstName.toLowerCase()}-${player.lastName.toLowerCase()}.png`;
      shot.alt = `${player.firstName} ${player.lastName} headshot`;

      container.appendChild(clone);
    });
  });
} // Рендеринг карточек игроков

document.addEventListener("DOMContentLoaded", () => {
  setupSections();
  renderPlayers();
}); // Запуск после загрузки DOM
