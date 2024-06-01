export enum EnumDodatnaOprema {
  net = "net",
  tv = "tv",
  terasa = "terasa",
  bazen = "bazen",
  klima = "klima",
  kuhinja = "kuhinja",
  dvoriste = "dvoriste",
  parking = "parking",
  frizider = "frizider",
  zamrzivac = "zamrzivac",
}

export enum EnumTipProslava {
  Rodjendan,
  Zurka,
  Teambuilding,
  Momacko,
  Devojacko,
  Sve,
  Ostalo,
}

export enum EnumTipProstora {
  Vikendica="Vikendica",
  Stan="Stan",
  Lokal="Lokal",
  Kuca="Kuca",
}

export enum EnumGrejanje {
  TA_pec="TA_pec",
  Klima="Klima",
  Sporet="Sporet",
  Kotao="Kotao",
  Etazno="Etazno",
  Nema="Nema",
}

export type Filters = {
  sort?: string;
  tipProslava?: EnumTipProslava[];
  tipProstora?: EnumTipProstora[];
  grad?: string;
  cenaOd: number;
  cenaDo: number;
  kvadraturaOd: number;
  kvadraturaDo: number;
  grejanje?: EnumGrejanje[];
  dodatnaOprema?: EnumDodatnaOprema[];
  datumOd: Date;
  datumDo: Date;
};

export type FiltersPaginationData = {
  pageNumber: number;
  pageSize: number;
};

export type OglasObjekata = {
  id: number;
  listaTipProslava: EnumTipProslava[];
  listaTipProstora: EnumTipProstora[];
  naziv: string;
  grad: string;
  lokacija: string;
  cenaPoDanu: number;
  brojSoba: number;
  kvadratura: number;
  brojKreveta: number;
  brojKupatila: number;
  grejanje: EnumGrejanje;
  listDodatneOpreme: EnumDodatnaOprema[];
  brTel: string;
  opis: string;
  slike: string[];
  ocena?: number;
  brojOcena: number;
  zauzetiDani: Date[];
  idVlasnika: number;
};

export type GetOglasData = {
    filters: Filters;
    pageData: FiltersPaginationData;
}