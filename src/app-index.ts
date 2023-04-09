import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Router } from '@vaadin/router';

import './pages/general-information';
import './pages/public-transport';
import './styles/global.css';

const BASE_URL: string =
  import.meta.env.BASE_URL.length > 2
    ? import.meta.env.BASE_URL.slice(1, -1)
    : import.meta.env.BASE_URL;

@customElement('app-index')
export class AppIndex extends LitElement {
  static get styles() {
    return css`
      main {
        display: block;
        width: 100dvw;
        height: 100dvh;
        overflow: hidden;
      }
    `;
  }

  constructor() {
    super();
  }

  firstUpdated() {
    // this method is a lifecycle even in lit
    // for more info check out the lit docs https://lit.dev/docs/components/lifecycle/

    // For more info on using the @vaadin/router check here https://vaadin.com/router
    const router = new Router(this.shadowRoot?.querySelector('#routerOutlet'));
    router.setRoutes([
      // temporarily cast to any because of a Type bug with the router
      {
        path: BASE_URL,
        animate: true,
        children: [
          { path: '', component: 'general-information' },
          { path: 'public-transport', component: 'public-transport' },
        ],
      } as any,
    ]);
  }

  render() {
    return html` <main id="routerOutlet"></main> `;
  }
}
