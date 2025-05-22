"use client";

export default function Line(props: {side: 'right' | 'left'}) {

  return (
    <div className="absolute w-full h-12">
        <div className="relative w-full"></div>
        <span className={`absolute w-22 h-1 bg-black top-1/2 ${props.side === 'right' ? 'left-13' : 'right-13'} rounded-sm`}></span>
        <span className={`absolute w-1 h-12 bg-black top-1/2 ${props.side === 'right' ? 'left-1/2' : 'right-1/2'}  bottom- rounded-sm`}></span>
    </div>
  );
};
