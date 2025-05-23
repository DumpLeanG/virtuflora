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
}

export default function Button(props: StandardButtonType | ArrowButtonType) {
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

    return (
        props.type !== 'arrow' ?
        (<button onClick={props.onClick} className={`${props.className} relative z-1 p-2 border-2 md:border-3 rounded-sm border-black drop-shadow-3 ${colors[props.type].color} hover:drop-shadow-none cursor-pointer duration-200 disabled:cursor-default disabled:hover:drop-shadow-3 disabled:duration-initial disabled:opacity-50`} disabled={props.disabled}>
            <Image
            className="size-4 md:size-6 max-w-7"
            src={`${props.type}.svg`}
            alt={`${props.type}`}
            width={28}
            height={28}
            priority
            />
        </button>)
        : 
        (<button onClick={props.onClick} className={`${props.className} ${props.arrowType === 'prev' ? 'left-0' : 'right-0'} top-1/2 absolute z-1 p-2 border-2 rounded-full border-black bg-dark-beige cursor-pointer disabled:cursor-default disabled:opacity-50`} disabled={props.disabled}>
            <Image
            className="size-4 md:size-6 max-w-7"
            src={`settings.svg`}
            alt={`${props.type}`}
            width={28}
            height={28}
            priority
            />
        </button>)
    );
}