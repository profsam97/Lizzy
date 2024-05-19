import { MenuItem, Select } from "@mui/material";
import { ControllerRenderProps } from "react-hook-form";
import { optionsI } from "../interfaces/form.interface";

interface IField {
    field: ControllerRenderProps<optionsI, "filter">
}
const SelectField : React.FC<IField> = ({field}) => {

    return (
        <Select
        labelId="select-filter"
        id="filter"
        {...field}
        variant={"outlined"}
        sx={{
          height: 50,
          border: "2px solid black",
          borderRadius: "25px"
        }}
      >
        <MenuItem value={"Letter"}>Letter </MenuItem>
        <MenuItem value={"Ingredient"}>Ingredient</MenuItem>
        <MenuItem value={"Area"}>Area</MenuItem>
      </Select>
    )
}

export  default SelectField;