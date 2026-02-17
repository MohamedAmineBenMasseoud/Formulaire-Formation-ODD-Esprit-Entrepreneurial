const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwhldNYWxvIMIFWF67TF-r6QZv4S6TYapR8bQ2dJQ6iFk9OiKTPlgT52kQWxxU3vuqI/exec";

const form = document.getElementById("form");
const msg = document.getElementById("msg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  msg.textContent = "Envoi en cours...";

  const payload = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    mobile: document.getElementById("mobile").value.trim(),
  };

  try {
    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    msg.textContent = data.ok ? ("✅ " + data.message) : ("❌ " + data.message);

    if (data.ok) form.reset();
  } catch (err) {
    msg.textContent = "❌ Erreur réseau: " + err;
  }
});
