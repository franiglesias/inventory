import * as process from 'process'

export class Environment {
    current(): string {
        if (!process.env) {
            throw new Error('Variables de entorno no disponibles')
        }

        const env = process.env.REACT_APP_ENV || process.env.APP_ENV

        if (!env) {
            console.warn('Variable de entorno no definida, usando "test" por defecto')
            return 'test'
        }

        const validEnvs = ['test', 'local', 'production']
        if (!validEnvs.includes(env)) {
            console.warn(`Ambiente "${env}" no reconocido, usando "test" por defecto`)
            return 'test'
        }

        return env
    }
}