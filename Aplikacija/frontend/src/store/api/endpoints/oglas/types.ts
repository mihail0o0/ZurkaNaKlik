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
};

export const getEnumGrejanje = (value: EnumGrejanje): string => {
  switch (value) {
    case EnumGrejanje.Etazno:
      return "Etažno";
    case EnumGrejanje.Klima:
      return "Klima";
    case EnumGrejanje.Kotao:
      return "Kotao";
    case EnumGrejanje.Sporet:
      return "Šporet";
    case EnumGrejanje.TA_pec:
      return "TA peć";
    case EnumGrejanje.Nema:
      return "Nema";
    default:
      return "";
  }
};

export const getEnumTipProslava = (value: EnumTipProslava): string => {
  switch (value) {
    case EnumTipProslava.Rodjendan:
      return "Rođendan";
    case EnumTipProslava.Zurka:
      return "Žurka";
    case EnumTipProslava.Teambuilding:
      return "Teambuilding događaj";
    case EnumTipProslava.Momacko:
      return "Momacko veče";
    case EnumTipProslava.Devojacko:
      return "Devojačko veče";
    case EnumTipProslava.Sve:
      return "Sve proslave";
    case EnumTipProslava.Ostalo:
      return "Ostale proslave";
    default:
      return "";
  }
};

export const getEnumTipProstora = (value: EnumTipProstora): string => {
  switch (value) {
    case EnumTipProstora.Vikendica:
      return "Vikendica";
    case EnumTipProstora.Stan:
      return "Stan";
    case EnumTipProstora.Lokal:
      return "Lokal";
    case EnumTipProstora.Kuca:
      return "Kuca";
    default:
      return "";
  }
};

export const getEnumDodatnaOprema = (value: EnumDodatnaOprema): string => {
  switch (value) {
    case EnumDodatnaOprema.net:
      return "Internet";
    case EnumDodatnaOprema.tv:
      return "Televizor";
    case EnumDodatnaOprema.terasa:
      return "Terasa";
    case EnumDodatnaOprema.bazen:
      return "Bazen";
    case EnumDodatnaOprema.klima:
      return "Klima uređaj";
    case EnumDodatnaOprema.kuhinja:
      return "Kuhinja";
    case EnumDodatnaOprema.dvoriste:
      return "Dvorište";
    case EnumDodatnaOprema.parking:
      return "Parking";
    case EnumDodatnaOprema.frizider:
      return "Frižider";
    case EnumDodatnaOprema.zamrzivac:
      return "Zamrzivač";
    default:
      return "";
  }
};
