type Props = {
  title: string
  subtitle?: string
  children?: React.ReactNode
  center?: boolean
}

/**
 * Paternoster Kalkmuur page header — lime-washed wall with the cobalt
 * skirting band along the bottom.
 */
export default function PageHero({ title, subtitle, children, center = false }: Props) {
  return (
    <section className="relative kalkmuur kalkmuur-grain overflow-hidden">
      <div
        className={`relative max-w-6xl mx-auto px-4 pt-14 pb-20 sm:pt-16 sm:pb-24 ${
          center ? 'text-center' : ''
        }`}
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy mb-3 tracking-tight">{title}</h1>
        {subtitle && (
          <p className={`text-base sm:text-lg text-navy/65 leading-relaxed ${center ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
            {subtitle}
          </p>
        )}
        {children}
      </div>
      <div className="relative skirting h-6 sm:h-8" />
    </section>
  )
}
