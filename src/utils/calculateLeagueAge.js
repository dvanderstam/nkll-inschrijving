// utils/calculateLeagueAge.js
import { charterSportLeagueAgeMatrixRows } from './ageData';

export function calculateLeagueAge(sportCode, year, month) {
  // Controleer of alle invoer correct is
  if (sportCode === "99" || year === "99" || month === "99") {
    return { leagueAge: null, leaguePlay: null, message: "Vul alle velden in om de League Age te berekenen." };
  }

  // Zoek het overeenkomstige LeagueAge-object
  const { LeagueAge: leagueAge = null } = charterSportLeagueAgeMatrixRows.find(
    (e) => e.SportCode === parseInt(sportCode) && e.Year === parseInt(year) && e.Month === parseInt(month)
  ) || {};

  const sportType = sportCode === "1" ? "Baseball" : "Softball";
  const leaguePlay = determineLeaguePlay(sportCode, leagueAge);

  // Genereer het bericht op basis van de leagueAge
  const message = generateLeagueAgeMessage(leagueAge, leaguePlay, sportType);
  return { leagueAge, leaguePlay, message };
}

// Bepaal leaguePlay op basis van leagueAge en sportCode
function determineLeaguePlay(sportCode, leagueAge) {
  if (!leagueAge) return "Training, geen NK";

  const leagueOptions = {
    10: "Little league",
    11: sportCode === "2" ? "Little league" : "Little of Intermediate league",
    12: sportCode === "2" ? "Little of Junior league" : "Little, Intermediate of Junior league",
    13: sportCode === "2" ? "Junior of Senior league" : "Intermediate, Junior of Senior league",
    14: "Junior of Senior league",
    15: "Senior league",
    16: "Senior league",
  };
  
  return leagueOptions[leagueAge] || "Training, geen NK";
}

// Genereer het bericht op basis van leeftijd en league
function generateLeagueAgeMessage(leagueAge, leaguePlay, sportType) {
  if (leagueAge && leagueAge > 9) {
    return `<h5>Je mag je inschrijven voor NK Little League programma.</h5> Volgens de little league leeftijd ben je <b>${leagueAge}</b> jaar oud. <br/>Je mag je inschrijven voor NK Little League programma. Jouw league is <br><b>${leaguePlay} ${sportType}</b>.`;
  } else if (leagueAge && leagueAge < 10) {
    return `Volgens de little league leeftijd ben je <b>${leagueAge}</b> jaar oud. <br/>Helaas voldoe je niet aan de Little League leeftijdseis om mee te doen aan het NK.`;
  } else {
    return "Helaas voldoe je niet aan de Little League leeftijdseis. <br/> Je kunt je jammer genoeg niet inschrijven voor het NK Little League.";
  }
}
