type EstadoTarea = "pendiente" | "completado" | "en progreso"
export interface ITask {
    id?: string;
    titulo: string;
    descripcion: string;
    fechaLimite:string;
    estado?: EstadoTarea;
}