import { BacklogMain } from "./components/screens/BacklogMain/BacklogMain";
import { SprintMain } from "./components/screens/SprintMain/SprintMain";
import { Aside } from "./components/ui/Aside/Aside";
import { useScreenStore } from "./store/screenStore";

function App() {
  const { currentScreen } = useScreenStore();

  return (
    <div style={{ display: "flex" }}>
      <Aside />
      {currentScreen === "backlog" ? <BacklogMain /> : <SprintMain />}
    </div>
  );
}

export default App;