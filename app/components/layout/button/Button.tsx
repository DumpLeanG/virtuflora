import Image from "next/image";
import React from "react";

interface ButtonType {
    
    disabled?: true | false;
    onClick?: any;
    className?: string;
}

interface StandardButtonType extends ButtonType {
    type: 'achievements' | 'settings' | 'inventory' | 'shop' | 'water' | 'dig';
}

interface ArrowButtonType extends ButtonType {
    type: 'arrow';
    arrowType: 'prev' | 'next';
    isAbsolute?: true | false;
}

interface TextButtonType extends ButtonType {
    type: 'claim';
    completed?: true | false;
}

const colors = {
    achievements: {
        color: "bg-yellow",
    },
    settings: {
        color: "bg-gray",
    },
    inventory: {
        color: "bg-green",
    },
    shop: {
        color: "bg-purple",
    },
    water: {
        color: "bg-blue",
    },
    dig: {
        color: "bg-light-red",
    },
}

export default function Button(props: StandardButtonType | ArrowButtonType | TextButtonType) {
    

    return (
        props.type === 'arrow' ?
        (<button onClick={props.onClick} className={`${props.className} ${props.isAbsolute && (props.arrowType === 'prev' ? '-left-4.5' : '-right-4.5')} group z-1 p-2 border-2 md:border-3 rounded-full border-black cursor-pointer disabled:cursor-default disabled:border-black/50`} disabled={props.disabled}>
            <Image
            className={`size-4 md:size-6 max-w-7 group-disabled:opacity-50 ${props.arrowType === 'prev' && 'rotate-180'}`}
            src={`${props.type}.svg`}
            alt={`${props.type}`}
            width={28}
            height={28}
            priority
            />
        </button>)
        : props.type === 'claim' ?
        <button onClick={props.onClick} 
            className={`${props.className} group relative z-1 py-2 px-6 md:px-12 border-2 md:border-3 rounded-sm border-black drop-shadow-2 md:drop-shadow-3 
            bg-green hover:drop-shadow-none cursor-pointer duration-200 disabled:cursor-default disabled:hover:drop-shadow-2/50 md:disabled:hover:drop-shadow-3/50 
            disabled:duration-initial disabled:border-black/50 disabled:drop-shadow-none`} disabled={props.disabled || props.completed}
        >
            {props.completed ? "Claimed" : "Claim"}
        </button>
        :
        (<button onClick={props.onClick} 
            className={`${props.className} group relative z-1 p-2 border-2 md:border-3 rounded-sm border-black drop-shadow-2 md:drop-shadow-3 
            ${colors[props.type].color} hover:drop-shadow-none cursor-pointer duration-200 disabled:cursor-default disabled:hover:drop-shadow-2/50 md:disabled:hover:drop-shadow-3/50 
            disabled:duration-initial disabled:border-black/50 disabled:drop-shadow-none`} disabled={props.disabled}
        >
            <Image
            className="size-4 md:size-6 max-w-7 group-disabled:opacity-50"
            src={`${props.type}.svg`}
            alt={`${props.type}`}
            width={28}
            height={28}
            priority
            />
        </button>)
    );
}