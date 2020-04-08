function setSeletedItem() {
    const inputValue = document.getElementById('input').value;
    navbar.dispatchEvent(new CustomEvent('setSelectedItem', {
        bubbles: true,
        cancelable: false,
        composed: true,
        detail: {
            selectItem: inputValue
        }
    }));
}

function setData() {
    navbar.dispatchEvent(new CustomEvent('setData', {
        bubbles: true,
        cancelable: false,
        composed: true,
        detail: {
            data: '{ "button1": { "isSelected": true, "label": "Button1" }, "button2": { "isSelected": false, "label": "Button2" }, "button3": { "isSelected": false, "label": "Button3" }, "button4": { "isSelected": false, "label": "Button4" } }'
        }
    }));
}

const navbar = document.querySelector('button-navbar');

navbar.addEventListener('getSelectedItem', ev => {
    console.log(ev.detail);
    
});
navbar.dispatchEvent(new CustomEvent('setSelectedItem', {
    bubbles: true,
    cancelable: false,
    composed: true
}));