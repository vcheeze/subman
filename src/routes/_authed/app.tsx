import { A } from '@mobily/ts-belt'
import { Await, createFileRoute, Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

import { Button } from '~/components/ui/button'
import { Card, CardHeader, CardTitle } from '~/components/ui/card'
import { Skeleton } from '~/components/ui/skeleton'
import { fetchSubscriptions } from '~/queries/subscriptions'

export const Route = createFileRoute('/_authed/app')({
  loader: ({ context }) => {
    return {
      subscriptions: fetchSubscriptions({ data: context.user?.id || '' }),
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { subscriptions } = Route.useLoaderData()

  return (
    <>
      <header className="container mx-auto my-4 text-right lg:my-8">
        <Button asChild variant="outline">
          <Link className="flex gap-2" to="/subs/add">
            <Plus className="h-4 w-4" />
            Add Subscription
          </Link>
        </Button>
      </header>
      <div className="container mx-auto my-4 lg:my-8">
        <Await fallback={<Skeleton className="h-20" />} promise={subscriptions}>
          {(data) => (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>
                    {A.reduce(
                      data,
                      0,
                      (acc, sub) => acc + Number.parseInt(sub.amount, 10),
                    )}{' '}
                    AED
                  </CardTitle>
                </CardHeader>
              </Card>
              {data.map((sub) => (
                <div key={sub.id}>{sub.name}</div>
              ))}
            </>
          )}
        </Await>
      </div>
    </>
  )
}
