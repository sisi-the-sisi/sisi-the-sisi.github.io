const events = [
  {
    date: "1903",
    title: "Powered flight takes off",
    category: "technology",
    impact: "New mobility",
    summary: "A short flight proves that controlled, powered aviation can move from experiment to industry.",
    detail:
      "The first sustained powered flights opened a new era in transportation, military planning, mapping, and global logistics.",
  },
  {
    date: "1928",
    title: "Penicillin changes medicine",
    category: "science",
    impact: "Public health",
    summary: "A lab observation points toward antibiotics and a major shift in treating infection.",
    detail:
      "The discovery of penicillin turned accidental observation into a medical platform that reshaped surgery, wartime care, and everyday health.",
  },
  {
    date: "1948",
    title: "The transistor is introduced",
    category: "technology",
    impact: "Computing foundation",
    summary: "A tiny semiconductor component becomes the basis for modern electronics.",
    detail:
      "Transistors made electronics smaller, cheaper, and more reliable, creating the technical foundation for computers, satellites, and consumer devices.",
  },
  {
    date: "1969",
    title: "A global audience watches the Moon landing",
    category: "culture",
    impact: "Shared spectacle",
    summary: "Science, media, and national ambition converge in a broadcast watched around the world.",
    detail:
      "The Moon landing became a cultural marker as much as an engineering one, proving that live media could turn exploration into a shared global event.",
  },
  {
    date: "1977",
    title: "Personal computers reach hobbyists",
    category: "technology",
    impact: "Creative tools",
    summary: "Desktop machines begin shifting computation from institutions into homes and small offices.",
    detail:
      "The personal computer era gave individuals direct access to programming, publishing, games, accounting, and new forms of creative work.",
  },
  {
    date: "1989",
    title: "The World Wide Web is proposed",
    category: "society",
    impact: "Open information",
    summary: "A hypertext system creates a practical path for connecting documents across the internet.",
    detail:
      "The web lowered the barrier to publishing and discovery, creating a social and economic layer on top of the internet.",
  },
  {
    date: "2007",
    title: "Smartphones redefine the interface",
    category: "culture",
    impact: "Mobile habits",
    summary: "Touch-first mobile computing makes software part of daily public life.",
    detail:
      "Modern smartphones changed how people navigate, shop, socialize, photograph, work, and expect services to be delivered.",
  },
  {
    date: "2012",
    title: "Deep learning breaks through",
    category: "science",
    impact: "Pattern recognition",
    summary: "Neural networks begin outperforming older approaches in image recognition and related tasks.",
    detail:
      "The deep learning wave connected larger datasets, specialized hardware, and new model architectures into a general-purpose research engine.",
  },
  {
    date: "2020",
    title: "Remote work scales overnight",
    category: "society",
    impact: "Work redesign",
    summary: "Distributed teams become normal for many organizations, changing tools and expectations.",
    detail:
      "Remote work pushed collaboration software, home offices, asynchronous process, and hiring geography into the center of organizational design.",
  },
  {
    date: "2026",
    title: "AI assistants enter everyday workflows",
    category: "technology",
    impact: "Human-computer collaboration",
    summary: "Generative systems become embedded in writing, coding, research, design, and operations.",
    detail:
      "AI assistants increasingly act as collaborators across knowledge work, turning natural language into a common interface for complex tools.",
  },
];

const colors = {
  technology: "#0f766e",
  culture: "#8f2438",
  science: "#b88234",
  society: "#30383b",
};

const timelineList = document.querySelector("#timelineList");
const emptyState = document.querySelector("#emptyState");
const searchInput = document.querySelector("#searchInput");
const filterButtons = document.querySelectorAll(".filter");
const eventCount = document.querySelector("#eventCount");
const detailTitle = document.querySelector("#detailTitle");
const detailDate = document.querySelector("#detailDate");
const detailBody = document.querySelector("#detailBody");
const detailCategory = document.querySelector("#detailCategory");
const detailImpact = document.querySelector("#detailImpact");

let activeFilter = "all";
let selectedId = 0;

function eventMatches(event) {
  const term = searchInput.value.trim().toLowerCase();
  const categoryMatch = activeFilter === "all" || event.category === activeFilter;
  const text = `${event.date} ${event.title} ${event.category} ${event.summary} ${event.detail}`.toLowerCase();
  return categoryMatch && (!term || text.includes(term));
}

function selectEvent(index) {
  selectedId = index;
  const event = events[index];
  detailTitle.textContent = event.title;
  detailDate.textContent = event.date;
  detailBody.textContent = event.detail;
  detailCategory.textContent = event.category;
  detailImpact.textContent = event.impact;

  document.querySelectorAll(".event-button").forEach((button) => {
    button.classList.toggle("is-selected", Number(button.dataset.index) === index);
  });
}

function renderTimeline() {
  const visibleEvents = events
    .map((event, index) => ({ ...event, index }))
    .filter(eventMatches);

  timelineList.innerHTML = "";
  emptyState.hidden = visibleEvents.length > 0;
  eventCount.textContent = events.length;

  visibleEvents.forEach((event) => {
    const item = document.createElement("li");
    item.className = "timeline-item";
    item.style.setProperty("--item-color", colors[event.category]);

    const button = document.createElement("button");
    button.className = "event-button";
    button.type = "button";
    button.dataset.index = event.index;
    button.innerHTML = `
      <span class="event-top">
        <span class="event-date">${event.date}</span>
        <span class="event-category">${event.category}</span>
      </span>
      <strong class="event-title">${event.title}</strong>
      <p class="event-summary">${event.summary}</p>
    `;

    button.addEventListener("click", () => selectEvent(event.index));
    item.append(button);
    timelineList.append(item);
  });

  const selectedStillVisible = visibleEvents.some((event) => event.index === selectedId);
  if (visibleEvents.length && !selectedStillVisible) {
    selectEvent(visibleEvents[0].index);
    return;
  }

  if (visibleEvents.length) {
    selectEvent(selectedId);
  }
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    renderTimeline();
  });
});

searchInput.addEventListener("input", renderTimeline);

renderTimeline();
