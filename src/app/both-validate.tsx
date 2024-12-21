'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircleIcon, CheckCircleIcon } from 'lucide-react'
import { useActionState, useRef, useTransition } from 'react'
import { useForm } from 'react-hook-form'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import type { State } from './actions'
import { formValidateAction } from './actions'
import type { FormType } from './schema'
import { formSchema } from './schema'

export function BothValidateForm() {
  const initialState: State = { success: false, message: null }
  const [state, formAction, isPending] = useActionState(formValidateAction, initialState)
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: state.data?.name ?? '',
    },
  })
  const formRef = useRef<HTMLFormElement>(null)
  const [_, startTransition] = useTransition()

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Both Validate</CardTitle>
        <CardDescription>both, try to disable javascript</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            ref={formRef}
            action={formAction}
            onSubmit={(e) => {
              e.preventDefault()
              void form.handleSubmit(() => {
                startTransition(() => {
                  formAction(new FormData(formRef.current!))
                })
              })(e)
            }}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-4">
                  {state.errors?.name ? (
                    <p className="mb-2 text-sm text-pink-500">{state.errors.name}</p>
                  ) : (
                    <FormMessage />
                  )}
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="mb-4 w-full" disabled={isPending}>
              {isPending ? 'Validating...' : 'Both Validate'}
            </Button>
            {state.message && (
              <Alert variant={state.success ? 'default' : 'destructive'}>
                {state.success ? <CheckCircleIcon className="size-4" /> : <AlertCircleIcon className="size-4" />}
                <AlertTitle>{state.success ? 'Success' : 'Error'}</AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
