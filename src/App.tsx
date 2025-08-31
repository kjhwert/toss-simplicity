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

  return (
    <main className="w-full h-[100vh] flex content-center items-center bg-black">
      <article className="w-full overflow-x-hidden">
        <ul
          ref={ulRef}
          onScroll={handleScroll}
          className="list-none flex gap-[5px] px-[calc(-19vh+50vw)] overflow-x-auto scrollbar-hide"
        >
          {contents.map((content) => (
            <li key={content.intro} className="relative cursor-pointer">
              <video
                className={`min-w-[350px] h-[60vh] object-cover`}
                src={content.intro}
                muted
                loop
                playsInline
                width={VIDEO_WIDTH}
              />

              <p className="w-full absolute bottom-0 flex justify-center text-center text-[3.6vh] text-white leading-[1.2] font-bold whitespace-pre-line bg-gradient-to-b from-[rgba(255,255,255,0)] to-[rgba(0,0,0,1)] m-0 py-[50px]">
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
