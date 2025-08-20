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
  const lisRef = useRef<HTMLLIElement[]>([]);

  const [selectedIndex, setSelectedIndex] = useState(INITIAL_CONTENT);

  useEffect(() => {
    ulRef.current?.scrollTo({
      left: VIDEO_WIDTH * INITIAL_CONTENT,
    });
  }, []);

  const handleScroll = (e: UIEvent<HTMLUListElement>) => {
    const ul = e.target as HTMLUListElement;

    const nextIndex = Math.floor(ul.scrollLeft / VIDEO_WIDTH);

    const centerX = ul.scrollLeft + ul.clientWidth / 2;
    const centerLeft = Math.floor(centerX - VIDEO_WIDTH / 2);
    const centerRight = Math.floor(centerX + VIDEO_WIDTH / 2);

    console.log(centerLeft, centerRight);

    if (nextIndex !== selectedIndex) {
      setSelectedIndex(nextIndex);
    }
  };

  return (
    <main className="main">
      <article className="video-list-wrapper">
        <ul
          ref={ulRef}
          onScroll={handleScroll}
          className="video-list scrollbar-hide"
        >
          {contents.map((content, index) => (
            <li
              ref={(ref) => {
                if (ref) {
                  lisRef.current[index] = ref;
                }
              }}
              key={content.intro}
              className="video-list-item"
            >
              <video
                autoPlay={INITIAL_CONTENT === index}
                muted={INITIAL_CONTENT === index}
                playsInline
                loop
                width={VIDEO_WIDTH}
              >
                <source src={content.intro} />
              </video>

              <p className="video-list-title">{content.title}</p>
            </li>
          ))}
        </ul>
      </article>
    </main>
  );
};

export default App;
