package com.jjw.sandbox;

import com.jjw.sandbox.pojo.User;

/**
 * TODO - JJW
 * @author jjwyse
 */
public class PassByValue {
    public static void main(String[] args) {
        PassByValue passByValue = new PassByValue();
        User user = new User(1, "josh");
        passByValue.method(user);
        System.out.println(user);
    }

    private void method(User user) {
        user.setName("blah");
        user = new User(2, "laura");
        System.out.println(user);
    }
}
