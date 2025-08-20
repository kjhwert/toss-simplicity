import "./App.css";
import contents from "@/contents";

const App = () => {
  return (
    <main className="main">
      <article className="video-list-wrapper">
        <ul className="video-list scrollbar-hide">
          {contents.map((content) => (
            <li key={content.intro} className="video-list-item">
              <video
                // autoPlay muted
                playsInline
                loop
                width="350"
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
