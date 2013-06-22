package com.jjw.sandbox.wordle.dao;

import org.apache.log4j.Logger;

public class TwordleDaoImpl implements WordleDao
{
    Logger LOG = Logger.getLogger(TwordleDaoImpl.class);

    @Override
    public String getContent()
    {
        LOG.info("Not implemented");

        return null;
    }
}
