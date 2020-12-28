<template>
    <v-app>
        <v-navigation-drawer
            v-model="drawer"
            :clipped="$vuetify.breakpoint.lgAndUp"
            app
        >
            <v-list>
                <v-list-item>
                    <v-text-field label="Search" append-icon="mdi-magnify" single-line clearable v-model="search"/>
                </v-list-item>
                <v-list-item>
                    <v-select :items="['Search All', 'Search Names', 'Search Descriptions']" v-model="searchLocation"/>
                </v-list-item>
                <v-list-item>
                    <v-switch label="Remove Cheats" v-model="removeCheats"/>
                </v-list-item>
                <v-list-item>
                    <v-select :items="['Show All', 'Show Commands', 'Show Variables']" v-model="cvarFilter"/>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>


        <v-app-bar app color="primary" dark :clipped-left="$vuetify.breakpoint.lgAndUp">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
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
                        <v-alert v-if="error" type="error">{{error}}</v-alert>
                        <cvar-table :cvars="cvars"
                                    :search="search"
                                    :search-location="searchLocation"
                                    :remove-cheats="removeCheats"
                                    :cvar-filter="cvarFilter"
                        />
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
        cvars: null,
        drawer: null,
        search: '',
        searchLocation: 'Search All',
        removeCheats: false,
        cvarFilter: 'Show All'
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
