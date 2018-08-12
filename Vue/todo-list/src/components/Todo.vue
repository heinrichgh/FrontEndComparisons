<template>
    <div>
        <h1>Todo List</h1>
        <div class="input-group mb-3">
            <input type="text"
                   class="form-control"
                   placeholder="Todo Item"
                   aria-label="Todo Item"
                   aria-describedby="basic-addon2"
                   v-model="text"
                   @keydown.enter="addItem"
            />
            <div class="input-group-append">
                <button class="btn btn-outline-primary" type="button" @click="addItem">Button</button>
            </div>
        </div>
        <div>
            <TodoItem
                    v-for="item in items"
                    :key="item.id"
                    :todo="item"
                    @remove="removeItem"
                    @done="done"
            />
        </div>
    </div>
</template>

<script>
    import TodoItem from './TodoItem';

    let nextId = 0;

    export default {
        name: 'Todo',
        components: {TodoItem},
        data() {
            return {
                text: "",
                items: []
            }
        },
        methods: {
            removeItem(id) {
                this.items = this.items.filter(item => item.id !== id);
            },
            done(id) {
                this.items.filter(item => item.id === id)[0].done = true;
            },
            addItem() {
                this.items.push({
                    id: ++nextId,
                    label: this.text,
                    done: false,
                    dateAdded: new Date()
                });
                this.text = "";
            }
        }
    }
</script>

