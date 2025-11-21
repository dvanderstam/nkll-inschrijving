import { fetch } from 'node-fetch';

export const fetchLeagueData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();

  // Assuming the API returns leagueAge in the response
  // If the API returns it as 'LeagueAge', map it to 'leagueAge'
  return {
    ...data,
    leagueAge: data.LeagueAge || data.leagueAge // Ensure consistent casing
  };
};