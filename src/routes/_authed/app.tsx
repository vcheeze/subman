import { A } from '@mobily/ts-belt'
import { Await, createFileRoute, Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Skeleton } from '~/components/ui/skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/components/ui/tooltip'
import { Subscription } from '~/db/schema'
import { fetchSubscriptions } from '~/queries/subscriptions'
import { cn, getInitials } from '~/utils'

export const Route = createFileRoute('/_authed/app')({
  loader: ({ context }) => {
    return {
      user: context.user,
      subscriptions: fetchSubscriptions({ data: context.user?.id || '' }),
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { user, subscriptions } = Route.useLoaderData()
  // const { user } = Route.useLoaderData()
  const bars = [6, 6, 5, 5, 4, 4, 3, 0]
  const maxBars = Math.max(...bars)

  function getBarColor(value: number, height: number) {
    if (height === 0) {
      return 'bg-muted'
    }
    // Even color progression from intense to neutral
    const barColors = [
      'bg-orange-8',
      'bg-orange-7',
      'bg-orange-6',
      'bg-orange-5',
      'bg-orange-4',
      'bg-orange-3',
    ]
    return value < height ? barColors[value] : 'bg-muted'
  }

  // mock data
  // const subscriptions = [
  //   {
  //     id: 'netflix',
  //     name: 'Netflix',
  //     amount: 15.99,
  //     rating: 4,
  //   },
  //   {
  //     id: 'spotify',
  //     name: 'Spotify',
  //     amount: 16.99,
  //     rating: 4,
  //   },
  //   {
  //     id: 'chatgpt',
  //     name: 'ChatGPT',
  //     amount: 20,
  //     rating: 5,
  //   },
  //   {
  //     id: 'amazon_prime',
  //     name: 'Amazon Prime',
  //     amount: 14.99,
  //     rating: 4,
  //   },
  //   {
  //     id: 'hulu',
  //     name: 'Hulu',
  //     amount: 12.99,
  //     rating: 3,
  //   },
  //   {
  //     id: 'disneyplus',
  //     name: 'Disney+',
  //     amount: 10.99,
  //     rating: 2,
  //   },
  //   {
  //     id: 'apple_tvplus',
  //     name: 'Apple TV+',
  //     amount: 6.99,
  //     rating: 1,
  //   },
  //   {
  //     id: 'youtube_premium',
  //     name: 'YouTube Premium',
  //     amount: 11.99,
  //     rating: 3,
  //   },
  // ]

  function getRatingCountColor(rating: number) {
    switch (rating) {
      case 5:
        return 'bg-orange-8'
      case 4:
        return 'bg-orange-7'
      case 3:
        return 'bg-orange-6'
      case 2:
        return 'bg-orange-5'
      default:
        return 'bg-orange-4'
    }
  }

  return (
    <>
      <header className="container mx-auto flex items-center justify-end gap-2 p-4 lg:p-8">
        <Button asChild variant="outline">
          <Link className="flex gap-2" to="/subs/add">
            <Plus className="h-4 w-4" />
            Add Subscription
          </Link>
        </Button>
        <Avatar>
          <AvatarImage src={user?.image ?? ''} />
          <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
        </Avatar>
      </header>
      <Await
        fallback={
          <Skeleton className="container mx-auto h-64 bg-muted p-4 lg:p-8" />
        }
        promise={subscriptions}
      >
        {(data) => {
          if (data.length === 0) {
            return (
              <div className="container mx-auto p-4 font-mono lg:p-8">
                You've got no subs!
              </div>
            )
          }

          const totalAmount = data.reduce(
            (prev, curr) => prev + Number.parseFloat(curr.amount),
            0,
          )
          const totalRating = data.reduce((prev, curr) => prev + curr.rating, 0)
          const subsByRating = A.groupBy(data, (item) => item.rating)

          return (
            <div className="container mx-auto p-4 font-mono lg:p-8">
              <div className="mb-8 font-medium text-3xl lg:text-4xl">
                ${totalAmount.toFixed(2)} per month{' '}
                <span className="text-base">from</span> {data.length}{' '}
                {data.length > 1 ? 'subscriptions' : 'subscription'}
              </div>
              <div className="relative p-6">
                <div className="-left-4 -right-4 -z-10 absolute top-0 bottom-0 border-muted border-t-1 border-b-1" />
                <div className="-top-4 -bottom-4 -z-10 absolute right-0 left-0 border-muted border-r-1 border-l-1" />
                <div className="mb-2 font-medium uppercase">Your Subs</div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {data
                    .sort((a, b) => b.rating - a.rating)
                    .map((sub) => (
                      <Card
                        className="border-muted shadow-none transition-shadow hover:shadow"
                        key={sub.id}
                      >
                        <CardHeader>
                          <CardTitle className="font-medium">
                            {sub.name}
                          </CardTitle>
                          <CardDescription>
                            ${sub.amount} per month
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex gap-1">
                            {[...new Array(5)].map((_, index) => (
                              <div
                                className={cn(
                                  'h-3 flex-auto rounded',
                                  index + 1 > sub.rating
                                    ? 'bg-muted'
                                    : getRatingCountColor(index + 1),
                                )}
                                key={`${sub.name}_rating_${index}`}
                              />
                            ))}
                          </div>
                          <p className="mt-2 text-right text-muted-foreground text-xs">
                            {sub.rating} stars
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
              <div className="relative mb-8 p-6">
                <div className="-left-4 -right-4 -z-10 absolute top-0 bottom-0 border-muted border-b-1" />
                <div className="-top-4 -bottom-4 -z-10 absolute right-0 left-0 border-muted border-r-1 border-l-1" />
                <div className="mb-2 font-medium uppercase">Subs by Rating</div>
                <div className="flex gap-2">
                  {[...new Array(5)].map((_, index) => (
                    <div
                      className="flex max-w-16 flex-auto flex-col items-center gap-1"
                      // biome-ignore lint/suspicious/noArrayIndexKey: need id for key, using index instead
                      key={`rating_${index}_count`}
                    >
                      <div className="text-muted-foreground text-xs">
                        {index + 1}
                      </div>
                      {/* {[...new Array(subsByRating[index + 1]?.length ?? 0)].map( */}
                      {subsByRating[index + 1]?.map((sub) => (
                        <Tooltip key={sub.id}>
                          <TooltipTrigger asChild>
                            <div
                              className={`h-3 w-full rounded ${getRatingCountColor(index + 1)}`}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="mb-2 border-b-1 pb-1 text-foreground">
                              {sub.name}
                            </p>
                            <p>${sub.amount}</p>
                            <p>{sub.rating} stars</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div>${(totalAmount / totalRating).toFixed(2)} per star</div>
              <div>
                Average rating: {(totalRating / data.length).toFixed(2)}
              </div>

              {/* <Card className="w-full max-w-sm">
          <CardHeader className="min-h-auto border-0 pt-5 pb-0">
            <CardTitle className="flex flex-col items-start gap-0.5">
              <div className="font-semibold text-foreground text-lg leading-none">
                Feature Adoption
              </div>
              <div className="font-medium text-muted-foreground text-sm">
                Best adoption report
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="font-bold text-5xl text-foreground">84%</div>
            <div className="relative mt-2 flex h-32 w-full items-end gap-2">
              {bars.map((height, i) => (
                <div
                  className="flex min-w-0 flex-1 cursor-pointer flex-col justify-end transition-all"
                  key={i}
                >
                  {[...new Array(maxBars)].map((_, j) => (
                    <div
                      className={`my-0.5 h-3 rounded ${getBarColor(j, height)}`}
                      key={j}
                    />
                  ))}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <h1 className="mb-8 flex gap-2 font-semibold text-3xl lg:text-6xl">
          $149.95 / month <Separator className="mx-4" orientation="vertical" />5
          Subscriptions
        </h1> */}
            </div>
          )
        }}
      </Await>
    </>
  )
}
