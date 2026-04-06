import { useTranslations } from "next-intl";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Thomas M.",
    location: "Munchen",
    car: "BMW 3er, 2019",
    rating: 5,
    text: "Super schnelle Abwicklung! Innerhalb von 2 Tagen war alles erledigt und das Geld auf meinem Konto. Sehr professionell.",
  },
  {
    name: "Sarah K.",
    location: "Berlin",
    car: "VW Golf, 2018",
    rating: 5,
    text: "Endlich ein ehrlicher Autoankauf. Das Angebot war fair und die Mitarbeiter sehr freundlich. Kann ich nur empfehlen!",
  },
  {
    name: "Michael W.",
    location: "Hamburg",
    car: "Audi A4, 2020",
    rating: 5,
    text: "Ich war skeptisch, aber wurde positiv uberrascht. Besseres Angebot als bei anderen Handlern. Top Service!",
  },
];

export function TestimonialsSection() {
  const t = useTranslations("testimonials");

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t("title")}</h2>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-muted-foreground">Basierend auf 500+ Bewertungen</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border relative">
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-slate-600 mb-4">&quot;{testimonial.text}&quot;</p>
              
              <div className="border-t pt-4">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.location} - {testimonial.car}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
