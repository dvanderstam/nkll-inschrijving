import { fetchLeagueRegion } from './fetchLeagueRegion';

/**
 * Fetches address data from PDOK API and optionally retrieves league region
 * @param {string} postcode - Dutch postal code (e.g., "1234AB")
 * @param {string} huisnummer - House number
 * @param {boolean} includeRegion - Whether to fetch region data
 * @returns {Promise<{success: boolean, data?: object, error?: string}>}
 */
export async function fetchPostalCodeData(postcode, huisnummer, includeRegion = false) {
  if (!postcode || !huisnummer) {
    return { success: false, error: 'Postcode en huisnummer zijn verplicht' };
  }

  const url = `https://api.pdok.nl/bzk/locatieserver/search/v3_1/free?fq=postcode:${postcode}&q=huis_nlt:${huisnummer}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return { success: false, error: 'Verkeerde postcode of huisnummer' };
    }

    const data = await response.json();

    if (!data.response.docs.length) {
      return { success: false, error: 'Verkeerde postcode of huisnummer' };
    }

    const doc = data.response.docs[0];
    const result = {
      success: true,
      data: {
        straat: doc.straatnaam,
        plaats: doc.gemeentenaam,
      }
    };

    if (includeRegion) {
      const regionData = await fetchLeagueRegion(postcode);
      if (regionData?.region) {
        result.data.region = regionData.region;
      }
    }

    return result;
  } catch (error) {
    console.error('Error fetching postal code data:', error);
    return { 
      success: false, 
      error: 'Er is iets misgegaan bij het ophalen van de adresgegevens' 
    };
  }
}
