import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

import type { InfoStudio, AreeIntervento, ModalitaData, TeamData, FaqData } from './types';

@Injectable({ providedIn: 'root' })
export class MockDataService {
  private readonly http = inject(HttpClient);

  // Cache stream con shareReplay per evitare richieste duplicate
  readonly info$: Observable<InfoStudio> = this.http
    .get<InfoStudio>('/assets/mock/info.json')
    .pipe(shareReplay(1));

  readonly aree$: Observable<AreeIntervento> = this.http
    .get<AreeIntervento>('/assets/mock/aree.json')
    .pipe(shareReplay(1));

  readonly modalita$: Observable<ModalitaData> = this.http
    .get<ModalitaData>('/assets/mock/modalita.json')
    .pipe(shareReplay(1));

  readonly team$: Observable<TeamData> = this.http
    .get<TeamData>('/assets/mock/team.json')
    .pipe(shareReplay(1));

  readonly faq$: Observable<FaqData> = this.http
    .get<FaqData>('/assets/mock/faq.json')
    .pipe(shareReplay(1));
}
