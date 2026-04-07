import { useTranslations } from "next-intl";
import { Star, Quote, CheckCircle } from "lucide-react";

const testimonials = [
  {
    name: "Thomas M.",
    location: "München",
    car: "BMW 3er, 2019",
    rating: 5,
    text: "Super schnelle Abwicklung! Innerhalb von 2 Tagen war alles erledigt und das Geld auf meinem Konto. Sehr professionell.",
    verified: true,
  },
  {
    name: "Sarah K.",
    location: "Berlin",
    car: "VW Golf, 2018",
    rating: 5,
    text: "Endlich ein ehrlicher Autoankauf. Das Angebot war fair und die Mitarbeiter sehr freundlich. Kann ich nur empfehlen!",
    verified: true,
  },
  {
    name: "Michael W.",
    location: "Hamburg",
    car: "Audi A4, 2020",
    rating: 5,
    text: "Ich war skeptisch, aber wurde positiv überrascht. Besseres Angebot als bei anderen Händlern. Top Service!",
    verified: true,
  },
];

export function TestimonialsSection() {
  const t = useTranslations("testimonials");

  return (
    <section className="py-12 sm:py-20 lg:py-32 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Decorative Elements - Hidden on Mobile */}
      <div className="hidden sm:block absolute top-0 left-1/4 w-72 h-72 bg-gold-400/10 rounded-full blur-3xl" />
      <div className="hidden sm:block absolute bottom-0 right-1/4 w-96 h-96 bg-navy-900/5 rounded-full blur-3xl" />
      
      <div className="container relative px-4 sm:px-6">
        {/* Header - Mobile Optimized */}
        <div className="text-center mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-gold-100 border border-gold-200 px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6">
            <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gold-600 fill-gold-500" />
            <span className="text-xs sm:text-sm font-medium text-gold-700">Kundenbewertungen</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 sm:mb-6 text-navy-900">{t("title")}</h2>
          
          {/* Rating Summary - Compact on Mobile */}
          <div className="inline-flex items-center gap-3 sm:gap-4 bg-white rounded-xl sm:rounded-2xl px-4 sm:px-8 py-3 sm:py-4 shadow-lg border border-slate-100">
            <div className="text-2xl sm:text-4xl font-bold text-navy-900">4.9</div>
            <div className="text-left">
              <div className="flex gap-0.5 sm:gap-1 mb-0.5 sm:mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 sm:h-5 sm:w-5 fill-gold-400 text-gold-400" />
                ))}
              </div>
              <p className="text-[10px] sm:text-sm text-slate-500">500+ Bewertungen</p>
            </div>
          </div>
        </div>

        {/* Testimonials - Horizontal Scroll on Mobile */}
        <div className="sm:grid sm:grid-cols-3 sm:gap-8">
          {/* Mobile: Horizontal Scrollable */}
          <div className="flex sm:hidden gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="relative flex-shrink-0 w-[85vw] max-w-[320px] snap-center"
              >
                <TestimonialCard testimonial={testimonial} compact />
              </div>
            ))}
          </div>
          
          {/* Desktop: Grid */}
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="hidden sm:block group relative"
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
        
        {/* Mobile Scroll Indicator */}
        <div className="flex sm:hidden justify-center gap-2 mt-4">
          {testimonials.map((_, index) => (
            <div key={index} className="w-2 h-2 rounded-full bg-slate-300" />
          ))}
        </div>
        
        {/* Trust Indicator */}
        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-xs sm:text-sm text-slate-500 flex items-center justify-center gap-1.5 sm:gap-2">
            <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500" />
            Alle Bewertungen von verifizierten Kunden
          </p>
        </div>
      </div>
    </section>
  );
}

// Extracted card component for reuse
function TestimonialCard({ testimonial, compact = false }: { testimonial: typeof testimonials[0], compact?: boolean }) {
  return (
    <div className={`relative bg-white rounded-2xl sm:rounded-3xl ${compact ? 'p-5' : 'p-8'} shadow-lg border border-slate-100 hover:shadow-premium hover:border-gold-200 transition-all duration-500 h-full`}>
      {/* Quote Icon */}
      <div className={`absolute ${compact ? '-top-3 right-5' : '-top-4 right-8'}`}>
        <div className={`${compact ? 'w-8 h-8' : 'w-10 h-10'} bg-gradient-gold rounded-lg sm:rounded-xl flex items-center justify-center shadow-gold`}>
          <Quote className={`${compact ? 'h-4 w-4' : 'h-5 w-5'} text-navy-900`} />
        </div>
      </div>
      
      {/* Stars */}
      <div className={`flex gap-0.5 sm:gap-1 ${compact ? 'mb-4' : 'mb-6'}`}>
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className={`${compact ? 'h-4 w-4' : 'h-5 w-5'} fill-gold-400 text-gold-400`} />
        ))}
      </div>
      
      {/* Quote Text */}
      <p className={`text-slate-600 ${compact ? 'mb-4 text-sm leading-relaxed' : 'mb-6 leading-relaxed text-lg'} italic`}>
        &quot;{testimonial.text}&quot;
      </p>
      
      {/* Author */}
      <div className={`flex items-center gap-3 sm:gap-4 ${compact ? 'pt-4' : 'pt-6'} border-t border-slate-100`}>
        {/* Avatar */}
        <div className={`${compact ? 'w-10 h-10 text-base' : 'w-14 h-14 text-xl'} rounded-full bg-gradient-to-br from-navy-100 to-navy-200 flex items-center justify-center font-bold text-navy-600`}>
          {testimonial.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <p className={`font-bold text-navy-900 ${compact ? 'text-sm' : ''}`}>{testimonial.name}</p>
            {testimonial.verified && (
              <CheckCircle className={`${compact ? 'h-3.5 w-3.5' : 'h-4 w-4'} text-green-500 fill-green-100`} />
            )}
          </div>
          <p className={`${compact ? 'text-xs' : 'text-sm'} text-slate-500 truncate`}>
            {testimonial.location} • {testimonial.car}
          </p>
        </div>
      </div>
    </div>
  );
}
