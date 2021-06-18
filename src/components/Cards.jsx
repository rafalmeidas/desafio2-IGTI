import React from 'react';

export default function Cards({ children = 'card' }) {
  return <div className="flex flex-col">{children}</div>;
}
