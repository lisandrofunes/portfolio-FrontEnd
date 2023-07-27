import { FileHandle } from "./file-handle.model"

export interface Persona {
    saludo: string,
    nombre: string,
    dedicacion: string
    dataImage: FileHandle[]
}