import { useEffect, useState } from 'react';
import { getNewId } from '../services/idService';

export default function SelectButton({
  nameSelector = 'Nome do select',
  idSelector = getNewId(),
  data = [],
  onSelectChange = null,
}) {
  const [selectId, setSelectId] = useState(data[0].id);
  // eslint-disable-next-line no-unused-vars
  const [selectName, setSelectName] = useState(data[0].name);

  useEffect(() => {
    if (onSelectChange) {
      onSelectChange(selectId);
    }
  }, []);

  useEffect(() => {
    const selectObject = data.find(d => d.id === selectId);
    setSelectName(selectObject.name);
  }, []);

  function handleValueSelector(event) {
    const newId = event.target.value;
    setSelectId(newId);
    if (onSelectChange) {
      onSelectChange(newId);
    }
  }

  return (
    <>
      <select
        className="mb-3 border p-3 rounded-lg shadow-md font-semibold"
        name={nameSelector}
        id={idSelector}
        onChange={handleValueSelector}
        value={selectId}
      >
        {data.map(citie => {
          const { id, name } = citie;
          return (
            <option key={id} value={id}>
              {name}
            </option>
          );
        })}
      </select>
    </>
  );
}
