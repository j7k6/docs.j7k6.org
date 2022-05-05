---
layout: post
title: "Kubernetes: Fix PVC Stuck in 'Terminating' Status"
---


```bash
kubectl patch pvc <$PVC_NAME> -p '{"metadata":{"finalizers":null}}'
```

---
1. <https://veducate.co.uk/kubernetes-pvc-terminating/>
