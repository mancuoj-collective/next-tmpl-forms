import { DarkModeToggle } from '@/components/theme'

import { BothValidateForm } from './both-validate'
import { ClientValidateForm } from './client-validate'
import { ServerValidateForm } from './server-validate'

export default async function Page() {
  return (
    <div className="mx-auto flex min-h-svh max-w-xl flex-col justify-center p-8">
      <div className="flex w-full flex-col gap-4">
        <ClientValidateForm />
        <ServerValidateForm />
        <BothValidateForm />
      </div>
      <div className="mt-8 space-x-2 text-end">
        <a className="i-carbon-logo-github" href="https://github.com/mancuoj-collective/next-tmpl-forms" />
        <DarkModeToggle />
      </div>
    </div>
  )
}
