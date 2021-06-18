import React, { useEffect, useState } from 'react';
import { formatNumber } from '../helpers/formatNumberHelpers';

export default function Card({
  percent = '80%',
  numVotes = 0,
  heroes = [],
  idCandidate = null,
  totalVotes = 0,
  place = 1,
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

  const colorTagElect = place === 0 ? 'bg-green-400' : 'bg-yellow-400';
  const colorCardElect = place === 0 ? 'bg-green-500' : 'bg-yellow-300';
  return (
    <div
      className={` flex flex-col shadow-md p-2 box-border justify-center mb-2 rounded-md ${colorCardElect}`}
    >
      <span
        className={`flex flex-row justify-center items-center border rounded-full w-8 h-8 ${colorTagElect}`}
      >
        {place + 1}
      </span>
      <div className="flex flex-row flex-wrap items-center p-6">
        <div className="flex flex-wrap flex-grow items-center space-x-4">
          <img
            src={imageHero}
            alt={nameHero}
            title={nameHero}
            className="rounded-full border"
            width="70"
            height="70"
          />
          <h2 className="font-semibold text-xl">{nameHero}</h2>
        </div>

        <div className="flex flex-col flex-shrink items-center justify-center font-semibold">
          <span>{percentHero}%</span>
          <span>{`${formatNumber(numVotes)} votos`}</span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center space-y-2">
        {place === 0 ? (
          <p className="font-semibold bg-transparent text-green-900">Eleito</p>
        ) : (
          <p className="font-semibold bg-transparent text-yellow-600">
            Não eleito
          </p>
        )}
      </div>
    </div>
  );
}
