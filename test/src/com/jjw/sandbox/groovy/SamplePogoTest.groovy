package com.jjw.sandbox.groovy;

class SamplePogoTest extends GroovyTestCase
{
    void test()
    {
        SamplePogo sample = new SamplePogo(name:"Josh", address:"121 Main St");
        sample.setAddress("Address 1");
        sample.setName("Name1");

        SamplePogo sample2 = new SamplePogo(name:"Josh", address:"121 Main St");

        System.out.println("Sample object: " + sample);
        assertFalse(sample.equals(sample2));
        sample2.setAddress("Address 1");
        sample2.setName("Name1");
        assertTrue(sample.equals(sample2));
    }
}
