import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ChessInsightSkeleton from "./components/skeletonloader/skeletonLoader.js";
import "./App.css";
import NameForm from "./components/nameForm.js";
import OverviewPage from "./components/overview.js";

function App() {
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(true);
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<NameForm />} />
        <Route path="/overview" element={<OverviewPage />} />
      </Routes>
    </Router>
    // <div className="App">
    //   <>{isLoading ? <ChessInsightSkeleton /> : <NameForm />}</>
    // </div>
  );
}

export default App;
