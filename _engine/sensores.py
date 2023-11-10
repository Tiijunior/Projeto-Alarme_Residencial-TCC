import time
import RPi.GPIO as gpio

# pino do raspberry conectado ao 74HC165
load_pin = 3
clock_pin = 4
data_pin = 2

gpio.setmode(gpio.BCM)
gpio.setwarnings(False)

porta_ativadas = ''

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
    """
    Função responsável por definir a porta que está em uso.
    :param dados: Resultado recebido da leitura do sensor.
    :return: portas: A porta que está ativa naquele momento.
    """
    portas = []

    for valor, porta in PORTAS.items():
        if dados & valor:
            portas.append(porta)
    return portas


def ler_sensor(qtd_de_zona):
    """
    Esta função é responsável por realizar a leitura do circuito integrado 74HC165.
    A quantidade de circuitos integrados no circuito a ser lida é determinada pelo valor armazenado na variável
    'qtd_de_zona'. A leitura ocorre da seguinte forma: os dados entram nas portas em paralelo e são enviados de forma
    serial (um bit de cada vez) para o Raspberry Pi. Isso é controlado pelo sinal de clock e pelo sinal de
    carga (latch), que permitem a transferência dos dados armazenados em cache do registrador para o Raspberry Pi.
    A função retorna a sequência serial dos dados das entradas em paralelo."

    :param qtd_de_zona: A quantidade de circuitos integrados 74HC165 no circuito a ser lida.
    :return: A sequência serial das entradas em paralelo.
    """

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

    for i in range(qtd_de_zona):
        zona = 0
        for j in range(8):
            zona <<= 1
            zona |= (gpio.input(data_pin))
            gpio.output(clock_pin, gpio.HIGH)
            time.sleep(0.01)
            gpio.output(clock_pin, gpio.LOW)
        dados.append(zona)

    return dados


def verificar_sensores(zona):
    global porta_ativadas
    while True:
        resultado = ler_sensor(zona)
        for i, resultado in enumerate(resultado):
            portas = porta_em_uso(resultado)
            porta_ativadas = f'Zona {i + 1} {portas}'
            time.sleep(0.5)
        return porta_ativadas


gpio.cleanup()
