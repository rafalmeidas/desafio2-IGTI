import { get } from './HttpService';

const BACK_END_URL = 'http://localhost:3001/';

export async function apiGetAllCandidates() {
  const allCandidates = await get(`${BACK_END_URL}candidates`);
  return allCandidates;
}

export async function apiGetAllCities() {
  const allCities = await get(`${BACK_END_URL}cities`);
  const ordenedAllCities = allCities.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return ordenedAllCities;
}

export async function apiGetAllElections() {
  const allElections = await get(`${BACK_END_URL}election`);
  return allElections;
}

export async function apiGetAllElectionsOfCity(cityId) {
  const allElections = await get(`${BACK_END_URL}election?cityId=${cityId}`);

  const ordenedAllElections = allElections.sort((a, b) => {
    if (a.votes > b.votes) {
      return -1;
    }
    if (a.votes < b.votes) {
      return 1;
    }
    return 0;
  });
  return ordenedAllElections;
}
