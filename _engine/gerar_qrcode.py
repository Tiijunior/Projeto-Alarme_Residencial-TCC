import qrcode


# Texto que você deseja incluir no QR Code
info = ("Obrigado por escolher o nosso sistema."
        "\nNós da Algiz agradecemos a sua preferencia."
        "\nMas o QR CODE AINDA EM CONSTRUÇÃO, "
        "\nLOGO LOGO SERÁ POSSIVEL ATIVAR"
        "\nO SISTEMA E FAZER DOWNLOAD DO APP EM SUA LOJA, TENHA CALMA.")

# Crie um objeto QRCode
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=10,
    border=4,
)

# Adicione os dados ao QRCode
qr.add_data(info)
qr.make(fit=True)

# Crie uma imagem QRCode
img = qr.make_image(fill_color="black", back_color="white")

# Salve a imagem em um arquivo
img.save("QRCODE/qrcode.png")
