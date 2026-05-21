import { IconBrightness } from '@tabler/icons-react'
import { useTheme } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
	const { theme, setTheme } = useTheme()

	return (
		<Button
			onClick={() => setTheme(theme !== 'dark' ? 'dark' : 'light')}
			size='icon'
			variant='ghost'
		>
			<IconBrightness className='size-4 dark:rotate-180 transition-transform ease-in-out duration-200' />
			<span className='sr-only'>Toggle theme</span>
		</Button>
	)
}
