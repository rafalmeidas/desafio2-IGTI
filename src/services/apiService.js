import { get } from './HttpService';

const BACK_END_URL = 'http://localhost:3001/';

export async function apiGetAllCandidates() {
  const allCandidates = await get(`${BACK_END_URL}candidates`);
  return allCandidates;
}

export async function apiGetAllCities() {
  const allCities = await get(`${BACK_END_URL}cities`);
  return allCities;
}

export async function apiGetAllElections() {
  const allElections = await get(`${BACK_END_URL}election`);
  return allElections;
}

export async function apiGetAllElectionsOfCity(cityId) {
  const allElections = await get(`${BACK_END_URL}election?cityId=${cityId}`);
  return allElections;
}

//http://localhost:3001/election?cityId=d2dab6a2-3029-45a5-89f2-fcbaee387758
