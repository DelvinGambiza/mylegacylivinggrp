// SimpleAnimatedBackground.jsx
'use client'

export default function SimpleAnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden z-[-1]">
      {/* Multiple gradient layers */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(45deg, #1F3A5F 0%, #8FAF9B 100%)',
          animation: 'gradientShift 15s ease infinite'
        }}
      />
      
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'linear-gradient(135deg, #8FAF9B 0%, #C6A75E 50%, #1F3A5F 100%)',
          animation: 'gradientShift 20s ease infinite reverse'
        }}
      />
      
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </div>
  )
}