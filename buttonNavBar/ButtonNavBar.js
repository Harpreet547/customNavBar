class ButtonNavBar extends HTMLElement {
    constructor() {
        super();
        this.render();

        
    }
    connectedCallback() {
        this.addEventListener('setSelectedItem', (ev) => {
            this.selectedItem = ev.detail.selectItem;
            this.resetShadowDOM();
            
        }); 
        
        this.addEventListener('setData', (ev) => {
            this.data = ev.detail.data;
            this.resetShadowDOM();
            
        }); 
    }
    render = () => {
        const template = getTemplate(this.data, this.selectedColor, this.unSelectedColor, this.navTitle);
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.addButtonClickEvents();      
    }
    

    static get observedAttributes() {
        return ['selectedItem', 'data', 'unSelectedColor', 'selectedColor', 'navTitle'];
    }
      
    attributeChangedCallback(attrName, oldValue, newValue) {
        if (newValue !== oldValue) {
            this[attrName] = this.hasAttribute(attrName);
        }
    }

    addButtonClickEvents() {
        const buttons = this._shadowRoot.querySelectorAll('button');
        buttons.forEach(element => {
            element.addEventListener('click', this.buttonClick, false);    
        });
    }

    buttonClick = (e) => {
        const buttonIndex = e.currentTarget.id.split('_')[1];
        if(this.data) {
            this.setSelectedItemInData(buttonIndex - 1);
            
            this.resetShadowDOM();
            this.selectedItem = buttonIndex;
            this.dispatchEvent(new CustomEvent('getSelectedItem', { detail: { selectedItem: this.selectedItem } }));
        }
    }

    resetShadowDOM = () => {
        this._shadowRoot.innerHTML = '';
        const template = getTemplate(this.data, this.selectedColor, this.unSelectedColor, this.navTitle);
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.addButtonClickEvents();
    }

    setSelectedItemInData = (itemNumber) => {
        const newData = this.data.map((element, index) => {
            const ele = { ...element };
            ele.isSelected = itemNumber == index ? true : false;
            return ele;
        });
        this.data = newData;
    }

    get selectedColor() {
        return this.getAttribute('selectedColor');
    }
    set selectedColor(value) {
        return this.setAttribute('selectedColor', value);
    }

    get unSelectedColor() {
        return this.getAttribute('unSelectedColor');
    }
    set unSelectedColor(value) {
        return this.setAttribute('unSelectedColor', value);
    }

    get navTitle() {
        return this.getAttribute('navTitle');
    }
    set navTitle(value) {
        return this.setAttribute('navTitle', value);
    }

    get selectedItem() {
        return this.getAttribute('selectedItem');
    }

    set selectedItem(value) {
        if(parseInt(value) && parseInt(value) <= this.data.length) {
            const selectedItem = parseInt(value);
            this.setSelectedItemInData(selectedItem - 1);
            this.setAttribute('selectedItem', selectedItem);    
        } else {
            const error = new Error('Not an integer value or greater than length of data');
            throw error;
        }
        
    }


    get data() {
        const parsed = JSON.parse(this.getAttribute('data'));
        if(Array.isArray(parsed)) {
            return parsed;
        } else {
            const dataArr = [];
            for(const key in parsed) {
                if (Object.prototype.hasOwnProperty.call(parsed, key)) {
                    dataArr.push(parsed[key]);
                }
            }
            return dataArr;
        }
        
    }

    set data(value) {
        if(typeof value === 'string') {
            const obj = JSON.parse(value);
            const dataArr = [];
            for(const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    dataArr.push(obj[key]);
                }
            }
            this.setAttribute('data', JSON.stringify(dataArr));
        } else if(typeof value === 'object') {
            this.setAttribute('data', JSON.stringify(value));
        }
    }
}

window.customElements.define('button-navbar', ButtonNavBar);