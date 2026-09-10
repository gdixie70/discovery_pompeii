import type { Site } from '@/core/models';

export const pompeiiSite: Site = {
  id: 'pompeii',
  name: 'Pompei',
  location: { latitude: 40.7489, longitude: 14.4989 },
  description: {
    it: 'Sito archeologico di Pompei, citta romana sepolta dall\'eruzione del Vesuvio nel 79 d.C.',
    en: 'Archaeological site of Pompeii, a Roman city buried by the eruption of Vesuvius in 79 AD.',
  },
};
