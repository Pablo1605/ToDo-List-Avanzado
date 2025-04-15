import { FC, useState } from "react";
import { useScreenStore } from "../../../store/screenStore";
import styles from "./SprintCard.module.css"
import { ISprint } from "../../../types/ISprint";
import { useSprint } from "../../../hooks/useSprint";
import { ModalViewSprint } from "../ModalViewSprint/ModalViewSprint";

interface ICardSprints{
    key: string,
    sprint: ISprint,
    handleOpenModalEdit: (sprint: ISprint) => void
  }

export const SprintCard: FC<ICardSprints> = ({sprint, handleOpenModalEdit}) => {
    const { setScreen } = useScreenStore();
    const editSprint = () => {handleOpenModalEdit(sprint)}
    const {putDeleteSprint} = useSprint()
    const [openViewModal, setOpenViewModal] = useState(false)

    return (
        <>
        <div className={styles.contenedorSprintCard} onClick={() => setScreen("sprint")}>
            <div className={styles.datosSprintCard}>
                <h2>{sprint.nombre}</h2>
                <p>Inicio: {sprint.fechaInicio}</p>
                <p>Cierre: {sprint.fechaCierre}</p>
            </div>
            <div className={styles.botonesSprintCard}>
                <button onClick={() => setOpenViewModal(true)}><span className="material-symbols-outlined">
                    visibility
                </span></button>
                <button onClick={editSprint}><span className="material-symbols-outlined">
                    edit
                </span></button>
                <button onClick={() => {
              putDeleteSprint(sprint.id!)
            }}><span className="material-symbols-outlined">
                    delete
                </span></button>
            </div>
        </div>
        {openViewModal && <ModalViewSprint sprint={sprint} setOpenViewModal={setOpenViewModal} />}
        </>
    )
}