package com.jjw.sandbox.groovy;

class SamplePogoTest extends GroovyTestCase
{
    void testSamplePogoEquals()
    {
        SamplePogo sample = new SamplePogo();
        sample.setAddress("Address 1");
        sample.setName("Name1");

        SamplePogo sample2 = new SamplePogo(name:"Josh", address:"121 Main St");

        System.out.println("Sample object: " + sample);
        assertFalse(sample.equals(sample2));
        assertFalse(sample.hashCode().equals(sample2.hashCode()));
        sample2.setAddress("Address 1");
        sample2.setName("Name1");
        assertTrue(sample.equals(sample2));
        assertTrue(sample.hashCode().equals(sample2.hashCode()));
    }
}
