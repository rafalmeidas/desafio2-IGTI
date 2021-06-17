import React from 'react';

export default function Cards({ children = 'card' }) {
  return <div className="flex flex-row flex-wrap">{children}</div>;
}
