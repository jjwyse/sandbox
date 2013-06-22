/**
 * 
 */
package com.jjw.sandbox.dao.impl;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import com.jjw.sandbox.dao.UserJdbcDao;
import com.jjw.sandbox.dao.rowmapper.UserRowMapper;
import com.jjw.sandbox.pojo.User;

/**
 * Implementation of the UserJdbcDao that insert and retrieves information from
 * our TestTable table in the test database.
 */
public class UserJdbcDaoImpl implements UserJdbcDao
{
    /** Logger instance. */
    Logger LOG = Logger.getLogger(UserJdbcDaoImpl.class);

    /** Spring template to give us easy access to our database. */
    @Autowired
    private NamedParameterJdbcTemplate myNamedParameterJdbcTemplate;

    /**
     * {@inheritDoc}
     */
    @Override
    public void insert(User user)
    {
        LOG.info("Attempting to insert User: " + user + " into database table USER_TABLE");

        String sql = "INSERT INTO USER_TABLE (Name) VALUES (?)";
        LOG.trace(sql);

        myNamedParameterJdbcTemplate.getJdbcOperations().update(sql, new Object[] { new String(user.getName()) });

        LOG.info("Updated database with new user.");
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public User findUserById(int id)
    {
        String sql = "SELECT * FROM USER_TABLE WHERE ID = ?";
        LOG.trace(sql);

        return myNamedParameterJdbcTemplate.getJdbcOperations().queryForObject(sql, new UserRowMapper(), id);
    }
}
