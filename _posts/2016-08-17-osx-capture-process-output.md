---
layout: post
title: "Capture Output of Running Processes on OS X"
tags: [macos]
---

### Capture stdout:
```bash
sudo dtrace -p <$PID> -qn 'syscall::write*:entry /pid == $target && arg0 == 1/ { printf("%s", copyinstr(arg1, arg2)); }'
```

### Capture stderr:
```bash
sudo dtrace -p <$PID> -qn 'syscall::write*:entry /pid == $target && arg0 == 2/ { printf("%s", copyinstr(arg1, arg2)); }'
```

### Capture both:
```bash
sudo dtrace -p <$PID> -qn 'syscall::write*:entry /pid == $target && (arg0 == 1 || arg0 == 2)/ { printf("%s", copyinstr(arg1, arg2)); }'
```

The `dtrace`security restrcition needs to be disabled on *El Capitan*: Boot in recovery mode -> `csrutil enable --without dtrace`.

---
1. [https://github.com/mivok/squirrelpouch/wiki/dtrace](https://github.com/mivok/squirrelpouch/wiki/dtrace)
