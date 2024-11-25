// utils/debugger.js

let debugMode = false; // Standaard debugging uitgeschakeld

// Toggle debugmodus aan/uit met Ctrl + B
document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.key === 'b') {
    debugMode = !debugMode;
    console.log(`Debug modus is nu ${debugMode ? 'aan' : 'uit'}`);
  }
});

/**
 * Log data naar de console als debugmodus is ingeschakeld
 * @param {string} label - Beschrijvende label voor de log
 * @param {any} data - De data die moet worden gelogd
 */
export function debugLog(label, data) {
  if (debugMode) {
    console.log(`DEBUG - ${label}:`, data);
  }
}
