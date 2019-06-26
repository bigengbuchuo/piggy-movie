<template>
    <div id='main'>
        <Header title="个 人 信 息"/>
        <div class="content">
            <login/>
        </div>
        <Button/>
    </div>
</template>

<script>

import  Header from '@/components/header';
import Button from '@/components/button';
import login from '@/components/login';

export default {
    name:'mine',
    components:{
        Header,
        Button,
        login
    }
}
</script>

<style>

</style>
