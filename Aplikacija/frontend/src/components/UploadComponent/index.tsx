import React, { useEffect, useMemo, useState } from "react";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { toast } from "react-toastify";
import {
  FetchArgs,
  FetchBaseQueryError,
  MutationDefinition,
} from "@reduxjs/toolkit/query";
import { BaseQueryFn } from "@reduxjs/toolkit/query";

type UseMutationHook = () => readonly [
  MutationTrigger<
    MutationDefinition<
      FormData,
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
      string,
      void,
      "api"
    >
  >,
  any
];

type Props = {
  useMutationHook: UseMutationHook;
};

const UploadComponent = ({ useMutationHook }: Props) => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [uploadAction] = useMutationHook();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length < 0) return;

    const file = event.target.files[0];
    const fD = new FormData();
    fD.append("file", file);
    setFormData(fD);
  };

  const handleSubmit = async () => {
    if (!formData) return;

    const result = await uploadAction(formData);
    if ("error" in result) {
      console.log(result.error);
      return;
    }

    toast.success("Uspesno uplodana slika");
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Upload</button>
    </div>
  );
};

export default UploadComponent;
