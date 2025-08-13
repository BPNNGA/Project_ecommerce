import React from 'react'

const Title = ({text1, text2}) => {
  return (
    <div className='inline-flex items-center gap-3'>
        <span className='text-[var(--muted)] font-medium'>{text1}</span>
        <span className='text-[var(--primary)] font-bold text-2xl'>{text2}</span>
        <div className='w-8 h-1 bg-[var(--primary)] rounded-full'></div>
    </div>
  )
}

export default Title
