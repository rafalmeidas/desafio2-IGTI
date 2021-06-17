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

export default function ElectionsPage() {
  const [allCities, setAllCities] = useState([]);
  const [allCandidates, setAllCandidates] = useState([]);
  const [allElectionsOfCity, setElectionsOfCity] = useState([]);
  const [totalVotes, setTotalVotes] = useState(null);
  const [loading, setLoading] = useState(true);

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
      apiGetAllElectionsOfCity(cityId).then(res => {
        const newArrayOrdened = res.sort((a, b) => {
          if (a.votes > b.votes) {
            return -1;
          }
          if (a.votes < b.votes) {
            return 1;
          }
          // a must be equal to b
          return 0;
        });
        setElectionsOfCity(newArrayOrdened);
      });
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
        <div className="flex flex-row items-center justify-center space-y-6">
          <SelectButton
            data={allCities}
            nameSelector="Cidade dos heróis"
            onSelectChange={handleValueSelector}
          />
        </div>
        <Cards>
          {allElectionsOfCity.map(a => {
            return (
              <Card
                key={a.id}
                numVotes={a.votes}
                heroes={allCandidates}
                idCandidate={a.candidateId}
                totalVotes={totalVotes}
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
