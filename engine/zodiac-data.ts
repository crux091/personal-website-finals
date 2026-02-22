/**
 * Zodiac Constellation Data
 * Real RA/Dec astronomical coordinates for all 12 zodiac constellations.
 * 6 brightest stars per constellation = clickable portfolio nodes.
 * Additional stars = decorative (non‑clickable).
 */

export interface ZodiacStar {
  id: string
  name: string
  ra: number       // Right Ascension, degrees (0‑360)
  dec: number      // Declination, degrees (−90 to +90)
  magnitude: number // Visual magnitude — lower = brighter
  clickable: boolean
  section?: string  // Portfolio section this node opens
}

export interface ZodiacEdge {
  from: string
  to: string
}

export interface ZodiacConstellation {
  id: string
  name: string
  symbol: string
  dateRange: string
  stars: ZodiacStar[]
  edges: ZodiacEdge[]
}

// ──────────────────────────────────────────────────────────────
// Section assignment — assigned in brightness order
// ──────────────────────────────────────────────────────────────
const SECTIONS = ['about', 'skills', 'experience', 'projects', 'gallery', 'guestbook']

function buildStars(
  raw: Omit<ZodiacStar, 'clickable' | 'section'>[]
): ZodiacStar[] {
  const sorted = [...raw].sort((a, b) => a.magnitude - b.magnitude)
  return raw.map(star => {
    const rank = sorted.findIndex(s => s.id === star.id)
    const clickable = rank < SECTIONS.length
    return {
      ...star,
      clickable,
      section: clickable ? SECTIONS[rank] : undefined,
    }
  })
}

