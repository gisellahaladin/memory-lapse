import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./SingleCard";

const cardImages = [
    { src: "./assets/Niko1.png", matched: false },
    { src: "./assets/niko2.png", matched: false },
    { src: "./assets/niko3.png", matched: false },
    { src: "./assets/niko4.png", matched: false },
    { src: "./assets/niko5.png", matched: false },
    { src: "./assets/niko6.png", matched: false },
];

function App() {
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);

    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random }));

        setCards(shuffledCards);
        setTurns(0);
    };

    // handle a choice
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    };

    // compare 2 selected cards
    useEffect(() => {
        if (choiceOne && choiceTwo) {
            if (choiceOne.src === choiceTwo.src) {
                setCards((prevCards) => {
                    return prevCards.map((card) => {
                        if (card.src === choiceOne.src) {
                            return { ...card, matched: true };
                        } else {
                            return card;
                        }
                    });
                });
                resetTurn();
            } else {
                resetTurn();
            }
        }
    }, [choiceOne, choiceTwo]);

    console.log(cards);

    // reset choices and increase turn
    const resetTurn = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns((prevTurns) => prevTurns + 1);
    };

    return (
        <div className="App">
            <div className="header-container">
                <h1>THis IS AweSOMe</h1>

                <button onClick={shuffleCards}>(this game sucks.)</button>
            </div>
            <div className="card-grid">
                {cards.map((card) => (
                    <SingleCard
                        key={card.id}
                        card={card}
                        handleChoice={handleChoice}
                        flipped={
                            card === choiceOne ||
                            card === choiceTwo ||
                            card.matched
                        }
                    />
                    // <div className="card" key={card.id}>
                    //     <div>
                    //         <img className="front" src={card.src} />
                    //         <img
                    //             className="back"
                    //             src="./assets/kitten_sz.png"
                    //             alt=""
                    //         />
                    //     </div>
                    // </div>
                ))}
            </div>
        </div>
    );
}

export default App;
