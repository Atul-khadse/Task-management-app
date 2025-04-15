// function App() {
//   return (
//     <div>
//       <header>
//         <img src="src/assets/react-core-concepts.png" alt="Stylized atom" />
//         <h1>React Essentials</h1>
//         <p>
//           Fundamental React concepts you will need for almost any app you are
//           going to build!
//         </p>
//       </header>
//       <main>
//         <h2>Time to get started!</h2>
//       </main>
//     </div>
//   );
// }

// export default App;
//
// import { Card, CardContent } from "../components/ui/card";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
