import React, { useEffect, useState } from 'react';
import Cards from '../components/Cards';
import Card from '../components/Card';
import Header from '../components/Header';
import Main from '../components/Main';
import SelectButton from '../components/SelectButton';
import Loading from '../components/Loading';
import {
  apiGetAllCandidates,
  apiGetAllCities,
  apiGetAllElectionsOfCity,
} from '../services/apiService';
import { formatNumber } from '../helpers/formatNumberHelpers';

export default function ElectionsPage() {
  const [allCities, setAllCities] = useState([]);
  const [allCandidates, setAllCandidates] = useState([]);
  const [allElectionsOfCity, setElectionsOfCity] = useState([]);
  const [totalVotes, setTotalVotes] = useState(null);
  const [loading, setLoading] = useState(true);

  const [totalVotesOfCity, setTotalVotesOfCity] = useState(null);
  const [presenceVotesOfCity, setPresenceVotesOfCity] = useState(null);
  const [absenceVotesOfCity, setAbsenceVotesOfCity] = useState(null);

  useEffect(() => {
    async function getAllCities() {
      try {
        const cities = await apiGetAllCities();
        setAllCities(cities);
      } catch (err) {
        console.log(err);
      }
    }

    async function getAllCandidates() {
      try {
        const candidates = await apiGetAllCandidates();
        setAllCandidates(candidates);
      } catch (err) {
        console.log(err);
      }
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);

    getAllCities();
    getAllCandidates();
  }, []);

  function handleValueSelector(cityId) {
    if (cityId) {
      async function getAllElectionsOfCity() {
        try {
          const electionsOfCity = await apiGetAllElectionsOfCity(cityId);
          setElectionsOfCity(electionsOfCity);
        } catch (err) {
          console.log(err);
        }
      }
      setTimeout(() => {
        setLoading(false);
      }, 500);
      getAllElectionsOfCity();

      const { absence, votingPopulation, presence } = allCities.find(
        city => city.id === cityId
      );

      setPresenceVotesOfCity(formatNumber(presence));
      setAbsenceVotesOfCity(formatNumber(absence));
      setTotalVotesOfCity(formatNumber(votingPopulation));
    }
  }

  useEffect(() => {
    let count = 0;
    allElectionsOfCity.map(res => (count = count + res.votes));
    setTotalVotes(count);
  }, [allElectionsOfCity]);

  let mainJSX = (
    <div className="flex justify-center my-4">
      <Loading />
    </div>
  );

  if (!loading) {
    mainJSX = (
      <>
        <div className="flex flex-col items-center space-y-2">
          <SelectButton
            data={allCities}
            nameSelector="cityOfHeroes"
            onSelectChange={handleValueSelector}
          />
          <div className="flex flex-row justify-between flex-wrap">
            <span className="mr-8">
              <strong>Comparecimento: </strong>
              {presenceVotesOfCity}
            </span>
            <span className="mr-8">
              <strong>Abstenção: </strong>
              {absenceVotesOfCity}
            </span>
            <span>
              <strong>Total de Eleitores: </strong>
              {totalVotesOfCity}
            </span>
          </div>
        </div>
        <Cards>
          {allElectionsOfCity.map((data, index) => {
            return (
              <Card
                key={data.id}
                numVotes={data.votes}
                heroes={allCandidates}
                idCandidate={data.candidateId}
                totalVotes={totalVotes}
                place={index++}
              ></Card>
            );
          })}
        </Cards>
      </>
    );
  }

  return (
    <div>
      <Header>Eleições dos Heróis</Header>
      <Main>{mainJSX}</Main>
    </div>
  );
}
