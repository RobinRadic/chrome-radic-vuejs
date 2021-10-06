<template>

    <div id="element-properties">
        <label>Element Properties
            <small>These property keys will be included in the sidebar tree</small>
        </label>

    </div>
    <label>
        <input type="checkbox" name="examplOption" checked>
        Example Option
    </label>

</template>
<script lang="ts">

import { Vue,Options,Prop } from 'vue-property-decorator';


@Options({
    name: 'c-properties'
})
export default class CProperties extends Vue {
    properties = [];

    created(){
        chrome.storage.sync.get()
    }
}

</script>
