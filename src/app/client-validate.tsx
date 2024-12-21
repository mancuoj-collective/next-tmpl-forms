'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircleIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import type { FormType } from './schema'
import { formSchema } from './schema'

export function ClientValidateForm() {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })
  const [values, setValues] = useState<FormType | null>(null)

  function onSubmit(values: FormType) {
    setValues(values)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Client Validate</CardTitle>
        <CardDescription>
          react-hook-form + zod
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormMessage />
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="mb-4 w-full">
              Client Validate
            </Button>
            {values && (
              <Alert>
                <CheckCircleIcon className="size-4" />
                <AlertTitle>
                  Success
                </AlertTitle>
                <AlertDescription>
                  You submitted: {JSON.stringify(values, null, 2)}
                </AlertDescription>
              </Alert>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
