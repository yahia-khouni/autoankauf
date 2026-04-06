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
    <section className="py-20 lg:py-32 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-gold-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-navy-900/5 rounded-full blur-3xl" />
      
      <div className="container relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-gold-100 border border-gold-200 px-4 py-2 mb-6">
            <Star className="h-4 w-4 text-gold-600 fill-gold-500" />
            <span className="text-sm font-medium text-gold-700">Kundenbewertungen</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-navy-900">{t("title")}</h2>
          
          {/* Rating Summary */}
          <div className="inline-flex items-center gap-4 bg-white rounded-2xl px-8 py-4 shadow-lg border border-slate-100">
            <div className="text-4xl font-bold text-navy-900">4.9</div>
            <div className="text-left">
              <div className="flex gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-gold-400 text-gold-400" />
                ))}
              </div>
              <p className="text-sm text-slate-500">Basierend auf 500+ Bewertungen</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:shadow-premium hover:border-gold-200 transition-all duration-500 h-full">
                {/* Quote Icon */}
                <div className="absolute -top-4 right-8">
                  <div className="w-10 h-10 bg-gradient-gold rounded-xl flex items-center justify-center shadow-gold">
                    <Quote className="h-5 w-5 text-navy-900" />
                  </div>
                </div>
                
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                
                {/* Quote Text */}
                <p className="text-slate-600 mb-6 leading-relaxed text-lg italic">
                  &quot;{testimonial.text}&quot;
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-navy-100 to-navy-200 flex items-center justify-center text-xl font-bold text-navy-600">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-navy-900">{testimonial.name}</p>
                      {testimonial.verified && (
                        <CheckCircle className="h-4 w-4 text-green-500 fill-green-100" />
                      )}
                    </div>
                    <p className="text-sm text-slate-500">
                      {testimonial.location} • {testimonial.car}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Trust Indicator */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500 flex items-center justify-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            Alle Bewertungen von verifizierten Kunden
          </p>
        </div>
      </div>
    </section>
  );
}
