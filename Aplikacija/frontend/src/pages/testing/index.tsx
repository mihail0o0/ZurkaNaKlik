import Button from "@/components/lib/button";
import Input from "@/components/lib/inputs/text-input";
import PageSpacer from "@/components/lib/page-spacer";
import { useState } from "react";

const TestingPage = () => {
  const [text, setText] = useState("Email");
  const handleChange = (newText: string) => {
    setText(newText);
  };

  return (
    <>
      <div className="containerWrapper testingPageWrapper">
        <h1>Test awdhkj ad wakuh</h1>
        {/* <Button text={"Testing button"} onClick={() => {}} /> */}
        <Input onChange={handleChange} icon={"mail"} text={"Email"} />
      </div>
      <PageSpacer />
    </>
  );
};

export default TestingPage;
