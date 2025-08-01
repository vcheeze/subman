import { createFileRoute } from '@tanstack/react-router'
import { Droplet, EyeClosed, Shield } from 'lucide-react'
import { motion } from 'motion/react'

import { Button } from '~/components/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { ScrollArea } from '~/components/ui/scroll-area'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const subs = [
    {
      name: 'Netflix',
      cost: '$15.99/month',
      logo: '/images/netflix.png',
    },
    {
      name: 'Spotify',
      cost: '$16.99/month',
      logo: '/images/spotify.png',
    },
    {
      name: 'ChatGPT',
      cost: '$20/month',
      logo: '/images/openai.png',
    },
    {
      name: 'Amazon Prime',
      cost: '$14.99/month',
      logo: '/images/prime.png',
    },
  ]

  return (
    <ScrollArea className="h-screen" type="scroll">
      <section className="px-2 pb-2 lg:px-4 lg:pb-4">
        <nav className="container mx-auto flex max-w-6xl items-center justify-center gap-2 py-4 lg:py-6">
          <img alt="logo" className="h-6" src="/logo_light.svg" />
          <div className="font-serif text-2xl">Subman</div>
        </nav>
        <motion.div
          animate={{ opacity: 1, transition: { type: 'spring' } }}
          className="flex h-[75vh] flex-col items-center justify-center rounded-md bg-muted p-4 text-center lg:p-8"
          initial={{ opacity: 0 }}
        >
          <h1 className="mb-8 font-semibold font-serif text-3xl lg:text-6xl">
            Know the True Value of Your Subscriptions
          </h1>
          <p className="mb-8 text-lg text-muted-foreground leading-8">
            You don't need another budgeting app. You need to know what's worth
            your budget.
          </p>
          <div className="flex w-full max-w-sm items-center gap-2">
            <Input placeholder="Email" type="email" />
            <Button>Get Early Access</Button>
          </div>
          <p className="mt-4 text-muted-foreground text-xs">
            👉 Join the waitlist — reflect before you renew.
          </p>
        </motion.div>
      </section>
      <section className="container mx-auto max-w-6xl p-10 lg:p-16">
        <h2 className="mb-16 font-semibold font-serif text-3xl lg:text-5xl">
          You're Probably Paying for Things You Don't Use — or Don't Even Want
        </h2>
        <div className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {subs.map((sub) => (
            <Card key={sub.name}>
              <CardHeader>
                <img alt={sub.name} className="h-8" src={sub.logo} />
                <CardTitle className="mt-2">{sub.name}</CardTitle>
                <CardDescription>{sub.cost}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        {/* <p className="leading-7">It all adds up.</p> */}
        {/* <p className="leading-7">But price isn't the problem. It's value.</p> */}
        <p className="leading-7">
          We've all said,{' '}
          <span className="italic">“Eh, it's just $15.99.”</span>
        </p>
        <p className="font-semibold leading-7">
          Until “just” becomes $159.99/month for things that don't bring us joy
          or utility.
        </p>
      </section>
      <section className="container mx-auto max-w-6xl p-10 lg:p-16">
        <h2 className="mb-16 font-semibold font-serif text-3xl lg:text-5xl">
          Subman Helps You Cut Through the Noise
        </h2>
        <p className="leading-7">It's not about spending less —</p>
        <p className="font-semibold leading-7">
          It's about spending with intention.
        </p>
      </section>
      <section className="container mx-auto max-w-6xl p-10 lg:p-16">
        <h2 className="mb-16 font-semibold font-serif text-3xl lg:text-5xl">
          Built for those who care where their money — and data — goes.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="rounded-none border border-dashed p-4 md:p-6">
            <Shield className="size-8" />
            <div className="mt-2">No bank connections</div>
          </div>
          <div className="rounded-none border border-dashed p-4 md:p-6">
            <EyeClosed className="size-8" />
            <div className="mt-2">No trackers</div>
          </div>
          <div className="rounded-none border border-dashed p-4 md:p-6">
            <Droplet className="size-8" />
            <div className="mt-2">Just you, your subs, and clarity</div>
          </div>
        </div>
      </section>
      <section className="container mx-auto max-w-6xl p-10 lg:p-16">
        <h2 className="mb-16 font-semibold font-serif text-3xl lg:text-5xl">
          Reflect Before You Renew.
        </h2>
        <p className="leading-7">Subman is launching soon.</p>
        <p className="leading-7">
          Join the waitlist to get early access — and your first monthly value
          report.
        </p>
        <Button>Get Early Access</Button>
        <p className="mt-4 text-muted-foreground text-xs">
          no spam, no noise — just value
        </p>
      </section>
      <footer className="p-10 text-center lg:p-16">
        <h3 className="font-serif text-xl lg:text-2xl">
          Not another expense tracker. Just a better relationship with what you
          pay for.
        </h3>
      </footer>
    </ScrollArea>
  )
}
