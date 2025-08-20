import "./App.css";

const videos = [
  "https://static.toss.im/assets/dp/simplicity-season4-asset/session-graphic-card-video/sc-behind-every-design-ux-developers.mp4",
  "https://static.toss.im/assets/dp/simplicity-season4-asset/session-graphic-card-video/sc-toss-graphic-2-0.mp4",
  "https://static.toss.im/assets/dp/simplicity-season4-asset/session-graphic-card-video/sc-lunch-with-users.mp4",
  "https://static.toss.im/assets/dp/simplicity-season4-asset/session-graphic-card-video/sc-the-art-of-refresh.mp4",
  "https://static.toss.im/assets/dp/simplicity-season4-asset/session-graphic-card-video/sc-legal-meets-perfect-ux.mp4",
  "https://static.toss.im/assets/dp/simplicity-season4-asset/session-graphic-card-video/sc-how-to-measure-experience.mp4",
  "https://static.toss.im/assets/dp/simplicity-season4-asset/session-graphic-card-video/sc-the-end-of-ux-writers.mp4",
  "https://static.toss.im/assets/dp/simplicity-season4-asset/session-graphic-card-video/sc-3-tips-no-one-tell-me-about-ai.mp4",
  "https://static.toss.im/assets/dp/simplicity-season4-asset/session-graphic-card-video/sc-the-last-design-tool.mp4",
  "https://static.toss.im/assets/dp/simplicity-season4-asset/session-graphic-card-video/sc-accessibility-for-everyone.mp4",
  "https://static.toss.im/assets/dp/simplicity-season4-asset/session-graphic-card-video/sc-why-nobody-uses-my-design-system.mp4",
  "https://static.toss.im/assets/dp/simplicity-season4-asset/session-graphic-card-video/sc-tosst-ai-graphic-maker.mp4",
  "https://static.toss.im/assets/dp/simplicity-season4-asset/session-graphic-card-video/sc-when-ux-ignores-blind-users.mp4",
];

const App = () => {
  return (
    <main className="main">
      <article className="video-list-wrapper">
        <ul className="video-list scrollbar-hide">
          {videos.map((video) => (
            <li key={video}>
              <video
                // autoPlay muted
                playsInline
                loop
                width="350"
              >
                <source src={video} />
              </video>
            </li>
          ))}
        </ul>
      </article>
    </main>
  );
};

export default App;
