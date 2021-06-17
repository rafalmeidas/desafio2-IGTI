import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center space-y-2">
      <ClipLoader />
      <p>carregando...</p>
    </div>
  );
}
