def gestion_luminosidad():
    global Alerta_luminosidad
    if Luminosidad < 50:
        Alerta_luminosidad = 1
    else:
        Alerta_luminosidad = 0
def gestion_humedad():
    global Alerta_humedad
    if Humedad < 40:
        Alerta_humedad = 1
    else:
        Alerta_humedad = 0
def lecturas():
    global Temperatura, Luminosidad, Humedad, i, estado_ok
    if i < 3:
        Temperatura = Temperatura + input.temperature()
        Luminosidad = Luminosidad + input.light_level()
        Humedad = Humedad + pins.analog_read_pin(AnalogPin.P1)
        i = i + 1
    if i == 3:
        Temperatura = Temperatura / 3
        Luminosidad = Luminosidad / 3
        Humedad = Humedad / 3
        Humedad = pins.map(Humedad, 0, 1023, 0, 100)
        Luminosidad = pins.map(Luminosidad, 0, 255, 0, 100)
        gestion_luminosidad()
        gestion_temperatura()
        gestion_humedad()
        Alertas_pantalla()
        estado_ok = Alerta_luminosidad + (Alerta_humedad + (Alerta_temperatura_max + Alerta_temperatura_min))
        wappsto.send_number_to_wappsto(Humedad, 1, WappstoTransmit.ASAP)
        wappsto.send_number_to_wappsto(Luminosidad, 2, WappstoTransmit.ASAP)
        wappsto.send_number_to_wappsto(Temperatura, 3, WappstoTransmit.ASAP)
        Temperatura = 0
        Luminosidad = 0
        Humedad = 0
        i = 0
def Alertas_pantalla():
    estado_ant = 0
    if estado_ok != 0:
        if Alerta_luminosidad:
            basic.show_string("L")
        if Alerta_humedad:
            basic.show_string("H")
        if Alerta_temperatura_max:
            basic.show_string("T")
            images.create_image("""
                . . # . .
                . # # # .
                # . # . #
                . . # . .
                . . # . .
                """).scroll_image(0, 0)
            basic.pause(200)
        elif Alerta_temperatura_min:
            basic.show_string("T")
            images.create_image("""
                . . # . .
                . . # . .
                # . # . #
                . # # # .
                . . # . .
                """).scroll_image(0, 0)
            basic.pause(200)
        images.icon_image(IconNames.SAD).scroll_image(0, 0)
    elif estado_ok == estado_ant:
        images.icon_image(IconNames.HAPPY).scroll_image(0, 0)
def gestion_temperatura():
    global Alerta_temperatura_max, Alerta_temperatura_min
    if Temperatura < 30 and Temperatura > 15:
        Alerta_temperatura_max = 0
        Alerta_temperatura_max = 0
    elif Temperatura > 30:
        Alerta_temperatura_max = 1
    elif Temperatura < 15:
        Alerta_temperatura_min = 1
Alerta_temperatura_min = 0
Alerta_temperatura_max = 0
estado_ok = 0
Temperatura = 0
i = 0
Alerta_humedad = 0
Humedad = 0
Alerta_luminosidad = 0
Luminosidad = 0
wappsto.configure_wifi("SSID", "password")
if wappsto.connected():
    basic.show_string("WiFi OK")
else:
    pass
wappsto.configure_name("Llavors-Digitals")
wappsto.configure_value(1, "Humitat", WappstoValueTemplate.NUMBER)
wappsto.configure_value(2, "Lluminositat", WappstoValueTemplate.LIGHT)
wappsto.configure_value(3, "Temperatura", WappstoValueTemplate.TEMPERATURE)

def on_forever():
    lecturas()
basic.forever(on_forever)
