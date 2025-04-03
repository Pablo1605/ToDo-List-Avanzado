import styles from "./SprintModal.module.css";

export const SprintModal = () => {

    return (
        <div className={styles.containerPrincipalModal}>
            <div className={styles.containerSecundarioModal}>
                <h1>Crear Sprint</h1>
                <form className={styles.datosSprint}>
                    <input type="text" name='titulo' placeholder='Ingrese un título' />
                    <input type="date" name='fechaInicio' />
                    <input type="date" name='fechaCierre' />
                    <div className={styles.botones}>
                        <button type='button' className={styles.botonCancelar}>Cancelar</button>
                        <button type='submit' className={styles.botonEnviar}>Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};