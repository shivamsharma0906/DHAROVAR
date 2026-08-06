import React from 'react';
import { motion } from 'framer-motion';
import { Award, Compass, Globe, Shield, Landmark, Flame, BookOpen } from 'lucide-react';

export const About: React.FC = () => {
  const pillars = [
    {
      title: "India's Domestic Policy & Governance",
      subtitle: "Internal Direction & Society",
      description: "Focusing on governance, economic direction, and societal cohesion. National progress on a global stage begins from within.",
      icon: Landmark,
    },
    {
      title: "Indian External Relations",
      subtitle: "Foreign Policy Projected Abroad",
      description: "Examining how internal priorities shape Indian global behavior. Foreign policy is domestic policy projected onto the global stage.",
      icon: Globe,
    },
    {
      title: "Geopolitics & Multipolar Order",
      subtitle: "Strategic Global Trends",
      description: "Studying regional and international developments that influence India's long-term and short-term strategic interests.",
      icon: Compass,
    },
  ];

  const metrics = [
    {
      value: '10+',
      label: 'International Schools Connected',
      sublabel: 'Collaborative Mumbai Network',
      icon: Landmark,
    },
    {
      value: '5,000+',
      label: 'Student Lives Impacted',
      sublabel: 'Direct Welfare Beneficiaries',
      icon: Shield,
    },
    {
      value: '15+',
      label: 'Community Welfare Drives',
      sublabel: 'Executed Across Maharashtra',
      icon: Flame,
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto space-y-20">
        
        {/* Section Header */}
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C8A35F] font-bold">
            Youth-Led Independent Think Tank
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F382C] mt-2 mb-4">
            About Dharovar House
          </h2>
          <div className="gold-divider max-w-xs mx-auto" />
        </div>

        {/* Foundational Belief Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-2xl p-8 sm:p-10 border-2 border-[#C8A35F]/40 shadow-soft relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full border-4 border-[#C8A35F] p-2 bg-[#FAF8F5] shadow-md flex-shrink-0 flex items-center justify-center relative">
              <img
                src="/images/logo.png"
                alt="Dharovar House Logo Crest"
                className="w-full h-full object-contain rounded-full"
              />
              <div className="absolute -bottom-2 bg-[#0F382C] text-[#C8A35F] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#C8A35F]">
                Established 2026
              </div>
            </div>

            <div className="space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C8A35F]/15 border border-[#C8A35F]/30 text-xs font-bold text-[#9E7C3B]">
                <Flame size={14} className="text-[#C8A35F]" />
                <span>Our Foundational Belief</span>
              </div>

              <blockquote className="font-serif text-lg sm:text-xl font-bold text-[#0F382C] italic leading-relaxed">
                "Dharovar is founded on the belief that Indian youth need a deeper understanding of foreign policy and domestic issues — a grounded, unapologetic, historically aware, and postcolonial critique of global affairs that reflects India's civilizational legacy, without parroting Westernised frameworks."
              </blockquote>

              <p className="text-sm text-[#1A535C]/90 leading-relaxed">
                In a world where young people are vulnerable to misinformation, propaganda, and foreign agendas, Dharovar strives to empower a generation to lead India into a new era of strategic thinking alongside national progress, while remaining unapologetic about their Indian identity.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Narrative & Institutional Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-5 text-[#1A535C] text-base leading-relaxed"
          >
            <h3 className="font-serif text-2xl font-bold text-[#0F382C]">
              Reimagining India's Position in Global Affairs
            </h3>
            
            <p>
              <strong>Dharovar House</strong> is a youth-led, independent think tank committed to reimagining India's position in global affairs. We provide a platform for rigorous research, academic writing, and the dissemination of ideas that place India's perspectives at the center of strategic debates. By combining academic depth with accessibility, we aim to bridge the gap between policymakers and the youth.
            </p>

            <p>
              Our initiatives include research publications, policy briefs, workshops, and interactive dialogues that foster critical thinking among young Indians. We actively encourage multidisciplinary perspectives, drawing from history, politics, economics, culture, and sociology, to ensure a holistic understanding of India's challenges and opportunities.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 space-y-5 text-[#1A535C] text-base leading-relaxed bg-white p-8 rounded-2xl border border-[#E8E2D8] shadow-sm"
          >
            <h3 className="font-serif text-2xl font-bold text-[#0F382C]">
              Stakeholders in India's Trajectory
            </h3>

            <p>
              At Dharovar House, we believe that the youth are not merely observers but stakeholders in shaping India's trajectory. By equipping them with nuanced insights and tools of analysis, we empower them to resist simplistic narratives, counter disinformation, and craft original perspectives rooted in India's civilizational ethos.
            </p>

            <p className="font-medium text-[#0F382C] border-l-4 border-[#C8A35F] pl-4 italic">
              Ultimately, our mission is to cultivate a confident, well-informed generation that engages with domestic and international issues without intellectual dependency. Dharovar House envisions itself as a catalyst for producing leaders and thinkers who can uphold India's sovereignty, articulate its worldview, and contribute meaningfully to a multipolar global order.
            </p>
          </motion.div>
        </div>

        {/* Areas of Focus (Three Core Pillars) */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C8A35F] font-bold">
              Core Intellectual Framework
            </span>
            <h3 className="font-serif text-3xl font-bold text-[#0F382C] mt-2 mb-3">
              Areas of Focus
            </h3>
            <p className="text-sm text-[#1A535C]">
              Anchored in three core pillars that every young Indian must engage with to reclaim national pride and strategic clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="bg-white rounded-2xl p-8 border border-[#E8E2D8] shadow-soft hover:border-[#C8A35F] hover:shadow-hover transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-[#FAF8F5] border border-[#C8A35F]/30 flex items-center justify-center mb-6 text-[#C8A35F] group-hover:bg-[#0F382C] group-hover:text-[#C8A35F] transition-colors">
                      <Icon size={26} />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#9E7C3B]">
                      Pillar 0{idx + 1}
                    </span>
                    <h4 className="font-serif text-xl font-bold text-[#0F382C] mt-1 mb-2 group-hover:text-[#1A535C] transition-colors">
                      {pillar.title}
                    </h4>
                    <p className="text-xs font-semibold text-[#C8A35F] mb-4 uppercase tracking-wider">
                      {pillar.subtitle}
                    </p>
                    <p className="text-sm text-[#1A535C]/80 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#E8E2D8]/60 text-xs font-bold text-[#0F382C] flex items-center gap-1.5 text-[#9E7C3B]">
                    <BookOpen size={14} />
                    <span>Civilizational Perspective</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-white rounded-xl p-8 border border-[#E8E2D8] shadow-soft text-center group hover:border-[#C8A35F] hover:shadow-hover transition-all duration-300 relative overflow-hidden"
              >
                <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#C8A35F]/30 flex items-center justify-center mx-auto mb-4 text-[#C8A35F] group-hover:scale-110 transition-transform">
                  <Icon size={24} />
                </div>
                <div className="font-serif text-4xl sm:text-5xl font-extrabold text-[#C8A35F] mb-2">
                  {metric.value}
                </div>
                <div className="text-xs uppercase tracking-widest font-bold text-[#0F382C] mb-1">
                  {metric.label}
                </div>
                <div className="text-xs text-[#1A535C]/70">
                  {metric.sublabel}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
