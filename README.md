# GCMChat

## API

Die API ist momentan unter https://sn0wman.pythonanywhere.com erreichbar.

### Installation

```bash
pip3 install -r requirements.txt
python3 api.py
```

### Methoden

#### /api

* GET: gibt den gesamten Chat im JSON-Format zurück, momentan z.B. so:

    ```json
    [
        {
            "username": "testuser1",
            "text": "text1"
        },
        {
            "username": "testuser2",
            "text": "text2"
        }
    ]
    ```
* POST: Fügt neuen Post hinzu. Syntax:

    ```json
    {
        "username": "testuser1",
        "text": "text1"
    }
    ```

#### /api/deleteData

* GET: Löscht zu Debug-Zwecken alle Chatdaten aus dem Speicher

#### /api/register

* POST: Registriert einen neuen Nutzer. Syntax:

    ```json
    {
        "username": "testuser1",
        "password": "testpass"
    }
    ```
    
    Bei erfolgreicher Registrierung wird ``"Success"`` zurückgegeben, falls der Nutzername schon vergeben ist, ``"ExistingUser"``.
    
#### /api/login

* POST: Überprüft Nutzerdaten. Syntax:

    ```json
    {
        "username": "testuser1",
        "password": "testpass"
    }
    ```
    
    Bei korrekten Login-Daten wird ``"Success"`` zurückgegeben, falls ein falsches Passwort eingegeben wurde oder der Nutzername noch nicht vergeben ist, ``"Wrong"``.

#### /api/deleteLoginData

* GET: Löscht zu Debug-Zwecken alle Logindaten aus dem Speicher