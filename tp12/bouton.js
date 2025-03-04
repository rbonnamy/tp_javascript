class CounterButton extends HTMLElement {
    #clickCount=0;
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    connectedCallback() {
      this.render();
      this.#clickCount = parseInt(this.getAttribute("val")) || 0;
      this.updateButtonText();
      this.shadowRoot.querySelector('button').addEventListener('click', () => {
        this.#clickCount++;
        this.updateButtonText();
      });
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <style>
          button {
            padding: 10px 20px;
            font-size: 16px;
          }
        </style>
        <button>bouton: 0</button>
      `;
    }
  
    updateButtonText() {
      this.shadowRoot.querySelector('button').textContent = `bouton: ${this.#clickCount}`;
    }
  }
  
  customElements.define("counter-button", CounterButton);