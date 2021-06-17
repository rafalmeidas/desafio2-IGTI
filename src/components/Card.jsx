import React, { useEffect, useState } from 'react';

export default function Card({
  percent = '80%',
  numVotes = 0,
  heroes = [],
  idCandidate = null,
  totalVotes = 0,
}) {
  const [nameHero, setNameHero] = useState('');
  const [imageHero, setImageHero] = useState('');
  const [percentHero, setPercentHero] = useState('');

  useEffect(() => {
    const { name, username } = heroes.find(h => h.id === idCandidate);
    setNameHero(name);
    setImageHero(`/img/${username}.png`);
  }, []);

  useEffect(() => {
    let calcPercent = numVotes / totalVotes;
    calcPercent = calcPercent * 100;
    setPercentHero(calcPercent.toFixed(2));
  }, [totalVotes]);

  return (
    <div className="flex flex-col w-64 h-48 shadow-md p-4">
      <div className="flex flex-row items-center justify-between p-4">
        <img src={imageHero} alt={nameHero} className="w-16 rounded-full" />
        <div className="flex flex-col items-center w-20">
          <span>{percentHero}</span>
          <span>{`${numVotes.toLocaleString('PT')} votos`}</span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center space-y-2">
        <h2>{nameHero}</h2>
        <p>Eleito</p>
      </div>
    </div>
  );
}
