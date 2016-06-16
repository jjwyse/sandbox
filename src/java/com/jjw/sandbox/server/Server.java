package com.jjw.sandbox.server;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import com.jjw.sandbox.dao.UserJdbcDao;
import com.jjw.sandbox.pojo.User;

public class Server
{
    /** Logger instance. */
    Logger LOG = Logger.getLogger(Server.class);

    @Autowired
    private UserJdbcDao myUserJdbcDao;

    /**
     * Processes a String message from a JMS message client
     * 
     * @param message
     *            The message we received over JMS
     * @return "Ack"
     */
    public String process(String message)
    {
        LOG.info("Received a message: " + message);

        myUserJdbcDao.insert(new User(0, message));

        return "Ack";
    }
}
