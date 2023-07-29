'use client'

import { SignIn } from "@clerk/nextjs"
import logo from '../../../public/logo.png'
import Image from "next/image"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

const page = () => {
    const router = useRouter()

    return (
        <div className="w-screen absolute top-[-90px] bg-white min-h-screen overflow-hidden flex flex-col justify-center items-center mt-10">
            <div className="w-full flex justify-between px-5 items-center">
                <Button
                    onClick={() => router.back()}
                    variant={'secondary'}
                >
                    <div className="flex gap-3 items-center">
                        <ChevronLeft size={'25px'} />
                        <p>Back</p>
                    </div>
                </Button>
                <div className="relative h-[100px] w-[100px]">
                    <Image src={logo} alt='logo' />
                </div>
            </div>
            <SignIn />
        </div>
    )
}

export default page