import { Link, usePage } from "@inertiajs/react"
import {
    LogOut,
    MapPin,
    ChevronLeft,
    Bell,
    Settings,
} from "lucide-react"

import {
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { User as UserType } from "@/types/user.type"
import AuthenticatedLayout from "@/pages/AuthenticatedLayout"

type AuthProps = {
    auth?: {
        user?: UserType
    }
}

const getRoleLabel = (role?: UserType["role"]) => {
    if (role === "seller") return "JUNK OWNER"
    if (role === "collector") return "COLLECTOR"
    if (role === "shop") return "SHOP OWNER"
    return "USER"
}

const getInitial = (name?: string) => {
    return name?.trim().charAt(0).toUpperCase() || "U"
}

const getAddress = (user?: UserType) => {
    const parts = [user?.address, user?.city, user?.state].filter(Boolean)
    return parts.length ? parts.join(", ") : "Philippines"
}

function ProfileContent() {
    const { auth } = usePage<AuthProps>().props
    const user = auth?.user

    return (
        <SidebarInset className="min-h-screen bg-[#e9e9e5] text-slate-900">
            <header className="sticky top-0 z-20 border-b border-slate-300/80 bg-[#f5f5f1]/95 backdrop-blur">
                <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                        <SidebarTrigger className="text-slate-700 hover:text-slate-950" />
                        <Button variant="ghost" size="icon-sm" className="text-slate-600">
                            <ChevronLeft className="size-5" />
                        </Button>
                        <h1 className="text-xl font-bold tracking-tight">Profile</h1>
                    </div>

                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon-sm" className="text-slate-600">
                            <Bell className="size-5" />
                        </Button>
                        <Button variant="ghost" size="icon-sm" className="text-slate-600">
                            <Settings className="size-5" />
                        </Button>
                    </div>
                </div>
            </header>

            <main className="w-full space-y-4 px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
                <section className="rounded-2xl border border-slate-200 bg-white px-4 py-5 shadow-sm sm:px-5">
                    <div className="flex items-start gap-4">
                        <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-green-700 text-3xl font-semibold text-white">
                            {getInitial(user?.name)}
                        </div>

                        <div className="min-w-0">
                            <h2 className="text-2xl font-semibold leading-tight">{user?.name || "Jose Dela Cruz"}</h2>
                            <div className="mt-2 inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold tracking-wider text-emerald-800">
                                {getRoleLabel(user?.role)}
                            </div>
                            <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-600">
                                <MapPin className="size-4 text-slate-500" />
                                <span>{getAddress(user)}</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="flex w-full items-center gap-3 px-4 py-4 text-base font-semibold text-red-600 transition-colors hover:bg-red-50"
                    >
                        <LogOut className="size-5" />
                        Log out
                    </Link>
                </section>
            </main>
        </SidebarInset>
    )
}

export default function Profile() {
    return <ProfileContent />
}

Profile.layout = (page: React.ReactNode) => (
    <AuthenticatedLayout>{page}</AuthenticatedLayout>
)