import { ClientValidateForm } from './client-validate'
import { ServerValidateForm } from './server-validate'

export default async function Page() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-10">
      <div className="flex gap-8">
        <ClientValidateForm />
        <ServerValidateForm />
      </div>
      <h1>Try to disable JavaScript</h1>
    </div>
  )
}
