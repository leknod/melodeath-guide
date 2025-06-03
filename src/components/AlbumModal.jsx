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
    <div {...handlers} className="fixed inset-0 flex justify-center backdrop-blur-md bg-gray-900/50">
      <div
        className="w-full max-h-dvh flex flex-col relative px-4 lg:px-0 lg:pl-4 lg:my-2 lg:rounded-3xl bg-gray-900 text-gray-300 lg:w-1/2"
      >
        <div className="modal-header flex-shrink-0 py-4 border-b border-gray-700">
          <h1 className="text-2xl font-audiowide w-9/10">{album.title}</h1>
          <button className="absolute top-6 right-6 opacity-25" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div ref={containerRef} className="modal-body flex-grow overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-600">
          <h2 className="text-2xl font-audiowide">{album.year}</h2>
          <h2 className="text-2xl font-audiowide mb-4">{album.artist}</h2>
          <img src={album.cover} alt={album.title} title={album.title} className="mb-10 lg:w-1/2"/>
          <h2 className="text-2xl font-audiowide mb-2">Tracklist</h2>
            <ol className="list-decimal pl-8 mb-10">
              {album.tracks.map((track, index) => (
                <li key={index} className="text-lg">{track.title}</li>
              ))}
            </ol>
          <h2 className="text-2xl font-audiowide mb-2">Review</h2>
          <div className="review text-lg mb-10">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{album.review}</ReactMarkdown>
          </div>
        </div>
        <div className="modal-footer flex-shrink-0 py-4 lg:pr-4 border-t border-gray-700">
          <div className="flex justify-between">
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
    </div>
  )
}

export default AlbumModal