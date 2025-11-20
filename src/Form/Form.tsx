import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import Input from "./NumberInput";
import { Button, Stack } from "@mui/material";

const error = (issue: { input: unknown; message?: string }) =>
  issue.input === undefined ? "This field is required" : issue.message;

const schema = z.object({
  age: z.number({error}).min(25),
})

export default function Form() {

  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => {
          console.log(data);
        })}
      >
        <Stack>
          <Input name="age" allowFloating allowNegative/>
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </FormProvider>
  );
}
