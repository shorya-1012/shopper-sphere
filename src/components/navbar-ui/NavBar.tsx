"use client"
import { useAuth, UserButton, SignInButton } from "@clerk/nextjs"
import { Search, ShoppingCart, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import logo from '../../../public/logo.png'

const NavBar = () => {
    const { userId } = useAuth()
    const [toggleSearch, setToogleSearch] = useState(false)
    const [searchParams, setSearchParams] = useState('')

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(searchParams)
    }

    return (
        <div className="w-screen overflow-x-hidden flex flex-col">
            <header className="w-screen overflow-hidden grid grid-cols-3 items-center h-[93px] fixed px-5 md:px-10">
                <button
                    onClick={() => setToogleSearch(true)}
                    className="h-full justify-start">
                    <Search size={'24px'} />
                </button>
                <div className="relative h-full w-[100px] sm:w-[135px] pb-2 overflow-hidden flex justify-center items-center justify-self-center">
                    <Image
                        src={logo}
                        alt="logo"
                        className=" object-cover"
                    />
                </div>
                <div className="h-full flex items-center justify-end gap-3 sm:mr-2">
                    {userId ? <UserButton /> :
                        // <Link href={'/sign-in'}>
                        //     Sign In
                        // </Link>
                        <SignInButton />
                    }
                    <ShoppingCart size={'27px'} />
                </div>
            </header>
            <div className={`w-screen h-screen absolute ${toggleSearch ? 'top-[0%] bg-zinc-900/20' : 'top-[-110%]'} ease-in-out duration-300`}>
                <div className="w-full h-[93px] flex items-center justify-center gap-3 bg-white">
                    <form onSubmit={handleSearch} className='h-[50px] w-[53%] rounded-2xl overflow-hidden shadow-xl flex p-2 border-2 border-black'>
                        <input
                            className='w-full h-full px-3 text-md text-gray-900'
                            placeholder='Search a product'
                            value={searchParams}
                            onChange={(e) => setSearchParams(e.target.value)}
                            autoFocus
                        />
                        <button className='mr-1'>
                            <Search size={'24px'} />
                        </button>
                    </form>
                    <button
                        onClick={() => setToogleSearch(false)}
                    >
                        <X size={'24px'} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NavBar