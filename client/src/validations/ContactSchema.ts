import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  message: z.string().min(10).max(200),
});

type ContactType = z.infer<typeof ContactSchema>;

export { ContactSchema, type ContactType };