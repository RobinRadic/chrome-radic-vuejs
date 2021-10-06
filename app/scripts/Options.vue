<template>
    <div class="c-options">
    <div id="element-properties">
        <label>Element Properties
            <small>These property keys will be included in the sidebar tree</small>
        </label>

    </div>
    <label>
        <input type="checkbox" name="examplOption" checked>
        Example Option
    </label>
    </div>
</template>
<script lang="ts">

import { Vue,Options,Prop } from 'vue-property-decorator';
@Options({
    name: 'c-options'
})
export default class COptions extends Vue {
    properties = [];

    created(){
    }
}

</script>
