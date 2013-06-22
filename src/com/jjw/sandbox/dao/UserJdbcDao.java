package com.jjw.sandbox.dao;

import com.jjw.sandbox.pojo.User;

/**
 * Responsible for saving and retrieving information from our TestTable mySql
 * table.
 * 
 * @author jjwyse
 * 
 */
public interface UserJdbcDao
{
    /**
     * Insert a new User object into the database
     * 
     * @param user
     *            The user to insert into our database
     */
    public void insert(User user);

    /**
     * Retrieve a user from the database with the specified id
     * 
     * @param id
     *            The id of the user to retrieve
     */
    public User findUserById(int id);
}
