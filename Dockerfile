FROM centos:centos6

ENV DUCKY=RUBBER

RUN     rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
RUN     yum install -y npm

COPY . /trivial-js
RUN cd /trivial-js; npm install

EXPOSE 8080
CMD cd /trivial-js; npm start

