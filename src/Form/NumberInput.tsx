import {
  FormHelperText,
  Stack,
  TextField,
  type TextFieldProps,
} from "@mui/material";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

type InputProps = TextFieldProps & {
  name: string;
  allowFloating?: boolean;
  allowNegative?: boolean;
};

export default function Input({
  name,
  allowFloating = true,
  allowNegative = false,
  ...props
}: InputProps) {
  const { getValues } = useFormContext();
  const initialValue = getValues(name);
  const [inputValue, setInputValue] = useState<string>(
    initialValue?.toString() || ""
  );
  const regex = new RegExp(
    `^${allowNegative ? "-?" : ""}${
      allowFloating ? "\\d*[\\.,]?" : ""
    }\\d*$`
  );

  return (
    <Controller
      name={name}
      render={({ field, formState: { errors } }) => (
        <Stack sx={{ gap: 1 }}>
          <TextField
            {...field}
            {...props}
            value={inputValue}
            onChange={(e) => {
              if (!regex.test(e.target.value)) return;
              setInputValue(e.target.value.replace(",", "."));
              if (["", "."].includes(e.target.value)) {
                field.onChange(undefined);
              } else {
                field.onChange(Number(e.target.value));
              }
            }}
          />
          {errors[name] && (
            <FormHelperText error>
              {(errors[name] as { message: string })?.message}
            </FormHelperText>
          )}
        </Stack>
      )}
    />
  );
}
