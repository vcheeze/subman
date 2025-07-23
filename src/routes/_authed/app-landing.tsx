import { createFileRoute } from '@tanstack/react-router'
import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Checkbox } from '~/components/ui/checkbox'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { Textarea } from '~/components/ui/textarea'

export const Route = createFileRoute('/_authed/app-landing')({
  component: RouteComponent,
})

const commonSubscriptions = [
  {
    name: 'Netflix',
    amount: '15.49',
    imgSrc: '/netflix.png',
  },
  {
    name: 'Spotify',
    amount: '10.99',
    imgSrc: '/spotify.png',
  },
  { name: 'Amazon Prime', amount: '14.98' },
  { name: 'Disney+', amount: '7.99' },
  { name: 'YouTube Premium', amount: '11.99' },
  { name: 'Adobe Creative Cloud', amount: '52.99' },
  { name: 'Microsoft 365', amount: '6.99' },
  { name: 'Dropbox', amount: '9.99' },
  { name: 'ChatGPT Plus', amount: '20.00' },
  { name: 'GitHub Pro', amount: '4.00' },
  { name: 'Figma', amount: '12.00' },
  { name: 'Apple iCloud', amount: '2.99' },
]

function RouteComponent() {
  const [inputValue, setInputValue] = useState('')
  const [savedValues, setSavedValues] = useState<string[]>([])
  const [expandedItem, setExpandedItem] = useState('')
  const [showDetails, setShowDetails] = useState(false)

  const addValue = () => {
    const trimmedValue = inputValue.trim()
    if (trimmedValue && !savedValues.includes(trimmedValue)) {
      setSavedValues([...savedValues, trimmedValue])
      setInputValue('')
    }
  }

  const removeValue = (valueToRemove: string) => {
    setSavedValues(savedValues.filter((value) => value !== valueToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addValue()
    }
  }

  return (
    <div className="container mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center p-6 lg:p-8">
      <h2 className="mb-4 font-serif text-2xl lg:text-3xl">
        Know the True Value of Your Subscriptions
      </h2>
      <h1 className="mb-8 font-semibold font-serif text-3xl lg:text-6xl">
        Subman (
        <span className="whitespace-nowrap">
          <span
            className="relative bg-bottom bg-contain bg-no-repeat pb-1 lg:pb-2"
            style={{
              backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="63.10148" height="10.7553" viewBox="0 0 63.10148 10.7553"><path d="M4.7254,6.24385c.74953-1.16342,2.22421-1.09201,3.45417-1.15422,2.14741-.10861,4.31001-.0021,6.44273,.26458,4.19719,.52484,8.31108,1.63863,12.40424,2.67172,7.63368,1.92671,15.46314,3.64085,23.33831,2.18418,4.45051-.82321,8.45652-2.80963,12.00813-5.57625,1.06608-.83045,.87173-2.66381,0-3.53553-1.05239-1.05239-2.46666-.83262-3.53553,0-13.63069,10.61797-31.22921,.23514-46.05376-.92905C8.42712-.17285,3.06299-.40077,.40804,3.72026c-1.74782,2.71298,2.57851,5.22265,4.31735,2.5236h0Z" fill="%2301010C"/></svg>')`,
              backgroundSize: '100% auto',
            }}
          >
            Sub
          </span>
          scription{' '}
        </span>
        <span className="whitespace-nowrap">
          <span
            className="relative bg-bottom bg-contain bg-no-repeat pb-1 lg:pb-2"
            style={{
              backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="63.10148" height="10.7553" viewBox="0 0 63.10148 10.7553"><path d="M4.7254,6.24385c.74953-1.16342,2.22421-1.09201,3.45417-1.15422,2.14741-.10861,4.31001-.0021,6.44273,.26458,4.19719,.52484,8.31108,1.63863,12.40424,2.67172,7.63368,1.92671,15.46314,3.64085,23.33831,2.18418,4.45051-.82321,8.45652-2.80963,12.00813-5.57625,1.06608-.83045,.87173-2.66381,0-3.53553-1.05239-1.05239-2.46666-.83262-3.53553,0-13.63069,10.61797-31.22921,.23514-46.05376-.92905C8.42712-.17285,3.06299-.40077,.40804,3.72026c-1.74782,2.71298,2.57851,5.22265,4.31735,2.5236h0Z" fill="%2301010C"/></svg>')`,
              backgroundSize: '100% auto',
            }}
          >
            Man
          </span>
        </span>
        ager) is here.
      </h1>
      <p className="mb-8 text-muted-foreground">
        Private, simple, complete control. Enter your subscriptions to start.
        Add more details later.
      </p>
      <Card className="w-full max-w-md">
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
      </Card>
    </div>
  )
}
