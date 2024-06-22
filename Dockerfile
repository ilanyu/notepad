FROM alpine:latest
MAINTAINER ilanyu <helloshevon@gmail.com>
COPY notepad /notepad
EXPOSE 3000
VOLUME /data
WORKDIR /
CMD ["/notepad"]
