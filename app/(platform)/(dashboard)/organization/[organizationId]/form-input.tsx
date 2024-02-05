"use client";

import { useFormStatus } from "react-dom";

interface FormInputProps {
  errors?: {
    title?: string[];
  };
}
const FormInput = ({ errors }: FormInputProps) => {
  const pending = useFormStatus();
  return (
    <div>
      <input
        type="text"
        id="title"
        required
        name="title"
        placeholder="Enter a Board Title"
        className=" border-black border p-2"
      />

      {errors.title ? (
        <div>
          {errors.map((error: string) => (
            <p className="text-rose-500" key={error}>
              {error}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default FormInput;
