function Gestio_lluminositat () {
    if (Lluminositat < 20) {
        Avis_Lluminositat = 1
    } else {
        Avis_Lluminositat = 0
    }
}
function Avisos_pantalla () {
    let Ok_prev = 0
    if (Ok != 0) {
        if (Avis_Lluminositat) {
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
        if (Avis_Humitat) {
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
        if (Avis_Temp_Max) {
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
        } else if (Avis_Temp_Min) {
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
function Gestio_humitat () {
    if (Humitat < 35) {
        Avis_Humitat = 1
    } else {
        Avis_Humitat = 0
    }
}
function Gestio_temperatura () {
    if (Temperatura < 30 && Temperatura > 15) {
        Avis_Temp_Max = 0
        Avis_Temp_Max = 0
    } else if (Temperatura > 30) {
        Avis_Temp_Max = 1
    } else if (Temperatura < 15) {
        Avis_Temp_Min = 1
    }
}
function lectura_sensors () {
    if (i < n) {
        Temperatura = Temperatura + input.temperature()
        Lluminositat = Lluminositat + input.lightLevel()
        Humitat = Humitat + pins.analogReadPin(AnalogPin.P1)
        i = i + 1
    }
    if (i == n) {
        Temperatura = Temperatura / n
        Lluminositat = Lluminositat / n
        Humitat = Humitat / n
        Humitat = pins.map(
        Humitat,
        0,
        700,
        0,
        100
        )
        Lluminositat = pins.map(
        Lluminositat,
        0,
        255,
        0,
        100
        )
        Primera_Lectura = 1
        Gestio_lluminositat()
        Gestio_temperatura()
        Gestio_humitat()
        Ok = Avis_Lluminositat + (Avis_Humitat + (Avis_Temp_Max + Avis_Temp_Min))
        Avisos_pantalla()
        wappsto.sendNumberToWappsto(Humitat, 1, WappstoTransmit.ASAP)
        wappsto.sendNumberToWappsto(Lluminositat, 2, WappstoTransmit.ASAP)
        wappsto.sendNumberToWappsto(Temperatura, 3, WappstoTransmit.ASAP)
        Temperatura = 0
        Lluminositat = 0
        Humitat = 0
        i = 0
    }
}
let Temperatura = 0
let Humitat = 0
let Avis_Temp_Min = 0
let Avis_Temp_Max = 0
let Avis_Humitat = 0
let Ok = 0
let Avis_Lluminositat = 0
let Lluminositat = 0
let Primera_Lectura = 0
let i = 0
let n = 0
wappsto.configureWifi("Nom_Xarxa_WiFi", "Contrasenya")
wappsto.configureName("Llavors-Digitals")
wappsto.configureValue(1, "Humitat", WappstoValueTemplate.Number)
wappsto.configureValue(2, "Lluminositat", WappstoValueTemplate.Light)
wappsto.configureValue(3, "Temperatura", WappstoValueTemplate.Temperature)
n = 20
i = 0
Primera_Lectura = 0
basic.forever(function () {
    lectura_sensors()
})
