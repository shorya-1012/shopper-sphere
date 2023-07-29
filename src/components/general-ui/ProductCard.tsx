'use client'

import { ProdcutImage } from "@prisma/client"
import { Decimal } from "@prisma/client/runtime/library"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Star } from "lucide-react"
import AverageRating from "./AverageRating"

type Props = {
    id: string
    name: string,
    price: Decimal,
    description: string,
    images: ProdcutImage[],
    inDuration: number
}

const ProductCard = (props: Props) => {

    const [displayImageNumber, setDisplayImageNumber] = useState(0)

    return (
        <div
            onMouseEnter={() => setDisplayImageNumber(1)}
            onMouseLeave={() => setDisplayImageNumber(0)}
            className="rounded w-[165px] sm:w-[330px] md:w-[360px] lg:w-[280px] max-h-[400px] m-2 font-nunito"
            data-aos="fade-up"
            data-aos-duration={props.inDuration}
        >
            <div className=" relative h-[150px] sm:h-[310px] lg:h-[235px] w-full overflow-hidden bg-zinc-100 rounded shrink-0">
                <Image
                    className=" object-cover"
                    src={props.images[displayImageNumber].imageURL}
                    alt="product-image"
                    fill={true}
                    sizes="100%"
                />
            </div>
            <div className="flex flex-col gap-2 mt-3">
                <span className="font-kanit md:text-lg">{props.name}</span>
                <span>₹{props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
            </div>
        </div>
    )
}

export default ProductCard