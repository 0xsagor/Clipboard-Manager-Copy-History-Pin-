let history = JSON.parse(localStorage.getItem("clipboard")) || [];

function copyText() {
  const text = document.getElementById("text").value;
  if (!text) return;

  navigator.clipboard.writeText(text);
  history.unshift({ id: Date.now(), text, pin: false });
  localStorage.setItem("clipboard", JSON.stringify(history));

  document.getElementById("text").value = "";
  render();
}

function togglePin(id) {
  history = history.map(h =>
    h.id === id ? { ...h, pin: !h.pin } : h
  );
  localStorage.setItem("clipboard", JSON.stringify(history));
  render();
}

function render() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  history
    .sort((a, b) => b.pin - a.pin)
    .forEach(h => {
      list.innerHTML += `
        <li>
          ${h.pin ? "📌" : ""}
          ${h.text}
          <button onclick="togglePin(${h.id})">
            ${h.pin ? "Unpin" : "Pin"}
          </button>
        </li>
      `;
    });
}

render();
