const styles = new CSSStyleSheet();
styles.insertRule(':host { border: 2px solid hotpink; display: block;');

export class DefaultSlotComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <div id="default-slot-first-child">
        First child
      </div>
      <div id="default-slot-second-child">
        Second child
      </div>
      <slot id="slot"></slot>
      <div id="default-slot-last-child">
        Last child
      </div>
    `;

    this.shadowRoot.adoptedStyleSheets = [styles];
  }
}

if (!window.customElements.get('default-slot-component')) {
  window.customElements.define('default-slot-component', DefaultSlotComponent);
}