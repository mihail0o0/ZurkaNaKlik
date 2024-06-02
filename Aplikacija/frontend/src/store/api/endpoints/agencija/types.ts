type Agency = {
  id: number;
  ime: string;
  email: string;
  brTel: string;
  slikaProfila?: string;
  lokacija: string;
  opis?: string;
  ocena?: number;
  mogucnostDostave: boolean;
  cenaDostave: number;
  brojOcena: number;
};

type UpdateAgencyDTO = Omit<
  Agency,
  "id" | "slikaProfila" | "ocena" | "brojOcena"
>;

type Category = {
  id: number;
  naziv: string;
  idAgencije?: number;
};

type Menu = {
  id: number;
  naziv: string;
  slika: string;
  opis: string;
  cenaMenija: number;
  sastavMenija: string[];
  idKategorije?: number;
};

type GetMenuDTO = {
  id: number;
  naziv: string;
  meniKeteringa: Menu[];
};

type AddMenuDTO = {
  id: number;
  menu: Omit<Menu, "id">;
};

type AddCategoryDTO = Omit<Category, "id">;
