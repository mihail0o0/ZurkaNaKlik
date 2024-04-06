function MainButton({ text, onClick, grey, icon, wide, center, paddingX, paddingY, iconMargin }) {
    let buttonStyle = {
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: (center) ? "center" : "flex-start",
        paddingTop: paddingY ?? "20px",
        paddingBottom: paddingY ?? "20px",
        paddingLeft: paddingX ?? "28px",
        paddingRight: paddingX ?? "28px",
        border: "none",
        borderRadius: "var(--borderRadiusMedium)",
        backgroundColor: (grey) ? "var(--lightGrey)" : "var(--mainColor)",
        color: (grey) ? "black" : "white",
        fontSize: "19px",
        fontWeight: "500",
        width: (wide) ? "100%" : "fit-content",
        tranition: "150ms all"
    };

    let textStyle = {
        marginLeft: "auto",
        marginRight: "auto"
    };

    let iconStyle = {
        fontSize: "28px",
        marginRight: iconMargin ?? "8px"
    };

    return (
        icon ?
            <button className="mainButton" style={buttonStyle} onClick={onClick}>
                <i style={iconStyle} className="material-icons">{icon}</i>
                <span style={textStyle}>{text}</span>
            </button>
            : <button className="mainButton" style={buttonStyle} onClick={onClick}>{text}</button>
    );
}



export default MainButton;