import { Control, Controller, RegisterOptions } from "react-hook-form";
import NumberFormat, { NumberFormatProps } from "react-number-format";

type TextInputProps = {
  control?: Control<any>;
  onChange?: (e: any, onChange: (value: any) => void) => void;
  rules?: Exclude<RegisterOptions, "valueAsNumber" | "valueAsDate" | "setValueAs">;
} & Omit<NumberFormatProps, "onChange">;

export function NumberInput({ control, rules, ...remainProps }: TextInputProps) {
  return (
    <Controller
      render={({ value, onChange }, { invalid }) => {
        return (
          <NumberFormat
            {...remainProps}
            value={value}
            onChange={(e: any) => {
              remainProps.onChange?.(e, onChange);
            }}
          />
        )
      }}
      rules={rules}
      name={remainProps.name ?? "text-field"}
      control={control}
    />
  );
}
