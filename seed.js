const mongoose = require('mongoose');
const CodeBlock = require('./server/models/codeblock');
//In a production environment we will use a secure password manager such as aws credentials storage.
mongoose.connect('mongodb+srv://azoulayeden1:eden2024@cluster0.sdmh1ao.mongodb.net/');

const codeBlocks = [
  {
      title: 'Palindrome Checker',
      code: `function isPalindrome(str) {
        // Remove non-alphanumeric characters and convert to lowercase
          const cleanedStr = str.replace(/[\W_]/g, '').toLowerCase();

        // Write code here to check if the cleaned string is a palindrome
        // Palindrome: A word, phrase, number, or other sequence of characters
        // that reads the same backward as forward
          
        // Return true if the string is a palindrome, false otherwise
    }`,
      solution: `function isPalindrome(str) {
          const cleanedStr = str.replace(/[\W_]/g, '').toLowerCase();
          const reversedStr = cleanedStr.split('').reverse().join('');
          return cleanedStr === reversedStr;
      }`
  },
  {  
      title: 'Duplicate Remover',
      code: `function removeDuplicates(arr) {
          /* Fix the the code below so that the code returns an array without duplicates*/
          const result = [];
      
          for (let i = 0; i < arr.length; i++) {
              if (result.includes(arr[i])) { 
                  result.push(arr[i]);
              }
          }
          return arr;
      }`,
      solution: `function removeDuplicates(arr) {
          const result = [];
      
          for (let i = 0; i < arr.length; i++) {
              if (!result.includes(arr[i])) {
                  result.push(arr[i]);
              }
          }
      
          return result;
      }`
  },
  {
      title: 'Longest Common Prefix',
      code: `function longestCommonPrefix(strs) {
          // Write code to find the longest common prefix among the given array of strings
          // If there is no common prefix, return an empty string
      }`,
      solution: `function longestCommonPrefix(strs) {
          if (strs.length === 0) 
              return '';
      
          let prefix = strs[0];
      
          for (let i = 1; i < strs.length; i++) {
              while (strs[i].indexOf(prefix) !== 0) {
                  prefix = prefix.substring(0, prefix.length - 1);
                  if (prefix === '') 
                      return '';
              }
          }
      
          return prefix;
      }`
  },
  {
      title: 'Async Task Queue',
      code: `function taskQueue() {
          // Implement a task queue that executes tasks asynchronously
          // The queue should execute tasks one by one, waiting for each task to complete before executing the next
          // Tasks should be added to the queue using the 'addTask' method
          // Example usage:
          // const queue = taskQueue();
          // queue.addTask(() => { /* task 1 */ });
          // queue.addTask(() => { /* task 2 */ });
          // queue.addTask(() => { /* task 3 */ });

          const queue = [];
          let isExecuting = false;

          function executeQueue() {
              
              task(() => {
                  isExecuting = false;
                  executeQueue();
              });
          }
      
          return {
              addTask: (task) => {
                  queue.push(task);
                  executeQueue();
              }
          };
      }`,
      solution: `function taskQueue() {
          const queue = [];
          let isExecuting = false;
      
          function executeQueue() {
              if (queue.length === 0 || isExecuting)
                  return;
          
              isExecuting = true;
              const task = queue.shift();
              task(() => {
                  isExecuting = false;
                  executeQueue();
              });
          }
      
          return {
              addTask: (task) => {
                  queue.push(task);
                  executeQueue();
              }
          };
      }`
  },
  {
      title: 'Merge Sorted Arrays',
      code: `function mergeSortedArrays(arr1, arr2) {
          // Write code to merge two sorted arrays into a new sorted array
          // The arrays are already sorted in ascending order
          const merged = [];
      
          // Add code here to merge the arrays
      
          return merged;
      }`,
      solution: `function mergeSortedArrays(arr1, arr2) {
          const merged = [];
          let i = 0, j = 0;
      
          while (i < arr1.length && j < arr2.length) {
              if (arr1[i] < arr2[j]) {
                  merged.push(arr1[i]);
                  i++;
              } else {
                  merged.push(arr2[j]);
                  j++;
              }
          }
      
          while (i < arr1.length) {
              merged.push(arr1[i]);
              i++;
          }
      
          while (j < arr2.length) {
              merged.push(arr2[j]);
              j++;
          }
      
          return merged;
      }`
  }
];
CodeBlock.deleteMany({})
  .then(() => {
    console.log('Existing code blocks collection dropped successfully!');
    return CodeBlock.insertMany(codeBlocks);
  })
  .then(() => {
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Error seeding code blocks:', error);
    mongoose.connection.close();
  });