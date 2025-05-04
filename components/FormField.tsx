import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Form, FormControl, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  type?: "email" | "text" | "password" | "file";
}

const FormField = ({
  name,
  control,
  label,
  placeholder,
  type = "text",
}: FormFieldProps<T>) => (
  <Controller
    render={({ field }) => (
      <FormItem>
        <FormLabel className="label">{label}</FormLabel>

        <FormControl>
          <Input
            {...field}
            type={type}
            placeholder={placeholder}
            className="input"
          />
        </FormControl>

        <FormMessage />
      </FormItem>
    )}
    name={name}
    control={control}
  />
);

export default FormField;
