'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useActionState, useRef, useTransition } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import type { State } from './actions'
import { formValidateAction } from './actions'
import type { FormType } from './schema'
import { formSchema } from './schema'

export function BothValidateForm() {
  const initialState: State = { message: null }
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
        {state.message && <p className="mb-2 whitespace-pre-wrap text-sm">{state.message}</p>}
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
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? 'Validating...' : 'Both Validate'}
        </Button>
      </form>
    </Form>
  )
}
