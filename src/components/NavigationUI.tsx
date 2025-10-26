import { MapPin, Navigation, X } from 'lucide-react';
import { floorPlanData } from '../data/floorPlanData';

interface NavigationUIProps {
  startRoom: string;
  endRoom: string;
  onStartChange: (room: string) => void;
  onEndChange: (room: string) => void;
  onFindPath: () => void;
  onClose: () => void;
}

export default function NavigationUI({
  startRoom,
  endRoom,
  onStartChange,
  onEndChange,
  onFindPath,
  onClose
}: NavigationUIProps) {
  const availableRooms = floorPlanData.rooms.filter(
    room => room.connectedTo && room.connectedTo.length > 0 && room.connectedTo[0] !== 'wp'
  );

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-10 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 w-full max-w-md border border-slate-200">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2.5 rounded-xl">
          <Navigation className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800">AR Navigation</h1>
      </div>

      <div className="space-y-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
            <MapPin className="w-4 h-4 text-green-600" />
            Start Location
          </label>
          <select
            value={startRoom}
            onChange={(e) => onStartChange(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
          >
            {availableRooms.map(room => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
            <MapPin className="w-4 h-4 text-red-600" />
            Destination
          </label>
          <select
            value={endRoom}
            onChange={(e) => onEndChange(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
          >
            {availableRooms.map(room => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={onFindPath}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Navigation className="w-5 h-5" />
          Find Path
        </button>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-200">
        <p className="text-xs text-slate-500 text-center">
          Select start and end locations to view AR navigation path
        </p>
      </div>
    </div>
  );
}
