import { Link } from '@tanstack/react-router'
import { Menu, Shield, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const links = [
    {
      label: 'Features',
      props: {
        to: '/',
        hash: 'features',
      },
    },
    {
      label: 'Privacy',
      props: {
        to: '/',
        hash: 'privacy',
      },
    },
    {
      label: 'How It Works',
      props: {
        to: '/',
        hash: 'how-it-works',
      },
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-border/40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-5 w-5 text-background" />
          </div>
          <span className="font-semibold font-serif text-2xl text-foreground tracking-tight">
            Subman
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-8 md:flex">
          {links.map((link) => (
            <Button
              asChild
              className="text-muted-foreground transition-colors hover:text-foreground"
              key={link.label}
              size="sm"
              variant="link"
            >
              <Link {...link.props}>{link.label}</Link>
            </Button>
          ))}
        </nav>
        <div className="hidden items-center space-x-4 md:flex">
          <Button size="sm" variant="ghost">
            Sign In
          </Button>
          <Button size="sm">Sign Up</Button>
        </div>

        {/* Mobile menu button */}
        <Button
          aria-label="Toggle menu"
          className="p-2 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          size="icon"
          variant="ghost"
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-border border-t bg-background/95 backdrop-blur md:hidden">
          <nav className="container space-y-2 px-4 py-4">
            <a
              className="block py-2 font-medium text-muted-foreground text-sm transition-colors hover:text-foreground"
              href="#features"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              className="block py-2 font-medium text-muted-foreground text-sm transition-colors hover:text-foreground"
              href="#privacy"
              onClick={() => setIsMenuOpen(false)}
            >
              Privacy
            </a>
            <a
              className="block py-2 font-medium text-muted-foreground text-sm transition-colors hover:text-foreground"
              href="#how-it-works"
              onClick={() => setIsMenuOpen(false)}
            >
              How it Works
            </a>
            <div className="space-y-2 pt-4">
              <Button
                className="w-full justify-start"
                size="sm"
                variant="ghost"
              >
                Sign In
              </Button>
              <Button className="w-full" size="sm">
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
