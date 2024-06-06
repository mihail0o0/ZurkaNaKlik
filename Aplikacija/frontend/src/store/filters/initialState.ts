import { Filters, Sort } from "./types";

export const initialState: Filters = {
  filtersData: {
    tipProslava: [],
    tipProstora: [],
    grejanje: [],
    dodatnaOprema: [],
    cenaOd: null,
    cenaDo: null,
    grad: null,
    datumDo: null,
    datumOd: null,
    kvadraturaDo: null,
    kvadraturaOd: null,
  },
  paginationData: {
    pageNumber: 1,
    pageSize: 12,
  },
  sort: Sort.OcenaRastuce,
};
