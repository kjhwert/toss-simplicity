import "./App.css";
import { VIDEO_WIDTH } from "@/consts";
import contents from "@/contents";
import DevCenterLines from "@/DevCenterLines";
import type { UIEvent } from "react";
import { useEffect, useRef, useState } from "react";

const INITIAL_CONTENT = Math.ceil(contents.length / 2);

const App = () => {
  const ulRef = useRef<HTMLUListElement>(null);
  const lisRef = useRef<HTMLLIElement[]>([]);

  const introVideoRef = useRef<HTMLVideoElement[]>([]);
  const summaryVideoRef = useRef<HTMLVideoElement[]>([]);

  const [selectedIndex, setSelectedIndex] = useState(INITIAL_CONTENT);

  const handleScroll = (e: UIEvent<HTMLUListElement>) => {
    const ul = e.target as HTMLUListElement;

    const vh = window.innerHeight / 100;
    const vw = window.innerWidth / 100;

    const px = Math.floor(-19 * vh + 50 * vw);

    const scrollLeft = px + ul.scrollLeft;

    const nextIndex = lisRef.current?.findIndex(
      (element) => scrollLeft <= element.offsetLeft,
    );

    const prevElement = lisRef.current[nextIndex - 1] as
      | HTMLLIElement
      | undefined;
    const curElement = lisRef.current[nextIndex];

    const height60Percent = window.innerHeight * 0.6;
    if (prevElement) {
      prevElement.style.height = `${
        height60Percent +
        Math.floor(
          cosineBell(scrollLeft, lisRef.current?.[nextIndex - 1].offsetLeft),
        )
      }px`;
    }

    const height =
      height60Percent +
      Math.floor(
        cosineBell(scrollLeft, lisRef.current?.[nextIndex].offsetLeft),
      );
    curElement.style.height = `${height}px`;

    if (nextIndex !== selectedIndex) {
      introVideoRef.current[selectedIndex].pause();
      summaryVideoRef.current[selectedIndex].pause();
      void introVideoRef.current[nextIndex].play();

      setSelectedIndex(nextIndex);
    }
  };

  useEffect(() => {
    // 처음 로드시 중앙에 있는 컨텐츠 선택
    ulRef.current?.scrollTo({
      left: VIDEO_WIDTH * INITIAL_CONTENT + INITIAL_CONTENT * 5,
    });
  }, []);

  useEffect(() => {
    // 비디오 선택 변경시 2초 뒤에 summary video 재생
    setTimeout(() => {
      void summaryVideoRef.current[selectedIndex].play();
    }, 2000);
  }, [selectedIndex]);

  return (
    <main className="relative w-full h-[100vh] flex content-center items-center bg-black">
      <DevCenterLines />
      <article className="w-full overflow-x-hidden">
        <ul
          ref={ulRef}
          onScroll={handleScroll}
          className="list-none flex items-end gap-[5px] px-[calc(-19vh+50vw)] overflow-x-auto scrollbar-hide"
        >
          {contents.map((content, index) => (
            <button key={`video-li-${index}`}>
              <li
                ref={(ref) => {
                  if (ref) {
                    lisRef.current[index] = ref;
                  }
                }}
                className={`relative cursor-pointer min-w-[350px] h-[60vh]`}
              >
                <video
                  ref={(ref) => {
                    if (ref) {
                      introVideoRef.current[index] = ref;
                    }
                  }}
                  className={`absolute top-0 left-0 min-w-[350px] z-10 object-cover h-full ${selectedIndex === index ? "animate-fade-out opacity-100" : ""}`}
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
                  className={`absolute top-0 left-0 min-w-[350px] object-cover h-full ${selectedIndex === index ? "animate-fade-in opacity-0" : ""}`}
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
            </button>
          ))}
        </ul>
      </article>
    </main>
  );
};

function cosineBell(x: number, y: number, amplitude = 40, range = 600) {
  const distance = Math.abs(x - y);
  if (distance > range) return 0;
  return Math.max(0, amplitude * Math.cos((Math.PI * distance) / range));
}

export default App;
