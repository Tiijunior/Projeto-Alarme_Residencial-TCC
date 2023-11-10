import pygame as som

som.init()
alarme = '../Audio/Alarme.mp3'


def tocar():
    som.mixer.music.load(alarme)
    som.mixer.music.play()


def parar():
    som.mixer.music.stop()
    som.mixer.music.unload()

