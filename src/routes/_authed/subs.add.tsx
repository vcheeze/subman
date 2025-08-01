import { zodResolver } from '@hookform/resolvers/zod'
import {
  Await,
  createFileRoute,
  Link,
  useNavigate,
} from '@tanstack/react-router'
import { format } from 'date-fns'
import { ArrowLeft, CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { type Resolver, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '~/components/ui/button'
import { Calendar } from '~/components/ui/calendar'
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { Skeleton } from '~/components/ui/skeleton'
import { Textarea } from '~/components/ui/textarea'
import { fetchCategories } from '~/queries/categories'
import { addSubscription } from '~/queries/subscriptions'
import { cn } from '~/utils'

export const Route = createFileRoute('/_authed/subs/add')({
  loader: () => {
    return { categories: fetchCategories() }
  },
  component: RouteComponent,
})

const subscriptionSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  amount: z.string().min(1, 'Amount is required'),
  currency: z.string().min(1, 'Currency is required').default('AED'),
  // rating: z.number().min(1).max(5),
  rating: z.coerce.number().min(1).max(5),
  billingCycle: z.enum(['weekly', 'monthly', 'quarterly', 'yearly']).optional(),
  startDate: z.date().optional(),
  categoryId: z.string().optional(),
  notes: z.string().optional(),
})

const commonSubscriptions = [
  { name: 'Netflix', amount: '15.49', category: 'Streaming' },
  { name: 'Spotify', amount: '10.99', category: 'Music' },
  { name: 'Amazon Prime', amount: '14.98', category: 'Shopping' },
  { name: 'Disney+', amount: '7.99', category: 'Streaming' },
  { name: 'YouTube Premium', amount: '11.99', category: 'Streaming' },
  { name: 'Adobe Creative Cloud', amount: '52.99', category: 'Software' },
  { name: 'Microsoft 365', amount: '6.99', category: 'Software' },
  { name: 'Dropbox', amount: '9.99', category: 'Cloud Storage' },
  { name: 'ChatGPT Plus', amount: '20.00', category: 'AI Tools' },
  { name: 'GitHub Pro', amount: '4.00', category: 'Developer Tools' },
  { name: 'Figma', amount: '12.00', category: 'Design Tools' },
  { name: 'Apple iCloud', amount: '2.99', category: 'Cloud Storage' },
]

const currencies = [
  {
    label: 'USD ($)',
    value: 'USD',
  },
  {
    label: 'EUR (€)',
    value: 'EUR',
  },
  {
    label: 'GBP (£)',
    value: 'GBP',
  },
  {
    label: 'CAD ($)',
    value: 'CAD',
  },
  {
    label: 'AED',
    value: 'AED',
  },
]

export type SubscriptionFormData = z.infer<typeof subscriptionSchema>

