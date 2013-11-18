package com.jjw.sandbox.groovy
import org.mortbay.jetty.Server
import org.mortbay.jetty.servlet.*
import groovy.servlet.*

/**
 * Date: 11/17/13
 * @author: jjwyse
 */
@Grab(group='org.mortbay.jetty', module='jetty-embedded', version='6.1.14')
def startJetty() {
    def jetty = new Server(9919)

    def context = new Context(jetty, '/', Context.SESSIONS)  // Allow sessions.
    context.resourceBase = '.'  // Look in current dir for Groovy scripts.
    context.addServlet(GroovyServlet, '*.groovy')  // All files ending with .groovy will be served.
    context.setAttribute('version', '1.0')  // Set an context attribute.

    jetty.start()
}

println "Starting Jetty, press Ctrl+C to stop."
startJetty()