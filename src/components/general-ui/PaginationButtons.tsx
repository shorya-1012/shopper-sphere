'use client'
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

type Props = {
    pageParams: number;
    isNextAvailable: boolean;
    isPrevAvailable: boolean;
}

const PaginationButtons = ({ pageParams, isNextAvailable, isPrevAvailable }: Props) => {

    const router = useRouter()

    const handleNextPress = () => {
        router.push(`/products/?pageParams=${pageParams + 1}`)
    }

    const handlePrevPress = () => {
        if (pageParams !== 1) {
            router.push(`/products/?pageParams=${pageParams - 1}`)
        }

    }

    return (
        <div className="flex items-center gap-2 font-review mt-10">
            {isPrevAvailable &&
                <button
                    onClick={handlePrevPress}
                    disabled={!isPrevAvailable}
                    className=""
                >
                    <ChevronLeft />
                </button>
            }
            <span className="text-lg">
                {pageParams.toString()}
            </span>
            {
                !isNextAvailable &&
                <button
                    onClick={handleNextPress}
                    disabled={isNextAvailable}
                >
                    <ChevronRight className="" />
                </button>
            }
        </div>
    )
}

export default PaginationButtons