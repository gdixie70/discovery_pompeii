import type { Building } from '@/core/models';

export const houseOfFaun: Building = {
  id: 'house_of_faun',
  siteId: 'pompeii',
  name: { it: 'Casa del Fauno', en: 'House of the Faun' },
  period: 'II secolo a.C.',
  description: {
    it: 'Una delle piu grandi ed elaborate residenze private di Pompei, nota per lo statuetta bronzea del Fauno danzante e i celebri mosaici, tra cui il Mosaico di Alessandro.',
    en: 'One of the largest and most elaborate private residences in Pompeii, known for the bronze statuette of the Dancing Faun and its celebrated mosaics, including the Alexander Mosaic.',
  },
};

export const buildings: Building[] = [houseOfFaun];
