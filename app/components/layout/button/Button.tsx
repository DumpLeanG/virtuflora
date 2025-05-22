import Image from "next/image";

type ButtonType = {
    type: 'achievements' | 'settings' | 'inventory' | 'shop' | 'water' | 'dig';
    disabled?: true | false;
}

export default function Button(props: ButtonType) {
    const types = {
        achievements: {
            color: "bg-yellow",
            onClick: "",
        },
        settings: {
            color: "bg-gray",
            onClick: "",
        },
        inventory: {
            color: "bg-green",
            onClick: "",
        },
        shop: {
            color: "bg-purple",
            onClick: "",
        },
        water: {
            color: "bg-blue",
            onClick: "",
        },
        dig: {
            color: "bg-light-red",
            onClick: "",
        }
    }

    return (
        <button className={`p-2 border-3 rounded-sm border-black drop-shadow-3 ${types[props.type].color} hover:drop-shadow-none cursor-pointer duration-200 disabled:cursor-default disabled:hover:drop-shadow-3 disabled:duration-initial disabled:opacity-50`} disabled={props.disabled}>
            <Image
            className="size-6 max-w-7"
            src={`${props.type}.svg`}
            alt={`${props.type}`}
            width={28}
            height={28}
            priority
            />
        </button>
    );
}