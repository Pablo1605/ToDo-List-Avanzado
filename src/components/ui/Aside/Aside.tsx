import { useEffect, useState } from "react";
import { useScreenStore } from "../../../store/screenStore";
import { sprintStore } from "../../../store/sprintStore";
import { SprintCard } from "../SprintCard/SprintCard";
import styles from "./Aside.module.css";
import { useSprint } from "../../../hooks/useSprint";
import { ISprint } from "../../../types/ISprint";
import { SprintModal } from "../SprintModal/SprintModal";

export const Aside = () => {
  const { setScreen } = useScreenStore();
  const setActiveSprint = sprintStore((state) => state.setActiveSprint)
  const [openModalSprints, setOpenModalSprints] = useState<boolean>(false)
  const {sprints, getSprints} = useSprint()

  const handleCloseModal = () => {
    setActiveSprint(null)
    setOpenModalSprints(false)
  }

  const handleOpenModalEdit = (sprint: ISprint) => {
    setOpenModalSprints(true)
    setActiveSprint(sprint)
  }

  useEffect(() => {
    getSprints()
  }, [])

  return (
    <>
      <div className={styles.aside}>
        <div className={styles.asideButton}>
          <button onClick={() => setScreen("backlog")}>Backlog <span className="material-symbols-outlined">
            menu_book
          </span></button>
          <button onClick={() => { setOpenModalSprints(true) }}>Sprints <span className="material-symbols-outlined">add</span></button>
        </div>
        <div>
          {
            sprints.length > 0 ?
              sprints.map((sprint) => <SprintCard key={sprint.id!} sprint={sprint} handleOpenModalEdit={handleOpenModalEdit} />) :
              <h3>No hay sprints en este momento</h3>
          }
        </div>
      </div>
      {openModalSprints && <SprintModal handleCloseModal={handleCloseModal} />}
    </>
  );
};