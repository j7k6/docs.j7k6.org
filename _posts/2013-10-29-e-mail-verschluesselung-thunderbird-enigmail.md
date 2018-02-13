---
layout: post
title: "E-Mail Verschlüsselung: Thunderbird & Enigmail"
tags: [thunderbird,enigmail,encryption,pgp]
---

## Vorwort
E-Mail-Verschlüsselung mit [PGP](https://de.wikipedia.org/wiki/Pretty_Good_Privacy) basiert auf dem *Public-Key-Verfahren*. Dabei haben Sender und Empfänger jeweils ein Schlüsselpaar bestehend aus einem öffentlichen ("*Public Key*") und einem geheimen ("*Private Key*") Schlüssel. Der öffentliche Schlüssel des Empfängers muss dem Sender bekannt sein um eine Nachricht an diesen zu verschlüsseln. Der Empfänger kann diese Nachricht nur mit seinem geheimen Schlüssel lesen. Der geheime Schlüssel wird mit einem Passwort abgesichert und darf nur dem Besitzer bekannt sein! Der öffentliche Schlüssel hingegen sollte so weit wie möglich verbreitet sein.

Der [OpenPGP](https://de.wikipedia.org/wiki/OpenPGP)-Standard wird durch das Kryptographiesystem [*GnuPG*](http://gnupg.org/) implementiert. Um GnuPG unter Windows einsetzen zu können wird das Softwarepaket [**Gpg4win**](http://www.gpg4win.org/) benötigt.

## Installation
Thunderbird sollte bereits installiert und ein Mail-Konto eingerichtet sein. Die Installation von Gpg4win wird mit den vorgegebenen Standard-Einstellungen durchgeführt.
Nach der Installation wird Thunderbird gestartet und *Enigmail* über den Add-On-Manager installiert. Nach der Enigmail-Installation muss Thunderbird neu gestartet werden.

## Enigmail Konfiguration
Um Enigmail zu konfigurieren wird im Anwendungsmenü von Thunderbird *OpenPGP > OpenPGP-Assistent* aufgerufen.
Die Einstellungen sollten folgendermaßen aussehen:
![enigmail](/files/e-mail-verschluesselung-thunderbird-enigmail/enigmail01.png)
![enigmail](/files/e-mail-verschluesselung-thunderbird-enigmail/enigmail02.png)
![enigmail](/files/e-mail-verschluesselung-thunderbird-enigmail/enigmail03.png)
![enigmail](/files/e-mail-verschluesselung-thunderbird-enigmail/enigmail04.png)

### PGP-Schlüsselpaar generieren
![enigmail](/files/e-mail-verschluesselung-thunderbird-enigmail/enigmail05.png)
![enigmail](/files/e-mail-verschluesselung-thunderbird-enigmail/enigmail06.png)
![enigmail](/files/e-mail-verschluesselung-thunderbird-enigmail/enigmail07.png)
![enigmail](/files/e-mail-verschluesselung-thunderbird-enigmail/enigmail08.png)

### Widerrufszertifikat
Zuletzt sollte noch ein Widerrufszertifikat ("*Revocation Certificate*") erzeugt werden. Dieses wird benötigt um den Private Key bei Verlust für ungültig zu erkären.
![enigmail](/files/e-mail-verschluesselung-thunderbird-enigmail/enigmail09.png)

## Schlüsselverwaltung
Über *OpenPGP > Schlüsselverwaltung* kann man sich Informationen zum eigenen Schlüssel ansehen und Schlüssel von anderen Kontakten importieren. Diese Liste kann man sich als Schlüsselbund vorstellen.
![enigmail](/files/e-mail-verschluesselung-thunderbird-enigmail/enigmail10.png)

### Eigene Schlüssel sichern
Zunächst sollte das eigene Schlüsselpaar exportiert und sicher aufbewahrt werden. Dafür wird der entsprechende Schlüssel aus der Liste ausgewählt und über *Datei > Exportieren... > Geheime Schlüssel exportieren* gesichert. Diese Datei sollte zusammen mit dem Widerrufszertifikat sicher aufbewahrt werden!
Um den gesamten "Schlüsselbund" zu exportieren werden alle Listeneinträge markiert und exportiert ("*Nur öffentliche Schlüssel exportieren*").

### Fremdschlüssel importieren
Um E-Mails verschlüsselt zu versenden benötigt man den öffentlichen Schlüssel des Kontaktes. Dieser kann als Datei importiert werden (*Datei > Importieren...*), oder von einem Schlüssel-Server runtergeladen werden (vorausgesetzt die Person hat den Schlüssel dort abgelegt).
Um den Schlüssel von einem Key-Server zu importieren benötigt man die Schlüssel-ID des fremden Public Keys.
![enigmail](/files/e-mail-verschluesselung-thunderbird-enigmail/enigmail11.png)

Nach erfolgreichem Import erscheint der Public Key in der Schlüsselliste:
![enigmail](/files/e-mail-verschluesselung-thunderbird-enigmail/enigmail12.png)

### Public Key hochladen
Der eigene Public Key kann ebenfalls auf einen Schlüsselserver hochgeladen werden, um von anderen Kontakten gefunden zu werden.

## E-Mail verschlüsseln
![enigmail](/files/e-mail-verschluesselung-thunderbird-enigmail/enigmail13.png)
Um den Inhalt dieser sensiblen E-Mail zu verschlüsseln (NICHT den Betreff!), muss die Option "*Nachricht verschlüsseln*" über den Button OpenPGP aktiviert sein. Zum Verschlüsseln wird der Public Key des Empfängers verwendet. Dieser wird von Enigmail automatisch aus der Liste ausgewählt, wenn dieser vorher importiert wurde.
![enigmail](/files/e-mail-verschluesselung-thunderbird-enigmail/enigmail14.png)

Beim Klick auf den *Senden*-Button wird der Inhalt der E-Mail verschlüsselt und nur noch der Empfänger kann diese mit seinem geheimen *Private Key* entschlüsseln.
![enigmail](/files/e-mail-verschluesselung-thunderbird-enigmail/enigmail15.png)

## E-Mail entschlüsseln
Wenn der Empfänger auf diese E-Mail antwortet, verschlüsselt er sie hoffentlich auch. Die verschlüsselte E-Mail wird dann mit dem Private Key und dem dazugehörigen Passwort entschlüsselt:
![enigmail](/files/e-mail-verschluesselung-thunderbird-enigmail/enigmail16.png)
![enigmail](/files/e-mail-verschluesselung-thunderbird-enigmail/enigmail17.png)

---
