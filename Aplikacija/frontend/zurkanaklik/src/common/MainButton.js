function MainButton({ text, icon, wide }) {
    return (
        icon ? 
            <button>{text}</button>
            : <button className="mainButton">{text}</button>
    );
}

export default MainButton;