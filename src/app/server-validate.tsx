'use client'

import { useActionState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import type { State } from './actions'
import { formValidateAction } from './actions'

export function ServerValidateForm() {
  const initialState: State = { message: null }
  const [state, formAction, isPending] = useActionState(formValidateAction, initialState)

  return (
    <form action={formAction}>
      {state.message && <p className="mb-2 whitespace-pre-wrap text-sm">{state.message}</p>}
      {state.errors?.name && <p className="mb-2 text-sm text-pink-500">{state.errors.name}</p>}
      <Input name="name" className="mb-4" defaultValue={state.data?.name} />
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Validating...' : 'Server Validate'}
      </Button>
    </form>
  )
}
