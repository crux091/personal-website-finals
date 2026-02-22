/**
 * Core Type Definitions
 * Single source of truth for all application types
 */

export type ZodiacSign =
  | 'Aries'
  | 'Taurus'
  | 'Gemini'
  | 'Cancer'
  | 'Leo'
  | 'Virgo'
  | 'Libra'
  | 'Scorpio'
  | 'Sagittarius'
  | 'Capricorn'
  | 'Aquarius'
  | 'Pisces'

export interface Position3D {
  x: number
  y: number
  z?: number
}

export interface ConstellationNode {
  id: string
  label: string
  position: Position3D // Percentage values (0-100)
  route: string
}

export interface ConstellationConnection {
  from: string
  to: string
}

export interface ConstellationConfig {
  id: ZodiacSign
  nodes: ConstellationNode[]
  connections: ConstellationConnection[]
}

export type AppStage = 'intro' | 'main'

export interface Star {
  x: number
  y: number
  size: number
  color: string
  speed: number
  layer: number
}
