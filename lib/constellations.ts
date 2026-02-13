export interface ConstellationNode {
    id: string
    label: string
    x: number // Percentage 0-100
    y: number // Percentage 0-100
}

export interface ConstellationConnection {
    from: string
    to: string
}

export interface ConstellationData {
    nodes: ConstellationNode[]
    connections: ConstellationConnection[]
}

export const ZODIAC_CONSTELLATIONS: Record<string, ConstellationData> = {
    Aries: {
        nodes: [
            { id: 'about', label: 'About', x: 40, y: 30 },
            { id: 'skills', label: 'Skills', x: 55, y: 35 },
            { id: 'projects', label: 'Projects', x: 65, y: 50 },
            { id: 'contact', label: 'Contact', x: 70, y: 65 }
        ],
        connections: [
            { from: 'about', to: 'skills' },
            { from: 'skills', to: 'projects' },
            { from: 'projects', to: 'contact' }
        ]
    },
    Taurus: {
        nodes: [
            { id: 'about', label: 'About', x: 30, y: 40 },
            { id: 'experience', label: 'Experience', x: 45, y: 45 },
            { id: 'skills', label: 'Skills', x: 60, y: 35 },
            { id: 'projects', label: 'Projects', x: 70, y: 50 },
            { id: 'contact', label: 'Contact', x: 65, y: 65 }
        ],
        connections: [
            { from: 'about', to: 'experience' },
            { from: 'experience', to: 'skills' },
            { from: 'experience', to: 'projects' },
            { from: 'projects', to: 'contact' }
        ]
    },
    Gemini: {
        nodes: [
            { id: 'about', label: 'About', x: 35, y: 30 },
            { id: 'skills', label: 'Skills', x: 35, y: 60 },
            { id: 'projects', label: 'Projects', x: 65, y: 30 },
            { id: 'contact', label: 'Contact', x: 65, y: 60 },
            { id: 'experience', label: 'Experience', x: 50, y: 45 }
        ],
        connections: [
            { from: 'about', to: 'skills' },
            { from: 'projects', to: 'contact' },
            { from: 'about', to: 'projects' },
            { from: 'skills', to: 'contact' }
        ]
    },
    Cancer: {
        nodes: [
            { id: 'about', label: 'About', x: 50, y: 30 },
            { id: 'experience', label: 'Experience', x: 50, y: 45 },
            { id: 'skills', label: 'Skills', x: 40, y: 65 },
            { id: 'projects', label: 'Projects', x: 60, y: 65 }
        ],
        connections: [
            { from: 'about', to: 'experience' },
            { from: 'experience', to: 'skills' },
            { from: 'experience', to: 'projects' }
        ]
    },
    Leo: {
        nodes: [
            { id: 'about', label: 'About', x: 40, y: 40 },
            { id: 'experience', label: 'Experience', x: 55, y: 30 },
            { id: 'skills', label: 'Skills', x: 70, y: 40 },
            { id: 'projects', label: 'Projects', x: 75, y: 60 },
            { id: 'contact', label: 'Contact', x: 60, y: 75 },
            { id: 'gallery', label: 'Gallery', x: 45, y: 70 }
        ],
        connections: [
            { from: 'about', to: 'experience' },
            { from: 'experience', to: 'skills' },
            { from: 'skills', to: 'projects' },
            { from: 'projects', to: 'contact' },
            { from: 'contact', to: 'gallery' },
            { from: 'gallery', to: 'about' }
        ]
    },
    Virgo: {
        nodes: [
            { id: 'about', label: 'About', x: 30, y: 40 },
            { id: 'experience', label: 'Experience', x: 45, y: 35 },
            { id: 'skills', label: 'Skills', x: 60, y: 40 },
            { id: 'projects', label: 'Projects', x: 65, y: 55 },
            { id: 'gallery', label: 'Gallery', x: 55, y: 70 },
            { id: 'contact', label: 'Contact', x: 40, y: 65 }
        ],
        connections: [
            { from: 'about', to: 'experience' },
            { from: 'experience', to: 'skills' },
            { from: 'skills', to: 'projects' },
            { from: 'projects', to: 'gallery' },
            { from: 'gallery', to: 'contact' }
        ]
    },
    Libra: {
        nodes: [
            { id: 'about', label: 'About', x: 50, y: 20 },
            { id: 'experience', label: 'Experience', x: 35, y: 45 },
            { id: 'skills', label: 'Skills', x: 65, y: 45 },
            { id: 'projects', label: 'Projects', x: 50, y: 70 }
        ],
        connections: [
            { from: 'about', to: 'experience' },
            { from: 'about', to: 'skills' },
            { from: 'experience', to: 'projects' },
            { from: 'skills', to: 'projects' }
        ]
    },
    Scorpio: {
        nodes: [
            { id: 'about', label: 'About', x: 40, y: 30 },
            { id: 'experience', label: 'Experience', x: 50, y: 40 },
            { id: 'skills', label: 'Skills', x: 60, y: 50 },
            { id: 'projects', label: 'Projects', x: 55, y: 70 },
            { id: 'contact', label: 'Contact', x: 40, y: 75 }
        ],
        connections: [
            { from: 'about', to: 'experience' },
            { from: 'experience', to: 'skills' },
            { from: 'skills', to: 'projects' },
            { from: 'projects', to: 'contact' }
        ]
    },
    Sagittarius: {
        nodes: [
            { id: 'about', label: 'About', x: 40, y: 50 },
            { id: 'experience', label: 'Experience', x: 55, y: 40 },
            { id: 'skills', label: 'Skills', x: 70, y: 45 },
            { id: 'projects', label: 'Projects', x: 65, y: 65 },
            { id: 'contact', label: 'Contact', x: 50, y: 70 }
        ],
        connections: [
            { from: 'about', to: 'experience' },
            { from: 'experience', to: 'skills' },
            { from: 'about', to: 'projects' },
            { from: 'projects', to: 'contact' }
        ]
    },
    Capricorn: {
        nodes: [
            { id: 'about', label: 'About', x: 40, y: 35 },
            { id: 'experience', label: 'Experience', x: 60, y: 35 },
            { id: 'skills', label: 'Skills', x: 75, y: 55 },
            { id: 'projects', label: 'Projects', x: 60, y: 75 },
            { id: 'contact', label: 'Contact', x: 45, y: 70 }
        ],
        connections: [
            { from: 'about', to: 'experience' },
            { from: 'experience', to: 'skills' },
            { from: 'skills', to: 'projects' },
            { from: 'projects', to: 'contact' },
            { from: 'contact', to: 'about' }
        ]
    },
    Aquarius: {
        nodes: [
            { id: 'about', label: 'About', x: 40, y: 30 },
            { id: 'experience', label: 'Experience', x: 55, y: 35 },
            { id: 'skills', label: 'Skills', x: 50, y: 50 },
            { id: 'projects', label: 'Projects', x: 65, y: 60 },
            { id: 'contact', label: 'Contact', x: 60, y: 75 }
        ],
        connections: [
            { from: 'about', to: 'experience' },
            { from: 'experience', to: 'skills' },
            { from: 'skills', to: 'projects' },
            { from: 'projects', to: 'contact' }
        ]
    },
    Pisces: {
        nodes: [
            { id: 'about', label: 'About', x: 40, y: 40 },
            { id: 'experience', label: 'Experience', x: 30, y: 55 },
            { id: 'skills', label: 'Skills', x: 45, y: 70 },
            { id: 'projects', label: 'Projects', x: 60, y: 65 },
            { id: 'contact', label: 'Contact', x: 70, y: 50 }
        ],
        connections: [
            { from: 'about', to: 'experience' },
            { from: 'experience', to: 'skills' },
            { from: 'skills', to: 'projects' },
            { from: 'projects', to: 'contact' }
        ]
    }
}
