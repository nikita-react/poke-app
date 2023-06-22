import { Column } from "../types";

export  const keysToCompare = [
    { key: "Default", name: "Default" },
    { key: "Height: High-Low", name: "Height: High-Low" },
    { key: "Height: Low-High", name: "Height: Low-High" },
    { key: "Experience: High-Low", name: "Experience: High-Low" },
    { key: "Experience: Low-High", name: "Experience: Low-High" },
  ];

 export const RenderSelectedPokemonsColumns: readonly Column[] = [
    { id: "id", label: "Id" },
    { id: "name", label: "Name" },
    { id: "height", label: "Height", align: "right" },
    { id: "experience", label: "Experience", align: "right" },
    { id: "default", label: "Default", align: "right" },
    { id: "image", label: "Image", align: "center" },
    { id: "delete", label: "" },
  ];


  export const RenderPokemonsColumns: readonly Column[] = [
    { id: "checkbox", label: "" },
    { id: "id", label: "Id" },
    { id: "name", label: "Name" },
    { id: "height", label: "Height", align: "right" },
    { id: "experience", label: "Experience", align: "right" },
    { id: "default", label: "Default", align: "right" },
    { id: "image", label: "Image", align: "center" },
  ];