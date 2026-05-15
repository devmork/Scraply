import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, TrendingUp, Leaf } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function GuessLayout() {
    return (
        <div className="min-h-screen">
            {/* Navigation */}
            <nav className="border-b border-neutral-800 px-6 py-4">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <div className="text-2xl font-bold tracking-tight text-green-500">
                        Scraply
                    </div>
                    <div className="flex gap-4">
                        <Link href="/login">
                            <Button variant="secondary" className="text-neutral-900 hover:text-black">
                                Sign In
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button className="bg-green-600 hover:bg-green-500 text-white font-semibold">
                                Sign Up
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="px-6 py-24 md:py-32">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-linear-to-r from-white to-neutral-900 bg-clip-text text-transparent">
                        Turn Your Junk Into Cash
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Connect junk owners, collectors, and shops. Post recyclables, claim pickups, and build a sustainable supply chain — all on one platform.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <Link href="/register">
                            <Button className="bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-6 text-lg rounded-full h-auto">
                                Get Started Free
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button variant="outline" className="border-neutral-700 text-black hover:bg-neutral-900 px-8 py-6 text-lg rounded-full h-auto">
                                Sign In
                            </Button>
                        </Link>
                    </div>

                    {/* Hero Image/Demo */}
                    <div className="bg-linear-to-b from-neutral-900 to-black rounded-lg border border-neutral-800 p-8 shadow-2xl">
                        <div className="aspect-video bg-neutral-900 rounded flex items-center justify-center">
                            <span className="text-neutral-500">Interactive Map View</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* User Types Section */}
            <section className="px-6 py-24 border-t border-neutral-800">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Built for Three User Types
                        </h2>
                        <p className="text-neutral-400 text-lg">
                            Whether you're a junk owner, collector, or shop owner — JunkLink streamlines your workflow
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Junk Owner */}
                        <Card className="bg-neutral-100 border-neutral-800 p-8 hover:border-neutral-700 transition">
                            <div className="bg-green-600 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                                <Leaf className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Junk Owner</h3>
                            <ul className="text-neutral-400 space-y-2 text-sm">
                                <li>✓ Post recyclables with photos</li>
                                <li>✓ Set your own price</li>
                                <li>✓ Accept nearby pickups</li>
                                <li>✓ Earn cash instantly</li>
                            </ul>
                        </Card>

                        {/* Junk Collector */}
                        <Card className="bg-neutral-100 border-neutral-800 p-8 hover:border-neutral-700 transition">
                            <div className="bg-green-600 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                                <MapPin className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Junk Collector</h3>
                            <ul className="text-neutral-400 space-y-2 text-sm">
                                <li>✓ Find nearby listings</li>
                                <li>✓ Filter by material type</li>
                                <li>✓ Optimize your route</li>
                                <li>✓ Maximize daily earnings</li>
                            </ul>
                        </Card>

                        {/* Junk Shop Owner */}
                        <Card className="bg-neutral-100 border-neutral-800 p-8 hover:border-neutral-700 transition">
                            <div className="bg-green-600 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                                <TrendingUp className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Junk Shop Owner</h3>
                            <ul className="text-neutral-400 space-y-2 text-sm">
                                <li>✓ Post your buying rates</li>
                                <li>✓ Attract collectors</li>
                                <li>✓ Manage incoming supply</li>
                                <li>✓ Scale your business</li>
                            </ul>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Why Scraply Section */}
            <section className="px-6 py-24 border-t border-neutral-800 bg-linear-to-bs from-neutral-900 to-black">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Why Scraply?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8 mt-12">
                        <div>
                            <p className="text-2xl font-bold text-green-500 mb-2">♻️ Environmental</p>
                            <p className="text-neutral-400">
                                Reduce plastic and metal waste going to landfills by making recycling convenient and rewarding.
                            </p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-green-500 mb-2">💰 Economic</p>
                            <p className="text-neutral-400">
                                Give junk owners a new income stream and help collectors earn more by reducing idle travel time.
                            </p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-green-500 mb-2">🤝 Social</p>
                            <p className="text-neutral-400">
                                Empower informal sector workers with digital tools and visibility to better supply chains.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-6 py-24 border-t border-neutral-800">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Ready to join the circular economy?
                    </h2>
                    <p className="text-neutral-400 text-lg mb-8">
                        Start connecting today. Post a listing in under 2 minutes.
                    </p>
                    <Link href="/register">
                        <Button className="bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-6 text-lg rounded-full h-auto">
                            Create Account Now
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-neutral-800 px-6 py-12">
                <div className="max-w-6xl mx-auto text-center text-neutral-500 text-sm">
                    <p>&copy; 2026 Scraply. Infrastructure for a circular economy at the barangay level.</p>
                </div>
            </footer>
        </div>
    );
}