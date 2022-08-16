# SG IoBroker Web-APP

## Schalter und Consumer:

Mit Hilfe der SG ioBrokere Webapp können Schalter und Consumer wie Lampen verbunden werden.
Diese Applikation ist die WebOberfläche für die Konfiguration

Die ab braucht ein ioBroker Server mit NodeRed, auf welchem die Nodes von aus Flows.json installiert sind.
Weiter wird der ioBroker Adapter SG_Webappi gebraucht. (https://github.com/swissglider/ioBroker.sg_webapi)

Im Moment funktionieren Schalter und Aktoren von folgenden Adapter:

-   Hue
-   Mihome
-   Shelly
-   Smartthings (nur sehr sehr begrenzt)

Die SG ioBrokere Webapp basiert auf Next.js
