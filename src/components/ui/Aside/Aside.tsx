import { useEffect, useState } from "react";
import { sprintStore } from "../../../store/sprintStore";
import { SprintCard } from "../SprintCard/SprintCard";
import styles from "./Aside.module.css";
import { useSprint } from "../../../hooks/useSprint";
import { ISprint } from "../../../types/ISprint";
import { SprintModal } from "../SprintModal/SprintModal";
import { useNavigate } from "react-router-dom";

export const Aside = () => {
  const setActiveSprint = sprintStore((state) => state.setActiveSprint)
  const [openModalSprints, setOpenModalSprints] = useState<boolean>(false)
  const { sprints, getSprints } = useSprint()

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


  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/backlog`);
  };
  return (
    <>
      <div className={styles.aside}>
        <div className={styles.asideButton}>
          <button onClick={handleCardClick}>Backlog <span className="material-symbols-outlined">
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