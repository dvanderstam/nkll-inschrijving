// utils/fetchLeagueRegion.js

export async function fetchLeagueRegion(postcode) {
  postcode = postcode.toUpperCase();  // Ensure postcode is in uppercase
  console.log("Processing postcode:", postcode);

  if (!/^[0-9]{4}[A-Z]{2}$/.test(postcode)) {
    console.log("Invalid postcode format. Expected format: 1234AB.");
    return { error: "Ongeldige postcode. Voer een geldige Nederlandse postcode in." };
  }
//TODO oficilele postcode check van LL gebruiken
  // Only encode the postcode in the query string
  const urlPt1 = `https://services.arcgis.com/nSZVuSZjHpEZZbRo/ArcGIS/rest/services/Postcodepunten/FeatureServer/0/query?where=postcode6+%3D+%27${encodeURIComponent(postcode)}%27`;
  const urlPt2 = "&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=28992&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson";

  const url2Pt1 = "https://services.arcgis.com/emS4w7iyWEQiulAb/ArcGIS/rest/services/KNBSB_Leaguegrenzen/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=";
  const url2Pt2 = "&geometryType=esriGeometryPoint&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=League&returnGeometry=false&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=";

  try {
    const fullUrl1 = `${urlPt1}${urlPt2}`;
    console.log("Constructed URL for postcode lookup:", fullUrl1); // Log constructed URL

    const response1 = await fetch(fullUrl1);
    const data1 = await response1.json();

    console.log("API Response for Postcode:", postcode, data1);

    if (!data1.features || data1.features.length === 0) {
      console.error("Postcode not found or incorrect.");
      return { error: "Postcode niet gevonden of onjuist" };
    }

    const { x, y } = data1.features[0].geometry;
    const attributes = data1.features[0].attributes || {};

    const fullUrl2 = `${url2Pt1}${x}%2C${y}${url2Pt2}`;
    console.log("Constructed URL for league lookup:", fullUrl2); // Log constructed URL for league

    const response2 = await fetch(fullUrl2);
    const data2 = await response2.json();

    if (!data2.features || data2.features.length === 0) {
      console.error("No region found for this location.");
      return { error: "Geen regio gevonden voor deze locatie" };
    }

    const league = data2.features[0].attributes.League;
    console.log("Fetched region (league):", league);

    return {
      region: league,
      };
  } catch (err) {
    console.error("An error occurred while fetching the data:", err);
    return { error: "Er is een fout opgetreden bij het ophalen van de gegevens" };
  }
}
