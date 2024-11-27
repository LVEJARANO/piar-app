import { useState } from "react";

import "./App.css";
import Rutas from "./routes/Rutas";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFontAwesome } from "@fortawesome/free-brands-svg-icons";

function App() {
  library.add(fas, faTwitter, faFontAwesome);

  return (
    <>
      <Rutas />
    </>
  );
}

export default App;
