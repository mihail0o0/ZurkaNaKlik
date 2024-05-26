type Category = {
  id: number;
  naziv: string;
};

type AddCategoryDTO = Omit<Category, "id">;
