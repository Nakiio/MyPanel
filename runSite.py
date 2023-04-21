import webbrowser
import os 

os.system('/etc/init.d/apache2 start')


# Spécifier l'URL à ouvrir
url = "http://localhost/futur/home.php"

# Ouvrir l'URL dans le navigateur par défaut
webbrowser.open(url)
print("c bon")