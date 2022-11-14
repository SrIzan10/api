

export async function consolelogTime(message: string) {
    const unix = new Date()

    return console.log(`[${unix.toLocaleTimeString(('es-ES'))}] ${message}`);
}