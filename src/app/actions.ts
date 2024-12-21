'use server'

import { formSchema } from './schema'

export type State = {
  success: boolean
  message: string | null
  errors?: {
    name?: string[]
  }
  data?: {
    name?: string
  }
}

export async function formValidateAction(prevState: State, formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries())
    const parsed = formSchema.safeParse(data)

    if (!parsed.success) {
      return {
        success: false,
        message: 'Server: Invalid form data',
        errors: parsed.error.flatten().fieldErrors,
        data: { ...prevState.data, ...data },
      }
    }

    return {
      success: true,
      message: `Server: You submitted ${JSON.stringify(parsed.data, null, 2)}`,
    }
  }
  catch {
    return {
      success: false,
      message: 'Server: Invalid form data',
    }
  }
}
