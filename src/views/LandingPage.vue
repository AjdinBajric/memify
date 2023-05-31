<template>
    <div id="app">
      <HelloWorld msg="Welcome to Your Vue.js App"/>
      <PrimaryButton buttonText="SignUp" :onClick="handleSignUp"/>
      <SecondaryButton buttonText="Log In" :onClick="handleSignIn"/>
      <MemeCard title="Leo cheers meme" likesCount="23.1k" viewsCount="92.3k" dailyUsesCount="235"/>
    </div>
  </template>
  
  <script>
  import HelloWorld from '../components/HelloWorld.vue'
  import PrimaryButton from '../components/PrimaryButton.vue';
  import SecondaryButton from '../components/SecondaryButton.vue';
  import MemeCard from '@/components/MemeCard.vue';
  
  export default {
    name: 'LandingPage',
    components: {
    HelloWorld,
    PrimaryButton,
    SecondaryButton,
    MemeCard
},
    methods: {
      handleSignUp() {
        this.$router.push('/signup');
      },
      handleSignIn(){
        this.$router.push('/signin')
      }
    }
  }
  </script>
  