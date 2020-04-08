
const getTemplate = (buttons, selectedColor, unSelectedColor, title) => {
    let buttonsHTML = ``;
    buttons.every((button, index) => {
        const className = button.isSelected ? 'selected' : 'notSelected';
        buttonsHTML = buttonsHTML + `<button id='navButton_${index + 1}' class="${className} button" ><p class='buttonLabel'>${button.label}</p></Button>`;
        if(index === 5) {
            return false;
        } else {
            return true;
        }
        
    });
    const template = document.createElement('template');
    template.innerHTML = `
        <style>
            .selected {
                background-color: ${selectedColor};
            }
            .notSelected {
                background-color: ${unSelectedColor};
            }
            .button {
                margin: 0px;
                padding: 0px;
            }
            .buttonLabel {
                font-weight: bold;
                color: white;
                font-size: 14px;
                padding-left: 10px;
                padding-right: 10px;
            }
            .container {
                background-color: #81D4FA;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                margin-bottom: 10px;
            }
            .buttonContainer {
                display: flex;
                flex-direction: row;
                flex-grow: 1;
                flex-wrap: wrap;
                list-style: none;
            }
            .title {
                margin-right: 20px;
                margin-left: 10px;
                align-self: 'center';
            }
        </style>
        
        <div id='container' class='container'>
            <h1 class='title'>${title}</h1>
            <div class='buttonContainer'>
                ${buttonsHTML}
            </div>
        </div>
    `;
    
    return template
}

