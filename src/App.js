import NavBar from "./components/NavBar/NavBar";
import AlbumsList from "./components/AlbumsList/AlbumsList";
import ReactGA from "react-ga4";

ReactGA.initialize("G-KGRSZKER7T");

function App() {
  return (
    <>
      <NavBar />
      <AlbumsList />
    </>
  );
}

export default App;
