# dnd-todolist
 Its a drag and drop to do list with react and laravel Backend API for managing real-time state management system with sql. 

# front-end setup: (must have npm and node installed)
 in cmd:
 
 cd dndtodo
 npm start

//this will start the frontend server on port 3000

# Backend setup (must have laravel installed - prefered version 9)
  in cmd:
  
  cd backend
  composer update 
  php artisan migrate
  php artisan serve

// This will start the backend server on port 8000
  Make sure** .env **file is modified, create and connect to a database from mysql.
Now in browser - localhost:3000  will be prompt up, enjoy Drag and Drop - Track your Todo list !
