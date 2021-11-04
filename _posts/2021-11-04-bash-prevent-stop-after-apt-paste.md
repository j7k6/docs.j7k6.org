---
layout: post
title: "Bash: Prevent Break after Apt Command when Pasting List of Commands from Clipboard"
---

When pasting a list of commands from the clipboard into a Bash shell, the execution will stop after an `apt` command is executed. To prevent this, add a `< /dev/null` to the command:

```bash
apt update
apt install -y vim < /dev/null
echo "still running :)"
```

---
1. <https://askubuntu.com/a/517618>
