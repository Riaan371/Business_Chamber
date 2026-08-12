import KalkmuurBg from './KalkmuurBg'

type Props = {
  title: string
  subtitle?: string
  children?: React.ReactNode
  center?: boolean
  seed?: number
}

/**
 * Paternoster Kalkmuur page header — lime-washed wall with the
 * Langebaan lagoon shallows along the bottom.
 */
export default function PageHero({ title, subtitle, children, center = false, seed = 1001 }: Props) {
  return (
    <section className="relative overflow-hidden min-h-[280px] sm:min-h-[340px] flex flex-col">
      <KalkmuurBg water={0.3} seed={seed} />
      <div
        className={`relative flex-1 max-w-6xl w-full mx-auto px-4 pt-14 pb-24 sm:pt-16 sm:pb-32 ${
          center ? 'text-center' : ''
        }`}
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy mb-3 tracking-tight">{title}</h1>
        {subtitle && (
          <p
            className={`text-base sm:text-lg text-navy/65 leading-relaxed ${
              center ? 'max-w-2xl mx-auto' : 'max-w-2xl'
            }`}
          >
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  )
}
