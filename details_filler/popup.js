document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("details-form");
  const fillBtn = document.getElementById("fillBtn");

  // Load saved data
  chrome.storage.sync.get(["firstName", "lastName", "email"], (data) => {
    document.getElementById("firstName").value = data.firstName || "";
    document.getElementById("lastName").value = data.lastName || "";
    document.getElementById("email").value = data.email || "";
  });

  // Save form data
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;

    chrome.storage.sync.set({ firstName, lastName, email }, () => {
      alert("Details saved!");
    });
  });

  // Trigger content script to fill form
  fillBtn.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["content.js"]
      });
    });
  });
});
