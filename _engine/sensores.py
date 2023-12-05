import time
import RPi.GPIO as gpio

# pino do raspberry conectado ao 74HC165
load_pin = 3
clock_pin = 4
data_pin = 2

gpio.setmode(gpio.BCM)
gpio.setwarnings(False)

# Mapeamento de resultados para portas
PORTAS = {
    1: "Porta 1",
    2: "Porta 2",
    4: "Porta 3",
    8: "Porta 4",
    16: "Porta 5",
    32: "Porta 6",
    64: "Porta 7",
    128: "Porta 8"
}


def porta_em_uso(dados):
    portas = []
    for valor, porta in PORTAS.items():
        if dados & valor:
            portas.append(porta)
    return portas


def ler_sensor(qtd_de_zona):
    # Inicializa os pinos
    gpio.setup(load_pin, gpio.OUT)
    gpio.setup(clock_pin, gpio.OUT)
    gpio.setup(data_pin, gpio.IN, pull_up_down=gpio.PUD_DOWN)

    # Carrega os dados dos registradores 74HC165
    gpio.output(load_pin, gpio.LOW)
    time.sleep(0.1)
    gpio.output(load_pin, gpio.HIGH)
    time.sleep(0.1)

    # Lê os dados dos registradores
    dados = []
    for _ in range(qtd_de_zona):
        zona = 0
        for _ in range(8* qtd_de_zona):
            zona <<= 1
            zona |= gpio.input(data_pin)
            gpio.output(clock_pin, gpio.HIGH)
            time.sleep(0.01)
            gpio.output(clock_pin, gpio.LOW)
        dados.append(zona)
    return dados


def verificar_sensores(lista_de_zonas):
    resultados = []
    for zona in lista_de_zonas:
        resultado = ler_sensor(zona)  # Chama ler_sensor para cada zona individualmente
        portas = porta_em_uso(resultado[0])  # Assume que ler_sensor retorna uma lista com um elemento
        resultados.append(f'Zona {zona}: {portas}')
    return resultados

gpio.cleanup()
