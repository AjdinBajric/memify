<template>
    <div class="meme-card">
      <div class="image-container">
        <img class="meme-image" src="../assets/leo_cheers.png" alt="Meme">
      </div>
      <div class="content-container">
        <h2 class="title">{{ title }}</h2>
        <div class="date">
            <img class="icon" src="../assets/calendar.svg" alt="Date">
            <span class="date-text">Created on 5. May</span>
          </div>
        <div class="details">
          <div class="likes">
            <img class="icon" src="../assets/heart.svg" alt="Likes">
            <span class="likes-text">{{ likesCount }} likes</span>
          </div>
          <div class="views">
            <img class="icon" src="../assets/eye.svg" alt="Views">
            <span class="views-text">{{ viewsCount }} views</span>
          </div>
          <div class="daily-uses">
            <img class="icon" src="../assets/users.svg" alt="Daily Uses">
            <span class="daily-uses-text">{{ dailyUsesCount }} daily uses</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MemeCard',
    props: {
      imageUrl: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      date: {
        type: String,
        required: true
      },
      likesCount: {
        type: Number,
        required: true
      },
      viewsCount: {
        type: Number,
        required: true
      },
      dailyUsesCount: {
        type: Number,
        required: true
      }
    },
    computed: {
      formattedDate() {
        // Format the date as desired
        return new Date(this.date).toLocaleDateString('en', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      }
    }
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');

   * {
    font-family: 'Poppins', sans-serif;
   }

  .meme-card {
    max-width: 350px;
    display: flex;
    padding: 1rem;
    border-radius: 8px;
    background-color: #f2f2f2;
  }
  
  .image-container {
    width: 50%;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .meme-image {
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
  
  .content-container {
    width: 50%;
    padding-left: 1rem;
  }
  
  .title {
    font-size: 18px;
    font-weight: bold;
    color: #332C5C;
    font-weight: 500;
    margin-bottom: 0%;
  }
  
  .details {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
  }
  
  .date,
  .likes,
  .views,
  .daily-uses {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    color: #9183E8;
    font-size: 11px;
  }
  
  .icon {
    width: 16px;
    height: 16px;
    margin-right: 0.5rem;
  }
  
  .date {
  display: flex;
  align-items: center;
 }

  .date-text {
    color: #BAB5D6;
    font-size: 8px;
    display: inline-block;
    vertical-align: middle;
  }
  
  .likes-text,
  .views-text,
  .daily-uses-text {
    color: #9183E8;
  }
  </style>
  