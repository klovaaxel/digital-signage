import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';

@customElement('general-information')
export class GeneralInformation extends LitElement {
  @property() _time = '';

  @property() _weekDays = [
    'Måndag',
    'Tisdag',
    'Onsdag',
    'Torsdag',
    'Fredag',
    'Lördag',
    'Söndag',
  ];

  @property() _today = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );

  @property() _foodSchedule: { title: string; body: string[] }[] = [];

  static get styles() {
    return [
      css`
        .page-container {
          display: block;
          width: 100%;
          height: 100%;

          display: flex;
          justify-content: center;
          align-items: center;
        }

        .page-content {
          height: 100dvh;
          width: calc(100dvh * 1.777778);

          position: relative;
        }

        @media (max-aspect-ratio: 16/9) {
          .page-content {
            width: 100dvw;
            height: calc(100dvw * 0.5625);
          }
        }

        iframe {
          width: 100%;
          height: 100%;
          border: none;
        }

        footer {
          position: absolute;
          box-sizing: border-box;
          bottom: 0;
          color: #fff;
          font-size: max(1.1vw, min(1.2em, 1.2vw));
          height: 15.5%;
          width: 100%;
          text-shadow: 0.1vw 0.1vw 1rem rgb(76 76 76);

          display: flex;
          align-items: center;
          gap: 2em;
          padding: 0 1em;
        }
        footer > img {
          height: 80%;
        }

        footer > section {
          display: flex;
          gap: 3em;
        }

        footer > section h3 {
          font-size: min(1.6em, 1.6vw);
          margin: 0;
        }

        footer > section p {
          margin: 0;
        }

        #clock {
          font-size: min(4em, 4vw);
          justify-self: flex-end;
          margin-left: auto;
        }
      `,
    ];
  }

  constructor() {
    super();

    this.AddFoodSchedule(3);

    this._time =
      new Date().getHours() +
      ':' +
      (new Date().getMinutes() < 10
        ? '0' + new Date().getMinutes()
        : new Date().getMinutes());
    setInterval(() => {
      this._time =
        new Date().getHours() +
        ':' +
        (new Date().getMinutes() < 10
          ? '0' + new Date().getMinutes()
          : new Date().getMinutes());
    }, 1000);
  }

  async firstUpdated() {}

  share() {
    if ((navigator as any).share) {
      (navigator as any).share({
        title: 'Nösnäs informationsskärmar',
        text: 'Informationsskärmar som visas runt Nösnäsgymnasiet',
        url: 'https://tcstenungsund.github.io/digital-signage',
      });
    }
  }

  render() {
    return html`
      <div class="page-container">
        <div class="page-content">
          <iframe
            src="https://docs.google.com/presentation/d/e/2PACX-1vQbS6bGPlyTibcjsUPI1uHspUBsRSv_z_dVast1ZTcZ9Qt_GqXeHU0xWxluPZ2yCL9kftF0frYksy2h/embed?start=true&loop=true&delayms=10000&rm=minimal"
          ></iframe>
          <footer>
            <img
              style="filter: invert()"
              src="/digital-signage/assets/images/logo.svg"
              alt=""
            />
            <section id="food-schedule" title="Food schedule">
              ${this._foodSchedule.reverse().map(
                (day) =>
                  html`<section>
                    <h3>${day.title}</h3>
                    ${day.body.map((item) => html` <p>${item}</p>`)}
                  </section>`
              )}
            </section>
            <section id="clock" title="Digital Clock">${this._time}</section>
          </footer>
        </div>
      </div>
    `;
  }

  private AddFoodSchedule(numDays: number) {
    fetch('digital-signage/food-schedule/data.json')
      .then((response) => response.json())
      .then((data) => {
        const allDays = data.weeks[0].days;
        let comingDays = allDays.filter(
          (d: any) => new Date(d.date * 1000) >= this._today
        );
        const chosenDays = comingDays
          .slice(0, numDays)
          .sort((a: any, b: any) => b.date - a.date);

        for (const day of chosenDays) {
          const dayOfWeek = new Date(day.date * 1000).getDay();
          const title = `${this._weekDays[dayOfWeek - 1]} - Vecka ${
            data.weeks[0].number
          }`;
          const body = day.items;

          this._foodSchedule.push({ title: title, body: body });
        }
      })
      .catch(console.error);
  }
}
