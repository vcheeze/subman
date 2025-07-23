// routes/login.tsx
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
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Checkbox } from '~/components/ui/checkbox'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { authClient } from '~/utils/auth-client'

export const Route = createFileRoute('/_public/login')({
  validateSearch: (search) => ({
    redirect: (search.redirect as string) || '/app',
  }),
  beforeLoad: ({ context, search }) => {
    console.log('context :>> ', context)
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
      {/* <svg
        className="mb-4"
        height="38.9054"
        role="presentation"
        viewBox="0 0 40.36113 38.9054"
        width="40.36113"
        xmlns="http://www.w3.org/2000/svg"
        // creator="Katerina Limpitsouni"
      >
        <path
          className="fill-foreground"
          d="M19.70556,28.00919c-2.15592,.90546-4.01062,2.14927-5.9324,3.46355-1.74319,1.19215-3.45366,2.2581-5.57536,2.57124l3.0753,3.0753c.36799-2.4042,.73597-4.80841,1.10396-7.21261,.17173-1.12196,.34367-2.24389,.51518-3.36589,.18989-1.24225-.08272-1.99141-.72587-3.03697-2.21289-3.59747-5.11125-6.61693-8.49624-9.12248l-1.2618,4.65868c2.33234-.04929,4.67205-.31811,6.95089-.82282,1.03157-.22847,2.0518-.50936,3.05482-.8415,1.07006-.35434,2.42645-.69147,3.26101-1.46913,.7761-.7232,1.05584-1.76394,1.44445-2.722l1.30082-3.20695,2.78747-6.87205-4.56937,.5972c2.35108,3.18379,4.31642,6.6451,5.72596,10.3473,.39725,1.04338,1.23531,1.8354,2.4107,1.8354,1.05531,0,2.17889-.77044,2.4107-1.8354l.06286-.28881-2.4107,1.8354,13.02955,1.50949-1.76777-4.26777c-1.71654,1.80345-3.43307,3.60691-5.14961,5.41036-.80105,.84161-1.6021,1.68322-2.40315,2.52484-.65014,.68306-1.46133,1.3468-1.7001,2.2974-.26878,1.07008-.13372,2.40093-.0944,3.49576,.03954,1.10106,.13044,2.19869,.26291,3.2923,.2928,2.41726,.76858,4.78544,1.47107,7.1175l3.0753-3.0753c-1.82897-.61231-3.57117-1.3839-5.24823-2.33841-1.34755-.76697-3.19716-1.67852-4.17557-2.91069-.8403-1.05824-2.65757-.87796-3.53553,0-1.04529,1.04529-.84245,2.47459,0,3.53553,.58278,.73393,1.5591,1.30313,2.31477,1.84768,.92372,.66565,1.88322,1.28163,2.87274,1.84482,2.04151,1.16194,4.21654,2.09719,6.44263,2.84245,1.80592,.6046,3.60651-1.31182,3.0753-3.0753-.59267-1.9675-1.07053-3.98077-1.32005-6.02267-.12398-1.01452-.19864-2.03659-.23532-3.05793-.01694-.47164-.02503-.94367-.02418-1.41562,.00056-.31466,.00508-.62927,.01357-.94382-.05945,.1572-.0749,.18411-.04634,.08072l-.64293,1.10317c2.86089-3.00576,5.72179-6.01152,8.58268-9.01727,1.61333-1.69502,.32239-4.02562-1.76777-4.26777l-13.02955-1.50949c-1.02577-.11884-2.19771,.85688-2.4107,1.8354l-.06286,.28881h4.8214c-1.56857-4.11988-3.60924-7.99271-6.23-11.54169-1.34395-1.81996-3.73271-1.46546-4.56937,.5972l-4.64578,11.45341,.64293-1.10317-.28037,.28083,1.10317-.64293c-3.46066,1.40546-7.0623,2.19657-10.79801,2.27552-2.64815,.05597-3.1784,3.24001-1.2618,4.65868,2.96338,2.19349,5.38831,5.02497,7.22417,8.21039l-.25202-1.9264c-.74216,3.55154-1.11793,7.2203-1.66698,10.80741-.30706,2.00613,1.07824,3.37004,3.0753,3.0753,4.55314-.672,7.44735-4.32947,11.50776-6.03479,1.24392-.52243,2.13685-1.65343,1.7461-3.0753-.32232-1.17288-1.82249-2.27226-3.0753-1.7461Z"
          origin="undraw"
        />
      </svg> */}
      <img alt="Subman logo" className="mb-2 size-16" src="/logo_light.svg" />
      <h1 className="mb-2 font-serif text-2xl">Welcome to Subman</h1>
      <p className="mb-6 text-muted-foreground text-sm">
        Don't have an account?&nbsp;
        <Link className="underline" search={{ redirect }} to="/signup">
          Sign up
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
            <AlertTitle>We couldn't sign you in.</AlertTitle>
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
        <Button className="mt-2 w-full">Sign In</Button>
      </form>
    </div>
  )
}
