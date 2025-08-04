// chrome.storage.sync.get(["firstName", "lastName", "email"], (data) => {
//   if (!data.firstName || !data.lastName || !data.email) return;

//   const fields = document.querySelectorAll("input");

//   fields.forEach((field) => {
//     const name = field.name.toLowerCase();
//     const id = field.id.toLowerCase();
//     if (name.includes("first") || id.includes("first")) {
//       field.value = data.firstName;
//     } else if (name.includes("last") || id.includes("last")) {
//       field.value = data.lastName;
//     } else if (name.includes("email") || id.includes("email")) {
//       field.value = data.email;
//     }
//   });
// });



(function autofillForm() {
  chrome.storage.sync.get(["firstName", "lastName", "email"], (data) => {
    if (!data.firstName || !data.lastName || !data.email) {
      alert("Details not found. Please save them first using the extension.");
      return;
    }

    const fields = document.querySelectorAll("input");

    fields.forEach((field) => {
      const name = field.name?.toLowerCase() || "";
      const id = field.id?.toLowerCase() || "";
      if (name.includes("first") || id.includes("first")) {
        field.value = data.firstName;
        field.dispatchEvent(new Event("input", { bubbles: true }));
      } else if (name.includes("last") || id.includes("last")) {
        field.value = data.lastName;
        field.dispatchEvent(new Event("input", { bubbles: true }));
      } else if (name.includes("email") || id.includes("email")) {
        field.value = data.email;
        field.dispatchEvent(new Event("input", { bubbles: true }));
      }
    });
  });
})();
