<template>
    <div id="board">
        <ul class="collection with-header">
            <li class="collection-header"><h3>Messages</h3></li>
            <li class="collection-item" v-for="message in messages" v-bind:key="message.id"><div class="chip">{{message.author}}</div>{{message.content}}</li>
        </ul>
    </div>
</template>

<script>
import db from '../firebase';

export default {
    name:'board',
    data () {
        return {
            messages:[]
        }
    },
    created(){
        db.collection('messages').get().then(query => {
            query.forEach(message => {
                console.log(message.data())
                this.messages.push(message.data());
            });
        })
    }
}
</script>

