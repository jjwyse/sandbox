#!/bin/sh

# Common start script for Java applications

COMPONENT=@COMPONENT@

# Deploy directories.

usage()
{
   echo "usage: $0 [server]"
   exit 1
}

ARGS=$1
if [ -z "$ARGS" ]; then
   usage
fi

echo "Setting profile to: $ARGS"

SCRIPT=`readlink -f $0`
SCRIPT_DIR=`dirname $SCRIPT`
BASE_DIR=$SCRIPT_DIR/..

CONFIG_DIR=/$BASE_DIR/config
LIB_DIR=/$BASE_DIR/lib
LOGS_DIR=/$BASE_DIR/logs

MAIN_CLASS=@MAIN_CLASS@

LOG_FILE=$LOGS_DIR/@COMPONENT@.log
PID_FILE=$LOGS_DIR/@COMPONENT@.pid

PID_PROPERTY="-Dpid.file=$PID_FILE"
COMPONENT_PROPERTY="-Dcomponent=$COMPONENT"
RUNTIME_PROPERTY="-Druntime.properties.dir=$CONFIG_DIR"
SPRING_ACTIVE_PROFILE="-Dspring.profiles.active=$ARGS"

APPLICATION_CONTEXT=$CONFIG_DIR/@COMPONENT@-application-context.xml
LOG4J_CONFIG=$CONFIG_DIR/log4j.xml

CLASSPATH=@START_CLASSPATH@

echo "Starting $COMPONENT"
java -cp $CLASSPATH $LOG4J_PROPERTY $PID_PROPERTY $COMPONENT_PROPERTY $RUNTIME_PROPERTY $SPRING_ACTIVE_PROFILE $MAIN_CLASS $LOG4J_CONFIG $APPLICATION_CONTEXT &