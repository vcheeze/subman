import { zodResolver } from '@hookform/resolvers/zod'
import {
  createFileRoute,
  Link,
  useNavigate,
  useRouteContext,
} from '@tanstack/react-router'
import { type Resolver, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import { addSubscription } from '~/queries/subscriptions'

export const Route = createFileRoute('/_authed/subs/add')({
  component: RouteComponent,
})

const subscriptionSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  amount: z.string().min(1, 'Amount is required'),
  rating: z.coerce.number().min(1).max(5),
  notes: z.string().optional(),
})

export type SubscriptionFormData = z.infer<typeof subscriptionSchema>

function RouteComponent() {
  const navigate = useNavigate({ from: '/subs/add' })
  const userId = useRouteContext({
    from: '/_authed/subs/add',
    select: (context) => context.user?.id ?? '',
  })

  const form = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionSchema) as Resolver<SubscriptionFormData>,
  })

  const onSubmit = async (values: SubscriptionFormData) => {
    try {
      await addSubscription({ data: { ...values, userId } })
      navigate({ to: '/app' })
    } catch {
      toast.error('Something went wrong', {
        description: `${values.name} couldn't be added. Please try again.`,
      })
    }
  }

  return (
    <div className="container mx-auto flex min-h-screen max-w-4xl flex-col justify-center p-4 lg:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Add a Sub</CardTitle>
          <CardDescription className="mb-6">
            Track how much you pay for - and how much it means to you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What's it called?</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Netflix, Spotify..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How much per month?</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0.00"
                        step="0.01"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How much do you value it?</FormLabel>
                    <FormControl>
                      <Input
                        max="5"
                        min="1"
                        placeholder="1-5"
                        step="1"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Forget price. Think about how you feel.
                      <br />1 = "I wouldn't keep it even if it were free"
                      <br />5 = "I'd hate to live without it"
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Anything else? (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        className="resize-none"
                        placeholder="Why you keep it, or what you use it for..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2 max-sm:flex-col">
                <Button asChild className="max-sm:w-full" variant="outline">
                  <Link to="/app">Cancel</Link>
                </Button>
                <Button className="max-sm:w-full" type="submit">
                  Add it to my list
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
