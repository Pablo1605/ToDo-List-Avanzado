import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { BacklogMain } from "./components/screens/BacklogMain/BacklogMain";
import { SprintMain } from "./components/screens/SprintMain/SprintMain";
import { Aside } from "./components/ui/Aside/Aside";
import { sprintStore } from "./store/sprintStore";

function App() {
  const sprints = sprintStore((state) => state.sprints);

  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        <Routes>
          <Route path="/" element={<Navigate to={sprints.length > 0 ? "/sprint" : "/backlog"} />} />
          <Route path="/backlog" element={<BacklogMain />} />
          <Route path="/sprint" element={<SprintMain />} />
        </Routes>
        <Aside />
      </div>
    </BrowserRouter>
  );
}

export default App;