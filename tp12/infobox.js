class InfoBox extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    connectedCallback() {
      this.shadowRoot.innerHTML = `
        <style>
          .box {
            border: 1px solid #ccc;
            padding: 10px;
            border-radius: 5px;
            display: flex;
            align-items: flex-start;
            background: #f9f9f9;
          }
          .icon {
            font-size: 24px;
            margin-right: 10px;
          }
          .content {
            flex: 1;
          }
          ::slotted(span[slot="title"]) {
            font-weight: bold;
            font-size: 16px;
          }
        </style>
        <div class="box">
          <div class="icon">ℹ️</div>
          <div class="content">
            <slot name="title"></slot>
            <slot></slot>
          </div>
        </div>
      `;
    }
  }
  
  customElements.define("info-box", InfoBox);
  