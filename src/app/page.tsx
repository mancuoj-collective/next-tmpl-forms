import { ClientValidateForm } from './client-validate'

export default async function Page() {
  return (
    <div className="flex min-h-svh items-center justify-center gap-4">
      <ClientValidateForm />
    </div>
  )
}
