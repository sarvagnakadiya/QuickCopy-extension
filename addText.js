document.addEventListener("DOMContentLoaded", () => {
  const keyInput = document.getElementById("keyInput");
  const valueInput = document.getElementById("valueInput");
  const addButton = document.getElementById("addButton");

  // Add new text
  addButton.addEventListener("click", () => {
    const key = keyInput.value.trim();
    const value = valueInput.value.trim();
    if (key && value) {
      chrome.storage.sync.get(["texts", "textPositions", "order"], (result) => {
        const texts = result.texts || {};
        const textPositions = result.textPositions || {};
        const order = result.order || [];
        
        // Store the text with additional metadata
        texts[key] = {
          value: value,
          createdAt: new Date().toISOString(),
          lastUsed: new Date().toISOString()
        };

        // Initialize position tracking for this text
        textPositions[key] = {
          lastPosition: null,
          history: []
        };

        // Add the new key to the order array
        order.push(key);

        chrome.storage.sync.set({ texts, textPositions, order }, () => {
          alert("Text added successfully!");
          keyInput.value = "";
          valueInput.value = "";
        });
      });
    }
  });
});
