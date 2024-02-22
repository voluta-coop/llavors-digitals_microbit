function Gestion_temperatura () {
    if (Temperatura < 30 && Temperatura > 15) {
        Aviso_Temp_Max = 0
        Aviso_Temp_Max = 0
    } else if (Temperatura > 30) {
        Aviso_Temp_Max = 1
    } else if (Temperatura < 15) {
        Aviso_Temp_Min = 1
    }
}
function Avisos_pantalla () {
    let Ok_prev = 0
    if (Ok != 0) {
        if (Aviso_Luminosidad) {
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
        if (Aviso_Humedad) {
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
        if (Aviso_Temp_Max) {
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
        } else if (Aviso_Temp_Min) {
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
function Gestion_luminosidad () {
    if (Luminosidad < 20) {
        Aviso_Luminosidad = 1
    } else {
        Aviso_Luminosidad = 0
    }
}
function Gestion_humedad () {
    if (Humedad < 35) {
        Aviso_Humedad = 1
    } else {
        Aviso_Humedad = 0
    }
}
function lectura_sensores () {
    if (i < n) {
        Temperatura = Temperatura + input.temperature()
        Luminosidad = Luminosidad + input.lightLevel()
        Humedad = Humedad + pins.analogReadPin(AnalogPin.P1)
        i = i + 1
    }
    if (i == n) {
        Temperatura = Temperatura / n
        Luminosidad = Luminosidad / n
        Humedad = Humedad / n
        Humedad = pins.map(
        Humedad,
        530,
        270,
        0,
        100
        )
        Luminosidad = pins.map(
        Luminosidad,
        0,
        255,
        0,
        100
        )
        Primera_Lectura = 1
        Gestion_luminosidad()
        Gestion_temperatura()
        Gestion_humedad()
        Ok = Aviso_Luminosidad + (Aviso_Humedad + (Aviso_Temp_Max + Aviso_Temp_Min))
        Avisos_pantalla()
        wappsto.sendNumberToWappsto(Humedad, 1, WappstoTransmit.ASAP)
        wappsto.sendNumberToWappsto(Luminosidad, 2, WappstoTransmit.ASAP)
        wappsto.sendNumberToWappsto(Temperatura, 3, WappstoTransmit.ASAP)
        Temperatura = 0
        Luminosidad = 0
        Humedad = 0
        i = 0
    }
}
let Humedad = 0
let Luminosidad = 0
let Aviso_Humedad = 0
let Aviso_Luminosidad = 0
let Ok = 0
let Aviso_Temp_Min = 0
let Aviso_Temp_Max = 0
let Temperatura = 0
let Primera_Lectura = 0
let i = 0
let n = 0
wappsto.configureWifi("Semillas Digitales", "12345678")
wappsto.configureName("Semillas-Digitales")
wappsto.configureValue(1, "Humedad", WappstoValueTemplate.Number)
wappsto.configureValue(2, "Luminosidad", WappstoValueTemplate.Light)
wappsto.configureValue(3, "Temperatura", WappstoValueTemplate.Temperature)
n = 40
i = 0
Primera_Lectura = 0
basic.forever(function () {
    lectura_sensores()
})
