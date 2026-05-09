import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Studio Bianchi Psicoterapia — Milano'
  },
  {
    path: 'aree-intervento',
    loadComponent: () => import('./pages/aree-intervento/aree-intervento.component').then((m) => m.AreeInterventoComponent),
    title: 'Aree di intervento — Studio Bianchi'
  },
  {
    path: 'chi-siamo',
    loadComponent: () => import('./pages/chi-siamo/chi-siamo.component').then((m) => m.ChiSiamoComponent),
    title: 'Chi siamo — Studio Bianchi'
  },
  {
    path: 'modalita',
    loadComponent: () => import('./pages/modalita/modalita.component').then((m) => m.ModalitaComponent),
    title: 'Modalità di seduta — Studio Bianchi'
  },
  {
    path: 'contatti',
    loadComponent: () => import('./pages/contatti/contatti.component').then((m) => m.ContattiComponent),
    title: 'Primo colloquio e contatti — Studio Bianchi'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
