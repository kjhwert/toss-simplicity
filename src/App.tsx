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

  const introVideoRef = useRef<HTMLVideoElement[]>([]);
  const summaryVideoRef = useRef<HTMLVideoElement[]>([]);

  const [selectedIndex, setSelectedIndex] = useState(INITIAL_CONTENT);

  const handleScroll = (e: UIEvent<HTMLUListElement>) => {
    const ul = e.target as HTMLUListElement;

    const nextIndex = Math.floor(ul.scrollLeft / VIDEO_WIDTH);

    if (nextIndex !== selectedIndex) {
      setSelectedIndex(nextIndex);
    }
  };

  useEffect(() => {
    ulRef.current?.scrollTo({
      left: VIDEO_WIDTH * INITIAL_CONTENT,
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      void summaryVideoRef.current[selectedIndex].play();
    }, 3000);
  }, [selectedIndex]);

  return (
    <main className="w-full h-[100vh] flex content-center items-center bg-black">
      <article className="w-full overflow-x-hidden">
        <ul
          ref={ulRef}
          onScroll={handleScroll}
          className="list-none flex gap-[5px] px-[calc(-19vh+50vw)] overflow-x-auto scrollbar-hide"
        >
          {contents.map((content, index) => (
            <li
              key={content.intro}
              className="relative cursor-pointer min-w-[350px] h-[60vh]"
            >
              <video
                ref={(ref) => {
                  if (ref) {
                    introVideoRef.current[index] = ref;
                  }
                }}
                className={`absolute top-0 left-0 min-w-[350px] h-[60vh] z-10 object-cover ${selectedIndex === index && "animate-fade-out opacity-100"}`}
                autoPlay={selectedIndex === index}
                src={content.intro}
                muted
                loop
                playsInline
                width={VIDEO_WIDTH}
              />

              <video
                ref={(ref) => {
                  if (ref) {
                    summaryVideoRef.current[index] = ref;
                  }
                }}
                className={`absolute top-0 left-0 min-w-[350px] h-[60vh] object-cover ${selectedIndex === index && "animate-fade-in opacity-0"}`}
                src={content.summary}
                muted
                loop
                playsInline
                width={VIDEO_WIDTH}
              />

              <p className="w-full absolute bottom-0 flex justify-center z-20 text-center text-[3.6vh] text-white leading-[1.2] font-bold whitespace-pre-line bg-gradient-to-b from-[rgba(255,255,255,0)] to-[rgba(0,0,0,1)] m-0 py-[50px]">
                {content.title}
              </p>
            </li>
          ))}
        </ul>
      </article>
    </main>
  );
};

export default App;
