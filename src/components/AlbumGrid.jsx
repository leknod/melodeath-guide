import { useState } from 'react';
import { albums } from '../data/albums.js';
import AlbumModal from './AlbumModal';
import { motion, AnimatePresence } from 'framer-motion';

function AlbumGrid() {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const sortedAlbums = [...albums].sort((a, b) => a.year - b.year);

  const handleAlbumClick = (album) => {
    setSelectedAlbum(album);
  };

  const closeModal = () => {
    setSelectedAlbum(null);
  };

  const handlePreviousAlbum = () => {
    const currentIndex = sortedAlbums.findIndex(
      (album) => album.id === selectedAlbum.id
    );
    if (currentIndex > 0) {
      setSelectedAlbum(sortedAlbums[currentIndex - 1]);
    }
  };

  const handleNextAlbum = () => {
    const currentIndex = sortedAlbums.findIndex(
      (album) => album.id === selectedAlbum.id
    );
    if (currentIndex < sortedAlbums.length - 1) {
      setSelectedAlbum(sortedAlbums[currentIndex + 1]);
    }
  };

  const currentIndex = selectedAlbum ? sortedAlbums.findIndex(a => a.id === selectedAlbum.id) : -1;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === sortedAlbums.length - 1;

  return (
    <>
      {sortedAlbums.map((album) => (
        <motion.img
          key={album.id}
          src={album.cover}
          alt={album.title}
          title={album.title}
          className="cursor-pointer"
          layoutId={album.id}
          onClick={() => handleAlbumClick(album)}
        />
      ))}
      <AnimatePresence>
        {selectedAlbum && (
          <AlbumModal
            album={selectedAlbum}
            onClose={closeModal}
            onPrevious={handlePreviousAlbum}
            onNext={handleNextAlbum}
            isFirst={isFirst}
            isLast={isLast}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default AlbumGrid