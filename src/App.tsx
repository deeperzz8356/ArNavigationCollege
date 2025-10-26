import { useState } from 'react';
import ARScene from './components/ARScene';
import NavigationUI from './components/NavigationUI';
import { floorPlanData } from './data/floorPlanData';
import { Menu } from 'lucide-react';

function App() {
  const availableRooms = floorPlanData.rooms.filter(
    room => room.connectedTo && room.connectedTo.length > 0 && room.connectedTo[0] !== 'wp'
  );

  const [startRoom, setStartRoom] = useState(availableRooms[0]?.id || '');
  const [endRoom, setEndRoom] = useState(availableRooms[1]?.id || '');
  const [isARActive, setIsARActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // This is a placeholder function. You might have a more complex one.
  const handleFindPath = () => {
    console.log(`Finding path from ${startRoom} to ${endRoom}`);
    // Close the menu after finding a path
    setIsMenuOpen(false);
  };

  return (
    <main>
      {!isARActive && !isMenuOpen && (
        <button
          onClick={() => setIsMenuOpen(true)}
          className="fixed top-6 left-6 z-20 bg-white/95 p-3 rounded-full shadow-lg text-slate-800 hover:bg-slate-100 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      {!isARActive && isMenuOpen && (
        <NavigationUI
          startRoom={startRoom}
          endRoom={endRoom}
          onStartChange={setStartRoom}
          onEndChange={setEndRoom}
          onFindPath={handleFindPath}
          onClose={() => setIsMenuOpen(false)}
        />
      )}

      <ARScene
        startRoom={startRoom}
        endRoom={endRoom}
        onSessionStateChange={setIsARActive}
        showARButton={!isMenuOpen}
        showUIView={!isMenuOpen}
      />
    </main>
  );
}
export default App;