// ──────────────────────────────────────────────────────────────
// All 12 zodiac constellations
// ──────────────────────────────────────────────────────────────
export const ZODIAC_CONSTELLATIONS: ZodiacConstellation[] = [

  // ♈ ARIES
  {
    id: 'aries', name: 'Aries', symbol: '♈', dateRange: 'Mar 21 – Apr 19',
    stars: buildStars([
      { id: 'hamal',     name: 'Hamal',     ra: 31.793,  dec: 23.463,  magnitude: 2.00 },
      { id: 'sheratan',  name: 'Sheratan',  ra: 28.660,  dec: 20.808,  magnitude: 2.64 },
      { id: 'mesarthim', name: 'Mesarthim', ra: 28.383,  dec: 19.294,  magnitude: 3.86 },
      { id: 'botein',    name: 'Botein',    ra: 44.107,  dec: 19.726,  magnitude: 4.35 },
      { id: '41ari',     name: '41 Ari',    ra: 47.373,  dec: 27.261,  magnitude: 3.63 },
      { id: 'epsilon',   name: 'ε Ari',     ra: 43.564,  dec: 21.008,  magnitude: 4.63 },
      { id: 'pi_ari',    name: 'π Ari',     ra: 46.197,  dec: 17.332,  magnitude: 5.22 },
    ]),
    edges: [
      { from: 'mesarthim', to: 'sheratan' },
      { from: 'sheratan',  to: 'hamal' },
      { from: 'hamal',     to: 'botein' },
      { from: 'botein',    to: '41ari' },
    ],
  },

  // ♉ TAURUS
  {
    id: 'taurus', name: 'Taurus', symbol: '♉', dateRange: 'Apr 20 – May 20',
    stars: buildStars([
      { id: 'aldebaran', name: 'Aldebaran', ra: 68.980,  dec: 16.509,  magnitude: 0.85 },
      { id: 'elnath',    name: 'Elnath',    ra: 81.573,  dec: 28.608,  magnitude: 1.65 },
      { id: 'alcyone',   name: 'Alcyone',   ra: 56.871,  dec: 24.105,  magnitude: 2.87 },
      { id: 'ain',       name: 'Ain',       ra: 67.154,  dec: 19.180,  magnitude: 3.53 },
      { id: 'hyadum1',   name: 'Hyadum I',  ra: 65.733,  dec: 15.627,  magnitude: 3.65 },
      { id: 'hyadum2',   name: 'Hyadum II', ra: 64.948,  dec: 17.543,  magnitude: 3.77 },
      { id: 'tianguan',  name: 'Tianguan',  ra: 84.411,  dec: 21.143,  magnitude: 3.00 },
      { id: 'alheka',    name: 'Alheka',    ra: 82.061,  dec: 20.571,  magnitude: 3.00 },
    ]),
    edges: [
      { from: 'alcyone',   to: 'ain' },
      { from: 'ain',       to: 'aldebaran' },
      { from: 'aldebaran', to: 'hyadum1' },
      { from: 'aldebaran', to: 'hyadum2' },
      { from: 'aldebaran', to: 'elnath' },
      { from: 'elnath',    to: 'tianguan' },
      { from: 'tianguan',  to: 'alheka' },
    ],
  },

  // ♊ GEMINI
  {
    id: 'gemini', name: 'Gemini', symbol: '♊', dateRange: 'May 21 – Jun 20',
    stars: buildStars([
      { id: 'pollux',   name: 'Pollux',    ra: 116.329, dec: 28.026,  magnitude: 1.14 },
      { id: 'castor',   name: 'Castor',    ra: 113.649, dec: 31.888,  magnitude: 1.58 },
      { id: 'alhena',   name: 'Alhena',    ra: 99.428,  dec: 16.399,  magnitude: 1.93 },
      { id: 'tejat',    name: 'Tejat',     ra: 95.740,  dec: 22.513,  magnitude: 2.86 },
      { id: 'mebsuda',  name: 'Mebsuda',   ra: 100.983, dec: 25.131,  magnitude: 3.06 },
      { id: 'propus',   name: 'Propus',    ra: 93.719,  dec: 22.506,  magnitude: 3.28 },
      { id: 'alzirr',   name: 'Alzirr',    ra: 96.757,  dec: 12.896,  magnitude: 3.35 },
      { id: 'wasat',    name: 'Wasat',     ra: 110.031, dec: 21.982,  magnitude: 3.53 },
      { id: 'kappa',    name: 'κ Gem',     ra: 116.112, dec: 24.398,  magnitude: 3.57 },
      { id: 'iota',     name: 'ι Gem',     ra: 111.163, dec: 27.796,  magnitude: 3.79 },
    ]),
    edges: [
      { from: 'castor',  to: 'pollux' },
      { from: 'castor',  to: 'mebsuda' },
      { from: 'mebsuda', to: 'tejat' },
      { from: 'tejat',   to: 'propus' },
      { from: 'propus',  to: 'alzirr' },
      { from: 'pollux',  to: 'kappa' },
      { from: 'kappa',   to: 'wasat' },
      { from: 'wasat',   to: 'alhena' },
      { from: 'castor',  to: 'iota' },
    ],
  },

  // ♋ CANCER
  {
    id: 'cancer', name: 'Cancer', symbol: '♋', dateRange: 'Jun 21 – Jul 22',
    stars: buildStars([
      { id: 'tarf',      name: 'Tarf',      ra: 124.129, dec: 9.186,   magnitude: 3.52 },
      { id: 'asellus_b', name: 'Asellus B', ra: 130.821, dec: 21.469,  magnitude: 3.94 },
      { id: 'asellus_a', name: 'Asellus A', ra: 130.022, dec: 18.154,  magnitude: 4.26 },
      { id: 'acubens',   name: 'Acubens',   ra: 134.621, dec: 11.858,  magnitude: 4.26 },
      { id: 'iota_cnc',  name: 'ι Cnc',     ra: 131.171, dec: 28.761,  magnitude: 4.02 },
      { id: 'xi_cnc',    name: 'ξ Cnc',     ra: 128.938, dec: 22.045,  magnitude: 5.14 },
      { id: 'chi_cnc',   name: 'χ Cnc',     ra: 128.095, dec: 26.899,  magnitude: 5.14 },
    ]),
    edges: [
      { from: 'tarf',      to: 'asellus_a' },
      { from: 'asellus_a', to: 'asellus_b' },
      { from: 'asellus_b', to: 'iota_cnc' },
      { from: 'asellus_a', to: 'acubens' },
    ],
  },

  // ♌ LEO
  {
    id: 'leo', name: 'Leo', symbol: '♌', dateRange: 'Jul 23 – Aug 22',
    stars: buildStars([
      { id: 'regulus',  name: 'Regulus',  ra: 152.093, dec: 11.967,  magnitude: 1.35 },
      { id: 'denebola', name: 'Denebola', ra: 177.265, dec: 14.572,  magnitude: 2.14 },
      { id: 'algieba',  name: 'Algieba',  ra: 154.993, dec: 19.842,  magnitude: 2.28 },
      { id: 'zosma',    name: 'Zosma',    ra: 168.527, dec: 20.524,  magnitude: 2.56 },
      { id: 'epsilon',  name: 'Ras Elased', ra: 146.463, dec: 23.774, magnitude: 2.98 },
      { id: 'adhafera', name: 'Adhafera', ra: 154.172, dec: 23.417,  magnitude: 3.44 },
      { id: 'mu_leo',   name: 'Rasalas',  ra: 148.191, dec: 26.007,  magnitude: 3.88 },
      { id: 'chertan',  name: 'Chertan',  ra: 168.560, dec: 15.430,  magnitude: 3.34 },
      { id: 'eta_leo',  name: 'η Leo',    ra: 151.833, dec: 16.762,  magnitude: 3.44 },
    ]),
    edges: [
      { from: 'mu_leo',   to: 'epsilon' },
      { from: 'epsilon',  to: 'adhafera' },
      { from: 'adhafera', to: 'algieba' },
      { from: 'algieba',  to: 'eta_leo' },
      { from: 'eta_leo',  to: 'regulus' },
      { from: 'algieba',  to: 'zosma' },
      { from: 'zosma',    to: 'denebola' },
      { from: 'zosma',    to: 'chertan' },
    ],
  },

  // ♍ VIRGO
  {
    id: 'virgo', name: 'Virgo', symbol: '♍', dateRange: 'Aug 23 – Sep 22',
    stars: buildStars([
      { id: 'spica',        name: 'Spica',        ra: 201.298, dec: -11.161, magnitude: 0.97 },
      { id: 'porrima',      name: 'Porrima',      ra: 190.415, dec: -1.449,  magnitude: 2.74 },
      { id: 'vindemiatrix', name: 'Vindemiatrix', ra: 195.544, dec: 10.959,  magnitude: 2.83 },
      { id: 'heze',         name: 'Heze',         ra: 203.673, dec: -0.596,  magnitude: 3.37 },
      { id: 'auva',         name: 'Auva',         ra: 193.901, dec: 3.397,   magnitude: 3.38 },
      { id: 'zavijava',     name: 'Zavijava',     ra: 177.674, dec: 1.765,   magnitude: 3.61 },
      { id: 'syrma',        name: 'Syrma',        ra: 214.002, dec: -6.001,  magnitude: 4.08 },
      { id: 'iota_vir',     name: 'ι Vir',        ra: 208.671, dec: -5.990,  magnitude: 4.08 },
      { id: 'mu_vir',       name: 'μ Vir',        ra: 221.557, dec: -5.658,  magnitude: 3.87 },
    ]),
    edges: [
      { from: 'zavijava',     to: 'porrima' },
      { from: 'porrima',      to: 'auva' },
      { from: 'auva',         to: 'vindemiatrix' },
      { from: 'auva',         to: 'spica' },
      { from: 'spica',        to: 'heze' },
      { from: 'heze',         to: 'iota_vir' },
      { from: 'iota_vir',     to: 'syrma' },
      { from: 'syrma',        to: 'mu_vir' },
    ],
  },

  // ♎ LIBRA
  {
    id: 'libra', name: 'Libra', symbol: '♎', dateRange: 'Sep 23 – Oct 22',
    stars: buildStars([
      { id: 'zuben_s',  name: 'Zubeneschamali', ra: 229.252, dec: -9.383,  magnitude: 2.61 },
      { id: 'zuben_e',  name: 'Zubenelgenubi',  ra: 222.719, dec: -16.042, magnitude: 2.75 },
      { id: 'brachium', name: 'Brachium',       ra: 233.882, dec: -25.282, magnitude: 3.29 },
      { id: 'zuben_h',  name: 'Zubenelhakrabi', ra: 237.453, dec: -29.778, magnitude: 3.91 },
      { id: 'theta_lib',name: 'θ Lib',          ra: 226.017, dec: -16.730, magnitude: 4.15 },
      { id: 'upsilon',  name: 'υ Lib',          ra: 231.216, dec: -28.135, magnitude: 3.60 },
      { id: 'tau_lib',  name: 'τ Lib',          ra: 232.967, dec: -29.778, magnitude: 3.66 },
    ]),
    edges: [
      { from: 'zuben_e',  to: 'zuben_s' },
      { from: 'zuben_e',  to: 'theta_lib' },
      { from: 'zuben_e',  to: 'brachium' },
      { from: 'brachium', to: 'upsilon' },
      { from: 'upsilon',  to: 'tau_lib' },
      { from: 'tau_lib',  to: 'zuben_h' },
    ],
  },

  // ♏ SCORPIUS
  {
    id: 'scorpius', name: 'Scorpius', symbol: '♏', dateRange: 'Oct 23 – Nov 21',
    stars: buildStars([
      { id: 'antares',    name: 'Antares',    ra: 247.352, dec: -26.432, magnitude: 1.06 },
      { id: 'shaula',     name: 'Shaula',     ra: 263.402, dec: -37.103, magnitude: 1.62 },
      { id: 'sargas',     name: 'Sargas',     ra: 264.330, dec: -42.997, magnitude: 1.86 },
      { id: 'dschubba',   name: 'Dschubba',   ra: 240.083, dec: -22.622, magnitude: 2.29 },
      { id: 'acrab',      name: 'Acrab',      ra: 241.359, dec: -19.806, magnitude: 2.62 },
      { id: 'larawag',    name: 'Larawag',    ra: 252.541, dec: -34.293, magnitude: 2.69 },
      { id: 'lesath',     name: 'Lesath',     ra: 263.651, dec: -37.296, magnitude: 2.69 },
      { id: 'girtab',     name: 'Girtab',     ra: 260.920, dec: -43.239, magnitude: 2.39 },
      { id: 'iota_sco',   name: 'ι Sco',      ra: 261.325, dec: -40.127, magnitude: 3.03 },
      { id: 'xamidimura', name: 'Xamidimura', ra: 248.971, dec: -34.293, magnitude: 3.01 },
      { id: 'jabbah',     name: 'Jabbah',     ra: 241.163, dec: -19.461, magnitude: 4.00 },
      { id: 'pi_sco',     name: 'π Sco',      ra: 239.713, dec: -26.114, magnitude: 2.89 },
      { id: 'grafias',    name: 'Grafias',    ra: 244.580, dec: -28.216, magnitude: 4.50 },
    ]),
    edges: [
      { from: 'acrab',      to: 'dschubba' },
      { from: 'dschubba',   to: 'pi_sco' },
      { from: 'pi_sco',     to: 'antares' },
      { from: 'antares',    to: 'larawag' },
      { from: 'larawag',    to: 'xamidimura' },
      { from: 'xamidimura', to: 'iota_sco' },
      { from: 'iota_sco',   to: 'girtab' },
      { from: 'girtab',     to: 'sargas' },
      { from: 'sargas',     to: 'lesath' },
      { from: 'lesath',     to: 'shaula' },
    ],
  },

  // ♐ SAGITTARIUS
  {
    id: 'sagittarius', name: 'Sagittarius', symbol: '♐', dateRange: 'Nov 22 – Dec 21',
    stars: buildStars([
      { id: 'kaus_a',  name: 'Kaus Australis', ra: 276.043, dec: -34.384, magnitude: 1.79 },
      { id: 'nunki',   name: 'Nunki',          ra: 283.816, dec: -26.296, magnitude: 2.05 },
      { id: 'ascella', name: 'Ascella',        ra: 285.653, dec: -29.880, magnitude: 2.59 },
      { id: 'kaus_m',  name: 'Kaus Media',     ra: 275.249, dec: -29.828, magnitude: 2.70 },
      { id: 'kaus_b',  name: 'Kaus Borealis',  ra: 274.407, dec: -25.421, magnitude: 2.81 },
      { id: 'albaldah',name: 'Albaldah',       ra: 290.972, dec: -21.023, magnitude: 2.88 },
      { id: 'alnasl',  name: 'Alnasl',         ra: 271.452, dec: -30.424, magnitude: 2.98 },
      { id: 'phi_sgr', name: 'φ Sgr',          ra: 281.641, dec: -26.990, magnitude: 3.17 },
      { id: 'tau_sgr', name: 'τ Sgr',          ra: 287.441, dec: -27.670, magnitude: 3.32 },
      { id: 'delta_sgr',name: 'δ Sgr',         ra: 275.249, dec: -29.873, magnitude: 2.71 },
      { id: 'sigma_sgr',name: 'σ Sgr',         ra: 278.676, dec: -26.991, magnitude: 2.05 },
      { id: 'lambda_sgr',name: 'λ Sgr',        ra: 276.992, dec: -25.421, magnitude: 2.82 },
    ]),
    edges: [
      { from: 'alnasl',   to: 'kaus_m' },
      { from: 'kaus_m',   to: 'kaus_a' },
      { from: 'kaus_a',   to: 'ascella' },
      { from: 'ascella',  to: 'nunki' },
      { from: 'kaus_m',   to: 'kaus_b' },
      { from: 'kaus_b',   to: 'phi_sgr' },
      { from: 'phi_sgr',  to: 'nunki' },
      { from: 'nunki',    to: 'tau_sgr' },
      { from: 'tau_sgr',  to: 'albaldah' },
    ],
  },

  // ♑ CAPRICORNUS
  {
    id: 'capricornus', name: 'Capricornus', symbol: '♑', dateRange: 'Dec 22 – Jan 19',
    stars: buildStars([
      { id: 'deneb_a',   name: 'Deneb Algedi', ra: 326.760, dec: -16.127, magnitude: 2.85 },
      { id: 'dabih',     name: 'Dabih',        ra: 305.253, dec: -14.781, magnitude: 3.05 },
      { id: 'algedi',    name: 'Algedi',       ra: 304.513, dec: -12.545, magnitude: 3.57 },
      { id: 'nashira',   name: 'Nashira',      ra: 325.023, dec: -16.662, magnitude: 3.69 },
      { id: 'zeta_cap',  name: 'ζ Cap',        ra: 321.667, dec: -22.411, magnitude: 3.74 },
      { id: 'theta_cap', name: 'θ Cap',        ra: 316.678, dec: -17.233, magnitude: 4.07 },
      { id: 'iota_cap',  name: 'ι Cap',        ra: 318.797, dec: -16.834, magnitude: 4.28 },
    ]),
    edges: [
      { from: 'algedi',    to: 'dabih' },
      { from: 'dabih',     to: 'theta_cap' },
      { from: 'theta_cap', to: 'iota_cap' },
      { from: 'iota_cap',  to: 'nashira' },
      { from: 'nashira',   to: 'deneb_a' },
      { from: 'deneb_a',   to: 'zeta_cap' },
      { from: 'zeta_cap',  to: 'theta_cap' },
    ],
  },

  // ♒ AQUARIUS
  {
    id: 'aquarius', name: 'Aquarius', symbol: '♒', dateRange: 'Jan 20 – Feb 18',
    stars: buildStars([
      { id: 'sadalsuud',  name: 'Sadalsuud',  ra: 322.889, dec: -5.571,  magnitude: 2.87 },
      { id: 'sadalmelik', name: 'Sadalmelik', ra: 331.446, dec: -0.320,  magnitude: 2.96 },
      { id: 'skat',       name: 'Skat',       ra: 340.654, dec: -15.824, magnitude: 3.27 },
      { id: 'eta_aqr',    name: 'η Aqr',      ra: 331.105, dec: -1.387,  magnitude: 4.02 },
      { id: 'sadachbia',  name: 'Sadachbia',  ra: 330.950, dec: -1.449,  magnitude: 3.86 },
      { id: 'zeta_aqr',   name: 'ζ Aqr',      ra: 336.411, dec: -0.020,  magnitude: 3.65 },
      { id: 'epsilon_aqr',name: 'ε Aqr',      ra: 339.284, dec: -9.495,  magnitude: 3.77 },
      { id: 'delta_aqr',  name: 'δ Aqr',      ra: 340.654, dec: -15.824, magnitude: 3.27 },
      { id: 'tau2_aqr',   name: 'τ² Aqr',     ra: 334.208, dec: -13.592, magnitude: 4.01 },
      { id: 'lambda_aqr', name: 'λ Aqr',      ra: 338.376, dec: -7.726,  magnitude: 3.72 },
    ]),
    edges: [
      { from: 'sadalsuud',  to: 'sadalmelik' },
      { from: 'sadalmelik', to: 'sadachbia' },
      { from: 'sadachbia',  to: 'zeta_aqr' },
      { from: 'zeta_aqr',   to: 'eta_aqr' },
      { from: 'zeta_aqr',   to: 'epsilon_aqr' },
      { from: 'epsilon_aqr',to: 'lambda_aqr' },
      { from: 'lambda_aqr', to: 'skat' },
      { from: 'skat',       to: 'delta_aqr' },
      { from: 'delta_aqr',  to: 'tau2_aqr' },
    ],
  },

  // ♓ PISCES
  {
    id: 'pisces', name: 'Pisces', symbol: '♓', dateRange: 'Feb 19 – Mar 20',
    stars: buildStars([
      { id: 'eta_psc',     name: 'Kullat Nunu', ra: 22.871,  dec: 15.346,  magnitude: 3.62 },
      { id: 'gamma_psc',   name: 'γ Psc',       ra: 355.520, dec: 3.282,   magnitude: 3.69 },
      { id: 'alpha_psc',   name: 'Alrescha',    ra: 30.512,  dec: 2.764,   magnitude: 3.82 },
      { id: 'omega_psc',   name: 'ω Psc',       ra: 359.445, dec: 6.863,   magnitude: 4.01 },
      { id: 'iota_psc',    name: 'ι Psc',       ra: 23.953,  dec: 5.626,   magnitude: 4.13 },
      { id: 'delta_psc',   name: 'δ Psc',       ra: 9.832,   dec: 7.585,   magnitude: 4.43 },
      { id: 'epsilon_psc', name: 'ε Psc',       ra: 357.166, dec: 8.200,   magnitude: 4.28 },
      { id: 'nu_psc',      name: 'ν Psc',       ra: 6.401,   dec: 6.863,   magnitude: 4.44 },
      { id: 'xi_psc',      name: 'ξ Psc',       ra: 14.462,  dec: 9.158,   magnitude: 4.62 },
      { id: 'tau_psc',     name: 'τ Psc',       ra: 17.334,  dec: 30.089,  magnitude: 4.51 },
      { id: 'upsilon_psc', name: 'υ Psc',       ra: 18.831,  dec: 27.264,  magnitude: 4.75 },
      { id: 'phi_psc',     name: 'φ Psc',       ra: 22.870,  dec: 24.584,  magnitude: 4.65 },
      { id: 'theta_psc',   name: 'θ Psc',       ra: 359.455, dec: 6.863,   magnitude: 4.28 },
    ]),
    edges: [
      { from: 'eta_psc',     to: 'phi_psc' },
      { from: 'phi_psc',     to: 'upsilon_psc' },
      { from: 'upsilon_psc', to: 'tau_psc' },
      { from: 'tau_psc',     to: 'iota_psc' },
      { from: 'iota_psc',    to: 'delta_psc' },
      { from: 'delta_psc',   to: 'nu_psc' },
      { from: 'nu_psc',      to: 'xi_psc' },
      { from: 'xi_psc',      to: 'alpha_psc' },
      { from: 'alpha_psc',   to: 'gamma_psc' },
      { from: 'gamma_psc',   to: 'theta_psc' },
      { from: 'theta_psc',   to: 'omega_psc' },
      { from: 'omega_psc',   to: 'epsilon_psc' },
    ],
  },
]

