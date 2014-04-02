package com.jjw.sandbox.dao.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.jjw.sandbox.pojo.User;

public final class UserRowMapper implements RowMapper<User>
{
    /**
     * {@inheritDoc}
     */
    @Override
    public User mapRow(ResultSet resultSet, int rowNumber) throws SQLException
    {
        User user = new User();
        user.setName(resultSet.getString("NAME"));
        return user;
    }
}
