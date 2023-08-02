import NavBar from "./navbar";
import MotivationalQuote from "./quotes";
import Timer from "./timer";


export default function IndexPage() {
  return (
    <div className="main-container">
      <NavBar />
      <Timer />
      <MotivationalQuote />
      <footer className="footer">© 2023 Pomodragon. All rights reserved</footer>
    </div>
  );
}