function RouteComponent() {
  const { categories } = Route.useLoaderData()
  const navigate = useNavigate({ from: '/subs/add' })

  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  const form = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionSchema) as Resolver<SubscriptionFormData>,
    defaultValues: {
      currency: 'AED',
      billingCycle: 'monthly',
    },
  })

  const handleTemplateSelect = (
    subscription: (typeof commonSubscriptions)[0],
  ) => {
    if (selectedTemplate !== subscription.name) {
      setSelectedTemplate(subscription.name)
      form.setValue('name', subscription.name)
      form.setValue('amount', subscription.amount)
      form.setValue('categoryId', subscription.category)
    } else {
      setSelectedTemplate('')
      form.setValue('name', '')
      form.setValue('amount', '')
      form.setValue('categoryId', '')
    }
  }

  const onSubmit = async (values: SubscriptionFormData) => {
    try {
      await addSubscription({ data: values })
      navigate({ to: '/app' })
    } catch {
      toast.error('Something went wrong', {
        description: `${values.name} couldn't be added. Please try again.`,
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card shadow-soft">
        <div className="container mx-auto px-6 py-4">
          <Button asChild variant="link">
            <Link
              className="flex items-center gap-2 transition-colors hover:text-foreground"
              to="/app"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <div className="mb-8">
          <h1 className="mb-2 font-bold text-3xl text-foreground">
            Add New Subscription
          </h1>
          <p className="text-muted-foreground">
            Keep track of your recurring expenses with ease.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Quick Templates */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-xl">Popular Subs</CardTitle>
              <CardDescription>Quick-add common subscriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {commonSubscriptions.map((subscription) => (
                  <Button
                    className="h-auto justify-start p-4"
                    key={subscription.name}
                    onClick={() => handleTemplateSelect(subscription)}
                    variant={
                      selectedTemplate === subscription.name
                        ? 'default'
                        : 'outline'
                    }
                  >
                    <div className="text-left">
                      <div className="font-medium">{subscription.name}</div>
                      <div
                        className={cn(
                          'text-sm',
                          selectedTemplate !== subscription.name &&
                            'text-muted-foreground',
                        )}
                      >
                        ${subscription.amount}/mo
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Form */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-xl">Sub Details</CardTitle>
              <CardDescription>
                Fill in the details for your subscription
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  className="space-y-6"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
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

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amount</FormLabel>
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
                      name="currency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Currency</FormLabel>
                          <Select
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select currency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {currencies.map((currency) => (
                                <SelectItem
                                  key={currency.value}
                                  value={currency.value}
                                >
                                  {currency.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rating</FormLabel>
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* <FormField
                    control={form.control}
                    name="billingCycle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Billing Cycle</FormLabel>
                        <Select
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select billing cycle" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="quarterly">Quarterly</SelectItem>
                            <SelectItem value="yearly">Yearly</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Start Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                className={cn(
                                  'pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground',
                                )}
                                variant="outline"
                              >
                                {field.value ? (
                                  format(field.value, 'PPP')
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent align="start" className="w-auto p-0">
                            <Calendar
                              autoFocus
                              className={cn('pointer-events-auto p-3')}
                              mode="single"
                              onSelect={field.onChange}
                              selected={field.value}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Await
                          fallback={<Skeleton className="h-9 w-full" />}
                          promise={categories}
                        >
                          {(data) => (
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {data.map((category) => (
                                  <SelectItem
                                    key={category.id}
                                    value={category.id.toString()}
                                  >
                                    {category.icon} {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        </Await>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            className="resize-none"
                            placeholder="Any additional notes about this subscription..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-2 max-sm:flex-col">
                    <Button asChild variant="outline">
                      <Link to="/app">Cancel</Link>
                    </Button>
                    <Button className="w-full" type="submit">
                      Add Subscription
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* <Card className="w-full max-w-md">
        <CardContent className="space-y-4">
          <div className="flex w-full items-center gap-2">
            <Input
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type, and press Enter"
              value={inputValue}
            />
            <Button type="submit" variant="outline">
              Add
            </Button>
          </div>
          <AnimatePresence>
            {savedValues.length > 0 && (
              <>
                <div className="mb-6 flex flex-wrap gap-2">
                  <AnimatePresence>
                    {savedValues.map((value) => (
                      <Badge
                        asChild
                        className="flex items-center gap-1 pr-1 transition-colors hover:bg-accent"
                        key={value}
                        variant="outline"
                      >
                        <motion.div
                          animate={{
                            scale: 1,
                            opacity: 1,
                            transition: {
                              type: 'spring',
                              stiffness: 300,
                              damping: 25,
                            },
                          }}
                          exit={{
                            scale: 0,
                            opacity: 0,
                            transition: {
                              type: 'spring',
                              stiffness: 400,
                              damping: 30,
                            },
                          }}
                          initial={{ scale: 0, opacity: 0 }}
                          layout
                        >
                          <span>{value}</span>
                          <button
                            aria-label={`Remove ${value}`}
                            className="ml-1 rounded-full p-0.5 transition-colors hover:bg-accent-foreground/25"
                            onClick={() => removeValue(value)}
                            type="button"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </motion.div>
                      </Badge>
                    ))}
                  </AnimatePresence>
                </div>
                <div className="flex justify-end gap-4">
                  <Button onClick={() => setShowDetails(true)} variant="ghost">
                    Add More Details
                  </Button>
                  <Button>Let's Go!</Button>
                </div>
                {showDetails && (
                  <Tabs className="mt-4" defaultValue={savedValues[0]}>
                    <TabsList
                      className="grid w-full grid-cols-1 overflow-x-auto"
                      style={{
                        gridTemplateColumns: `repeat(${savedValues.length}, 1fr)`,
                      }}
                    >
                      {savedValues.map((value) => (
                        <TabsTrigger key={value} value={value}>
                          {value}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    {savedValues.map((value) => (
                      <TabsContent key={value} value={value}>
                        <Card>
                          <CardHeader>
                            <CardTitle>
                              Subscription Details for {value}
                            </CardTitle>
                            <CardDescription>
                              Enter additional details for this subscription.
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="grid gap-2">
                              <Label htmlFor={`amount-${value}`}>Amount</Label>
                              <Input
                                id={`amount-${value}`}
                                placeholder="Enter amount (e.g., 9.99)"
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor={`currency-${value}`}>
                                Currency
                              </Label>
                              <Select defaultValue="USD">
                                <SelectTrigger id={`currency-${value}`}>
                                  <SelectValue placeholder="Select currency" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="USD">USD</SelectItem>
                                  <SelectItem value="EUR">EUR</SelectItem>
                                  <SelectItem value="GBP">GBP</SelectItem>
                                  <SelectItem value="JPY">JPY</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor={`billingCycle-${value}`}>
                                Billing Cycle
                              </Label>
                              <Select defaultValue="monthly">
                                <SelectTrigger id={`billingCycle-${value}`}>
                                  <SelectValue placeholder="Select billing cycle" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="weekly">Weekly</SelectItem>
                                  <SelectItem value="monthly">
                                    Monthly
                                  </SelectItem>
                                  <SelectItem value="quarterly">
                                    Quarterly
                                  </SelectItem>
                                  <SelectItem value="yearly">Yearly</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor={`startDate-${value}`}>
                                Start Date
                              </Label>
                              <Input id={`startDate-${value}`} type="date" />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor={`category-${value}`}>
                                Category
                              </Label>
                              <Select>
                                <SelectTrigger id={`category-${value}`}>
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1">
                                    Entertainment
                                  </SelectItem>
                                  <SelectItem value="2">
                                    Productivity
                                  </SelectItem>
                                  <SelectItem value="3">Utilities</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor={`notes-${value}`}>Notes</Label>
                              <Textarea
                                id={`notes-${value}`}
                                placeholder="Any additional notes"
                              />
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                defaultChecked
                                id={`isActive-${value}`}
                              />
                              <Label htmlFor={`isActive-${value}`}>
                                Active Subscription
                              </Label>
                            </div>
                            <div className="flex justify-end">
                              <Button
                                onClick={() => setShowDetails(false)}
                                variant="outline"
                              >
                                Cancel
                              </Button>
                              <Button className="ml-2">Save Details</Button>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    ))}
                  </Tabs>
                )}
              </>
            )}
          </AnimatePresence>
          {}
        </CardContent>
      </Card> */}
    </div>
  )
}
