// fetchPostalCode.js
export const fetchPostalCode = async (
  postcode,
  huisnummer,
  setIsPostalCodeValid,
  setIsLoading,
  handleFieldChange,
  updateRegistrationData,
  setRegion,
  setPostalCodeError
) => {
  // Controleer of postcode en huisnummer aanwezig zijn
  if (!postcode || !huisnummer) {
    console.log('Postcode of huisnummer ontbreekt. Foutmelding tonen.');
    setIsPostalCodeValid(false);
    setPostalCodeError('Postcode en huisnummer zijn vereist.');
    return;
  }

  const url = `https://api.pdok.nl/bzk/locatieserver/search/v3_1/free?fq=postcode:${postcode}&q=huis_nlt:${huisnummer}`;

  try {
    setIsLoading(true);
    console.log('Fetching data for:', postcode, huisnummer);

    const response = await fetch(url);
    if (!response.ok) {
      console.error('API returned an error:', response.status);
      setIsPostalCodeValid(false);
      setPostalCodeError('De ingevoerde postcode is ongeldig.');
      return;
    }

    const data = await response.json();
    if (data.response.docs.length > 0) {
      const fetchedStreet = data.response.docs[0].straatnaam;
      const fetchedCity = data.response.docs[0].woonplaatsnaam;

      console.log('Data retrieved from API:', { fetchedStreet, fetchedCity });

      // Update straat en plaats via handleFieldChange
      if (fetchedStreet) {
        await handleFieldChange('nawInfo', 'straat', fetchedStreet);
      }
      if (fetchedCity) {
        await handleFieldChange('nawInfo', 'plaats', fetchedCity);
      }

      // Update regio via een externe regio-ophaal logica
      const regionData = await fetchLeagueRegion(postcode); // Voorbeeldfunctie
      console.log('Region data retrieved:', regionData);

      if (regionData && regionData.region) {
        setRegion(regionData.region);
      }

      setIsPostalCodeValid(true); // Postcode is geldig
      setPostalCodeError(''); // Reset fouten
    } else {
      console.warn('No data found for the provided postcode and house number.');
      setIsPostalCodeValid(false);
      setPostalCodeError('Geen adresgegevens gevonden. Controleer de ingevoerde gegevens.');
    }
  } catch (error) {
    console.error('Error while fetching postal code data:', error);
    setIsPostalCodeValid(false);
    setPostalCodeError('Er is een fout opgetreden bij het ophalen van de gegevens.');
  } finally {
    setIsLoading(false);
  }
};
