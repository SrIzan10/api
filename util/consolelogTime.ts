

export async function consolelogTime(message: string) {
    let unix_timestamp = Date.now()
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();
    const convertedTime = hours + ':' + minutes.substring(-2) + ':' + seconds.substring(-2);

    return console.log(`[${convertedTime}] ${message}`);
}