import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useForm } from "react-hook-form";

const options = [
  {
    id: "01781026621",
    name: "CATEGORY",
  },
  {
    id: "01781026622",
    name: "OFFER",
  },
  {
    id: "01781026623",
    name: "BRAND",
  },
];

export default function SelectComponent() {
  const [valueAut, setValueAut] = React.useState<string | null>(options[2]);
  const [inputValue, setInputValue] = React.useState("");
  const { register, handleSubmit } = useForm({ defaultValues: {} });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <Autocomplete
        value={valueAut}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        getOptionLabel={(option) => option.name}
        sx={{ width: 300 }}
        getOptionSelected={(opt: any, val: any) => opt === val}
        renderInput={(params) => (
          <TextField {...params} hiddenLabel placeholder="Select Item" />
        )}
        {...register("valueAut")}
        onChange={(e: any, val: any) => {
          setValueAut(valueAut, val);
        }}
      />
      <input type="submit" />
    </form>
  );
}
