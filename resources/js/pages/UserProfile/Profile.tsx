import { Link, usePage } from "@inertiajs/react"
import {
	Leaf,
	LogOut,
	MapPin,
	Star,
	ChevronLeft,
	Bell,
	Settings,
	Home,
	ClipboardList,
	MessageSquare,
	LayoutGrid,
	TrendingUp,
} from "lucide-react"

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarRail,
	SidebarSeparator,
	SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { User as UserType } from "@/types/user.type"

type AuthProps = {
	auth?: {
		user?: UserType
	}
}

const recentReviews = [
	{
		id: 1,
		name: "Den Mark E.",
		message: "Gwapo mo paul. Recommended!",
		rating: 5,
	},
	{
		id: 2,
		name: "Clarenre B.",
		message: "Bading.",
		rating: 5,
	},
	{
		id: 3,
		name: "Janny P.",
		message: "Smooth",
		rating: 4,
	},
]

const getRoleLabel = (role?: UserType["role"]) => {
	if (role === "seller") return "JUNK OWNER"
	if (role === "collector") return "COLLECTOR"
	if (role === "shop") return "SHOP OWNER"
	return "USER"
}

const getInitial = (name?: string) => {
	return name?.trim().charAt(0).toUpperCase() || "U"
}

const formatRating = (rating?: number) => {
	if (typeof rating !== "number") return "4.8"
	return rating.toFixed(1)
}

const getAddress = (user?: UserType) => {
	const parts = [user?.address, user?.city, user?.state].filter(Boolean)
	return parts.length ? parts.join(", ") : "Tori, Davao City"
}

const getNavItems = (role?: UserType["role"]) => {
	if (role === "seller") {
		return [
			{ label: "Home", href: "/home", icon: Home },
			{ label: "My Listings", href: "/seller/listings", icon: ClipboardList },
			{ label: "Messages", href: "/messages", icon: MessageSquare },
			{ label: "Profile", href: "/profile", icon: Settings },
		]
	}

	if (role === "collector") {
		return [
			{ label: "Map", href: "/collector/map", icon: MapPin },
			{ label: "My Pickups", href: "/collector/pickups", icon: ClipboardList },
			{ label: "Rates", href: "/collector/rates", icon: TrendingUp },
			{ label: "Profile", href: "/profile", icon: Settings },
		]
	}

	if (role === "shop") {
		return [
			{ label: "Dashboard", href: "/shop/dashboard", icon: LayoutGrid },
			{ label: "Buy Requests", href: "/shop/requests", icon: ClipboardList },
			{ label: "Messages", href: "/messages", icon: MessageSquare },
			{ label: "Profile", href: "/profile", icon: Settings },
		]
	}

	return [{ label: "Profile", href: "/profile", icon: Settings }]
}

function RatingStars({ rating }: { rating: number }) {
	const fullStars = Math.floor(rating)

	return (
		<div className="flex items-center gap-0.5">
			{Array.from({ length: 5 }, (_, index) => (
				<Star
					key={index}
					className="size-4 text-amber-500"
					fill={index < fullStars ? "currentColor" : "none"}
				/>
			))}
		</div>
	)
}

export default function Profile() {
	const { auth } = usePage<AuthProps>().props
	const currentPath = usePage().url
	const user = auth?.user

	const rating = user?.rating ?? 4.8
	const transactions = user?.total_transactions ?? 0
	const recycled = 0
	const navItems = getNavItems(user?.role)

	return (
		<SidebarProvider defaultOpen>
			<Sidebar className="border-r border-slate-200 bg-white" collapsible="offcanvas">
				<SidebarHeader className="px-4 py-4">
					<div className="flex items-center gap-3">
						<div className="flex size-9 items-center justify-center rounded-lg bg-green-700 text-white font-bold">S</div>
						<div>
							<p className="text-sm font-semibold text-slate-900">Scraply</p>
							<p className="text-xs text-slate-500">{getRoleLabel(user?.role)}</p>
						</div>
					</div>
				</SidebarHeader>
				<SidebarSeparator />
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupLabel>Navigation</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{navItems.map((item) => {
									const Icon = item.icon
									const isActive =
										currentPath === item.href || currentPath.startsWith(`${item.href}/`)

									return (
										<SidebarMenuItem key={item.href}>
											<SidebarMenuButton
												render={<Link href={item.href} />}
												isActive={isActive}
											>
												<Icon />
												<span>{item.label}</span>
											</SidebarMenuButton>
										</SidebarMenuItem>
									)
								})}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
				<SidebarFooter className="p-3">
					<Link
						href="/logout"
						method="post"
						as="button"
						className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
					>
						<LogOut className="size-4" />
						Sign out
					</Link>
				</SidebarFooter>
				<SidebarRail />
			</Sidebar>

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

					<section className="grid grid-cols-3 rounded-2xl border border-slate-200 bg-white py-4 shadow-sm">
						<div className="flex flex-col items-center justify-center border-r border-slate-200 px-2 py-2">
							<p className="text-3xl font-bold leading-none">{transactions}</p>
							<p className="mt-2 text-xs font-semibold tracking-[0.14em] text-slate-500">TRANSACTIONS</p>
						</div>

						<div className="flex flex-col items-center justify-center border-r border-slate-200 px-2 py-2">
							<p className="text-3xl font-bold leading-none">{recycled.toFixed(1)} kg</p>
							<p className="mt-2 text-xs font-semibold tracking-[0.14em] text-slate-500">RECYCLED</p>
						</div>

						<div className="flex flex-col items-center justify-center px-2 py-2">
							<p className="flex items-center gap-1 text-3xl font-bold leading-none">
								{formatRating(rating)}
								<Star className="size-5 text-amber-500" fill="currentColor" />
							</p>
							<p className="mt-2 text-xs font-semibold tracking-[0.14em] text-slate-500">RATING</p>
						</div>
					</section>

					<section className="rounded-2xl bg-green-800 px-5 py-4 text-white shadow-sm">
						<div className="flex items-center gap-3">
							<div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/15">
								<Leaf className="size-6 text-emerald-200" />
							</div>
							<div>
								<p className="text-sm font-bold uppercase tracking-[0.12em] text-emerald-100">Eco-Impact</p>
								<p className="mt-1 text-xl font-semibold leading-tight">
									You&apos;ve helped divert {recycled.toFixed(1)} kg of waste from landfills
								</p>
							</div>
						</div>
					</section>

					<section>
						<h3 className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-slate-500">Recent Reviews</h3>
						<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
							{recentReviews.map((review, index) => (
								<div
									key={review.id}
									className={`flex items-start justify-between gap-4 px-4 py-4 sm:px-5 ${
										index !== recentReviews.length - 1 ? "border-b border-slate-200" : ""
									}`}
								>
									<div>
										<p className="text-2xl font-semibold leading-none">{review.name}</p>
										<p className="mt-2 text-lg text-slate-600">{review.message}</p>
									</div>
									<RatingStars rating={review.rating} />
								</div>
							))}
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
		</SidebarProvider>
	)
}
