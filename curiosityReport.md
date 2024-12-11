# Curiosity Report

## Docker
I want to learn more about Docker.

### What is docker?
#### From class materials:
Docker is the "original proponent of container technology".
Docker uses Linux namespaces to essentially take a snapshot of the application and allow it to be executed on any compliant machine with the exact same environment.
This snapshot is consists of the changes between the application and the OS the application is running on. This allows the snapshot (or container image) to be much smaller than the entire OS. The image can then be downloaded and executed on other machines with the same OS.

### When is docker used?
I found it very hard to find example online of when to NOT use a docker container. I also had a professor say a few days ago "as all good web applications should be, this is a containerized application running with docker". When I search for "when to use docker containers", the response I usually get is "use docker containers if you are trying to build a good app". I want all of my apps to be good, so it seems that I should continue learning about docker and kubernetes to be the best developer I can be. 

### What are its benefits?
1) Docker allows developers to build and test applications much more quickly by standardizing the underlying operating system and environment the source code is being run in. With all the environment standardized, it basically eliminates the "it works on your machine but not mine" problem. By just creating images of containers that can be downloaded and run in the Docker daemon, it allows developers to focus on the code, not the infrastructure the code is running in.
2) Docker allows much better scalability. It is very simple to spin up or shut down a docker container since it is essentially an all-included packaged application. When demand increases, a docker instance can be spun up in seconds as opposed to each individual aspect of the infrastructure needing to be scalable.
3) Docker containers also help applications with their security. This I find to be very interesting. Since docker containers basically only contain the necessary resources, there are much less vulnerabilities as opposed to running an application on a machine that has other things on it. This essentially negates attacks coming from different systems on the machine.

### What is usually required and included in a Dockerfile?
A Dockerfile is the instructions to Docker on how to configure the container. 
Many things can be included in a dockerfile like variables, lines that expose ports, and installing packages and software. To learn a bit about this, I broke down the dockerfile we use in this repo.


```ARG NODE_VERSION=20.12.2```

This line is a variable that is saying what version of node we want to use...pretty self explanatory.

```FROM node:${NODE_VERSION}-alpine```

This line tells docker what base container to use. Docker has tons of different options for bases we can use to build our app on. Since we are writing a node app, this is telling docker to hook us up with a container with that ready to go.

```WORKDIR /usr/src/app```

This line navigates us to the /usr/src/app directory IN THE DOCKER container. It is kind of like ```cd /usr/src/app``` inside of the machine we got from the previous line.

```COPY . .```

This line copies everything from our current directory ON OUR MACHINE to the DOCKER CONTAINER at the previously defined directory.

```RUN npm ci```

Once everything is copied, we run an ```npm ci``` which is like npm install but it first clears anything that is already in the node_modules folder. This is run on the docker container where we just copied everything over.

```EXPOSE 80```

This line tells docker to allow outside requests on port 80. This is known as exposing a port, thus the keyword ```EXPOSE```. 

CMD ["node", "index.js", "80"]
