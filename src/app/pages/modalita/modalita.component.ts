import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-modalita',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Modalità di seduta</h1>
        <p>In studio, online o a domicilio: scegli la modalità più adatta alle tue esigenze.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="modalita$ | async as data">
      <ul class="modalita-list">
        <li *ngFor="let m of data.modalita" class="modalita-card">
          <div class="modalita-card__header">
            <span class="modalita-card__icon" aria-hidden="true">{{ m.icona }}</span>
            <div>
              <h2>{{ m.nome }}</h2>
              <p class="modalita-card__tagline">{{ m.tagline }}</p>
            </div>
          </div>
          <p class="modalita-card__desc">{{ m.descrizione }}</p>
          <div class="modalita-card__body">
            <div class="vantaggi">
              <h3>Vantaggi</h3>
              <ul>
                <li *ngFor="let v of m.vantaggi">
                  <span aria-hidden="true">✓</span> {{ v }}
                </li>
              </ul>
            </div>
            <div class="tariffa-box">
              <span class="tariffa-prezzo">{{ m.tariffaEuro | currency: 'EUR':'symbol':'1.0-0' }}</span>
              <span class="tariffa-desc">a seduta · {{ m.durataMm }} minuti</span>
              <span class="tariffa-disp">{{ m.disponibilita }}</span>
            </div>
          </div>
          <p *ngIf="m.nota" class="nota-avviso">
            <span aria-hidden="true">ℹ️</span> {{ m.nota }}
          </p>
        </li>
      </ul>

      <aside class="faq-box">
        <h2>Domande frequenti sulle modalità</h2>
        <ul class="faq-list" *ngIf="faq$ | async as faqData">
          <li *ngFor="let f of faqData.faq.slice(3, 5)" class="faq-item">
            <h3>{{ f.domanda }}</h3>
            <p>{{ f.risposta }}</p>
          </li>
        </ul>
        <a routerLink="/contatti" class="btn btn-primary">Richiedi informazioni</a>
      </aside>
    </article>
  `,
  styles: [
    `
      .page-header {
        padding: 4rem 1rem 3rem;
        background: var(--color-bg-subtle);
        text-align: center;
        border-bottom: 1px solid var(--color-border);
      }
      .page-header h1 { margin: 0 0 0.5rem; }
      .page-header p { color: var(--color-fg-muted); margin: 0 auto; max-width: 480px; }
      .content { padding: 3rem 1rem; }
      .modalita-list {
        list-style: none;
        padding: 0;
        margin: 0 0 3rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }
      .modalita-card {
        padding: 2rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        background: #ffffff;
      }
      .modalita-card__header {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
        margin-bottom: 1rem;
      }
      .modalita-card__icon {
        font-size: 2rem;
        flex-shrink: 0;
        margin-top: 0.1rem;
      }
      .modalita-card__header h2 { margin: 0 0 0.25rem; font-size: 1.3rem; }
      .modalita-card__tagline {
        margin: 0;
        color: var(--color-accent);
        font-weight: 600;
        font-size: 0.9rem;
      }
      .modalita-card__desc {
        color: var(--color-fg-muted);
        line-height: 1.7;
        margin: 0 0 1.5rem;
        font-size: 0.95rem;
      }
      .modalita-card__body {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 2rem;
        align-items: start;
      }
      .vantaggi h3 {
        font-size: 0.82rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--color-fg-muted);
        margin: 0 0 0.6rem;
      }
      .vantaggi ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .vantaggi li {
        font-size: 0.9rem;
        padding: 0.3rem 0;
        color: var(--color-fg-muted);
        display: flex;
        gap: 0.4rem;
        align-items: flex-start;
      }
      .vantaggi li span {
        color: var(--color-success);
        font-weight: 700;
        flex-shrink: 0;
      }
      .tariffa-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 1.25rem 1.5rem;
        background: #eef2ff;
        border-radius: var(--radius-md);
        border: 1px solid #c7d2fe;
        min-width: 140px;
      }
      .tariffa-prezzo {
        font-size: 2rem;
        font-weight: 700;
        color: var(--color-accent);
        line-height: 1;
        margin-bottom: 0.25rem;
      }
      .tariffa-desc {
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        margin-bottom: 0.5rem;
      }
      .tariffa-disp {
        font-size: 0.75rem;
        color: var(--color-fg-muted);
        font-style: italic;
        text-align: center;
      }
      .nota-avviso {
        margin: 1.25rem 0 0;
        padding: 0.75rem 1rem;
        background: #fffbeb;
        border: 1px solid #fde68a;
        border-radius: var(--radius-sm);
        font-size: 0.85rem;
        color: #92400e;
        display: flex;
        gap: 0.4rem;
        align-items: flex-start;
      }
      .faq-box {
        background: var(--color-bg-subtle);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: 2rem;
      }
      .faq-box h2 { margin: 0 0 1.5rem; font-size: 1.25rem; }
      .faq-list {
        list-style: none;
        padding: 0;
        margin: 0 0 1.5rem;
      }
      .faq-item {
        padding: 1.25rem 0;
        border-bottom: 1px solid var(--color-border);
      }
      .faq-item:last-child { border-bottom: none; }
      .faq-item h3 { margin: 0 0 0.5rem; font-size: 1rem; }
      .faq-item p { margin: 0; color: var(--color-fg-muted); font-size: 0.9rem; line-height: 1.65; }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        font-size: 0.95rem;
        transition: all 0.15s ease;
      }
      .btn-primary { background: var(--color-accent); color: #ffffff; }
      .btn-primary:hover { background: #3730a3; color: #ffffff; text-decoration: none; }
      @media (max-width: 600px) {
        .modalita-card__body { grid-template-columns: 1fr; }
        .tariffa-box { flex-direction: row; flex-wrap: wrap; gap: 0.5rem; justify-content: center; }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalitaComponent {
  private readonly mockData = inject(MockDataService);

  readonly modalita$ = this.mockData.modalita$;
  readonly faq$ = this.mockData.faq$;
}
