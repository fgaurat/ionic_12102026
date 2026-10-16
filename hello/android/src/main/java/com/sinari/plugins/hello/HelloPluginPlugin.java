
package com.sinari.plugins.hello;


import android.view.View;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.android.material.snackbar.Snackbar;

// Le nom doit correspondre à celui passé à registerPlugin('HelloPlugin') côté TypeScript
@CapacitorPlugin(name = "HelloPlugin")
public class HelloPluginPlugin extends Plugin {

    @PluginMethod
    public void echo(PluginCall call) {
        // Lecture du paramètre envoyé par le JS (valeur par défaut : "World")
        String name = call.getString("value");
        String message = "Hello " + name + " !";

        // Les appels UI Android doivent s'exécuter sur le thread principal
        getActivity().runOnUiThread(() -> {
            View root = getActivity().findViewById(android.R.id.content);
            Snackbar.make(root, message, Snackbar.LENGTH_LONG).show();

            // Retour vers le JS
            JSObject result = new JSObject();
            result.put("value", message);
            call.resolve(result);
        });
    }
}