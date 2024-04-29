FROM golang:1.22 AS build-stage 
WORKDIR /usr/src/app
COPY app.go .
RUN go mod init app
RUN go build

FROM scratch
COPY --from=build-stage /usr/src/app/app .
ENTRYPOINT ["/app"]