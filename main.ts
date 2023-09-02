function Srcreen_warnings () {
    let Ok_prev = 0
    if (Ok != 0) {
        if (Warning_Lum) {
            images.createImage(`
                . # . . .
                . # . . .
                . # . . .
                . # . . .
                . # # # #
                `).scrollImage(1, 200)
            basic.pause(500)
            images.createImage(`
                . . # . .
                . . # . .
                # . # . #
                . # # # .
                . . # . .
                `).scrollImage(1, 200)
            basic.pause(500)
            images.createImage(`
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                `).scrollImage(1, 200)
        }
        if (Warning_Hum) {
            images.createImage(`
                # . . # .
                # . . # .
                # # # # .
                # . . # .
                # . . # .
                `).scrollImage(1, 200)
            basic.pause(500)
            images.createImage(`
                . . # . .
                . . # . .
                # . # . #
                . # # # .
                . . # . .
                `).scrollImage(1, 200)
            basic.pause(500)
            images.createImage(`
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                `).scrollImage(1, 200)
        }
        if (Warning_Tem_Max) {
            images.createImage(`
                # # # # #
                . . # . .
                . . # . .
                . . # . .
                . . # . .
                `).scrollImage(1, 200)
            basic.pause(500)
            images.createImage(`
                . . # . .
                . # # # .
                # . # . #
                . . # . .
                . . # . .
                `).scrollImage(1, 200)
            basic.pause(500)
            images.createImage(`
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                `).scrollImage(1, 200)
        } else if (Warning_Temp_Min) {
            images.createImage(`
                # # # # #
                . . # . .
                . . # . .
                . . # . .
                . . # . .
                `).scrollImage(1, 200)
            basic.pause(500)
            images.createImage(`
                . . # . .
                . . # . .
                # . # . #
                . # # # .
                . . # . .
                `).scrollImage(1, 200)
            basic.pause(500)
            images.createImage(`
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                `).scrollImage(1, 200)
        }
    } else if (Ok == Ok_prev) {
        images.iconImage(IconNames.Happy).showImage(0)
    }
}
function Luminosity_management () {
    if (Luminosity < 20) {
        Warning_Lum = 1
    } else {
        Warning_Lum = 0
    }
}
function sensors_readings () {
    if (i < n) {
        Temperature = Temperature + input.temperature()
        Luminosity = Luminosity + input.lightLevel()
        Humidity = Humidity + pins.analogReadPin(AnalogPin.P1)
        i = i + 1
    }
    if (i == n) {
        Temperature = Temperature / n
        Luminosity = Luminosity / n
        Humidity = Humidity / n
        Humidity = pins.map(
        Humidity,
        0,
        700,
        0,
        100
        )
        Luminosity = pins.map(
        Luminosity,
        0,
        255,
        0,
        100
        )
        primera_lectura = 1
        Luminosity_management()
        Temperature_management()
        Humidity_management()
        Ok = Warning_Lum + (Warning_Hum + (Warning_Tem_Max + Warning_Temp_Min))
        Srcreen_warnings()
        wappsto.sendNumberToWappsto(Humidity, 1, WappstoTransmit.ASAP)
        wappsto.sendNumberToWappsto(Luminosity, 2, WappstoTransmit.ASAP)
        wappsto.sendNumberToWappsto(Temperature, 3, WappstoTransmit.ASAP)
        Temperature = 0
        Luminosity = 0
        Humidity = 0
        i = 0
    }
}
function Temperature_management () {
    if (Temperature < 30 && Temperature > 15) {
        Warning_Tem_Max = 0
        Warning_Tem_Max = 0
    } else if (Temperature > 30) {
        Warning_Tem_Max = 1
    } else if (Temperature < 15) {
        Warning_Temp_Min = 1
    }
}
function Humidity_management () {
    if (Humidity < 35) {
        Warning_Hum = 1
    } else {
        Warning_Hum = 0
    }
}
let Humidity = 0
let Temperature = 0
let Luminosity = 0
let Warning_Temp_Min = 0
let Warning_Tem_Max = 0
let Warning_Hum = 0
let Warning_Lum = 0
let Ok = 0
let primera_lectura = 0
let i = 0
let n = 0
wappsto.configureWifi("Miphone", "12345678")
wappsto.configureName("Llavors-Digitals")
wappsto.configureValue(1, "Humitat", WappstoValueTemplate.Number)
wappsto.configureValue(2, "Lluminositat", WappstoValueTemplate.Light)
wappsto.configureValue(3, "Temperatura", WappstoValueTemplate.Temperature)
n = 20
i = 0
primera_lectura = 0
basic.forever(function () {
    sensors_readings()
})
