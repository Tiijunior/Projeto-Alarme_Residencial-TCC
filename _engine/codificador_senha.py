import bcrypt


def codificar_senha(senha):
    # Combine o salt com a senha do usuário
    senha_codificada = senha.encode('utf-8')
    senha_com_salt = bcrypt.hashpw(senha_codificada, bcrypt.gensalt())

    return senha_com_salt


def verificar_senha(senha, senha_codificada):
    # Para verificar uma senha posteriormente
    senha_inserida_pelo_usuario = senha.encode('utf-8')
    if bcrypt.checkpw(senha_inserida_pelo_usuario, senha_codificada):
        return True
    else:
        return False
