# GCMChat

## API

Die API ist momentan unter [https://sn0wman.pythonanywhere.com/api] erreichbar.

Methoden:

* GET: gibt den Chat im JSON-Format zurück, momentan so:
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
* POST: erlaubt theoretisch, Sachen zum Chat hinzuzufügen, funktioniert momentan aber noch nicht...