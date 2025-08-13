import { createFileRoute } from '@tanstack/react-router'
import { StarRating } from '~/components/star-rating'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'

export const Route = createFileRoute('/_auth/demo')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardDescription>You seem satisfied ;)</CardDescription>
          <CardTitle>Your Average Rating</CardTitle>
        </CardHeader>
        <CardContent>
          <StarRating rating={4.7} />
        </CardContent>
      </Card>
    </div>
  )
}
