<template>
    <button class="primary-button" @click="onClick">
      {{ buttonText }}
    </button>
  </template>
  
  <script>
  export default {
    name: 'PrimaryButton',
    props: {
        buttonText: {
            type: String,
            required: true
        },
        onClick: {
            type: Function,
            required: false
        }
    }
  }
  </script>
  
  <style scoped>
  .primary-button {
    background-color: rgba(117, 98, 224, 1);
    color: #fff;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    box-shadow: 0px 2px 4px rgba(117, 98, 224, 0.5);
    font-family: 'Nunito Sans', sans-serif;
    transition: background-color 0.3s;
  }
  
  .primary-button:hover {
    background-color: rgba(117, 98, 224, 0.8);
    cursor: pointer;
  }
  </style>
  