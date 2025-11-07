# Kubernetes Node.js Demo Application

A simple Node.js web application deployed on a local **Kubernetes Kind cluster** using **Helm** and **Nginx Ingress**, with optional TLS support.

## 🚀 Features

* Containerized Node.js application (Docker)
* **Helm chart** for simplified deployment
* Kubernetes Deployments & Services
* Ingress for external access
* Optional TLS termination
* Local cluster setup using **Kind**

---

---

## 🏗️ Build & Push Docker Image

```bash
cd app
# Build image
docker build -t <your-dockerhub-username>/node-demo:latest .

# Push image
docker push <your-dockerhub-username>/node-demo:latest
```

Update the image name in `helm/node-demo/values.yaml`:

```yaml
image:
  repository: <your-dockerhub-username>/node-demo
  tag: latest
```

---

## 🟢 Deploy Using Helm

```bash
# Install the application
helm install node-demo ./helm/node-demo --create-namespace --namespace demo-app

# Check resources
kubectl get all -n demo-app
```

To upgrade after changes:

```bash
helm upgrade node-demo ./helm/node-demo -n demo-app
```

To uninstall:

```bash
helm uninstall node-demo -n demo-app
```

---

## 🌐 Accessing the Application

Add to your `/etc/hosts` (Linux/Mac) or `C:\Windows\System32\drivers\etc\hosts` (Windows):

```
127.0.0.1 node-demo.local
```

Then open:

```
http://node-demo.local
```

---

## 🔒 Optional TLS Setup

### 1. Generate a Self-Signed Certificate (Local Testing Only)

```bash
mkdir -p k8s-tls
cd k8s-tls
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout node-demo.key \
  -out node-demo.crt \
  -subj "/CN=node-demo.local/O=node-demo.local"
```

### 2. Create Kubernetes TLS Secret

```bash
kubectl create secret tls node-demo-tls \
  --namespace demo-app \
  --key k8s-tls/node-demo.key \
  --cert k8s-tls/node-demo.crt
```

### 3. Enable TLS in `values.yaml`

```yaml
ingress:
  enabled: true
  hosts:
    - host: node-demo.local
      paths:
        - /
  tls:
    enabled: true
    secretName: node-demo-tls
```

### 4. Apply the Update

```bash
helm upgrade node-demo ./helm/node-demo -n demo-app
```

### 5. Access Over HTTPS

```
https://node-demo.local
```

> **Note:** Since this is a self-signed certificate, your browser will show a security warning. Accept it to proceed.

---

## ✅ Cleanup

```bash
helm uninstall node-demo -n demo-app
kind delete cluster --name demo-cluster
```

---

## 📌 Next Steps

* Add cert-manager for automatic Let's Encrypt certificates
* Add GitHub Actions CI/CD
* Deploy using Argo CD GitOps

---

Enjoy! 🎉
