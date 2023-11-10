import RPi.GPIO as GPIO
import time

# Define os pinos de conexão ao 74HC165
dataPin = 2  # Pino GPIO17 (pin 11) do Raspberry Pi
clockPin = 4  # Pino GPIO27 (pin 13) do Raspberry Pi
latchPin = 3  # Pino GPIO22 (pin 15) do Raspberry Pi


def setup():
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(dataPin, GPIO.IN)
    GPIO.setup(clockPin, GPIO.OUT)
    GPIO.setup(latchPin, GPIO.OUT)


def read_74HC165():
    GPIO.output(latchPin, GPIO.LOW)
    time.sleep(0.00001)
    GPIO.output(latchPin, GPIO.HIGH)

    inputData = 0

    for i in range(8):
        bit_value = GPIO.input(dataPin)
        inputData |= bit_value << (7 - i)
        GPIO.output(clockPin, GPIO.HIGH)
        GPIO.output(clockPin, GPIO.LOW)

    return inputData


def main():
    setup()

    try:
        while True:
            input_data = read_74HC165()
            print(f"Input Data: {input_data:08b}")
            time.sleep(1)
    except KeyboardInterrupt:
        GPIO.cleanup()


if __name__ == "__main__":
    main()
