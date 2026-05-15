// resources/js/components/layout/BottomNav.tsx
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Heart,
  Repeat,
  Shuffle,
} from "lucide-react";

export default function BottomNav() {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 h-20 flex items-center justify-between px-4">
      {/* Track Info */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-14 h-14 bg-gray-600 rounded"></div>
        <div className="min-w-0 flex-1">
          <p className="text-white font-medium truncate">Song Title</p>
          <p className="text-gray-400 text-sm truncate">Artist Name</p>
        </div>
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
          <Heart className="w-5 h-5" />
        </Button>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-2 flex-1 max-w-md">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Shuffle className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <SkipBack className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="lg" className="text-white hover:text-white bg-white hover:bg-gray-200 rounded-full">
            <Play className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <SkipForward className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Repeat className="w-5 h-5" />
          </Button>
        </div>
        <div className="w-full bg-gray-600 rounded-full h-1">
          <div className="bg-white h-1 rounded-full w-1/3"></div>
        </div>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-2 flex-1 justify-end">
        <Volume2 className="w-5 h-5 text-gray-400" />
        <div className="w-24 bg-gray-600 rounded-full h-1">
          <div className="bg-white h-1 rounded-full w-3/4"></div>
        </div>
      </div>
    </footer>
  );
}