import "./singleCard.css";

export default function singleCard({ card, handleChoice, flipped }) {
    const handleClick = () => {
        handleChoice(card);
    };

    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img className="front" src={card.src} alt="card-front" />
                <img
                    className="back"
                    src="./assets/kitten_sz.png"
                    onClick={handleClick}
                    alt="card-back"
                />
            </div>
        </div>
    );
}
