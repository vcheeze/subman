import {
  createFileRoute,
  Link,
  redirect,
  useRouter,
} from '@tanstack/react-router'
import { AlertCircle, Eye, EyeClosed } from 'lucide-react'
import { useState } from 'react'

import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { authClient } from '~/utils/auth-client'

export const Route = createFileRoute('/_public/signup')({
  validateSearch: (search) => ({
    redirect: (search.redirect as string) || '/app',
  }),
  beforeLoad: ({ context, search }) => {
    // Redirect if already logged in
    if (context.user) {
      throw redirect({ to: search.redirect })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()
  // biome-ignore lint/nursery/noShadow: Tanstack Router returns the validated search params here with `useSearch`
  const { redirect } = Route.useSearch()
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState('')

  const handleLogin = async (email: string, password: string) => {
    const result = await authClient.signIn.email({ email, password })
    if (result.data) {
      router.navigate({ to: redirect })
    }
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <img alt="Subman logo" className="mb-2 size-16" src="/logo_light.svg" />
      <h1 className="mb-2 font-serif text-2xl lg:text-3xl">
        Welcome to Subman
      </h1>
      <p className="mb-6 text-muted-foreground text-sm">
        Already have an account?&nbsp;
        <Link
          className="underline"
          search={{ redirect }}
          to="/signin"
          viewTransition
        >
          Sign in
        </Link>
      </p>
      <form
        className="min-w-md space-y-4"
        onSubmit={async (event) => {
          event.preventDefault()
          const formData = new FormData(event.currentTarget)
          const jsonData = Object.fromEntries(formData.entries()) as {
            email: string
            password: string
          }

          try {
            const { data, error } = await authClient.signIn.email({
              ...jsonData,
              callbackURL: redirect,
            })
            if (error?.status === 401) {
              setFormError(
                error?.message ||
                  'Something weng wrong while signing you in. Please try again.',
              )
            }
          } catch (error) {
            console.error(error)
          }
        }}
      >
        {formError && (
          <Alert variant="destructive">
            <AlertCircle />
            <AlertTitle>We couldn't sign you up.</AlertTitle>
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        )}
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" />
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="flex w-full items-center gap-2">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
            />
            <Button
              onClick={() => setShowPassword((show) => !show)}
              size="icon"
              variant="outline"
            >
              {showPassword ? <Eye /> : <EyeClosed />}
            </Button>
          </div>
        </div>
        {/* <Label className="flex items-start gap-3 rounded-lg border p-3 hover:bg-accent/50 has-[[aria-checked=true]]:border-primary has-[[aria-checked=true]]:bg-accent">
          <Checkbox
            checked={rememberMe}
            className="data-[state=checked]:border-primary data-[state=checked]:bg-accent data-[state=checked]:text-primary dark:data-[state=checked]:text-primary-foreground"
            name="rememberMe"
            onCheckedChange={(checked) =>
              setRememberMe(checked === 'indeterminate' ? false : checked)
            }
          />
          <div className="grid gap-1.5 font-normal">
            <p className="font-medium text-sm leading-none">Remember me</p>
            <p className="text-muted-foreground text-sm">
              You won't have to sign in again even if you closed your browser.
            </p>
          </div>
        </Label> */}
        <Button className="mt-2 w-full">Sign Up</Button>
      </form>
    </div>
  )
}
