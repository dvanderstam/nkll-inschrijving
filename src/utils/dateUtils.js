// utils/dateUtils.js

/**
 * Parses various date string formats to Date object
 * @param {string|Date} dateString - Date in various formats
 * @returns {Date|null} - Parsed date or null if invalid
 */
export function parseDate(dateString) {
  if (!dateString) return null;
  if (dateString instanceof Date) return isNaN(dateString) ? null : dateString;

  // ISO format: YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}/.test(dateString)) {
    const d = new Date(dateString);
    return isNaN(d) ? null : d;
  }

  // DD/MM/YYYY or DD-MM-YYYY
  const dmy = dateString.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (dmy) {
    const [, dd, mm, yyyy] = dmy;
    const iso = `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
    const d = new Date(iso);
    return isNaN(d) ? null : d;
  }

  // Fallback
  const fallback = new Date(dateString);
  return isNaN(fallback) ? null : fallback;
}

/**
 * Formats date to Dutch long format
 * @param {string|Date} dateString - Date to format
 * @returns {string} - Formatted date or '-'
 */
export function formatDateLong(dateString) {
  const d = parseDate(dateString);
  if (!d) return '-';
  return d.toLocaleDateString('nl-NL', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
}

/**
 * Calculates real age from birth date
 * @param {string|Date} birthDateString - Birth date
 * @returns {number|null} - Age in years or null
 */
export function calculateAge(birthDateString) {
  const birthDate = parseDate(birthDateString);
  if (!birthDate) return null;

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}
