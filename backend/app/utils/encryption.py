from cryptography.fernet import Fernet
import os

key = os.environ.get("FERNET_KEY", Fernet.generate_key())
cipher = Fernet(key)

def encrypt(text: str) -> str:
    return cipher.encrypt(text.encode()).decode()

def decrypt(encrypted: str) -> str:
    return cipher.decrypt(encrypted.encode()).decode()