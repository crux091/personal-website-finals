export default function RaidaAvatar({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16"
  }

  return (
    <div className={`${sizeClasses[size]} relative`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Background circle with gradient */}
        <defs>
          <linearGradient id="raidaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
          <linearGradient id="glowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Outer glow */}
        <circle cx="50" cy="50" r="48" fill="url(#glowGradient)" opacity="0.3" />
        
        {/* Main circle */}
        <circle cx="50" cy="50" r="42" fill="url(#raidaGradient)" />
        
        {/* Shield (cyber security symbol) */}
        <path
          d="M 50 20 L 62 25 L 62 40 Q 62 52 50 58 Q 38 52 38 40 L 38 25 Z"
          fill="white"
          opacity="0.95"
        />
        
        {/* Lock icon inside shield */}
        <rect x="46" y="35" width="8" height="9" rx="1" fill="#0ea5e9" />
        <path
          d="M 47 35 L 47 32 Q 47 30 50 30 Q 53 30 53 32 L 53 35"
          stroke="#0ea5e9"
          strokeWidth="1.5"
          fill="none"
        />
        
        {/* Circuit lines (tech element) */}
        <line x1="30" y1="65" x2="40" y2="65" stroke="white" strokeWidth="2" opacity="0.7" />
        <circle cx="40" cy="65" r="2" fill="white" opacity="0.9" />
        <line x1="40" y1="65" x2="45" y2="70" stroke="white" strokeWidth="2" opacity="0.7" />
        
        <line x1="70" y1="65" x2="60" y2="65" stroke="white" strokeWidth="2" opacity="0.7" />
        <circle cx="60" cy="65" r="2" fill="white" opacity="0.9" />
        <line x1="60" y1="65" x2="55" y2="70" stroke="white" strokeWidth="2" opacity="0.7" />
        
        {/* Brain/AI dots pattern */}
        <circle cx="35" cy="45" r="1.5" fill="white" opacity="0.6" />
        <circle cx="30" cy="50" r="1.5" fill="white" opacity="0.6" />
        <circle cx="32" cy="55" r="1.5" fill="white" opacity="0.6" />
        
        <circle cx="65" cy="45" r="1.5" fill="white" opacity="0.6" />
        <circle cx="70" cy="50" r="1.5" fill="white" opacity="0.6" />
        <circle cx="68" cy="55" r="1.5" fill="white" opacity="0.6" />
        
        {/* Animated pulse ring */}
        <circle cx="50" cy="50" r="42" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.5">
          <animate
            attributeName="r"
            from="42"
            to="46"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            from="0.5"
            to="0"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  )
}
