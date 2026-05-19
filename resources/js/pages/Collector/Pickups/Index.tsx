import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import AuthenticatedLayout from "@/pages/AuthenticatedLayout";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

type PickupStatus = "unclaimed" | "in_progress" | "completed";

type Pickup = {
  id: string;
  title: string;
  address: string;
  items?: string;
  weightKg?: number;
  status: PickupStatus;
  scheduledAt?: string;
};

const MOCK_PICKUPS: Pickup[] = [
  {
    id: "p1",
    title: "Household Recyclables",
    address: "12 Green St, Block A",
    items: "Plastic, Paper",
    weightKg: 6,
    status: "unclaimed",
    scheduledAt: "2026-05-20 09:00",
  },
  {
    id: "p2",
    title: "Electronics",
    address: "45 Tech Ave",
    items: "Small appliances",
    weightKg: 12,
    status: "in_progress",
    scheduledAt: "2026-05-18 11:30",
  },
  {
    id: "p3",
    title: "Garden Waste",
    address: "8 Oak Lane",
    items: "Grass, Branches",
    weightKg: 4,
    status: "completed",
    scheduledAt: "2026-05-16 08:00",
  },
];

function PickupCard({
  pickup,
  onClaim,
  onUnclaim,
  onComplete,
  onReopen,
}: {
  pickup: Pickup;
  onClaim: (id: string) => void;
  onUnclaim: (id: string) => void;
  onComplete: (id: string) => void;
  onReopen: (id: string) => void;
}) {
  const statusStyles: Record<PickupStatus, string> = {
    unclaimed: "bg-amber-100 text-amber-800",
    in_progress: "bg-blue-100 text-blue-800",
    completed: "bg-emerald-100 text-emerald-800",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center gap-2">
            <h3 className="truncate text-base font-semibold text-slate-900">{pickup.title}</h3>
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${statusStyles[pickup.status]}`}
            >
              {pickup.status.replace("_", " ")}
            </span>
          </div>

          <p className="text-sm text-slate-600">{pickup.address}</p>
          <p className="mt-1 text-sm text-slate-500">
            {pickup.items || "No items listed"}
            {pickup.weightKg ? ` • ${pickup.weightKg} kg` : ""}
          </p>
          {pickup.scheduledAt && (
            <p className="mt-1 text-xs text-slate-400">Scheduled: {pickup.scheduledAt}</p>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {pickup.status === "unclaimed" && (
            <Button
              onClick={() => onClaim(pickup.id)}
              className="bg-green-700 text-white hover:bg-green-800"
            >
              Claim
            </Button>
          )}

          {pickup.status === "in_progress" && (
            <>
              <Button
                onClick={() => onComplete(pickup.id)}
                className="bg-blue-700 text-white hover:bg-blue-800"
              >
                Mark Completed
              </Button>
              <Button
                variant="outline"
                onClick={() => onUnclaim(pickup.id)}
                className="border-amber-300 text-amber-700 hover:bg-amber-50"
              >
                Unclaim
              </Button>
            </>
          )}

          {pickup.status === "completed" && (
            <Button
              variant="outline"
              onClick={() => onReopen(pickup.id)}
              className="border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              Reopen
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function PickupsContent() {
  const [pickups, setPickups] = useState<Pickup[]>(MOCK_PICKUPS);

  const claim = (id: string) => {
    setPickups((prev) =>
      prev.map((pickup) => (pickup.id === id ? { ...pickup, status: "in_progress" } : pickup))
    );
  };

  const unclaim = (id: string) => {
    setPickups((prev) =>
      prev.map((pickup) => (pickup.id === id ? { ...pickup, status: "unclaimed" } : pickup))
    );
  };

  const complete = (id: string) => {
    setPickups((prev) =>
      prev.map((pickup) => (pickup.id === id ? { ...pickup, status: "completed" } : pickup))
    );
  };

  const reopen = (id: string) => {
    setPickups((prev) =>
      prev.map((pickup) => (pickup.id === id ? { ...pickup, status: "in_progress" } : pickup))
    );
  };

  const available = pickups.filter((pickup) => pickup.status === "unclaimed");
  const inProgress = pickups.filter((pickup) => pickup.status === "in_progress");
  const completed = pickups.filter((pickup) => pickup.status === "completed");

  return (
    <SidebarInset className="min-h-screen bg-[#e9e9e5] text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-300/80 bg-[#f5f5f1]/95 backdrop-blur">
        <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="text-slate-700 hover:text-slate-950" />
            <Button variant="ghost" size="icon-sm" className="text-slate-600">
              <ChevronLeft className="size-5" />
            </Button>
            <h1 className="text-xl font-bold tracking-tight">My Pickups</h1>
          </div>
        </div>
      </header>

      <main className="w-full space-y-6 px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Available</h2>
            <span className="text-sm text-slate-500">{available.length} available</span>
          </div>

          <div className="space-y-3">
            {available.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-6 text-center text-slate-500 shadow-sm">
                None yet.
              </div>
            ) : (
              available.map((pickup) => (
                <PickupCard
                  key={pickup.id}
                  pickup={pickup}
                  onClaim={claim}
                  onUnclaim={unclaim}
                  onComplete={complete}
                  onReopen={reopen}
                />
              ))
            )}
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">In Progress</h2>
            <span className="text-sm text-slate-500">{inProgress.length}</span>
          </div>

          <div className="space-y-3">
            {inProgress.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-6 text-center text-slate-500 shadow-sm">
                None yet.
              </div>
            ) : (
              inProgress.map((pickup) => (
                <PickupCard
                  key={pickup.id}
                  pickup={pickup}
                  onClaim={claim}
                  onUnclaim={unclaim}
                  onComplete={complete}
                  onReopen={reopen}
                />
              ))
            )}
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Completed</h2>
            <span className="text-sm text-slate-500">{completed.length}</span>
          </div>

          <div className="space-y-3">
            {completed.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-6 text-center text-slate-500 shadow-sm">
                None yet.
              </div>
            ) : (
              completed.map((pickup) => (
                <PickupCard
                  key={pickup.id}
                  pickup={pickup}
                  onClaim={claim}
                  onUnclaim={unclaim}
                  onComplete={complete}
                  onReopen={reopen}
                />
              ))
            )}
          </div>
        </section>
      </main>
    </SidebarInset>
  );
}

export default function Index() {
  return <PickupsContent />;
}

Index.layout = (page: React.ReactNode) => (
  <AuthenticatedLayout>{page}</AuthenticatedLayout>
);