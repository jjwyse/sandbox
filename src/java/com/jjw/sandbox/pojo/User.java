package com.jjw.sandbox.pojo;

public class User
{
    String myName;

    public User()
    {
    }

    public User(int id, String name)
    {
        myName = name;
    }

    /**
     * @return the myName
     */
    public String getName()
    {
        return myName;
    }

    /**
     * @param myName
     *            the myName to set
     */
    public void setName(String name)
    {
        myName = name;
    }

    @Override
    public String toString()
    {
        return this.getName();
    }
}
