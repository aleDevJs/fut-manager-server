import { z } from "zod";

export const isoDateValidation = z.string().refine((value) => {
  // Use uma expressão regular para verificar se a string está no formato ISO
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3}Z?)?$/;
  return isoDateRegex.test(value);
}, {
  message: "A data deve estar no formato ISO string (AAAA-MM-DDTHH:mm:ss.sssZ)."
});