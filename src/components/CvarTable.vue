<template>
    <v-data-table :headers="headers" :items="cvars" item-key="name">

    </v-data-table>
</template>

<script>
export default {
    name: 'CvarTable',
    props: ['cvars'],
    computed: {
        headers()
        {
            return [
                {
                    text: 'Name',
                    value: 'name'
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
                    value: 'desc'
                }
            ];
        }
    }
};
</script>

<style scoped>

</style>
