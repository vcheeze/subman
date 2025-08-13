import { A } from '@mobily/ts-belt'
import { Await, createFileRoute, Link } from '@tanstack/react-router'
import { Ellipsis, Plus } from 'lucide-react'
import { motion } from 'motion/react'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { Skeleton } from '~/components/ui/skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/components/ui/tooltip'
import { fetchSubscriptions } from '~/queries/subscriptions'
import { cn } from '~/utils'

export const Route = createFileRoute('/_authed/app')({
  loader: ({ context }) => {
    return {
      user: context.user,
      subscriptions: fetchSubscriptions({ data: context.user?.id || '' }),
    }
  },
  component: App,
})

function App() {
  const { user, subscriptions } = Route.useLoaderData()

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="outline">
              <Ellipsis className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings">Settings</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
          const maxAmount = Math.max(
            ...data.map((s) => Number.parseFloat(s.amount)),
          )
          const totalRating = data.reduce((prev, curr) => prev + curr.rating, 0)
          const averageRating = totalRating / data.length
          const subsByRating = A.groupBy(data, (item) => item.rating)

          const averageCostPerPoint = totalAmount / totalRating
          const minCostPerPoint = Math.min(
            ...data
              .filter((sub) => Number.parseFloat(sub.amount) > 0)
              .map((sub) => Number.parseFloat(sub.amount) / sub.rating),
          )
          const averageCopWidth =
            (averageCostPerPoint /
              Math.max(averageCostPerPoint, minCostPerPoint)) *
            100
          const minCopWidth =
            (minCostPerPoint / Math.max(averageCostPerPoint, minCostPerPoint)) *
            100

          return (
            <div className="container mx-auto p-4 font-mono lg:p-8">
              <div className="mb-8 grid gap-2 lg:grid-cols-2">
                <Card className="rounded-sm border-muted shadow-none transition-shadow hover:shadow">
                  <CardHeader>
                    <CardTitle className="text-3xl lg:text-4xl">
                      ${totalAmount.toFixed(2)}
                    </CardTitle>
                    <CardDescription>per month</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="rounded-sm border-muted shadow-none transition-shadow hover:shadow">
                  <CardHeader>
                    <CardTitle className="text-3xl lg:text-4xl">
                      {data.length}
                    </CardTitle>
                    <CardDescription>subscriptions</CardDescription>
                  </CardHeader>
                </Card>
              </div>

              <div className="relative grid lg:grid-cols-2">
                <div className="-left-4 -right-4 -z-10 absolute top-0 bottom-0 border-muted border-t border-b" />
                <div className="-top-4 -bottom-4 -z-10 absolute right-0 left-0 border-muted border-r border-l" />
                <div className="border-muted border-b-1 p-6 transition-shadow hover:shadow lg:border-r-1">
                  <div className="mb-2 font-medium text-lg text-muted-foreground/50 uppercase transition-colors hover:text-muted-foreground">
                    / Average Value
                  </div>
                  <div className="flex gap-1">
                    {[...new Array(5)].map((_, index) => {
                      let fillPercent = 0

                      if (index + 1 <= averageRating) {
                        fillPercent =
                          index <= Math.floor(averageRating)
                            ? 100
                            : (averageRating - Math.floor(averageRating)) * 100
                      }

                      return (
                        <div
                          className={cn(
                            'h-3 flex-1 rounded',
                            fillPercent > 0
                              ? getRatingCountColor(index + 1)
                              : 'bg-muted',
                          )}
                          key={`average_value_${index}`}
                        />
                      )
                    })}
                    <div className="ml-2 text-muted-foreground text-xs">
                      {averageRating.toFixed(2)} points
                    </div>
                  </div>
                </div>
                <div className="p-6 transition-shadow hover:shadow">
                  <div className="mb-2 font-medium text-lg text-muted-foreground/50 uppercase transition-colors hover:text-muted-foreground">
                    / Cost per point
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="flex justify-end gap-2">
                      <div className="text-muted-foreground text-xs">
                        ${averageCostPerPoint.toFixed(2)}
                      </div>
                      <div
                        className="h-3 rounded bg-orange-8 "
                        style={{ width: `${averageCopWidth}%` }}
                      />
                    </div>
                    <div className="flex gap-2">
                      <div
                        className="h-3 rounded bg-orange-4"
                        style={{ width: `${minCopWidth}%` }}
                      />
                      <div className="text-muted-foreground text-xs">
                        ${minCostPerPoint.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="text-center text-muted-foreground text-xs">
                    Average vs. Lowest
                  </div>
                </div>
              </div>

              <div className="relative grid lg:grid-cols-2">
                <div className="-left-4 -right-4 -z-10 absolute top-0 bottom-0 border-muted border-b" />
                <div className="-top-4 -bottom-4 -z-10 absolute right-0 left-0 border-muted border-r border-l" />
                <div className="border-muted border-b p-6 transition-shadow hover:shadow lg:border-r">
                  <div className="mb-2 font-medium text-lg text-muted-foreground/50 uppercase transition-colors hover:text-muted-foreground">
                    / Subs by Rating
                  </div>
                  <div className="flex gap-2">
                    {[...new Array(5)].map((_, index) => (
                      <div
                        className="flex max-w-16 flex-auto flex-col items-center gap-1"
                        // biome-ignore lint/suspicious/noArrayIndexKey: no id for key, using index instead
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
                <div className="p-6 transition-shadow hover:shadow">
                  <div className="mb-2 font-medium text-lg text-muted-foreground/50 uppercase transition-colors hover:text-muted-foreground">
                    / Subs by Price
                  </div>
                  <table>
                    <tbody>
                      {data.map((sub) => {
                        const percentage =
                          (Number.parseFloat(sub.amount) / maxAmount) * 100

                        return (
                          <tr key={sub.id}>
                            <td
                              align="right"
                              className="whitespace-nowrap p-1 text-muted-foreground text-xs"
                            >
                              {sub.name}
                            </td>
                            <td className="w-full p-1">
                              <motion.div
                                animate={{ width: `${percentage}%` }}
                                className={'h-3 rounded bg-orange-8'}
                                initial={{ width: 0 }}
                                transition={{
                                  duration: 0.6,
                                  ease: 'easeOut',
                                  type: 'spring',
                                }}
                              />
                            </td>
                            <td
                              align="right"
                              className="whitespace-nowrap p-1 text-muted-foreground text-xs"
                            >
                              ${sub.amount}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="relative p-6">
                <div className="-left-4 -right-4 -z-10 absolute top-0 bottom-0 border-muted border-b-1" />
                <div className="-top-4 -bottom-4 -z-10 absolute right-0 left-0 border-muted border-r-1 border-l-1" />
                <div className="mb-2 font-medium text-lg text-muted-foreground/50 uppercase transition-colors hover:text-muted-foreground">
                  / Your Subs
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {data
                    .sort((a, b) => b.rating - a.rating)
                    .map((sub) => (
                      <Card
                        className="rounded-sm border-muted shadow-none transition-shadow hover:shadow"
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
                            {sub.rating} points
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            </div>
          )
        }}
      </Await>
    </>
  )
}
