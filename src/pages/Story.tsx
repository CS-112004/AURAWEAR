import { motion } from 'framer-motion';

export default function Story() {
  return (
    <div className="pt-24 md:pt-32 pb-20">
      {/* Narrative Section */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-20 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400 mb-8 block font-mono">Est. 2026</span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-12 uppercase">
            Sophistication <br/> through <span className="italic font-light">restraint.</span>
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-500 leading-relaxed max-w-2xl mx-auto italic">
            "AURAWEAR was born from a singular vision: to create apparel that doesn't just clothe the body, but amplifies the innate presence of the individual."
          </p>
        </motion.div>
      </section>

      {/* Visual Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-8 max-w-7xl mx-auto mb-32">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="aspect-[4/5] bg-gray-100 overflow-hidden"
        >
          <img 
            src="https://picsum.photos/seed/story-1/1000/1250?grayscale" 
            alt="Craftsmanship" 
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center p-8 md:p-16 bg-zinc-900 text-white"
        >
          <h2 className="text-3xl font-bold uppercase tracking-widest mb-8">The Philosophy</h2>
          <p className="text-gray-400 font-light leading-relaxed mb-6">
            We believe that true luxury lies in simplicity. Our design process begins by stripping away the unnecessary, leaving only what is essential and meaningful. Each piece is an exploration of form, texture, and silence.
          </p>
          <div className="w-12 h-[1px] bg-white opacity-40 mb-12" />
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-bold mb-2">Sustainably Sourced</h4>
              <p className="text-[10px] text-gray-500 font-light tracking-wide uppercase">Organic fibers & recycled blends</p>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-bold mb-2">Artisan Made</h4>
              <p className="text-[10px] text-gray-500 font-light tracking-wide uppercase">Small batch local production</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Heritage Section */}
      <section className="bg-gray-50 py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="relative">
            <h3 className="text-[18vw] font-bold uppercase tracking-tighter opacity-[0.03] absolute -top-1/2 -left-1/4 pointer-events-none select-none">
              HERITAGE
            </h3>
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="md:mt-24">
                <h4 className="text-xl font-bold uppercase tracking-widest mb-4">The Atelier</h4>
                <p className="text-gray-500 font-light text-sm leading-relaxed">
                  Based in the heart of the architectural district, our studio serves as a sanctuary for creative exploration and technical precision.
                </p>
              </div>
              <div>
                <div className="aspect-square bg-gray-200 mb-8 grayscale hover:grayscale-0 transition-all duration-1000 cursor-help">
                  <img src="https://picsum.photos/seed/story-2/800/800" alt="" className="w-full h-full object-cover" />
                </div>
                <h4 className="text-xl font-bold uppercase tracking-widest mb-4">Materiality</h4>
                <p className="text-gray-500 font-light text-sm leading-relaxed">
                  We source our textiles from heritage mills that share our commitment to quality and ethical labor practices.
                </p>
              </div>
              <div className="md:mt-12">
                <h4 className="text-xl font-bold uppercase tracking-widest mb-4">Legacy</h4>
                <p className="text-gray-500 font-light text-sm leading-relaxed">
                  AURAWEAR is not just a brand; it is a movement toward a more conscious and elegant future of fashion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
