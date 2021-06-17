export default function FlashCard({
  id,
  title = 'Titulo do Card',
  description = 'Descrição do Card, que pode conter mais palavras que o titulo',
  ShowFlashCardTitle = true,
  onTogleFlashCard = null,
}) {
  const fontSizeClassName = ShowFlashCardTitle ? 'text-xl' : 'text-sm';
  function handleCardClick() {
    if (onTogleFlashCard) {
      onTogleFlashCard(id);
    }
  }
  return (
    <div
      className={`shadow-lg p-4 m-2 w-80 h-48 cursor-pointer
                  flex flex-row items-center justify-center 
                  font-semibold ${fontSizeClassName}`}
      style={{ fontFamily: "'JetBrains Mono', 'monospace'" }}
      onClick={handleCardClick}
    >
      {ShowFlashCardTitle ? title : description}
    </div>
  );
}
