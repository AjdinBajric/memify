<template>
    <button class="secondary-button">
      {{ buttonText }}
    </button>
  </template>
  
  <script>
  export default {
    name: 'SecondaryButton',
    props: {
      buttonText: {
        type: String,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .secondary-button {
    background-color: transparent;
    color: rgba(117, 98, 224, 1);
    padding: 0.5rem 1rem;
    border: 1px solid rgba(117, 98, 224, 1);
    border-radius: 4px;
    box-shadow: 0px 2px 4px rgba(117, 98, 224, 0.5);
    font-family: 'Nunito Sans', sans-serif;
    transition: background-color 0.3s;
  }
  
  .secondary-button:hover {
    background-color: rgba(117, 98, 224, 0.1);
    cursor: pointer;
  }
  </style>