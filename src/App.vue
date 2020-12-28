<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <v-toolbar-title class="headline">
                <span class="font-weight-light">TF2 Cvar Browser</span>
                <v-btn icon
                       href="https://github.com/TF2-Addons/tf2-cvar-browser"
                >
                    <v-icon>mdi-github</v-icon>
                </v-btn>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <dark-switch/>
        </v-app-bar>

        <v-main>
            <v-container >
                <v-row class="text-center">
                    <v-col cols="12">
                        <div v-if="loading || error" class="mt-5">
                            <v-progress-circular indeterminate v-if="loading"/>
                            <v-alert v-if="error" type="error">{{error}}</v-alert>
                        </div>
                        <template v-else>
                            <cvar-table :cvars="cvars"/>
                        </template>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import DarkSwitch from './components/DarkSwitch';
import localforage from 'localforage';
import CvarTable from '@/components/CvarTable';

export default {
    name: 'App',
    components: {
        CvarTable,
        DarkSwitch
    },
    data: () => ({
        error: '',
        loading: true,
        cvars: null
    }),
    mounted: async function()
    {
        try
        {
            this.cvars = await localforage.getItem('cvars');
            if(!this.cvars)
            {
                this.cvars = await (await fetch('https://tf2-addons.github.io/tf2-cvar-scraper/cvars.json')).json();
                await localforage.setItem('cvars', this.cvars);
            }
        }
        catch(e)
        {
            this.error = e;
        }
        this.loading = false;
    }
};
</script>
