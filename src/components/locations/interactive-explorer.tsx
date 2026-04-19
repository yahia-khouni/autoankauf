"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, MapPin, ChevronRight, ArrowLeft, ArrowRight, X } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

interface CityItem {
  slug: string;
  name: string;
}

interface StateIndex {
  slug: string;
  name: string;
  stateCode: string;
  cityCount: number;
  topCities: CityItem[];
  cities: CityItem[];
  isLarge?: boolean;
}

interface InteractiveLocationsExplorerProps {
  states: StateIndex[];
  translations: {
    allStates: string;
    selectStateTitle: string;
    selectStateDesc: string;
    searchPlaceholder: string;
    noResults: string;
  };
}

export function InteractiveLocationsExplorer({ states, translations }: InteractiveLocationsExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStateSlug, setSelectedStateSlug] = useState<string | null>(null);

  const query = searchQuery.toLowerCase();

  const filteredStates = states
    .map((state) => {
      const filteredCities = state.cities.filter((city) =>
        city.name.toLowerCase().includes(query)
      );
      return { ...state, filteredCities };
    })
    .filter((state) => state.name.toLowerCase().includes(query) || state.filteredCities.length > 0);

  const selectedState = states.find((s) => s.slug === selectedStateSlug);

  return (
    <section id="locations-explorer" className="relative py-16 lg:py-24 bg-gradient-to-b from-white via-slate-50/80 to-slate-100 overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />
      <div className="absolute top-1/4 -right-20 w-[30rem] sm:w-[40rem] h-[30rem] sm:h-[40rem] bg-gold-400/20 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-[25rem] sm:w-[35rem] h-[25rem] sm:h-[35rem] bg-gold-400/15 rounded-full blur-[80px] pointer-events-none" />

      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-8 mb-12">
          <div className="text-center lg:text-left max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white border border-gold-200/50 shadow-sm text-gold-600 rounded-full px-5 py-2 text-sm font-bold mb-6 transition-all hover:bg-gold-50">
              <MapPin className="h-4 w-4" />
              {translations.allStates}
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-navy-900 mb-5 tracking-tight">
              {translations.selectStateTitle}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
              {translations.selectStateDesc}
            </p>
          </div>

          <div className="relative w-full lg:w-96 flex-shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder={translations.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 text-navy-900 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 shadow-sm transition-all font-medium placeholder:text-slate-400 text-base"
            />
          </div>
        </div>

        <div className={`flex flex-col lg:flex-row gap-8 transition-all duration-700 ease-in-out`}>
          
          {/* LEFT: Cities Display (now on the Left) */}
          {selectedState && (
            <div className="order-first lg:w-1/3 bg-navy-900 border border-navy-800 shadow-[0_8px_30px_rgba(0,0,0,0.15)] rounded-3xl overflow-hidden animate-in fade-in slide-in-from-left-8 duration-700 h-[600px] flex flex-col relative shrink-0">
              {/* Close Button Top Right */}
              <button
                onClick={() => setSelectedStateSlug(null)}
                className="absolute top-4 right-4 p-2 flex items-center justify-center bg-navy-800/50 hover:bg-navy-700/80 text-slate-400 hover:text-white rounded-full transition-colors z-20"
                aria-label="Schließen"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="p-6 lg:p-8 flex flex-col gap-4 border-b border-navy-800 shrink-0">
                <div className="pr-10">
                  <button
                    onClick={() => setSelectedStateSlug(null)}
                    className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors mb-2 lg:hidden"
                  >
                    <ArrowLeft className="h-4 w-4" /> ZURÜCK
                  </button>
                  <h3 className="text-2xl font-bold text-white leading-tight">
                    Städte in <br /><span className="text-gold-400">{selectedState.name}</span>
                  </h3>
                  <p className="text-slate-400 font-medium mt-2">
                    {query.length > 0 ? "Suchergebnisse" : "Verfügbare Standorte"}
                  </p>
                </div>
                
                <Link
                  href={`/standorte/${selectedState.slug}`}
                  className="inline-flex w-fit mt-2 items-center justify-center gap-2 bg-gold-500 text-navy-950 hover:bg-gold-400 font-bold py-2.5 px-6 rounded-xl transition-all duration-300 shadow-sm"
                >
                  Zur Seite
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="flex-1 overflow-y-auto dark-scrollbar pl-6 lg:pl-8 py-6 lg:py-8 pr-2 lg:pr-4">
                {(() => {
                  const stateFromFiltered = filteredStates.find(s => s.slug === selectedState.slug);
                  const citiesToShow = query.length > 0 && stateFromFiltered ? stateFromFiltered.filteredCities : selectedState.cities;

                  if (citiesToShow.length === 0) {
                    return (
                       <div className="text-center py-10">
                          <p className="text-slate-400 font-medium">{translations.noResults}</p>
                       </div>
                    );
                  }

                  // Changed from grid to a single column list
                  return (
                    <div className="flex flex-col gap-2">
                      {citiesToShow.map((city) => (
                        <div key={city.slug}>
                          <Link
                            href={`/standorte/${selectedState.slug}/${city.slug}`}
                            className="group flex flex-row items-center justify-between bg-navy-800/40 hover:bg-navy-800 border border-navy-700/50 hover:border-gold-500/50 rounded-xl px-5 py-3.5 transition-all duration-300"
                          >
                            <span className="font-medium text-slate-200 group-hover:text-white transition-colors">
                              {city.name}
                            </span>
                            <ArrowRight className="h-4 w-4 text-gold-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                          </Link>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* RIGHT/FULL: States Column or Full Grid */}
          <div
            className={`transition-all duration-700 ease-in-out pb-8 ${
              selectedState ? "lg:w-2/3 h-[600px] overflow-y-auto custom-scrollbar pr-2 lg:pr-4" : "w-full h-[600px] overflow-y-auto custom-scrollbar pr-2 lg:pr-4"
            }`}
          >
            {filteredStates.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <MapPin className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-navy-900 mb-2">
                  {translations.noResults}
                </h3>
              </div>
            ) : (
              <div
                className={`grid gap-3 sm:gap-4 transition-all duration-500 ${
                  selectedState
                    ? "sm:grid-cols-2 lg:grid-cols-3 select-none"
                    : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                }`}
              >
                {filteredStates.map((state) => {
                  const isSelected = selectedStateSlug === state.slug;
                  const isActiveView = selectedStateSlug != null;

                  return (
                    <button
                      key={state.slug}
                      onClick={(e) => {
                        e.preventDefault();
                        if (isSelected) {
                          setSelectedStateSlug(null);
                        } else {
                          setSelectedStateSlug(state.slug);
                        }
                      }}
                      className={`group relative overflow-hidden rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between transition-all duration-300 text-left w-full border
                        ${
                          isSelected
                            ? "bg-navy-900 border-navy-800 shadow-[0_8px_30px_rgba(0,0,0,0.15)] ring-1 ring-gold-400/20 translate-x-0"
                            : "bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-sm hover:shadow-lg hover:-translate-y-0.5 hover:border-gold-300/50 hover:bg-white"
                        }
                        ${!isActiveView && state.isLarge ? "sm:col-span-2 lg:col-span-2" : ""}
                      `}
                    >
                      <div className="relative z-10 flex items-center justify-between w-full">
                        <div className="flex items-center gap-3 w-full">
                          {/* Icon */}
                          <div className={`w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                            isSelected 
                              ? "bg-navy-800 border-navy-700 text-gold-400 shadow-inner"
                              : "bg-slate-50/80 border-slate-100 text-slate-500 group-hover:bg-gold-50/50 group-hover:border-gold-200/50 group-hover:text-gold-600"
                          }`}>
                            <span className="text-sm sm:text-base font-bold tracking-tight">
                              {state.stateCode}
                            </span>
                          </div>

                          {/* Text Content */}
                          <div className="flex-1 min-w-0">
                            <h3 className={`font-semibold text-base sm:text-lg truncate transition-colors ${
                              isSelected ? "text-white" : "text-navy-900 group-hover:text-gold-700"
                            }`}>
                              {state.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className={`text-xs font-medium transition-colors ${
                                isSelected ? "text-slate-400" : "text-slate-500 group-hover:text-slate-600"
                              }`}>
                                {state.cityCount} {state.cityCount === 1 ? "Stadt" : "Städte"}
                              </span>
                              
                              {/* Cities Micro-Chips (Only visible on large spanned cards) */}
                              {!isActiveView && state.isLarge && state.topCities.length > 0 && (
                                <div className="hidden sm:flex items-center gap-1.5 ml-2 overflow-hidden">
                                  <div className={`w-1 h-1 rounded-full ${isSelected ? "bg-navy-600" : "bg-slate-300"}`}></div>
                                  {state.topCities.slice(0, 3).map(c => (
                                    <span key={c.slug} className={`text-[10px] px-1.5 py-0.5 rounded-md border whitespace-nowrap ${
                                      isSelected 
                                        ? "border-navy-700 bg-navy-800 text-slate-300" 
                                        : "border-slate-200 bg-slate-50 text-slate-500 group-hover:border-gold-200 group-hover:bg-gold-50/50 group-hover:text-gold-600"
                                    }`}>
                                      {c.name}
                                    </span>
                                  ))}
                                  {state.topCities.length > 3 && (
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md border ${
                                      isSelected ? "border-navy-700 bg-navy-800 text-slate-400" : "border-transparent text-slate-400 group-hover:text-gold-500"
                                    }`}>
                                      +{state.topCities.length - 3}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Arrow */}
                        {!isSelected && (
                          <div className="ml-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 bg-slate-50 text-slate-400 group-hover:bg-gold-50 group-hover:text-gold-500">
                            <ChevronRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                          </div>
                        )}
                      </div>

                      {/* Subtle hover gleam */}
                      {!isSelected && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-50/10 to-gold-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
