'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import logo from '../../../public/logo.png'
import Image from "next/image"

const DashboardNavbar = () => {
    const name = usePathname()

    const paths = [
        {
            name: 'Home',
            link: '/dashboard/home'
        },
        {
            name: 'Orders',
            link: '/dashboard/orders'
        },
        {
            name: 'Products',
            link: '/dashboard/products'
        },
        {
            name: 'Users',
            link: '/dashboard/users'
        },
    ]

    return (
        <header className="w-screen overflow-x-hidden flex items-center h-[60px] px-2 md:px-5 3 fixed bg-zinc-100 z-10 font-nunito ">
            <div className="relative w-[60px] h-full mr-5 overflow-hidden">
                <Link href={'/'}>
                    <Image
                        src={logo}
                        alt="logo"
                        fill={true}
                        className="object-cover"
                    />
                </Link>
            </div>
            <div className="flex px-4 gap-x-5 items-center">
                {
                    paths.map((path, i) => {
                        if (name == path.link) {
                            return (
                                <Link key={i} href={path.link}>
                                    <span className="text-gray-900 border-b-2 border-red-400 font-bold px-2 transition-transform duration-300">{path.name}</span>
                                </Link>
                            )
                        }
                        return (
                            <Link key={i} href={path.link}>
                                <span className="text-gray-600 hover:text-gray-800 hover:border-b-2 border-gray-800">{path.name}</span>
                            </Link>
                        )
                    })
                }
            </div>
        </header>
    )
}

export default DashboardNavbar