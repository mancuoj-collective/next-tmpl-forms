import { z } from 'zod'

export const formSchema = z.object({
  name: z.string().min(3, { message: 'must > 2' }),
})

export type FormType = z.infer<typeof formSchema>
