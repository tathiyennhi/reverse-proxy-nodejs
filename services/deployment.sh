docker build -t api_service:1.0.0 ./api

docker build -t socket_service:1.0.0 ./socket

docker build -t socket_service2:1.0.0 ./socket2

kubectl apply -f k8s/00-role.yml -f k8s/00-account.yml -f k8s/01-role-binding.yml -f k8s/02-traefik.yml

kubectl apply -f k8s/03-app.yml -f k8s/03-socket.yml -f k8s/04-ingress.yml