import { Route } from "react-router-dom";
import { Detail, Form, Home, Landing } from "./views";
import NavBar from "./components/NavBar/NavBar";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}
      <Route exact path="/" render={() => <Landing />} />
      <Route path="/home" render={() => <Home />} />
      <Route path="/create" render={() => <Form />} />
      <Route path="/detail/:id" render={() => <Detail />} />
    </div>
  );
}

export default App;
