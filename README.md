## Getting Started
there are two ways to achieve this:
1. `Run locally`

First, install the dependencies:
```bash
npm install
```

#### Then start the dev server


```bash
npm run dev 
```
## VIew the app
### view by visiting localhost:5173
Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

2. `Run in a Docker environment`
### build the container using the following
```
docker build -t lizzy .
```
### Running it 

```
docker run -dp 3000:3000 lizzy
```

### To see the app visit ip address of the vm/server:3000

## Deploy on Vercel

### This app has already been deployed on vercel 

Open [https://lizzy-prod.vercel.app/](https://lizzy-prod.vercel.app/) with your browser to see.