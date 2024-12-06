'use server'

import { formSchema } from './schema'

export type State = {
  message: string | null
  errors?: {
    name?: string[]
  }
  data?: {
    name?: string
  }
}

export async function formValidateAction(prevState: State, formData: FormData) {
  const data = Object.fromEntries(formData.entries())
  const parsed = formSchema.safeParse(data)

  if (!parsed.success) {
    return {
      message: 'Server:Invalid form data',
      errors: parsed.error.flatten().fieldErrors,
      data: { ...prevState.data, ...data },
    }
  }

  return {
    message: `Server: You submitted ${JSON.stringify(parsed.data, null, 2)}`,
  }
}
