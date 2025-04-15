import { FC } from 'react';
import { ISprint } from '../../../types/ISprint';
import styles from './ModalViewSprint.module.css';

type IModalViewSprint = {
	sprint: ISprint
    setOpenViewModal: (state: boolean) => void
};

export const ModalViewSprint: FC<IModalViewSprint> = ({ sprint, setOpenViewModal }) => {

	return (
		<div className={styles.containerPrincipalModal}>
            <div className={styles.containerSecundarioModal}>
                <h3 className={styles.titulo}>Título: {sprint.nombre}</h3>
                <h3>Fecha de Inicio: {sprint.fechaInicio}</h3>
                <h3>Fecha de Cierre: {sprint.fechaCierre}</h3>
                <div>
                    <button onClick={() => setOpenViewModal(false)}>Cerrar</button>
                </div>
            </div>
        </div>
	);
};
