interface Props {
  spinsLeft: number
  maxSpins: number
}

export default function SpinsCounter({ spinsLeft, maxSpins }: Props) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-2">
        {Array.from({ length: maxSpins }).map((_, i) => (
          <div
            key={i}
            className="w-4 h-4 rounded-full transition-all duration-400"
            style={
              i < spinsLeft
                ? { background: '#f5c542', boxShadow: '0 0 10px rgba(245,197,66,0.7)' }
                : { background: '#3a2f55', transform: 'scale(0.75)' }
            }
          />
        ))}
      </div>
      <p className="text-sm" style={{ color: '#9b8fb8' }}>
        {spinsLeft === maxSpins
          ? `${maxSpins} סיבובים חינם`
          : spinsLeft === 0
          ? 'ניצלת את כל הסיבובים'
          : `נשארו עוד ${spinsLeft === 1 ? 'סיבוב אחד!' : spinsLeft + ' סיבובים'}`}
      </p>
    </div>
  )
}
