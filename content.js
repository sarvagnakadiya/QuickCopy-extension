// Function to update text position
function updateTextPosition(key, position) {
  chrome.storage.sync.get(["textPositions"], (result) => {
    const textPositions = result.textPositions || {};
    if (textPositions[key]) {
      const newPosition = {
        url: window.location.href,
        timestamp: new Date().toISOString(),
        x: position.x,
        y: position.y
      };

      // Update last position
      textPositions[key].lastPosition = newPosition;
      
      // Add to history, keep last 10 positions
      textPositions[key].history.unshift(newPosition);
      if (textPositions[key].history.length > 10) {
        textPositions[key].history.pop();
      }

      chrome.storage.sync.set({ textPositions });
    }
  });
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "UPDATE_POSITION") {
    updateTextPosition(request.key, request.position);
  }
}); 