import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { sprintStore } from "../../../store/sprintStore";
import { ISprint } from "../../../types/ISprint";
import styles from "./SprintModal.module.css";
import { useSprint } from "../../../hooks/useSprint";

interface IModalSprints{
    handleCloseModal: () => void
}
const initialState: ISprint = {
    fechaInicio: "",
    fechaCierre: "",
    nombre: "",
    tareas: [],
}

export const SprintModal: FC<IModalSprints> = ({handleCloseModal}) => {
    const activeSprint = sprintStore((state) => state.activeSprint)
    const {addNewSprint, putUpdateSprint} = useSprint()
    const [formValues, setFormValues] = useState(initialState)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormValues((prev) => ({...prev, [`${name}`]: value}))
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if(activeSprint){
            putUpdateSprint({...activeSprint, ...formValues})
        }else{
            addNewSprint({id: crypto.randomUUID(), ...formValues})
        }
        handleCloseModal()
    }

    useEffect(() => {
        if(activeSprint){
            setFormValues(activeSprint)
        }else{
            setFormValues(initialState)
        }
    }, [activeSprint])
    return (
        <div className={styles.containerPrincipalModal}>
            <div className={styles.containerSecundarioModal}>
                <h1>{activeSprint ? "Editar Sprint": "Crear Sprint"}</h1>
                <form onSubmit={handleSubmit} className={styles.datosTarea}>
                <label>Título</label>
                <input type='text' autoComplete='off' required name='nombre' value={formValues.nombre} onChange={handleChange}/>
                <label>Fecha de inicio</label>
                <input type='date' autoComplete='off' required name='fechaInicio' value={formValues.fechaInicio} onChange={handleChange}/>
                <label>Fecha de cierre</label>
                <input type='date' autoComplete='off' required name='fechaCierre' value={formValues.fechaCierre} onChange={handleChange}/>
                    <div className={styles.botones}>
                        <button type='button' className={styles.botonCancelar} onClick={handleCloseModal}>Cancelar</button>
                        <button type='submit' className={styles.botonEnviar}>{activeSprint ? "Editar sprint": "Crear sprint"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};