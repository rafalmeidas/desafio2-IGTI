import { getNewId } from '../services/idService';

export default function RadioButton({
  children = 'Descrição do botão',
  id = getNewId(),
  name = 'RadioButtonName',
  buttonChecked = false,
  onButtonClick = null,
}) {
  function handleButtonChange() {
    if (onButtonClick) {
      onButtonClick();
    }
  }

  return (
    <div className="flex flex-row items-center space-x-2">
      <input
        type="radio"
        id={id}
        name={name}
        checked={buttonChecked}
        onChange={handleButtonChange}
      />
      <label htmlFor={id}>{children}</label>
    </div>
  );
}
