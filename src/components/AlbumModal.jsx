import { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useSwipeable } from 'react-swipeable';
import CloseIcon from './CloseIcon';
import NavigationButton from './NavigationButton';

function AlbumModal({ album, onClose, onPrevious, onNext, isFirst, isLast}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  useEffect(() => {
  document.body.style.overflow = 'hidden';

  return () => {
    document.body.style.overflow = '';
  };
}, []);

  const handlers = useSwipeable({
    onSwipedLeft: () => !isLast && onNext(),
    onSwipedRight: () => !isFirst && onPrevious(),
    trackTouch: true,
    trackMouse: false,
  });

  return (
    <div {...handlers} className="fixed inset-0 flex justify-center">
      <div
        ref={containerRef}
        className="max-h-dvh w-full overflow-y-auto tailwind-scrollbar px-3 py-6 bg-gray-900 text-gray-100 lg:w-1/2"
      >
        <button className="fixed top-6 right-6 opacity-25" onClick={onClose}>
          <CloseIcon />
        </button>
        <h1 className="text-3xl font-audiowide">{album.title}</h1>
        <h2 className="text-3xl font-audiowide">{album.year}</h2>
        <h2 className="text-3xl font-audiowide mb-4">{album.artist}</h2>
        <img src={album.cover} alt={album.title} title={album.title} className="mb-10 lg:w-1/2"/>
        <h2 className="text-3xl font-audiowide mb-2">Tracklist</h2>
          <ol className="list-decimal pl-8 mb-10">
            {album.tracks.map((track, index) => (
              <li key={index} className="text-lg">{track.title}</li>
            ))}
          </ol>
        <h2 className="text-3xl font-audiowide mb-2">Review</h2>
        <div className="review text-lg mb-10">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{album.review}</ReactMarkdown>
        </div>
        <div className="flex justify-between mb-4">
          <div className="w-1/3 flex justify-start">
            {!isFirst ? (
              <NavigationButton type="previous" onClick={onPrevious}/>
              ) : (null)
            }
          </div>
          <div className="w-1/3 flex justify-center">
            <NavigationButton type="home" onClick={onClose}/>
          </div>
          <div className="w-1/3 flex justify-end">
            {!isLast ? (
              <NavigationButton type="next" onClick={onNext}/>
              ) : (null)
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlbumModal