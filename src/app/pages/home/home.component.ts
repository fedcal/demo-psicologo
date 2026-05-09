import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="hero">
      <div class="demo-container">
        <p class="hero-kicker">Psicoterapia cognitivo-comportamentale · Milano</p>
        <h1>Uno spazio per stare meglio,<br>a tuo ritmo.</h1>
        <p class="hero-tagline">
          Lo Studio Bianchi offre percorsi individuali, di coppia e familiari in un ambiente
          riservato, empatico e scientificamente orientato.
        </p>
        <div class="hero-actions">
          <a routerLink="/contatti" class="btn btn-primary">Richiedi il primo colloquio</a>
          <a routerLink="/aree-intervento" class="btn btn-secondary">Scopri le aree di intervento</a>
        </div>
        <p class="hero-note">Primo colloquio conoscitivo · 60 min · €50</p>
      </div>
    </section>

    <section class="features demo-container">
      <h2>Un approccio che mette la persona al centro</h2>
      <ul class="feature-grid">
        <li>
          <span class="feature-icon" aria-hidden="true">🔬</span>
          <h3>Metodo evidence-based</h3>
          <p>La psicoterapia cognitivo-comportamentale è tra gli approcci con maggiore evidenza scientifica.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">🔒</span>
          <h3>Riservatezza totale</h3>
          <p>Segreto professionale garantito per legge. I tuoi dati sanitari sono protetti art. 9 GDPR.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">💬</span>
          <h3>Ascolto senza giudizio</h3>
          <p>Ogni persona porta una storia unica. Lo studio offre uno spazio accogliente e non valutativo.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">🖥️</span>
          <h3>In studio e online</h3>
          <p>Sedute in presenza a Milano o via piattaforma sicura. Stessa qualità, massima flessibilità.</p>
        </li>
      </ul>
    </section>

    <section class="aree-featured demo-container" *ngIf="areeFeatured$ | async as aree">
      <div class="section-header">
        <h2>Alcune aree di intervento</h2>
        <a routerLink="/aree-intervento" class="link-more">Tutte le aree →</a>
      </div>
      <ul class="area-grid">
        <li *ngFor="let area of aree" class="area-card">
          <span class="area-card__icon" aria-hidden="true">{{ area.icona }}</span>
          <h3>{{ area.nome }}</h3>
          <p>{{ area.breve }}</p>
          <a routerLink="/aree-intervento" class="area-link">Scopri di più →</a>
        </li>
      </ul>
    </section>

    <section class="tariffe-band" *ngIf="info$ | async as info">
      <div class="demo-container">
        <h2>Tariffe trasparenti</h2>
        <ul class="tariffe-grid">
          <li class="tariffa-card tariffa-card--highlight">
            <span class="tariffa-label">Primo colloquio</span>
            <span class="tariffa-prezzo">{{ info.tariffe.primoColloquioEuro | currency: 'EUR':'symbol':'1.0-0' }}</span>
            <span class="tariffa-dettaglio">{{ info.tariffe.primoColloquioDurataMm }} minuti · senza impegno</span>
          </li>
          <li class="tariffa-card">
            <span class="tariffa-label">Seduta in studio</span>
            <span class="tariffa-prezzo">{{ info.tariffe.studioEuro | currency: 'EUR':'symbol':'1.0-0' }}</span>
            <span class="tariffa-dettaglio">50 minuti · Via Manzoni 28, Milano</span>
          </li>
          <li class="tariffa-card">
            <span class="tariffa-label">Seduta online</span>
            <span class="tariffa-prezzo">{{ info.tariffe.onlineEuro | currency: 'EUR':'symbol':'1.0-0' }}</span>
            <span class="tariffa-dettaglio">50 minuti · piattaforma GDPR-compliant</span>
          </li>
        </ul>
        <p class="tariffe-nota">Le spese sono detraibili al 19% nella dichiarazione dei redditi.</p>
      </div>
    </section>

    <section class="cta-band">
      <div class="demo-container">
        <h2>Il primo passo è il più importante.</h2>
        <p>
          Richiedere un colloquio non significa impegnarsi in un percorso lungo.
          Significa semplicemente ascoltare come ti senti e vedere se possiamo aiutarti.
        </p>
        <a routerLink="/contatti" class="btn btn-white">Richiedi il primo colloquio</a>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        padding: 5rem 1rem;
        text-align: center;
        background: linear-gradient(180deg, #eef2ff 0%, #ffffff 100%);
        border-bottom: 1px solid var(--color-border);
      }
      .hero-kicker {
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--color-accent);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin: 0 0 1rem;
      }
      .hero h1 {
        font-size: clamp(2rem, 5vw, 3rem);
        margin: 0 0 1.25rem;
        color: var(--color-fg-default);
        line-height: 1.25;
      }
      .hero-tagline {
        font-size: 1.1rem;
        color: var(--color-fg-muted);
        max-width: 560px;
        margin: 0 auto 2rem;
        line-height: 1.65;
      }
      .hero-actions {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
        flex-wrap: wrap;
        margin-bottom: 1rem;
      }
      .hero-note {
        font-size: 0.85rem;
        color: var(--color-fg-muted);
        margin: 0;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        transition: all 0.15s ease;
        font-size: 0.95rem;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-primary:hover {
        background: #3730a3;
        color: #ffffff;
        text-decoration: none;
      }
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .btn-secondary:hover {
        background: var(--color-bg-subtle);
        text-decoration: none;
      }
      .btn-white {
        background: #ffffff;
        color: var(--color-accent);
        border: none;
        font-size: 1rem;
        padding: 0.8rem 2rem;
      }
      .btn-white:hover {
        background: #f0f0ff;
        text-decoration: none;
      }
      .features {
        padding: 4rem 1rem;
      }
      .features h2 {
        text-align: center;
        margin-bottom: 2.5rem;
        font-size: 1.5rem;
      }
      .feature-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .feature-grid li {
        text-align: center;
        padding: 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: #ffffff;
      }
      .feature-icon {
        font-size: 2rem;
        display: block;
        margin-bottom: 0.75rem;
      }
      .feature-grid h3 {
        margin: 0 0 0.5rem;
        font-size: 1rem;
        color: var(--color-fg-default);
      }
      .feature-grid p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        line-height: 1.55;
      }
      .aree-featured {
        padding: 4rem 1rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-lg);
        margin: 0 1rem 4rem;
      }
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .section-header h2 {
        margin: 0;
        font-size: 1.5rem;
      }
      .link-more {
        color: var(--color-accent);
        text-decoration: none;
        font-weight: 600;
        font-size: 0.95rem;
      }
      .area-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.25rem;
      }
      .area-card {
        background: #ffffff;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.5rem;
      }
      .area-card__icon {
        font-size: 1.75rem;
        display: block;
        margin-bottom: 0.75rem;
      }
      .area-card h3 {
        margin: 0 0 0.5rem;
        font-size: 1.05rem;
      }
      .area-card p {
        margin: 0 0 1rem;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        line-height: 1.55;
      }
      .area-link {
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--color-accent);
        text-decoration: none;
      }
      .tariffe-band {
        padding: 4rem 1rem;
        border-top: 1px solid var(--color-border);
        border-bottom: 1px solid var(--color-border);
      }
      .tariffe-band h2 {
        text-align: center;
        margin-bottom: 2rem;
        font-size: 1.5rem;
      }
      .tariffe-grid {
        list-style: none;
        padding: 0;
        margin: 0 0 1rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.25rem;
      }
      .tariffa-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 1.75rem 1.25rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: #ffffff;
      }
      .tariffa-card--highlight {
        border-color: var(--color-accent);
        background: #eef2ff;
      }
      .tariffa-label {
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--color-fg-muted);
        text-transform: uppercase;
        letter-spacing: 0.04em;
        margin-bottom: 0.5rem;
      }
      .tariffa-prezzo {
        font-size: 2.25rem;
        font-weight: 700;
        color: var(--color-accent);
        line-height: 1;
        margin-bottom: 0.5rem;
      }
      .tariffa-dettaglio {
        font-size: 0.82rem;
        color: var(--color-fg-muted);
      }
      .tariffe-nota {
        text-align: center;
        font-size: 0.85rem;
        color: var(--color-fg-muted);
        margin: 0;
      }
      .cta-band {
        padding: 5rem 1rem;
        background: var(--color-accent);
        text-align: center;
      }
      .cta-band h2 {
        margin: 0 0 1rem;
        color: #ffffff;
        font-size: 1.75rem;
      }
      .cta-band p {
        color: rgba(255, 255, 255, 0.85);
        margin: 0 auto 2rem;
        max-width: 520px;
        line-height: 1.65;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private readonly mockData = inject(MockDataService);

  readonly info$ = this.mockData.info$;

  readonly areeFeatured$ = this.mockData.aree$.pipe(
    map((data) => data.aree.filter((a) => a.featured))
  );
}
