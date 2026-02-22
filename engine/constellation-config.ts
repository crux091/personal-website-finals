/**
 * Constellation Configuration System
 * Pure data - defines all zodiac constellation layouts
 * No rendering logic - consumed by the rendering engine
 */

import { ConstellationConfig, ZodiacSign } from '@/types'

export const CONSTELLATION_CONFIGS: Record<ZodiacSign, ConstellationConfig> = {
  // Aries - Ram's Horn (curved hook shape)
  Aries: {
    id: 'Aries',
    nodes: [
      { id: 'about', label: 'About', position: { x: 65, y: 35 }, route: '/about' },      // Hamal (α Ari)
      { id: 'skills', label: 'Skills', position: { x: 55, y: 42 }, route: '/skills' },     // Sheratan (β Ari)
      { id: 'projects', label: 'Projects', position: { x: 48, y: 50 }, route: '/projects' }, // Mesarthim (γ Ari)
      { id: 'guestbook', label: 'Guestbook', position: { x: 45, y: 60 }, route: '/guestbook' },  // 41 Ari
    ],
    connections: [
      { from: 'about', to: 'skills' },
      { from: 'skills', to: 'projects' },
      { from: 'projects', to: 'guestbook' },
    ],
    decorativeStars: [
      { x: 70, y: 28, magnitude: 2 },
      { x: 60, y: 38, magnitude: 3 },
      { x: 72, y: 52, magnitude: 3 },
      { x: 42, y: 68, magnitude: 2 },
    ],
  },

  // Taurus - Bull's Head and Horns (V-shape with Aldebaran)
  Taurus: {
    id: 'Taurus',
    nodes: [
      { id: 'about', label: 'About', position: { x: 50, y: 45 }, route: '/about' },       // Aldebaran (α Tau)
      { id: 'experience', label: 'Experience', position: { x: 38, y: 30 }, route: '/experience' }, // Left horn tip
      { id: 'skills', label: 'Skills', position: { x: 62, y: 30 }, route: '/skills' },    // Right horn tip
      { id: 'projects', label: 'Projects', position: { x: 45, y: 60 }, route: '/projects' }, // Hyades cluster
      { id: 'guestbook', label: 'Guestbook', position: { x: 55, y: 60 }, route: '/guestbook' }, // Hyades cluster
    ],
    connections: [
      { from: 'about', to: 'experience' },
      { from: 'about', to: 'skills' },
      { from: 'about', to: 'projects' },
      { from: 'about', to: 'guestbook' },
      { from: 'projects', to: 'guestbook' },
    ],
    decorativeStars: [
      { x: 42, y: 50, magnitude: 2 },
      { x: 56, y: 52, magnitude: 2 },
      { x: 48, y: 68, magnitude: 3 },
      { x: 60, y: 42, magnitude: 3 },
      { x: 36, y: 65, magnitude: 3 },
    ],
  },

  // Gemini - The Twins (two parallel figures)
  Gemini: {
    id: 'Gemini',
    nodes: [
      { id: 'about', label: 'About', position: { x: 35, y: 25 }, route: '/about' },       // Castor (α Gem)
      { id: 'experience', label: 'Experience', position: { x: 38, y: 45 }, route: '/experience' }, // Twin body
      { id: 'skills', label: 'Skills', position: { x: 35, y: 65 }, route: '/skills' },    // Twin feet
      { id: 'projects', label: 'Projects', position: { x: 60, y: 25 }, route: '/projects' }, // Pollux (β Gem)
      { id: 'gallery', label: 'Gallery', position: { x: 58, y: 45 }, route: '/gallery' }, // Twin body
      { id: 'guestbook', label: 'Guestbook', position: { x: 60, y: 65 }, route: '/guestbook' }, // Twin feet
    ],
    connections: [
      { from: 'about', to: 'experience' },
      { from: 'experience', to: 'skills' },
      { from: 'projects', to: 'gallery' },
      { from: 'gallery', to: 'guestbook' },
      { from: 'about', to: 'projects' },
    ],
    decorativeStars: [
      { x: 48, y: 15, magnitude: 2 },
      { x: 65, y: 15, magnitude: 2 },
      { x: 30, y: 75, magnitude: 3 },
      { x: 63, y: 75, magnitude: 3 },
      { x: 47, y: 55, magnitude: 3 },
    ],
  },

  // Cancer - Crab (sideways Y-shape)
  Cancer: {
    id: 'Cancer',
    nodes: [
      { id: 'about', label: 'About', position: { x: 50, y: 45 }, route: '/about' },       // Center body
      { id: 'skills', label: 'Skills', position: { x: 35, y: 35 }, route: '/skills' },    // Left claw
      { id: 'projects', label: 'Projects', position: { x: 65, y: 35 }, route: '/projects' }, // Right claw
      { id: 'experience', label: 'Experience', position: { x: 42, y: 60 }, route: '/experience' }, // Left leg
      { id: 'guestbook', label: 'Guestbook', position: { x: 58, y: 60 }, route: '/guestbook' }, // Right leg
    ],
    connections: [
      { from: 'about', to: 'skills' },
      { from: 'about', to: 'projects' },
      { from: 'about', to: 'experience' },
      { from: 'about', to: 'guestbook' },
    ],
    decorativeStars: [
      { x: 42, y: 28, magnitude: 2 },
      { x: 58, y: 28, magnitude: 2 },
      { x: 35, y: 52, magnitude: 3 },
      { x: 65, y: 52, magnitude: 3 },
      { x: 50, y: 72, magnitude: 3 },
    ],
  },

  // Leo - Lion (sickle shape + triangle for body)
  Leo: {
    id: 'Leo',
    nodes: [
      { id: 'about', label: 'About', position: { x: 50, y: 25 }, route: '/about' },       // Regulus (α Leo)
      { id: 'experience', label: 'Experience', position: { x: 45, y: 35 }, route: '/experience' }, // Sickle
      { id: 'skills', label: 'Skills', position: { x: 42, y: 45 }, route: '/skills' },    // Sickle
      { id: 'projects', label: 'Projects', position: { x: 45, y: 55 }, route: '/projects' }, // Sickle
      { id: 'gallery', label: 'Gallery', position: { x: 65, y: 50 }, route: '/gallery' }, // Denebola (β Leo)
      { id: 'guestbook', label: 'Guestbook', position: { x: 55, y: 60 }, route: '/guestbook' }, // Hind quarters
    ],
    connections: [
      { from: 'about', to: 'experience' },
      { from: 'experience', to: 'skills' },
      { from: 'skills', to: 'projects' },
      { from: 'about', to: 'gallery' },
      { from: 'projects', to: 'guestbook' },
      { from: 'gallery', to: 'guestbook' },
    ],
    decorativeStars: [
      { x: 35, y: 18, magnitude: 2 },
      { x: 72, y: 38, magnitude: 2 },
      { x: 30, y: 62, magnitude: 3 },
      { x: 70, y: 65, magnitude: 3 },
      { x: 58, y: 30, magnitude: 3 },
    ],
  },

  // Virgo - Maiden (Y-shape representing figure)
  Virgo: {
    id: 'Virgo',
    nodes: [
      { id: 'about', label: 'About', position: { x: 50, y: 25 }, route: '/about' },       // Spica (α Vir)
      { id: 'experience', label: 'Experience', position: { x: 45, y: 40 }, route: '/experience' }, // Body
      { id: 'skills', label: 'Skills', position: { x: 55, y: 40 }, route: '/skills' },    // Body
      { id: 'projects', label: 'Projects', position: { x: 38, y: 55 }, route: '/projects' }, // Left arm
      { id: 'gallery', label: 'Gallery', position: { x: 62, y: 55 }, route: '/gallery' }, // Right arm
      { id: 'guestbook', label: 'Guestbook', position: { x: 50, y: 70 }, route: '/guestbook' }, // Feet
    ],
    connections: [
      { from: 'about', to: 'experience' },
      { from: 'about', to: 'skills' },
      { from: 'experience', to: 'projects' },
      { from: 'skills', to: 'gallery' },
      { from: 'experience', to: 'guestbook' },
      { from: 'skills', to: 'guestbook' },
    ],
    decorativeStars: [
      { x: 32, y: 20, magnitude: 2 },
      { x: 68, y: 20, magnitude: 2 },
      { x: 28, y: 48, magnitude: 3 },
      { x: 72, y: 48, magnitude: 3 },
      { x: 50, y: 80, magnitude: 3 },
    ],
  },

  // Libra - Scales (balanced diamond shape)
  Libra: {
    id: 'Libra',
    nodes: [
      { id: 'skills', label: 'Skills', position: { x: 50, y: 25 }, route: '/skills' },    // Balance beam
      { id: 'about', label: 'About', position: { x: 35, y: 45 }, route: '/about' },       // Left scale (α Lib)
      { id: 'projects', label: 'Projects', position: { x: 65, y: 45 }, route: '/projects' }, // Right scale (β Lib)
      { id: 'experience', label: 'Experience', position: { x: 35, y: 65 }, route: '/experience' }, // Left bowl
      { id: 'guestbook', label: 'Guestbook', position: { x: 65, y: 65 }, route: '/guestbook' }, // Right bowl
    ],
    connections: [
      { from: 'skills', to: 'about' },
      { from: 'skills', to: 'projects' },
      { from: 'about', to: 'experience' },
      { from: 'projects', to: 'guestbook' },
    ],
    decorativeStars: [
      { x: 50, y: 38, magnitude: 2 },
      { x: 28, y: 55, magnitude: 3 },
      { x: 72, y: 55, magnitude: 3 },
      { x: 28, y: 75, magnitude: 2 },
      { x: 72, y: 75, magnitude: 2 },
    ],
  },

  // Scorpio - Scorpion (curved body with stinger)
  Scorpio: {
    id: 'Scorpio',
    nodes: [
      { id: 'about', label: 'About', position: { x: 30, y: 45 }, route: '/about' },       // Antares (α Sco)
      { id: 'experience', label: 'Experience', position: { x: 42, y: 40 }, route: '/experience' }, // Body
      { id: 'skills', label: 'Skills', position: { x: 52, y: 38 }, route: '/skills' },    // Body curve
      { id: 'projects', label: 'Projects', position: { x: 62, y: 42 }, route: '/projects' }, // Tail start
      { id: 'gallery', label: 'Gallery', position: { x: 68, y: 52 }, route: '/gallery' }, // Tail curve
      { id: 'guestbook', label: 'Guestbook', position: { x: 70, y: 65 }, route: '/guestbook' }, // Stinger
    ],
    connections: [
      { from: 'about', to: 'experience' },
      { from: 'experience', to: 'skills' },
      { from: 'skills', to: 'projects' },
      { from: 'projects', to: 'gallery' },
      { from: 'gallery', to: 'guestbook' },
    ],
    decorativeStars: [
      { x: 22, y: 38, magnitude: 1 },
      { x: 18, y: 55, magnitude: 2 },
      { x: 20, y: 68, magnitude: 3 },
      { x: 73, y: 58, magnitude: 2 },
      { x: 73, y: 72, magnitude: 1 },
      { x: 72, y: 78, magnitude: 2 },
    ],
  },

  // Sagittarius - Archer's Bow and Arrow
  Sagittarius: {
    id: 'Sagittarius',
    nodes: [
      { id: 'about', label: 'About', position: { x: 40, y: 35 }, route: '/about' },       // Arrow tip
      { id: 'skills', label: 'Skills', position: { x: 50, y: 45 }, route: '/skills' },    // Arrow shaft
      { id: 'projects', label: 'Projects', position: { x: 60, y: 55 }, route: '/projects' }, // Bow center
      { id: 'experience', label: 'Experience', position: { x: 55, y: 65 }, route: '/experience' }, // Lower bow
      { id: 'guestbook', label: 'Guestbook', position: { x: 65, y: 65 }, route: '/guestbook' }, // Upper bow
    ],
    connections: [
      { from: 'about', to: 'skills' },
      { from: 'skills', to: 'projects' },
      { from: 'projects', to: 'experience' },
      { from: 'projects', to: 'guestbook' },
      { from: 'experience', to: 'guestbook' },
    ],
    decorativeStars: [
      { x: 32, y: 48, magnitude: 2 },
      { x: 48, y: 32, magnitude: 2 },
      { x: 70, y: 48, magnitude: 3 },
      { x: 72, y: 62, magnitude: 3 },
      { x: 35, y: 72, magnitude: 3 },
    ],
  },

  // Capricorn - Sea-Goat (triangle body with curved tail)
  Capricorn: {
    id: 'Capricorn',
    nodes: [
      { id: 'about', label: 'About', position: { x: 45, y: 30 }, route: '/about' },       // Head (δ Cap)
      { id: 'experience', label: 'Experience', position: { x: 55, y: 35 }, route: '/experience' }, // Neck
      { id: 'skills', label: 'Skills', position: { x: 60, y: 48 }, route: '/skills' },    // Body
      { id: 'projects', label: 'Projects', position: { x: 52, y: 60 }, route: '/projects' }, // Tail curve
      { id: 'guestbook', label: 'Guestbook', position: { x: 40, y: 65 }, route: '/guestbook' }, // Tail end
    ],
    connections: [
      { from: 'about', to: 'experience' },
      { from: 'experience', to: 'skills' },
      { from: 'skills', to: 'projects' },
      { from: 'projects', to: 'guestbook' },
      { from: 'about', to: 'guestbook' },
    ],
    decorativeStars: [
      { x: 32, y: 25, magnitude: 2 },
      { x: 68, y: 28, magnitude: 2 },
      { x: 30, y: 52, magnitude: 3 },
      { x: 68, y: 55, magnitude: 3 },
      { x: 50, y: 72, magnitude: 2 },
    ],
  },

  // Aquarius - Water Bearer (zigzag water stream)
  Aquarius: {
    id: 'Aquarius',
    nodes: [
      { id: 'about', label: 'About', position: { x: 45, y: 25 }, route: '/about' },       // Shoulder (α Aqr)
      { id: 'skills', label: 'Skills', position: { x: 55, y: 30 }, route: '/skills' },    // Water jug
      { id: 'experience', label: 'Experience', position: { x: 42, y: 45 }, route: '/experience' }, // Water flow
      { id: 'projects', label: 'Projects', position: { x: 58, y: 50 }, route: '/projects' }, // Water flow
      { id: 'gallery', label: 'Gallery', position: { x: 40, y: 65 }, route: '/gallery' }, // Water flow
      { id: 'guestbook', label: 'Guestbook', position: { x: 60, y: 70 }, route: '/guestbook' }, // Water end
    ],
    connections: [
      { from: 'about', to: 'skills' },
      { from: 'skills', to: 'experience' },
      { from: 'experience', to: 'projects' },
      { from: 'projects', to: 'gallery' },
      { from: 'gallery', to: 'guestbook' },
    ],
    decorativeStars: [
      { x: 35, y: 18, magnitude: 2 },
      { x: 65, y: 22, magnitude: 2 },
      { x: 30, y: 48, magnitude: 3 },
      { x: 68, y: 42, magnitude: 3 },
      { x: 50, y: 58, magnitude: 2 },
      { x: 55, y: 72, magnitude: 3 },
    ],
  },

  // Pisces - Two Fish connected by cord (circlet shape)
  Pisces: {
    id: 'Pisces',
    nodes: [
      { id: 'about', label: 'About', position: { x: 30, y: 35 }, route: '/about' },       // Western fish head
      { id: 'skills', label: 'Skills', position: { x: 35, y: 50 }, route: '/skills' },    // Western fish body
      { id: 'experience', label: 'Experience', position: { x: 50, y: 45 }, route: '/experience' }, // Cord knot
      { id: 'projects', label: 'Projects', position: { x: 65, y: 40 }, route: '/projects' }, // Eastern fish body
      { id: 'gallery', label: 'Gallery', position: { x: 70, y: 55 }, route: '/gallery' }, // Eastern fish tail
      { id: 'guestbook', label: 'Guestbook', position: { x: 30, y: 65 }, route: '/guestbook' }, // Western fish tail
    ],
    connections: [
      { from: 'about', to: 'skills' },
      { from: 'skills', to: 'guestbook' },
      { from: 'skills', to: 'experience' },
      { from: 'experience', to: 'projects' },
      { from: 'projects', to: 'gallery' },
    ],
    decorativeStars: [
      { x: 22, y: 28, magnitude: 2 },
      { x: 22, y: 58, magnitude: 2 },
      { x: 42, y: 28, magnitude: 3 },
      { x: 78, y: 28, magnitude: 3 },
      { x: 78, y: 62, magnitude: 2 },
      { x: 58, y: 72, magnitude: 3 },
    ],
  },
}

/**
 * Get constellation configuration for a zodiac sign
 */
export function getConstellationConfig(zodiac: ZodiacSign): ConstellationConfig {
  return CONSTELLATION_CONFIGS[zodiac]
}

/**
 * Get the dominant (first) node for a constellation
 */
export function getDominantNode(zodiac: ZodiacSign): string {
  const config = getConstellationConfig(zodiac)
  return config.nodes[0]?.id || 'about'
}

