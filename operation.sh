docker build -t api_service:1.0.0 . 
docker build -t socket_service:1.0.0 . 
docker run -d -p 9797:9797 api_service:1.0.0
docker run -d -p 1234:1234 socket_service:1.0.0

#for individual deployment
kubectl apply -f service.yaml
kubectl apply -f deployment.yaml
#for ingression 
kubectl apply -f services.yaml
kubectl apply -f ingress.yaml

# Verify the Service is Running
kubectl get deployment api-deployment
# get pods
kubectl get pods -n default
# Access Directly via Service
kubectl port-forward service/api-service 8080:8080
curl http://127.0.0.1:8080/api
