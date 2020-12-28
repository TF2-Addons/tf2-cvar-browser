<template>
    <v-data-table :headers="headers"
                  :items="filtered || []"
                  :loading="loading"
                  item-key="name"
                  :search="search"
                  :items-per-page="20"
                  :footer-props="{
                      'items-per-page-options': [10, 20, 50, 100, -1]
                  }"
    >

    </v-data-table>
</template>

<script>
export default {
    name: 'CvarTable',
    props: ['cvars', 'search', 'searchLocation', 'removeCheats', 'removeServer', 'cvarFilter'],
    computed: {
        loading()
        {
            return this.cvars === null;
        },
        filtered()
        {
            if(this.cvars === null)
            {
                return null;
            }
            return this.cvars.filter(cvar =>
            {
                return !((this.removeCheats && cvar.flags.indexOf('cheat') !== -1) ||
                        (this.removeServer && cvar.flags.indexOf('sv') !== -1) ||
                        (this.cvarFilter === 'Show Commands' && cvar.defValue !== 'cmd') ||
                        (this.cvarFilter === 'Show Variables' && cvar.defValue === 'cmd'));
            });
        },
        headers()
        {
            return [
                {
                    text: 'Name',
                    value: 'name',
                    filterable: ['Search All', 'Search Names'].indexOf(this.searchLocation) !== -1
                },
                {
                    text: 'Default Value',
                    value: 'defValue'
                },
                {
                    text: 'Flags',
                    value: 'flags'
                },
                {
                    text: 'Description',
                    value: 'desc',
                    filterable: ['Search All', 'Search Descriptions'].indexOf(this.searchLocation) !== -1
                }
            ];
        }
    }
};
</script>

<style scoped>

</style>
