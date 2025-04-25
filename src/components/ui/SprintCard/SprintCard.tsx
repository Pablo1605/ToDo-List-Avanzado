import { FC, useState } from "react";
import styles from "./SprintCard.module.css"
import { ISprint } from "../../../types/ISprint";
import { useSprint } from "../../../hooks/useSprint";
import { ModalViewSprint } from "../ModalViewSprint/ModalViewSprint";
import { useNavigate } from "react-router-dom";

interface ICardSprints {
    key: string,
    sprint: ISprint,
    handleOpenModalEdit: (sprint: ISprint) => void
}

export const SprintCard: FC<ICardSprints> = ({ sprint, handleOpenModalEdit }) => {
    const editSprint = () => { handleOpenModalEdit(sprint) }
    const { putDeleteSprint } = useSprint()
    const [openViewModal, setOpenViewModal] = useState(false)
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/sprint?id=${sprint.id}`);
    };
    return (
        <>
            <div className={styles.contenedorSprintCard} onClick={handleCardClick}>
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