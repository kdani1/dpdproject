A szoftverhez müködtetéséhez szükséges lépések: 

0. Töltsd le:
Letöltési link windows 10-en futtatható tesztpédányhoz: https://drive.google.com/file/d/13Y1Y_yyxNnn5zpnxZCpTkGxHvHm-D4Sl/view?usp=sharing

1. CSomagold ki a Project fájljait, és helyezd el egy neked tetszőleges helyre a számítógépeden.

2. JDK-t, NodeJS-t, postgreSQL-t (postgreSQL felhasználónév: postgres | jelszó: pass123 ) valamint böngészőt szükséges lehet telepíteni, 
ezek az Installers nevű könyvtárban találhatóak, midegyiket futattni és telepíteni szükséges. 
(Ha már van akkor ez a lépés kihagyható)

3. A Software fájl tartalmazza a szoftver komponenseket, nem szükséges belemenni.

4. Készítsd el az adatbázist,  Futtasd a createdatabase.cmd fájlt, majd a felugró ablakba írd be az adatbázis jelszót, pass123

5. Futtasd a start.cmd-t és a szoftver elindul, a felugró ablakokat NE zárjuk be, a böngésző ablakában jelenik meg
a kezelőfelület. Amennyiben véletlenül bezárjuk,
akkor a böngészősávba "http://localhost:3000/" beírva újra elérhetjük, amennyiben a program fut.
