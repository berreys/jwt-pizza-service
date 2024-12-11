# Curiosity Report

## Docker
I want to learn more about Docker.

### What is docker?
#### From class materials:
Docker is the "original proponent of container technology".
Docker uses Linux namespaces to essentially take a snapshot of the application and allow it to be executed on any compliant machine with the exact same environment.
This snapshot is consists of the changes between the application and the OS the application is running on. This allows the snapshot (or container image) to be much smaller than the entire OS. The image can then be downloaded and executed on other machines with the same OS.

### When is docker used?

### What are its benefits?
1) Docker allows developers to build and test applications much more quickly by standardizing the underlying operating system and environment the source code is being run in. With all the environment standardized, it basically eliminates the "it works on your machine but not mine" problem. By just creating images of containers that can be downloaded and run in the Docker daemon, it allows developers to focus on the code, not the infrastructure the code is running in.
2) Docker allows much better scalability. It is very simple to spin up or shut down a docker container since it is essentially an all-included packaged application. When demand increases, a docker instance can be spun up in seconds as opposed to each individual aspect of the infrastructure needing to be scalable.