type Category = {
  id: number;
  naziv: string;
};

type Menu = {
  id: number;
  naziv: string;
  slika: string;
  opis: string;
  sastavMenija: string[];
};

type GetMenuDTO = {
  id: number;
  naziv: string;
  meniKetetinga: Menu[];
};

type AddMenuDTO = {
  id: number;
  menu: Omit<Menu, "id">;
}

type AddCategoryDTO = Omit<Category, "id">;
