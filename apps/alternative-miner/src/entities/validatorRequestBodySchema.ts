import { z } from "zod";

export const validatorRequestBodySchema = z.object({
  params: z.object({
    prompt: z.string(),
    target_key: z.string(),
  }),
});

export type ValidatorRequestBody = z.infer<typeof validatorRequestBodySchema>;
