# GCMChat

## API

Die API ist momentan unter https://sn0wman.pythonanywhere.com/api erreichbar.

Methoden:

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