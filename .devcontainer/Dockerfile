## base image
FROM mcr.microsoft.com/vscode/devcontainers/base:ubuntu

# avoid interactive prompts during installation
ENV DEBIAN_FRONTEND=noninteractive

# update Node.js and Python
RUN apt-get update \
  && apt-get install -y --no-install-recommends software-properties-common \
  && add-apt-repository ppa:deadsnakes/ppa \
  && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
  && apt-get install -y nodejs python3.11 python3-pip \
  && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# setup python
RUN python3.11 -m pip install --upgrade pip \
  && ln -s /usr/bin/python3.11 /usr/bin/python

# restore the interactive front end
ENV DEBIAN_FRONTEND=dialog

WORKDIR /workspace