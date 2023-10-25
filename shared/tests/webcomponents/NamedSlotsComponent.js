const styles = new CSSStyleSheet();
styles.insertRule(':host { border: 2px solid hotpink; display: block;');

export class NamedSlotsComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <div id="named-slots-first-child">
        First child
      </div>
      <slot name="first-slot" id="first-slot">First slot default</slot>
      <div id="named-slots-second-child">
        Second child
      </div>
      <slot name="second-slot" id="second-slot">Second slot default</slot>
      <div id="named-slots-last-child">
        Last child
      </div>
      <slot name="third-slot" id="third-slot">Third slot default</slot>
    `;

    this.shadowRoot.adoptedStyleSheets = [styles];
  }
}

if (!window.customElements.get('named-slots-component')) {
  window.customElements.define('named-slots-component', NamedSlotsComponent);
}