package com.sinari.plugins.hello;

import com.getcapacitor.Logger;

public class HelloPlugin {

    public String echo(String value) {
        Logger.info("Echo", value);
        return value;
    }
}
