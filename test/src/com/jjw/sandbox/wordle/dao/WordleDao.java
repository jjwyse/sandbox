package com.jjw.sandbox.wordle.dao;

public interface WordleDao
{
    /**
     * Retrieves the most recent content from our Wordle source
     * 
     * @return A large string of data from our Wordle source
     */
    public String getContent();
}
