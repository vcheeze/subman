import { Star } from 'lucide-react'

export const StarRating = ({ rating = 0 }) => {
  // Clamp rating between 0 and 5
  const clampedRating = Math.max(0, Math.min(5, rating))

  const stars: React.ReactElement[] = []

  for (let i = 1; i <= 5; i++) {
    const fillPercentage = Math.max(0, Math.min(1, clampedRating - (i - 1)))

    if (fillPercentage === 0) {
      // Empty star
      stars.push(
        <Star className="h-6 w-6 text-background" fill="none" key={i} />,
      )
    } else if (fillPercentage === 1) {
      // Fully filled star
      stars.push(
        <Star className="h-6 w-6 text-[#FFE629]" fill="currentColor" key={i} />,
      )
    } else {
      // Partially filled star using CSS mask
      stars.push(
        <div className="relative h-6 w-6" key={i}>
          {/* Background empty star */}
          <Star className="absolute h-6 w-6 text-gray-300" fill="none" />
          {/* Foreground filled portion */}
          <div
            className="absolute overflow-hidden"
            style={{ width: `${fillPercentage * 100}%` }}
          >
            <Star className="h-6 w-6 text-[#FFE629]" fill="currentColor" />
          </div>
        </div>,
      )
    }
  }

  return (
    <div className="flex items-center space-x-1">
      {stars}
      <span className="ml-2 text-sm">{clampedRating.toFixed(1)}</span>
    </div>
  )
}
