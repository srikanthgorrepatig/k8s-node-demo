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

## 📁 Project Structure

```
k8s-node-demo/
├── app/
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
├── helm/
│   └── node-demo/
│       ├── Chart.yaml
│       ├── values.yaml
│       └── templates/
│           ├── deployment.yaml
│           ├── service.yaml
│           └── ingress.yaml
└── README.md
```

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

If using TLS, configure the secret and enable ingress TLS in `values.yaml`.

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
