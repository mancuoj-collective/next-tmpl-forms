import { DarkModeToggle } from '@/components/theme'

import { BothValidateForm } from './both-validate'
import { ClientValidateForm } from './client-validate'
import { ServerValidateForm } from './server-validate'

export default async function Page() {
  return (
    <div className="flex min-h-svh flex-col items-center gap-10 p-8 md:py-48">
      <div className="flex w-full flex-col gap-8 md:flex-row">
        <ClientValidateForm />
        <ServerValidateForm />
        <BothValidateForm />
      </div>
      <div className="space-x-2">
        <a className="i-mingcute-github-line" href="https://github.com/mancuoj-collective/next-tmpl-forms" />
        <DarkModeToggle />
      </div>
    </div>
  )
}
