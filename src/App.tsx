import "./App.css";
import { VIDEO_WIDTH } from "@/consts";
import contents from "@/contents";
import type { UIEvent } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const INITIAL_CONTENT = Math.ceil(contents.length / 2);

const App = () => {
  const ulRef = useRef<HTMLUListElement>(null);

  const videosRef = useRef<HTMLVideoElement[]>([]);

  const [selectedIndex, setSelectedIndex] = useState(INITIAL_CONTENT);

  const handleScroll = (e: UIEvent<HTMLUListElement>) => {
    const ul = e.target as HTMLUListElement;

    const nextIndex = Math.floor(ul.scrollLeft / VIDEO_WIDTH);

    if (nextIndex !== selectedIndex) {
      handleStopVideo(selectedIndex);
      handlePlayVideo(nextIndex);
      setSelectedIndex(nextIndex);
    }
  };

  const handleStopVideo = (stopIndex: number) => {
    videosRef.current[stopIndex].pause();

    const video = videosRef.current[stopIndex];
    if (!video) return;

    video.src = contents[stopIndex].intro;
    video.load();
  };

  const handlePlayVideo = (playIndex: number) => {
    videosRef.current[playIndex].play().then(() => {
      setTimeout(() => {
        const video = videosRef.current[playIndex];
        if (!video) return;

        video.src = contents[playIndex].summary;
        video.load();
        video.play();
      }, 3000);
    });
  };

  useEffect(() => {
    ulRef.current?.scrollTo({
      left: VIDEO_WIDTH * INITIAL_CONTENT,
    });

    handlePlayVideo(selectedIndex);
  }, []);

  return (
    <main className="main">
      <article className="video-list-wrapper">
        <ul
          ref={ulRef}
          onScroll={handleScroll}
          className="video-list scrollbar-hide"
        >
          {contents.map((content, index) => (
            <li key={content.intro} className="video-list-item">
              <video
                ref={(ref) => {
                  if (ref) {
                    videosRef.current[index] = ref;
                  }
                }}
                src={content.intro}
                muted
                loop
                playsInline
                width={VIDEO_WIDTH}
              />

              <p className="video-list-title">{content.title}</p>
            </li>
          ))}
        </ul>
      </article>
    </main>
  );
};

export default App;
