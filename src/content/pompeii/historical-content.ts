import type { HistoricalContent } from '@/core/models';

export const houseOfFaunHistoricalContent: HistoricalContent = {
  id: 'hc_house_of_faun',
  buildingId: 'house_of_faun',
  title: {
    it: 'La Casa del Fauno',
    en: 'The House of the Faun',
  },
  body: {
    it: 'Costruita nel II secolo a.C., la Casa del Fauno occupa un intero isolato ed e considerata uno degli esempi piu completi di residenza patrizia tardo-repubblicana.',
    en: 'Built in the 2nd century BC, the House of the Faun occupies an entire city block and is considered one of the most complete examples of a late Republican patrician residence.',
  },
  sources: [
    {
      id: 'src_pompeii_sites',
      type: 'archive',
      citation: 'Parco Archeologico di Pompei — Scheda Casa del Fauno',
      url: 'https://pompeiisites.org',
    },
  ],
};

export const historicalContent: HistoricalContent[] = [houseOfFaunHistoricalContent];
