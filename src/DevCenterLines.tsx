import { VIDEO_WIDTH } from "@/consts";

export default function DevCenterLines() {
  return (
    <>
      <div
        className="absolute w-[1px] h-[100vh] bg-white"
        style={{
          left: document.documentElement.clientWidth / 2 - VIDEO_WIDTH / 2,
        }}
      />
      <div
        className="absolute w-[1px] h-[100vh] bg-white"
        style={{
          left: document.documentElement.clientWidth / 2 + VIDEO_WIDTH / 2,
        }}
      />
    </>
  );
}
