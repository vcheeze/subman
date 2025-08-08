import { createFileRoute } from '@tanstack/react-router'

import { ModeToggle } from '~/components/mode-toggle'
import { Label } from '~/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { Separator } from '~/components/ui/separator'

export const Route = createFileRoute('/_authed/settings')({
  component: Settings,
})

function Settings() {
  return (
    <div className="container mx-auto p-4 lg:p-8">
      <h1 className="font-medium text-3xl lg:text-4xl">Settings</h1>
      <Separator className="my-4 lg:my-8" />
      <div className="space-y-4">
        <div>
          <Label className="mb-2">Theme</Label>
          <ModeToggle />
        </div>
        <div>
          <Label className="mb-2">Currency</Label>
          <Select>
            <SelectTrigger className="w-60">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AED">AED</SelectItem>
              <SelectItem value="AUD">AUD</SelectItem>
              <SelectItem value="CAD">CAD</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
              <SelectItem value="JPY">JPY</SelectItem>
              <SelectItem value="TWD">TWD</SelectItem>
              <SelectItem value="USD">USD</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
