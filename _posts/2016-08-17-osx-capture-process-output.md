---
layout: post
title: "Capture Output of Running Processes on OS X"
fav: 1
---

> **Note**: The `dtrace`security restrcition needs to be disabled on *El Capitan*: Boot into recovery mode -> `csrutil enable --without dtrace`.

## Capture stdout
```bash
sudo dtrace -p <$PID> -qn 'syscall::write*:entry /pid == $target && arg0 == 1/ { printf("%s", copyinstr(arg1, arg2)); }'
```

## Capture stderr
```bash
sudo dtrace -p <$PID> -qn 'syscall::write*:entry /pid == $target && arg0 == 2/ { printf("%s", copyinstr(arg1, arg2)); }'
```

## Capture both
```bash
sudo dtrace -p <$PID> -qn 'syscall::write*:entry /pid == $target && (arg0 == 1 || arg0 == 2)/ { printf("%s", copyinstr(arg1, arg2)); }'
```

---
1. <https://github.com/mivok/squirrelpouch/wiki/dtrace>
