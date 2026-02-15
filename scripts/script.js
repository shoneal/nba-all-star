import { players } from "./players.js";

const basicLink = "https://shoneal.github.io/nba-all-star/images/"; // Главная ссылка

Object.values(players).forEach(
  (arr) => arr.sort((a, b) => a.lastName.localeCompare(b.lastName)), // Сортировка игроков по фамилии
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
const setupImageWithContainer = (img) => {
  const onLoadOrError = () => {
    img.style.opacity = "1";
    img.removeEventListener("load", onLoadOrError);
    img.removeEventListener("error", onLoadOrError);
  };

  if (img.complete) {
    onLoadOrError();
  } else {
    img.addEventListener("load", onLoadOrError);
    img.addEventListener("error", onLoadOrError);
  }
}; // Функция для настройки прозрачности изображения
function renderPlayers() {
  const template = document.getElementById("player-template").content;

  document.querySelectorAll(".cards-container").forEach((container) => {
    const region = Object.keys(players).find((key) =>
      container.classList.contains(key),
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
      logo.style.opacity = "0";
      logo.src = `${basicLink}team-logos/${player.team}.svg`;
      logo.alt = `${player.team.toUpperCase()} logo`;
      setupImageWithContainer(logo);

      const head = clone.querySelector(".headshot");
      head.style.opacity = "0";
      head.src = `${basicLink}players/${player.firstName.toLowerCase()}-${player.lastName.toLowerCase()}.png`;
      head.alt = `${player.firstName} ${player.lastName} headshot`;
      setupImageWithContainer(head);

      container.appendChild(clone);
    });
  });
} // Рендеринг карточек игроков

document.addEventListener("DOMContentLoaded", () => {
  setupSections();
  renderPlayers();
}); // Запуск после загрузки DOM
