"use client"
import React from 'react'
import { projects } from '../lib/projects'
import ProjectCard from './ProjectCard'
import { fadeUp, fadeIn, transition } from './motionConfig'
import RepeatInView from './RepeatInView'

export default function Projects() {
  return (
    <div className="relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <RepeatInView variants={fadeUp} transition={transition} delay={0.1}>
          <div className="text-center mb-4 sm:mb-6">
            <h2 className="text-ui text-emerald-200 mb-1 text-xl sm:text-2xl md:text-3xl font-light tracking-wider">Constellation of Work</h2>
            <p className="text-narrative text-teal-300/70 italic max-w-xl mx-auto">
              A record of manifestations in the digital void.
            </p>
          </div>
        </RepeatInView>

        <RepeatInView variants={fadeIn} transition={transition} delay={0.25}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </RepeatInView>

        {/* CTA for more projects */}
        <RepeatInView variants={fadeUp} transition={transition} delay={0.45}>
          <div className="mt-3 sm:mt-5 text-center">
            <a
              href="https://github.com/crux091"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4 px-8 py-3 rounded-full border border-white/5 text-ui text-white/40 hover:text-white hover:border-white/20 transition-all backdrop-blur-sm"
            >
              <svg className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              View Secondary Manifestations
            </a>
          </div>
        </RepeatInView>
      </div>
    </div>
  )
}
