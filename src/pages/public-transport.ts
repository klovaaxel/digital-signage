import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';

@customElement('public-transport')
export class PublicTransport extends LitElement {
  static get styles() {
    return [
      css`
        iframe {
          width: 100%;
          height: 100%;
        }

        @media only screen and (min-width: 3500px) {
          iframe {
            width: 50%;
            height: 50%;
            transform: scale(2) translate(25%, 25%);
          }
        }
      `,
    ];
  }

  constructor() {
    super();
  }

  async firstUpdated() {}

  share() {
    if ((navigator as any).share) {
      (navigator as any).share({
        title: 'Nösnäs avgångstavla',
        text: 'Avgångstavla för busshållsplatser runt Nösnäsgymnasiet',
        url: 'https://tcstenungsund.github.io/digital-signage/public-transport',
      });
    }
  }

  render() {
    return html`
      <iframe
        src="https://avgangstavla.vasttrafik.se/?source=vasttrafikse-depatureboardlinkgenerator&stopAreaGid=9021014015050000&stopAreaGid=9021014015051000"
        frameborder="0"
      ></iframe>
    `;
  }
}
