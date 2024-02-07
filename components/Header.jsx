import Link from "next/link"

export default function Header() {
    return (
        <>
            <header className="flex justify-center p-3 w-full">
                <Link href="/" className=" p-2 px-3 mx-3 rounded-xl hover:bg-slate-300">Home</Link>
                <Link href="/about" className=" p-2 px-3 mx-3 rounded-xl hover:bg-slate-300">About</Link>                
            </header>
        </>
    )
}