// ──────────────────────────────────────────────────────────────
// Current month → default zodiac id
// ──────────────────────────────────────────────────────────────
export function getCurrentZodiacId(): string {
  const now = new Date()
  const m = now.getMonth() + 1
  const d = now.getDate()
  if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) return 'aries'
  if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) return 'taurus'
  if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) return 'gemini'
  if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) return 'cancer'
  if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) return 'leo'
  if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) return 'virgo'
  if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) return 'libra'
  if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) return 'scorpius'
  if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) return 'sagittarius'
  if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) return 'capricornus'
  if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) return 'aquarius'
  return 'pisces'
}

// ──────────────────────────────────────────────────────────────
// Convert RA/Dec to screen percentages (0‑100) for a constellation
// ──────────────────────────────────────────────────────────────
export function getScreenPositions(
  constellation: ZodiacConstellation
): Map<string, { x: number; y: number }> {
  const ras  = constellation.stars.map(s => s.ra)
  const decs = constellation.stars.map(s => s.dec)

  let minRA  = Math.min(...ras)
  let maxRA  = Math.max(...ras)
  let minDec = Math.min(...decs)
  let maxDec = Math.max(...decs)

  // 25% padding on each side so stars don't hug the viewport edges
  const raPad  = Math.max((maxRA  - minRA)  * 0.3, 2)
  const decPad = Math.max((maxDec - minDec) * 0.3, 2)
  minRA  -= raPad;  maxRA  += raPad
  minDec -= decPad; maxDec += decPad

  const positions = new Map<string, { x: number; y: number }>()
  constellation.stars.forEach(star => {
    // x: RA increases left→right (east→west on sky, but we flip for screen)
    const x = ((star.ra - minRA) / (maxRA - minRA)) * 70 + 15
    // y: Dec increases bottom→top (we flip for screen so north = top)
    const y = ((maxDec - star.dec) / (maxDec - minDec)) * 70 + 15
    positions.set(star.id, { x, y })
  })
  return positions
}
