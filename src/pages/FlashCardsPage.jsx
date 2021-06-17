import { useEffect, useState } from 'react';
import Button from '../components/Button';
import Error from '../components/Error';
import FlashCard from '../components/FlashCard';
import FlashCards from '../components/FlashCards';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Main from '../components/Main';
import RadioButton from '../components/RadioButton';

import { helperShuffleArray } from '../helpers/arrayHelpers';
import { apiGetAllFlashCards } from '../services/apiService';

export default function FlashCardsPage() {
  const [allCards, setAllCards] = useState([]);
  const [studyCards, setStudyCards] = useState([]);
  const [radioButtonShowTitle, setRadioButtonShowTitle] = useState(true);

  //tratamentos para o usuário erros e loading de dados
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // //Pegando dados da API com Promisses
  // useEffect(() => {
  //   apiGetAllFlashCards().then(allFlashCards => {
  //     setAllCards(allFlashCards);
  //   });
  // }, []);

  // useEffect(() => {
  //   //consultando com função imediata (IIFE)
  //   (async function getAllCards() {
  //     const backEndAllCards = await apiGetAllFlashCards();
  //     setAllCards(backEndAllCards);
  //   })();
  // }, []);

  //Pegando dados da API com async
  useEffect(() => {
    async function getAllCards() {
      try {
        const backEndAllCards = await apiGetAllFlashCards();
        setAllCards(backEndAllCards);

        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (err) {
        setError(err.message);
      }
    }
    getAllCards();
  }, []);

  useEffect(() => {
    setStudyCards(allCards.map(card => ({ ...card, showTitle: true })));
  }, [allCards]);

  function handleShuffle() {
    const shuffledCards = helperShuffleArray(studyCards);
    setStudyCards(shuffledCards);
  }

  function handleRadioShowTitleClick() {
    // prettier-ignore
    const updatedCards = 
      [...studyCards].map(card => ({...card, showTitle: true}));
    setStudyCards(updatedCards);
    setRadioButtonShowTitle(true);
  }

  function handleRadioShowDescriptionClick() {
    const updatedCards = [...studyCards].map(card => ({
      ...card,
      showTitle: false,
    }));
    setStudyCards(updatedCards);
    setRadioButtonShowTitle(false);
  }

  function handleToggleFlashCard(cardId) {
    const updatedCards = [...studyCards];
    const cardIndex = updatedCards.findIndex(card => card.id === cardId);
    updatedCards[cardIndex].showTitle = !updatedCards[cardIndex].showTitle;
    setStudyCards(updatedCards);
  }

  let mainJSX = (
    <div className="flex justify-center my-4">
      <Loading />
    </div>
  );

  if (error) {
    mainJSX = <Error>{error}</Error>;
  }

  if (!loading) {
    mainJSX = (
      <>
        <div className="text-center mb-4">
          <Button onButtonClick={handleShuffle}>Embaralhar Cards</Button>
          <div className=" flex flex-row items-center justify-center space-x-4 m-4">
            <RadioButton
              id="radioButtonShowTitle"
              name="showInfo"
              buttonChecked={radioButtonShowTitle}
              onButtonClick={handleRadioShowTitleClick}
            >
              Mostrar Titulo
            </RadioButton>
            <RadioButton
              id="radioButtonShowDescription"
              name="showInfo"
              buttonChecked={!radioButtonShowTitle}
              onButtonClick={handleRadioShowDescriptionClick}
            >
              Mostrar Descrição
            </RadioButton>
          </div>
        </div>
        <FlashCards>
          {studyCards.map(({ id, title, description, showTitle }) => {
            return (
              <FlashCard
                key={id}
                id={id}
                title={title}
                description={description}
                ShowFlashCardTitle={showTitle}
                onTogleFlashCard={handleToggleFlashCard}
              />
            );
          })}
        </FlashCards>
      </>
    );
  }
  return (
    <>
      <Header>react-flash-cards v2</Header>

      <Main>{mainJSX}</Main>
    </>
  );
}
