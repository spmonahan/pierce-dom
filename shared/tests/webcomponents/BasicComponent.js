const styles = new CSSStyleSheet();
styles.insertRule(':host { border: 2px solid green; display: block;');

export class BasicComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <div id="basic-first-child">
        First child
      </div>
      <div id="basic-second-child">
        Second child
      </div>
      <div id="basic-last-child">
        Last child
      </div>
    `;

    this.shadowRoot.adoptedStyleSheets = [styles];
  }
}

if (!window.customElements.get('basic-component')) {
  window.customElements.define('basic-component', BasicComponent);
}