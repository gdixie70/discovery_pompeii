import type { Site } from '@/core/models';

export const pompeiiSite: Site = {
  id: 'pompeii',
  name: 'Pompei',
  // Centro approssimativo del Parco Archeologico di Pompei (non della citta
  // moderna). Fonte: Porta Marina 40.7488, 14.4847 + estensione dello scavo.
  location: { latitude: 40.7508, longitude: 14.4869 },
  description: {
    it: 'Sito archeologico di Pompei, citta romana sepolta dall\'eruzione del Vesuvio nel 79 d.C.',
    en: 'Archaeological site of Pompeii, a Roman city buried by the eruption of Vesuvius in 79 AD.',
  },
};
