<template>
    <div class="list-group-item" v-bind:class="{ 'list-group-item-success': todo.done }">
        <div>
            {{ todo.label }}

            <div class="float-right">
                <button class="btn btn-sm btn-outline-success" @click="$emit('done', todo.id)" v-if="!todo.done">Done</button>
                &nbsp;
                <button class="btn btn-sm btn-outline-danger" @click="$emit('remove', todo.id)">&times;</button>
            </div>
        </div>
        <div class="text-muted small">
            {{ todo.dateAdded.toLocaleDateString(language) }} {{ todo.dateAdded.getHours() }}:{{ todo.dateAdded.getMinutes() }}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TodoItem',
        data() {
            return {
                language: window.navigator.language
            }
        },
        props: {
            todo: {
                type: Object
            }
        }
    }
</script>


