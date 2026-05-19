import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronDown,
  Recycle,
  Box,
  FlaskConical,
  FileText,
  Cpu,
  Layers3,
  type LucideIcon,
} from "lucide-react";
import AuthenticatedLayout from "@/pages/AuthenticatedLayout";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

type MaterialType = "plastic" | "metal" | "glass" | "paper" | "e_waste" | "other";

type Rate = {
  id: string;
  material: MaterialType;
  name: string;
  pricePerKg: number;
  trend: "rising" | "falling" | "stable";
  icon: LucideIcon;
};

type JunkShop = {
  id: string;
  name: string;
  address: string;
  rates: Rate[];
};

const MOCK_RATES: Rate[] = [
  {
    id: "r1",
    material: "plastic",
    name: "Plastic",
    pricePerKg: 18,
    trend: "rising",
    icon: Box,
  },
  {
    id: "r2",
    material: "metal",
    name: "Metal",
    pricePerKg: 65,
    trend: "rising",
    icon: Layers3,
  },
  {
    id: "r3",
    material: "glass",
    name: "Glass",
    pricePerKg: 12,
    trend: "stable",
    icon: FlaskConical,
  },
  {
    id: "r4",
    material: "paper",
    name: "Paper",
    pricePerKg: 8,
    trend: "falling",
    icon: FileText,
  },
  {
    id: "r5",
    material: "e_waste",
    name: "E-Waste",
    pricePerKg: 140,
    trend: "rising",
    icon: Cpu,
  },
  {
    id: "r6",
    material: "other",
    name: "Other",
    pricePerKg: 5,
    trend: "stable",
    icon: Recycle,
  },
];

const MOCK_SHOPS: JunkShop[] = [
  {
    id: "s1",
    name: "EcoGreen Recycling",
    address: "123 Main St, Downtown",
    rates: MOCK_RATES,
  },
  {
    id: "s2",
    name: "Waste Masters Inc",
    address: "456 Industrial Ave",
    rates: MOCK_RATES.map((r) => ({
      ...r,
      pricePerKg: r.pricePerKg + Math.floor(Math.random() * 10 - 5),
    })),
  },
  {
    id: "s3",
    name: "Green Earth Collectors",
    address: "789 Park Lane",
    rates: MOCK_RATES.map((r) => ({
      ...r,
      pricePerKg: r.pricePerKg + Math.floor(Math.random() * 8 - 4),
    })),
  },
  {
    id: "s4",
    name: "City Scrap & Recycle",
    address: "321 Commerce Blvd",
    rates: MOCK_RATES.map((r) => ({
      ...r,
      pricePerKg: r.pricePerKg + Math.floor(Math.random() * 6 - 3),
    })),
  },
];

function RateItem({ rate }: { rate: Rate }) {
  const trendStyles: Record<string, string> = {
    rising: "text-green-700",
    falling: "text-red-700",
    stable: "text-slate-700",
  };

  const trendArrow: Record<string, string> = {
    rising: "▲",
    falling: "▼",
    stable: "−",
  };

  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 sm:px-5">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          <rate.icon className="size-5" />
        </div>
        <div>
          <h4 className="font-semibold text-slate-900">{rate.name}</h4>
          <p className="text-xs text-slate-600">per kilogram</p>
        </div>
      </div>

      <div className="text-right">
        <div className="font-bold text-slate-900">₱{rate.pricePerKg}</div>
        <div className={`text-xs font-semibold ${trendStyles[rate.trend]}`}>
          {trendArrow[rate.trend]} {rate.trend}
        </div>
      </div>
    </div>
  );
}

function ShopCard({ shop }: { shop: JunkShop }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-4 sm:px-5"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 text-left">
            <h3 className="font-semibold text-slate-900">{shop.name}</h3>
            <p className="text-sm text-slate-600">{shop.address}</p>
          </div>
          <ChevronDown
            className={`size-5 text-slate-600 transition-transform ${isExpanded ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {isExpanded && (
        <div className="space-y-2 border-t border-slate-200 px-4 py-4 sm:px-5">
          {shop.rates.map((rate) => (
            <RateItem key={rate.id} rate={rate} />
          ))}
        </div>
      )}
    </div>
  );
}

function RatesBoardContent() {
  return (
    <SidebarInset className="min-h-screen bg-[#e9e9e5] text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-300/80 bg-[#f5f5f1]/95 backdrop-blur">
        <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="text-slate-700 hover:text-slate-950" />
            <Button variant="ghost" size="icon-sm" className="text-slate-600">
              <ChevronLeft className="size-5" />
            </Button>
            <h1 className="text-xl font-bold tracking-tight">Today's Rates</h1>
          </div>
        </div>
      </header>

      <main className="w-full space-y-6 px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
        <div>
          <p className="mb-4 text-sm text-slate-600">
            Average buying prices from junk shops in your area
          </p>

          <div className="space-y-3">
            {MOCK_SHOPS.map((shop) => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
        </div>
      </main>
    </SidebarInset>
  );
}

export default function RatesBoard() {
  return <RatesBoardContent />;
}

RatesBoard.layout = (page: React.ReactNode) => (
  <AuthenticatedLayout>{page}</AuthenticatedLayout>
);