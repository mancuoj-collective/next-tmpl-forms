'use client'

import { AlertCircleIcon, CheckCircleIcon } from 'lucide-react'
import { useActionState } from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import type { State } from './actions'
import { formValidateAction } from './actions'

export function ServerValidateForm() {
  const initialState: State = { success: false, message: null }
  const [state, formAction, isPending] = useActionState(formValidateAction, initialState)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Server Validate</CardTitle>
        <CardDescription>
          server action + zod
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          {state.errors?.name && <p className="mb-2 text-sm text-pink-500">{state.errors.name}</p>}
          <Input name="name" className="mb-4" defaultValue={state.data?.name} />
          <Button type="submit" className="mb-4 w-full" disabled={isPending}>
            {isPending ? 'Validating...' : 'Server Validate'}
          </Button>
          {state.message && (
            <Alert variant={state.success ? 'default' : 'destructive'}>
              {state.success ? <CheckCircleIcon className="size-4" /> : <AlertCircleIcon className="size-4" />}
              <AlertTitle>
                {state.success ? 'Success' : 'Error'}
              </AlertTitle>
              <AlertDescription>
                {state.message}
              </AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
