FROM rocker/shiny

WORKDIR /R

# Install root dependencies
RUN \
    apt-get update && \
    apt-get install -y --allow-downgrades \
        libcurl3 \
        libcurl4-openssl-dev \
        libssl-dev \
        curl \
        r-cran-rjava && \
    rm -rf /var/lib/apt/lists/*

# Install R dependencies
COPY RScripts/dependencies.R .
RUN Rscript dependencies.R
