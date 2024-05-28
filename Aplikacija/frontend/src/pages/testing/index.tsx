import LabeledAvatar from "@/components/LabeledAvatar";
import MojButton from "@/components/lib/button";
import Input from "@/components/lib/inputs/text-input";
import PageSpacer from "@/components/lib/page-spacer";
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from "@/store/api/endpoints/agencija";
import { useLogoutMutation } from "@/store/api/endpoints/auth";
import { selectUser } from "@/store/auth";
import { Avatar } from "@mui/material";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

const TestingPage = () => {
  const user = useSelector(selectUser);
  const { data: allCategories } = useGetAllCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [addCategory] = useAddCategoryMutation();

  console.log("ALL CATEGORIES");
  console.log(allCategories);

  // const categories = useMemo(() => {
  //   if(!user) return;
  //   return getAllCategories();
  // }, [])

  const [text, setText] = useState("Email");
  const handleChange = (newText: string) => {
    setText(newText);
  };

  return (
    <>
      <div className="containerWrapper testingPageWrapper">
        <h1>Test awdhkj ad wakuh</h1>
        {/* <Button text={"Testing button"} onClick={() => {}} /> */}
        {/* <Input onChange={handleChange} icon={"mail"} text={"Email"} /> */}
        <LabeledAvatar avatarSize={100} text="Mihailo" />
        <MojButton
          text="delete"
          onClick={() => {
            console.log(allCategories);
            if (allCategories) {
              console.log("Mjau");
              console.log(allCategories[0].id);
              deleteCategory(allCategories[0].id);
            }
          }}
        ></MojButton>
        <MojButton
          text="Add"
          onClick={() => {
            console.log(allCategories);
            if (allCategories) {
              console.log("Mjau");

              const category: AddCategoryDTO = {
                naziv: "Test bggge1",
              };
              addCategory(category);
            }
          }}
        ></MojButton>
      </div>
      <PageSpacer />
    </>
  );
};

export default TestingPage;
